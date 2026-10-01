'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TbCookie } from "react-icons/tb";
import { CONSENT_STORAGE_KEY, OPEN_SETTINGS_EVENT } from './constants';

const styles = {
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

// Consent defaults (all "denied"), applying a saved "accepted" choice and loading
// Google tags all happen in utils/cookies/consentScript.js, injected in layout.js.
// This component only asks the question and reports the answer to that script.

const CookieBanner = ({ onAccept, onDecline, translations }) => {
  return (
    <div
      role="dialog"
      aria-label={translations.title}
      className="fixed mb:max-w-[300px] bottom-0 border-t mb:border-r border-orange-400 rounded-t-xl rounded-r-xl p-6 backdrop-filter backdrop-blur z-50"
      style={styles}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start justify-between gap-4">
        <div className='flex flex-row items-start'>
          <TbCookie className='text-white w-5 h-5 mt-1 mr-2' />
          <p className='text-white text-lg mb:text-xl max-w-[170px] '>{translations.title}</p>
        </div>
        <div className="text-xs text-white mb-2 pr-2">
          {translations.description}{' '}
          {/* New tab: the visitor can read the policy and still come back to answer the banner. */}
          <a
            href={translations.privacyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-300"
          >
            {translations.policyLink}
          </a>
        </div>
        <div className="flex flex-row gap-4">
          <button
            onClick={onDecline}
            className="px-6 py-2 bg-slate-700 border border-slate-400 text-center text-white rounded text-sm"
          >
            {translations.decline}
          </button>
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-ttorange border border-slate-400 text-center text-white rounded text-sm"
          >
            {translations.agree}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function CookieConsentHandler({ translations }) {
  const [showBanner, setShowBanner] = useState(false);
  const [openedFromSettings, setOpenedFromSettings] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (e) {
      // Storage blocked: behave as if no choice was saved (nothing loads, banner shows).
    }
    // Global Privacy Control counts as a refusal, so no question is needed.
    const gpcEnabled = navigator.globalPrivacyControl === true;
    if (saved === null && !gpcEnabled) {
      setShowBanner(true);
    }

    const openSettings = () => {
      setOpenedFromSettings(true);
      setShowBanner(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100;
      setIsTop(scrollTop <= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Opened from the footer link: show it wherever the visitor is on the page.
    if (showBanner && (isTop || openedFromSettings)) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showBanner, isTop, openedFromSettings]);

  const saveChoice = (accepted) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, accepted ? 'true' : 'false');
    } catch (e) {
      // Storage blocked: the choice still applies for this page view.
    }
    setShowBanner(false);
    setOpenedFromSettings(false);
    if (accepted) {
      window.gocoConsent?.grant();
      window.dataLayer?.push({
        event: 'cookie_consent_update',
        cookie_consent: 'accepted'
      });
    } else {
      // Clears Google cookies and reloads the page if tags were already loaded.
      window.gocoConsent?.revoke();
    }
  };

  return (
    <>
      <AnimatePresence>
        {shouldRender && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <CookieBanner
              onAccept={() => saveChoice(true)}
              onDecline={() => saveChoice(false)}
              translations={translations}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
