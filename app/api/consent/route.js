// Receives the visitor's cookie decision (see utils/cookies/recordConsent.js) and forwards it to the Google Apps
// Script that appends one row to the consent-record spreadsheet. It reuses the same two server-side environment
// variables as the contact form (set in Vercel and in .env.local; never commit them):
//   CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_TOKEN
// No IP address is forwarded or stored, and nothing personal is logged here.
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const DECISIONS = ['accepted', 'declined', 'withdrawn', 'gpc_refusal'];
const ORIGINS = ['banner', 'settings', 'gpc'];

// Our lead-magnet subdomains may also send records. The site of a record is taken from the request's Origin
// header, which the browser sets and a page cannot forge; the body's `site` is only used when there is no Origin.
const LEAD_MAGNET_SITES = {
  'quiz.goodcompanyit.com': 'quiz',
  'calculator.goodcompanyit.com': 'calculator',
  'awareness.goodcompanyit.com': 'awareness',
};
const SITES = ['www', 'quiz', 'calculator', 'awareness'];

// Allowed cross-origin callers get CORS headers; every other origin gets none and is rejected below.
function corsHeaders(request) {
  const origin = request.headers.get('origin');
  if (!origin) return {};
  try {
    if (LEAD_MAGNET_SITES[new URL(origin).host]) return { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' };
  } catch {
    // Not a valid origin: no headers.
  }
  return {};
}

export async function OPTIONS(request) {
  const cors = corsHeaders(request);
  if (!cors['Access-Control-Allow-Origin']) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      ...cors,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
const ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

// Light in-memory rate limit per server instance. The IP is only a temporary key and is never stored or forwarded.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_HITS = 20;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX_HITS;
}

const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const fail = (message, status) => NextResponse.json({ ok: false, error: message }, { status });

export async function POST(request) {
  const response = await handle(request);
  Object.entries(corsHeaders(request)).forEach(([name, value]) => response.headers.set(name, value));
  return response;
}

async function handle(request) {
  // Only our own pages (this site and the lead-magnet subdomains) may send records.
  const origin = request.headers.get('origin');
  let site = '';
  if (origin) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {
      return fail('Forbidden', 403);
    }
    if (originHost === request.headers.get('host')) site = 'www';
    else if (LEAD_MAGNET_SITES[originHost]) site = LEAD_MAGNET_SITES[originHost];
    else return fail('Forbidden', 403);
  }

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) return fail('Too many requests', 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid request', 400);
  }

  const decision = text(body.decision, 20);
  const consentOrigin = text(body.origin, 20);
  const visitorId = text(body.visitorId, 64);
  if (!DECISIONS.includes(decision) || !ORIGINS.includes(consentOrigin) || !ID_PATTERN.test(visitorId)) {
    return fail('Invalid fields', 400);
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  const token = process.env.CONTACT_WEBHOOK_TOKEN;
  if (!url || !token) {
    console.error('Consent webhook is not configured');
    return fail('Service unavailable', 500);
  }

  const payload = {
    token,
    type: 'consent',
    // Server time, so it cannot be altered from the browser.
    receivedAt: new Date().toISOString(),
    visitorId,
    decision,
    origin: consentOrigin,
    site: site || (SITES.includes(body.site) ? body.site : ''),
    bannerVersion: text(body.bannerVersion, 40),
    policyVersion: text(body.policyVersion, 40),
    gpc: body.gpc === true,
    locale: text(body.locale, 8),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(25000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result || result.ok !== true) {
      console.error('Consent webhook rejected the record', response.status);
      return fail('Could not save the record', 502);
    }
  } catch (error) {
    console.error('Consent webhook unreachable', error?.name, error?.cause?.code);
    return fail('Could not save the record', 502);
  }

  return NextResponse.json({ ok: true });
}
