// Shared constants for the cookie consent system. No secrets: these IDs are public in the page source.
export const CONSENT_STORAGE_KEY = 'cookieConsent';
export const OPEN_SETTINGS_EVENT = 'goco:open-cookie-settings';
export const GA_ID = 'G-E7RL326PKG';
export const GTM_ID = 'GTM-5PDB3BJW';

// Record of consent (see recordConsent.js and docs/compliance.md).
export const CONSENT_ID_STORAGE_KEY = 'cookieConsentId';
// Change BANNER_VERSION when the banner text changes and POLICY_VERSION when the privacy policy changes:
// they are stored with every decision as proof of what the visitor saw.
export const BANNER_VERSION = 'banner-2026-10-01';
export const POLICY_VERSION = 'policy-2026-10-06';
