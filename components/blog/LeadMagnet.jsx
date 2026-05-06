"use client"

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc0Jz3hwoOhHXoOA8qa5ZDHviWXfth0cU4agYZzz4HwiwRsSg/viewform';

const LEAD_MAGNET = {
  eyebrow:     'Free Assessment',
  h1:          'Is Your Startup Cyber-Ready?',
  h2:          'Take Our Free IT & Cybersecurity Readiness Assessment',
  description: 'Most startups don\'t discover their security gaps until after a breach. In under 10 minutes, our free assessment pinpoints your biggest IT vulnerabilities across people, processes, and technology — and gives you a prioritized action plan before attackers do.',
  cta:         'Take the Free Assessment',
};

const LeadMagnetIllustration = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Outer ring */}
    <circle cx="60" cy="60" r="56" stroke="#FF4E00" strokeOpacity="0.25" strokeWidth="1.5" />
    {/* Middle ring */}
    <circle cx="60" cy="60" r="42" stroke="#FF4E00" strokeOpacity="0.4" strokeWidth="1.5" />
    {/* Shield body */}
    <path
      d="M60 24 L84 34 L84 58 C84 73 72 83 60 88 C48 83 36 73 36 58 L36 34 Z"
      fill="#FF4E00"
      fillOpacity="0.15"
      stroke="#FF4E00"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Checkmark */}
    <path
      d="M48 60 L56 68 L73 51"
      stroke="#FF4E00"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Decorative dots */}
    <circle cx="60" cy="16" r="3" fill="#FF4E00" fillOpacity="0.6" />
    <circle cx="96" cy="38" r="2" fill="#FF4E00" fillOpacity="0.4" />
    <circle cx="96" cy="82" r="2" fill="#FF4E00" fillOpacity="0.4" />
    <circle cx="60" cy="104" r="3" fill="#FF4E00" fillOpacity="0.6" />
    <circle cx="24" cy="82" r="2" fill="#FF4E00" fillOpacity="0.4" />
    <circle cx="24" cy="38" r="2" fill="#FF4E00" fillOpacity="0.4" />
  </svg>
);

const LeadMagnet = () => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
    className="relative overflow-hidden rounded-2xl mb-10"
    aria-label="Free Startup IT and Cybersecurity Readiness Assessment"
  >
    {/* Dark background + brand gradient accent */}
    <div className="absolute inset-0 bg-[#07091A]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4E00]/10 via-transparent to-[#00B6F9]/5" />

    {/* Noise texture overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">

      {/* Illustration */}
      <div className="flex-shrink-0 w-28 h-28 lg:w-36 lg:h-36">
        <LeadMagnetIllustration />
      </div>

      {/* Copy */}
      <div className="flex-1 text-center lg:text-left">
        <span className="inline-block text-[#FF4E00] text-xs font-semibold uppercase tracking-[0.15em] mb-3">
          {LEAD_MAGNET.eyebrow}
        </span>

        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-1">
          {LEAD_MAGNET.h1}
        </h2>

        <h3 className="text-base lg:text-lg font-medium text-gray-300 mb-3">
          {LEAD_MAGNET.h2}
        </h3>

        <p className="text-gray-400 text-sm lg:text-base max-w-xl leading-relaxed">
          {LEAD_MAGNET.description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0">
        <motion.a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF4E00] hover:bg-[#FF723F] text-white font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap shadow-lg shadow-[#FF4E00]/20"
        >
          {LEAD_MAGNET.cta}
          <FiArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </div>

    {/* Bottom border accent */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4E00]/40 to-transparent" />
  </motion.section>
);

export default LeadMagnet;
