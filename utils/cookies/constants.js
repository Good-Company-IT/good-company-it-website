// Shared constants for the cookie consent system. No secrets: these IDs are public in the page source.
export const CONSENT_STORAGE_KEY = 'cookieConsent';
export const OPEN_SETTINGS_EVENT = 'goco:open-cookie-settings';
export const GA_ID = 'G-E7RL326PKG';
export const GTM_ID = 'GTM-5PDB3BJW';

// Record of consent (see recordConsent.js and docs/compliance.md).
export const CONSENT_ID_STORAGE_KEY = 'cookieConsentId';

// Choice shared with the lead-magnet subdomains (quiz., calculator., awareness.). localStorage is per origin, so
// the choice is also kept in a first-party cookie on the parent domain. It only remembers the decision.
export const CONSENT_COOKIE_NAME = 'goco_consent';
export const CONSENT_COOKIE_DOMAIN = '.goodcompanyit.com';
export const CONSENT_COOKIE_MAX_AGE = 31536000; // 12 months
export const CONSENT_COOKIE_VERSION = '2';
// Which of our sites took the decision; stored in the consent record.
export const SITE_ID = 'www';
// Change BANNER_VERSION when the banner text changes and POLICY_VERSION when the privacy policy changes:
// they are stored with every decision as proof of what the visitor saw.
export const BANNER_VERSION = 'banner-2026-10-01';
export const POLICY_VERSION = 'policy-2026-10-16';
