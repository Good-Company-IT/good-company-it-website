'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen" />;

// Regular Components (lazy loaded)
const LandingSection = dynamic(() => import("./LandingSection/Landing-Section"), {
  loading: () => <MinimalLoader />,
  ssr: false
});

const WhyGoCompany = dynamic(() => import("./WhyGoco/WhyGoco"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

export default function Container({ locale, translations, mainLang }) {

  return (
    <>
          <LandingSection locale={locale} translations={translations.homeTranslations} />
          <WhyGoCompany />
    </>
  );
}