'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen" />;

// Regular Components (lazy loaded)

const HeroSection = dynamic(() => import("./HeroSection/HeroSection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const TeamCTASection = dynamic(() => import("./TeamCTASection/TeamCTASection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const BornFromExp = dynamic(() => import("./BornFromExp/BornFromExp"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const OurInfo = dynamic(() => import("./OurInfo/OurInfo"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const TeamSection = dynamic(() => import("../about/TeamSection/TeamSection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const WhyItMatters = dynamic(() => import("../about/WhyItMatters/WhyItMatters"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const ImagesContainer = dynamic(() => import("../common/Carrousels/ImagesCarrousel"), {
  loading: () => <MinimalLoader />,
  ssr: false
});


export default function Container({ locale, translations, mainLang }) {

  return (
    <>
      <div className='relative'>
        <HeroSection/>
        {/* TeamCTASection positioned to overlap bottom of Hero and top of BornFromExp */}
        <div className='absolute bottom-20 left-0 right-0 transform translate-y-1/2 z-20 px-4'>
          <TeamCTASection/>
        </div>
      </div>
      {/* Add top padding to BornFromExp to account for overlapping content */}
      <div className='pt-36 sm:pt-24 md:pt-14 lg:pt-0'>
        <BornFromExp/>
      </div>
      <div className='relative w-full'>
        <ImagesContainer />
      </div>
      <OurInfo/>
      <TeamSection />
      <WhyItMatters />
    </>
  );
}