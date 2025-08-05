'use client';
import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen " />;

// Regular Components (lazy loaded)
const HeroSection = dynamic(() => import("./HeroSection/HeroSection"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const OurCommunity = dynamic(() => import("./OurCommunity/OurCommunity"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const OurProjects = dynamic(() => import("./OurProjects/OurProjects"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const Purpose = dynamic(() => import("./Purpose/Purpose"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

export default function Container({ locale, translations, mainLang }) {

  return (
    <>
      <HeroSection /> 
      <OurCommunity />
      <OurProjects />
      <Purpose/>
    </>
  );
}