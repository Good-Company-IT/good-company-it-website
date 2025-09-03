'use client';

import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen " />;

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

const HeroCTA = dynamic(() => import("./HeroCtaSection/HeroCtaSection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const TechBento = dynamic(() => import("./Bento/TechSolutionsBento"), {
  loading: () => <MinimalLoader />,
  ssr: true
});


const WeBuild = dynamic(() => import("./WeBuild/QuotesSection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const OurServices = dynamic(() => import("./OurServices/OurServices"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

export default function Container({ locale, translations, mainLang }) {

  return (
    <>
      <LandingSection locale={locale} translations={translations.homeTranslations} />
      {/* <ValuesSelector/> */}
      <TechBento />
      <WhyGoCompany title="Why businesses choose" titleHightlight="Good Company" subtitle="A partnership built on Excellence, Transparency, and Diligence."/>
      <WhatWeDoBest />
      <OurServices />
      <WeBuild />
      <HeroCTA
        headings={[
          { text: "We deliver", style: "normal" },
          { text: "security and efficiency,", style: "gradient-orange" },
          { text: "so you can focus on", style: "normal" },
          { text: "growth and innovation", style: "gradient-blue" }
        ]}
        cta={{ text: "Secure Your Business", href: "/contact" }}
        backgroundType="video"
        videoSrc={"/imgs/backgroundCTA.mp4"}
      />
    </>
  );
}
