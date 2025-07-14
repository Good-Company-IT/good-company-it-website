'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen" />;

// Regular Components (lazy loaded)

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
    <BornFromExp/>
    <div className='relative w-full'>
      <ImagesContainer />
    </div>
    <OurInfo/>
      <TeamSection /> {/* About page*/}
      <WhyItMatters />
    </>
  );
}