"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FiArrowRight, FiShield } from 'react-icons/fi';
import { quizUrl } from '@/utils/quiz/quizUrl';

// Browser storage (listed in the cookie table of the privacy policy):
//  - a timestamp  = closed or "Maybe later": do not show again for 30 days
//  - 'taken'      = clicked "Take the Free Assessment": never show again
//  - 'true'       = value left by the previous version of this pop-up: starts a 30-day pause
const STORAGE_KEY = 'cyberAssessmentPopupDismissed';
const TAKEN_VALUE = 'taken';
const PAUSE_MS = 30 * 24 * 60 * 60 * 1000;

// Computers: show when the cursor leaves through the top of the window (towards the tabs or the close button)
// or through the left edge (browsers such as Arc keep their tabs in a left sidebar), after the visitor has
// spent a little time on the page. The right and bottom edges are ignored: the scrollbar sits on the right.
const DESKTOP_MIN_TIME_MS = 10 * 1000;
// Phones and tablets have no cursor: show after a short while, once the visitor has scrolled a bit.
const TOUCH_DELAY_MS = 10 * 1000;
const TOUCH_MIN_SCROLL_PX = 200;
// Never interrupt someone reading the legal texts.
const LEGAL_PATH_PATTERN = /\/(privacy|politica-de-tratamiento-de-datos|terms|terminos)(\/|$)/;

const isSuppressed = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return false;
    if (value === TAKEN_VALUE) return true;
    if (value === 'true') {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      return true;
    }
    const dismissedAt = Number(value);
    return Number.isFinite(dismissedAt) && Date.now() - dismissedAt < PAUSE_MS;
  } catch (e) {
    return false; // storage blocked: still shown at most once per page view (see `shown` below)
  }
};

const CyberAssessmentPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (LEGAL_PATH_PATTERN.test(pathname || '')) return;
    if (isSuppressed()) return;

    let shown = false;
    const show = () => {
      if (shown || isSuppressed()) return;
      shown = true;
      setIsVisible(true);
    };
    const startedAt = Date.now();

    if (window.matchMedia('(hover: none)').matches) {
      // Touch device: wait for time AND some scrolling.
      let timeElapsed = false;
      let scrolled = false;
      const check = () => { if (timeElapsed && scrolled) show(); };
      const onScroll = () => {
        if (window.scrollY >= TOUCH_MIN_SCROLL_PX) {
          scrolled = true;
          check();
        }
      };
      const timer = setTimeout(() => { timeElapsed = true; check(); }, TOUCH_DELAY_MS);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
      };
    }

    const onMouseOut = (event) => {
      // relatedTarget is null when the cursor leaves the window; clientY <= 0 means it left through the top,
      // clientX <= 0 through the left edge.
      const leftThroughTopOrLeft = event.clientY <= 0 || event.clientX <= 0;
      if (event.relatedTarget === null && leftThroughTopOrLeft && Date.now() - startedAt >= DESKTOP_MIN_TIME_MS) {
        show();
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [pathname]);

  const remember = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // Storage blocked: nothing to remember.
    }
  };

  // Close, backdrop click or "Maybe later": pause for 30 days.
  const dismiss = () => {
    setIsVisible(false);
    remember(String(Date.now()));
  };

  // Clicked the button: the visitor has seen the offer, do not show it again.
  const takeAssessment = () => {
    setIsVisible(false);
    remember(TAKEN_VALUE);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Free Startup IT and Cybersecurity Readiness Assessment"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto overflow-hidden rounded-2xl shadow-2xl">

              {/* Background layers */}
              <div className="absolute inset-0 bg-[#07091A]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4E00]/15 via-transparent to-[#00B6F9]/8" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4E00]/50 to-transparent" />

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close popup"
                className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors duration-150"
              >
                <IoClose size={22} />
              </button>

              {/* Content */}
              <div className="relative z-10 p-8">

                {/* Icon + eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FF4E00]/15 border border-[#FF4E00]/25">
                    <FiShield className="w-5 h-5 text-[#FF4E00]" />
                  </div>
                  <span className="text-[#FF4E00] text-xs font-semibold uppercase tracking-[0.15em]">
                    Free for Startups
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-2xl font-bold text-white leading-snug mb-2">
                  Is Your Business<br />Cyber-Ready?
                </h2>

                {/* Subheadline */}
                <h3 className="text-sm font-medium text-gray-300 mb-4">
                  Free IT & Cybersecurity Readiness Assessment
                </h3>

                {/* Body */}
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Small businesses are a common target for ransomware and stolen credentials.
                  Take our free 10-minute assessment to uncover your biggest security gaps and get a
                  prioritized action plan before attackers do.
                </p>

                {/* Stats row */}
                <div className="flex gap-6 mb-7">
                  {[
                    { value: '10 min', label: 'to complete' },
                    { value: '100%', label: 'free' },
                    { value: 'Instant', label: 'results' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-xs text-gray-500">{label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href={quizUrl('exit_popup')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={takeAssessment}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#FF4E00] hover:bg-[#FF723F] text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-[#FF4E00]/20"
                >
                  Take the Free Assessment
                  <FiArrowRight className="w-4 h-4" />
                </motion.a>

                {/* Dismiss link */}
                <button
                  onClick={dismiss}
                  className="mt-4 w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors duration-150"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CyberAssessmentPopUp;
