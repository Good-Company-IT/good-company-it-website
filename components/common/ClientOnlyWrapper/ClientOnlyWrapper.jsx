// components/ClientOnlyWrapper.js
'use client';

import dynamic from 'next/dynamic';

const CookieConsentHandler = dynamic(
  () => import('@/utils/cookies/CookieConsentHandler'),
  { ssr: false }
);

const CyberAssessmentPopUp = dynamic(
  () => import('@/components/common/PopUp/CyberAssessmentPopUp'),
  { ssr: false }
);

export default function ClientOnlyWrapper({ cookieTranslations }) {
  return (
    <>
      {/* Cyber Assessment Lead Magnet Pop-up */}
      <CyberAssessmentPopUp />

      {/* Cookie Consent Handler */}
      <CookieConsentHandler translations={cookieTranslations} />
    </>
  );
}
