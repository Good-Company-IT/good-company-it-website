// Receives the contact form and forwards it to a Google Apps Script web app that appends a row to the CRM Sheet.
// Two server-side environment variables are required (set them in Vercel and in .env.local; never commit them):
//   CONTACT_WEBHOOK_URL   - URL of the published Apps Script web app
//   CONTACT_WEBHOOK_TOKEN - shared secret that the script checks before writing
// Personal data is never logged here: only generic status messages.
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// The CRM script can take a few seconds; allow the function to wait for it (Hobby plan maximum is 60).
export const maxDuration = 30;

const MAX_LENGTH = {
  fullName: 120,
  companyName: 160,
  email: 254,
  phone: 40,
  industry: 80,
  services: 400,
  message: 4000,
  consentVersion: 40,
  locale: 8,
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light in-memory rate limit per server instance: stops trivial floods, not a distributed attack.
// The IP is used only as a temporary key and is never stored or forwarded.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_HITS = 5;
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

const clean = (value, field) =>
  typeof value === 'string' ? value.trim().slice(0, MAX_LENGTH[field]) : '';

const fail = (message, status) => NextResponse.json({ ok: false, error: message }, { status });

export async function POST(request) {
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) return fail('Too many requests', 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid request', 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots don't retry.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const data = {
    fullName: clean(body.fullName, 'fullName'),
    companyName: clean(body.companyName, 'companyName'),
    email: clean(body.email, 'email'),
    phone: clean(body.phone, 'phone'),
    industry: clean(body.industry, 'industry'),
    services: clean(body.services, 'services'),
    message: clean(body.message, 'message'),
    consentVersion: clean(body.consentVersion, 'consentVersion'),
    locale: clean(body.locale, 'locale'),
  };

  if (!data.fullName || !EMAIL_PATTERN.test(data.email)) {
    return fail('Missing or invalid fields', 400);
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (data.phone && (!/^[0-9+()\-.\s]+$/.test(data.phone) || phoneDigits.length < 7 || phoneDigits.length > 15)) {
    return fail('Invalid phone number', 400);
  }
  // Authorization to process the data to answer the request is mandatory; marketing consent is optional.
  if (body.authorization !== true || !data.consentVersion) {
    return fail('Authorization is required', 400);
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  const token = process.env.CONTACT_WEBHOOK_TOKEN;
  if (!url || !token) {
    console.error('Contact webhook is not configured');
    return fail('Service unavailable', 500);
  }

  const payload = {
    token,
    // Server time, so the consent timestamp cannot be altered from the browser.
    receivedAt: new Date().toISOString(),
    ...data,
    marketingConsent: body.marketingConsent === true,
    source: 'goodcompanyit.com/contact',
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
      console.error('Contact webhook rejected the request', response.status);
      return fail('Could not save the request', 502);
    }
  } catch (error) {
    // Error type only (e.g. TimeoutError, or a network code): never the URL, token or submitted data.
    console.error('Contact webhook unreachable', error?.name, error?.cause?.code);
    return fail('Could not save the request', 502);
  }

  return NextResponse.json({ ok: true });
}
