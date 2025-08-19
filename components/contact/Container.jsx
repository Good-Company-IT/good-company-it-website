'use client';

import dynamic from 'next/dynamic';


// Minimal loading for dynamic imports
const MinimalLoader = () => <div className="min-h-screen " />;

// Regular Components (lazy loaded)

const ContactSection = dynamic(() => import("./ContactSection/ContactSecton"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const WorkingWithUs = dynamic(() => import("./WorkingWithUs/WorkingWithUs"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

const CTASection = dynamic(() => import("./CTASection/CTASection"), {
  loading: () => <MinimalLoader />,
  ssr: true
});

export default function Container({ locale, translations, mainLang }) {

  return (
    <>
      <ContactSection />
      <WorkingWithUs 
        title="What it's like" 
        titleHightlight="Working with us" 
        subtitle="Because you deserve more than a ticketing system. We become part of your team — your go-to people for all things tech, strategy, and security." />
       {/*  <CTASection /> */}
    </>
  );
}