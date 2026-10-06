# Privacy and cookie compliance guide

Read this before adding **any** tool, script, embed, form or analytics to the site. This repository is **public**: never put secrets, private IDs, credentials or personal data in it. This guide is not legal advice; the legal texts were reviewed by the company's lawyer.

## The rules

1. **No tracker before consent.** Nothing that sets cookies, reads identifiers or sends visitor data to a third party may run until the visitor clicks **Agree** in the cookie banner. That includes pixels, chat widgets, maps, video embeds, fonts loaded from third parties and tag managers.
2. **Everything goes through the consent system** in `utils/cookies/`. Google Tag Manager and Google Analytics are loaded by `consentScript.js` only after acceptance. Do not add `<Script>` tags for trackers anywhere else.
3. **Consent Mode defaults to "denied"** for every signal (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, ...). Keep it that way.
4. **Global Privacy Control counts as a refusal.** The banner is not shown and nothing loads unless the visitor later chooses Agree.
5. **The visitor can always change their choice** (footer link "Cookie settings"). Declining or withdrawing clears Google cookies and reloads the page.
6. **Only say what the system does.** If the policies mention a practice (for example keeping a record of consent), it must exist. Update the policies when something changes, and remove statements that stop being true.
7. **Forms that collect personal data** need: a required, non-pre-ticked authorization checkbox with a short text and a link to the policy; a **separate**, optional marketing checkbox; and a stored record of the consent time and the version of the text accepted.

## Where things live

| What | Where |
|---|---|
| Consent logic (defaults, loading Google tags, clearing cookies) | `utils/cookies/consentScript.js`, injected first by `app/[locale]/layout.js` |
| Banner and "Cookie settings" reopening | `utils/cookies/CookieConsentHandler.jsx`, footer button in `components/common/Footer/Main.js` |
| Banner text (en/es) | `locales/*/common.json` (`cookie_*` keys) |
| Privacy & Cookie Policy, English | `content/legal/privacy-policy.en.md` → `/en/privacy` |
| Política de Privacidad y Cookies, Spanish (same content, keep both aligned) | `content/legal/privacy-policy.es.md` → `/es/privacy` (`app/[locale]/privacy/page.jsx` picks the file by locale) |
| Terms of Service, English | `content/legal/terms-of-service.en.md` → `/en/terms` |
| Términos y Condiciones, Spanish (applies to users who accept in Spanish; keep aligned with the English) | `content/legal/terms-and-conditions.es.md` → `/es/terminos` |
| Política de Tratamiento de Datos Personales (Spanish, required by Colombian Law 1581 of 2012) | `content/legal/data-processing-policy.es.md` → `/es/politica-de-tratamiento-de-datos` |
| Legal page layout | `components/legal/LegalDocument.jsx` |
| Contact form | `components/contact/ContactSection/ContactSecton.jsx` → `app/api/contact/route.js` → a Google Apps Script web app that writes one row to the company CRM Sheet. The script lives in Google (not in this repo). Server-side environment variables (set in Vercel, never committed): `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_TOKEN` |
| Cookie-consent record (proof of consent) | `utils/cookies/recordConsent.js` → `app/api/consent/route.js` → the same Google Apps Script as the contact form, which appends one row per decision to a **separate Google Sheet** named `GoCo_Consent_Log` (tab `Consents`; columns `Received_At, Visitor_ID, Decision, Origin, Banner_Version, Policy_Version, GPC, Locale`), owned by the company's marketing Google account. The file's ID is a script property in Google (`CONSENT_SPREADSHEET_ID`), not in this repo. It stores no IP and nothing personal. **Retention: 3 years** from each record — delete older rows once a year. The browser keeps a random id in local storage (`cookieConsentId`) |
| Consent wording of the contact form | Two checkboxes in `ContactSecton.jsx` (required authorization; separate optional marketing). **Change `CONSENT_TEXT_VERSION` in that file whenever either text changes** — it is stored with every submission as proof of what was accepted |
| Search Console ownership (HTML tag) | `metadata.verification` in `app/[locale]/layout.js` — keep it |

## Cookie and provider inventory (keep the policy table in sync)

| Item | Purpose | Consent |
|---|---|---|
| `_ga`, `_ga_E7RL326PKG` (Google Analytics 4) | Usage statistics | Required |
| `_gcl_au` (Google Ads, when ads go live) | Ad conversion measurement | Required |
| `cookieConsent` (local storage) | Remembers the cookie choice | Strictly necessary |
| `cookieConsentId` (local storage) | Random id that links a browser's cookie decisions in the consent record | Strictly necessary |
| `cyberAssessmentPopupDismissed` (local storage) | Remembers the closed pop-up (30-day pause) or its used button | Preferences |
| Vercel Analytics | Aggregate page views, cookieless | Not required |

Providers named in the policies: Google (Analytics, Tag Manager, Ads, Workspace/Sheets), Vercel, Brevo, Lemlist.

## Checklist when adding something new

- [ ] Does it set a cookie, use local storage for tracking, or send visitor data to a third party? If yes, it must load only after consent (extend `consentScript.js`, or a consent-aware tag in GTM).
- [ ] Add it to the cookie table in **both** `content/legal/privacy-policy.en.md` and `privacy-policy.es.md` (name, provider, purpose, duration, type) and to the provider lists in the policies (privacy EN/ES and the data-processing policy).
- [ ] If it is advertising, the banner may need to separate Analytics from Advertising (the lawyer recommended this once Google Ads goes live).
- [ ] If it collects personal data, follow rule 7 and update the "data we collect" and "purposes" sections of both policies.
- [ ] Update the "Last updated" date of the policy that changed, and `POLICY_VERSION` in `utils/cookies/constants.js` (and `BANNER_VERSION` when the banner text changes): they are stored with every consent decision.
- [ ] Re-run the verification below.

## Verification (private window, DevTools open **before** loading the site)

1. Before choosing: no `_ga*` cookies and no requests to `googletagmanager.com`, `google-analytics.com` or `collect`; the banner is visible.
2. Click Agree: cookies and requests appear. Reload: the banner does not come back and Google keeps loading.
3. Footer → Cookie settings → Decline: the page reloads and `_ga*` cookies are gone.
4. New private window → Decline from the start: nothing ever loads.
5. With Global Privacy Control enabled (for example Firefox with `privacy.globalprivacycontrol.enabled` = true): no banner and nothing from Google. (Brave's Shields block Google scripts by themselves, so it is not a valid test of our logic.)
6. Check the Spanish version (`/es`) and a phone-sized window.

## Known follow-ups

- Once a year, delete the rows of the consent record (`GoCo_Consent_Log`) older than 3 years, as the policies promise.
- Separate Analytics and Advertising choices in "Cookie settings" when Google Ads goes live.
- **Every legal text exists in two languages** (privacy policy and terms; the data-processing policy is Spanish-only). When one changes, change the other and the "Last updated" date, and bump `POLICY_VERSION`.
- **Lead magnets (the quiz and any new one)** must ask for acceptance of the Terms with an unticked checkbox (or a clearly visible statement next to the button, with links), separate from the newsletter opt-in, link to the Spanish versions when the visitor is in the Spanish experience, and store the time, the Terms version and the language of the acceptance.
- **Retention promised in the policies:** contacts up to 24 months after the last interaction; minimal authorization records up to 5 years (solely to demonstrate compliance, never for marketing); analytics 2 months (events) / 14 months (users); cookie-consent record 3 years. The process to delete contacts at 24 months must be built before the first contacts reach that age (2028), and the separate store with the minimal authorization evidence must exist before any contact is deleted.