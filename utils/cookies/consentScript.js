import { CONSENT_STORAGE_KEY, GA_ID, GTM_ID } from './constants';

// Inline script injected by app/[locale]/layout.js before anything else runs.
// Rules it enforces:
//  1. Consent Mode defaults to "denied" for every signal, before any Google tag exists.
//  2. Google Tag Manager and Google Analytics are NOT loaded until the visitor accepts.
//  3. A previously saved "accepted" choice is applied immediately on page load.
//  4. Declining or withdrawing clears Google cookies and reloads the page if tags were already loaded.
// Plain ES5 on purpose: it runs as a raw string before React hydrates.
export const consentScript = `
(function (w, d) {
  var KEY = '${CONSENT_STORAGE_KEY}';
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

  function setConsent(state) {
    gtag('consent', 'update', {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      functionality_storage: state,
      personalization_storage: state,
      security_storage: 'granted'
    });
  }

  w.gocoConsent = {
    grant: function () {
      setConsent('granted');
      loadGoogleTags();
    },
    revoke: function () {
      setConsent('denied');
      clearGoogleCookies();
      if (loaded) w.location.reload();
    }
  };

  var saved = null;
  try { saved = w.localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'true') w.gocoConsent.grant();
})(window, document);
`;
