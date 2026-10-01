import { CONSENT_ID_STORAGE_KEY, BANNER_VERSION, POLICY_VERSION } from './constants';

// Sends one small record of the visitor's cookie decision to our own server (/api/consent), which stores it
// in a separate Google Sheet. It is the company's proof of consent, so it must not depend only on the
// browser's local storage. No IP address and no personal data: a random identifier, the decision, and the
// versions of the banner and the policy the visitor saw.

const newId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'v-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
};

export const hasVisitorId = () => {
  try {
    return Boolean(localStorage.getItem(CONSENT_ID_STORAGE_KEY));
  } catch (e) {
    return false;
  }
};

// The identifier links the decisions of one browser (accepted, later withdrawn...). It is created the first
// time a decision is recorded, never before.
const getVisitorId = () => {
  try {
    let id = localStorage.getItem(CONSENT_ID_STORAGE_KEY);
    if (!id) {
      id = newId();
      localStorage.setItem(CONSENT_ID_STORAGE_KEY, id);
    }
    return id;
  } catch (e) {
    return newId(); // storage blocked: the record is still kept, just not linkable to later decisions
  }
};

// decision: 'accepted' | 'declined' | 'withdrawn' | 'gpc_refusal'
// origin:   'banner' | 'settings' | 'gpc'
export const recordConsent = (decision, origin) => {
  try {
    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true, // lets the request finish even if the page reloads right after (withdrawing reloads it)
      body: JSON.stringify({
        visitorId: getVisitorId(),
        decision,
        origin,
        bannerVersion: BANNER_VERSION,
        policyVersion: POLICY_VERSION,
        gpc: navigator.globalPrivacyControl === true,
        locale: (document.documentElement.lang || '').slice(0, 8),
      }),
    }).catch(() => {});
  } catch (e) {
    // Never block or break the page because the record could not be sent.
  }
};
