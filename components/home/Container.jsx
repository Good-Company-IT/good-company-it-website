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

const WhatWeDoBest = dynamic(() => import("./WhatWeDoBest/WhatWeDoBest"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const HeroCtaSection = dynamic(() => import("./HeroCtaSection/HeroCtaSection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

/* const ValuesSelector = dynamic(() => import("./Bento/ValuesSelector"), {
  loading: () => <MinimalLoader />,
  ssr: true
}); */

const TechBento = dynamic(() => import("./Bento/TechSolutionsBento"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

export default function Container({ locale, translations, mainLang }) {

  return (
    <>
          <LandingSection locale={locale} translations={translations.homeTranslations} />
          {/* <ValuesSelector/> */}
          <TechBento/>
          <WhyGoCompany />
          <WhatWeDoBest />
          <HeroCtaSection/>
    </>
  );
}