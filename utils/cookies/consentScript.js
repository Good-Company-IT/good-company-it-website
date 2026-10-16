import {
  CONSENT_STORAGE_KEY,
  CONSENT_ID_STORAGE_KEY,
  CONSENT_COOKIE_NAME,
  CONSENT_COOKIE_DOMAIN,
  CONSENT_COOKIE_MAX_AGE,
  CONSENT_COOKIE_VERSION,
  BANNER_VERSION,
  GA_ID,
  GTM_ID,
} from './constants';

// Inline script injected by app/[locale]/layout.js before anything else runs.
// Rules it enforces:
//  1. Consent Mode defaults to "denied" for every signal, before any Google tag exists.
//  2. Google Tag Manager and Google Analytics are NOT loaded until the visitor accepts.
//  3. A previously saved "accepted" choice is applied immediately on page load.
//  4. Declining or withdrawing clears Google cookies and reloads the page if tags were already loaded.
//  5. The choice is also kept in the shared cookie (see constants.js) so the lead-magnet subdomains can read it.
//     The cookie holds the analytics and advertising answers separately. An old "Decline" in localStorage is
//     carried into the cookie; an old "Accept" is honored on this site only and is never copied to it, because
//     it was given for this site and not for the lead magnets.
// Plain ES5 on purpose: it runs as a raw string before React hydrates.
export const consentScript = `
(function (w, d) {
  var KEY = '${CONSENT_STORAGE_KEY}';
  var ID_KEY = '${CONSENT_ID_STORAGE_KEY}';
  var COOKIE = '${CONSENT_COOKIE_NAME}';
  var COOKIE_DOMAIN = '${CONSENT_COOKIE_DOMAIN}';
  var loaded = false;

  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });

  function loadGoogleTags() {
    if (loaded) return;
    loaded = true;
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var gtm = d.createElement('script');
    gtm.async = true;
    gtm.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
    d.head.appendChild(gtm);
    var ga = d.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
    d.head.appendChild(ga);
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  }

  function clearGoogleCookies() {
    var host = w.location.hostname;
    var parent = host.replace(/^www\\./, '');
    var domains = [null, host, '.' + host, '.' + parent];
    d.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl_|_gac_)/.test(name)) return;
      domains.forEach(function (dom) {
        d.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (dom ? '; domain=' + dom : '');
      });
    });
  }

  // a = analytics answer, s = advertising answer ('granted' | 'denied').
  function setConsent(a, s) {
    gtag('consent', 'update', {
      ad_storage: s,
      analytics_storage: a,
      ad_user_data: s,
      ad_personalization: s,
      functionality_storage: a,
      personalization_storage: s,
      security_storage: 'granted'
    });
  }

  // Reads the shared cookie. Returns { a, s, id } or null when it is missing or not in the expected format.
  function readChoice() {
    var parts = d.cookie ? d.cookie.split(';') : [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].replace(/^\\s+/, '');
      if (part.indexOf(COOKIE + '=') !== 0) continue;
      var out = {};
      part.slice(COOKIE.length + 1).split('&').forEach(function (pair) {
        var eq = pair.indexOf('=');
        if (eq > 0) out[pair.slice(0, eq)] = pair.slice(eq + 1);
      });
      if (out.v !== '${CONSENT_COOKIE_VERSION}') return null;
      if (out.a !== 'granted' && out.a !== 'denied') return null;
      return { a: out.a, s: out.s === 'granted' ? 'granted' : 'denied', id: out.id || '' };
    }
    return null;
  }

  // The random visitor id is shared through the cookie, so one person has one id across our subdomains.
  function visitorId() {
    var existing = readChoice();
    if (existing && existing.id) return existing.id;
    try { return w.localStorage.getItem(ID_KEY) || ''; } catch (e) { return ''; }
  }

  function writeChoice(a, s) {
    var value = 'v=${CONSENT_COOKIE_VERSION}&a=' + a + '&s=' + s;
    var id = visitorId();
    if (/^[A-Za-z0-9-]{8,64}$/.test(id)) value += '&id=' + id;
    value += '&bv=${BANNER_VERSION}';
    var host = w.location.hostname;
    var cookie = COOKIE + '=' + value + '; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax';
    // The parent domain only applies on our real domain; localhost and preview hosts keep a host-only cookie.
    if (host === COOKIE_DOMAIN.slice(1) || host.slice(-COOKIE_DOMAIN.length) === COOKIE_DOMAIN) {
      cookie += '; domain=' + COOKIE_DOMAIN;
    }
    if (w.location.protocol === 'https:') cookie += '; Secure';
    d.cookie = cookie;
  }

  function apply(a, s) {
    setConsent(a, s);
    if (a === 'granted') loadGoogleTags();
  }

  w.gocoConsent = {
    // The banner's "Agree" on this site grants analytics and advertising signals, as it always has.
    grant: function () {
      writeChoice('granted', 'granted');
      apply('granted', 'granted');
    },
    revoke: function () {
      writeChoice('denied', 'denied');
      setConsent('denied', 'denied');
      clearGoogleCookies();
      if (loaded) w.location.reload();
    },
    getChoice: readChoice
  };

  var choice = readChoice();
  if (choice) {
    if (choice.a === 'granted') apply('granted', choice.s);
  } else {
    var saved = null;
    try { saved = w.localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'true') apply('granted', 'granted');
    else if (saved === 'false') writeChoice('denied', 'denied');
  }
})(window, document);
`;
