"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FiArrowRight, FiShield } from 'react-icons/fi';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc0Jz3hwoOhHXoOA8qa5ZDHviWXfth0cU4agYZzz4HwiwRsSg/viewform';
const STORAGE_KEY = 'cyberAssessmentPopupDismissed';
const SHOW_DELAY_MS = 4000;

const CyberAssessmentPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hasScheduled = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (hasScheduled.current) return;
    hasScheduled.current = true;

    const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
    return () => {
      clearTimeout(timer);
      hasScheduled.current = false;
    };
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
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
                  Most breaches target small businesses — and 60% shut down within 6 months of an attack.
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
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={dismiss}
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
