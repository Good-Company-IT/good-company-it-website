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

const WhatMakesDiff = dynamic(() => import("./WhatMakesDiff/WhatMakesDiff"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const WeBuild = dynamic(() => import("../home/WeBuild/QuotesSection"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const OurProcess = dynamic(() => import("./OurProcess/OurProcess"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const HowWeDo = dynamic(() => import("./HowWeDo/HowWeDo"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const HeroCTA = dynamic(() => import("../home/HeroCtaSection/HeroCtaSection"), {
    loading: () => <MinimalLoader />,
    ssr: true
});

const TeamCTASection = dynamic(() => import("../common/TeamCTASection/TeamCTASection"), {
    loading: () => <MinimalLoader />,
    ssr: true
});


export default function Container({ locale, translations, mainLang }) {

    return (
        <>
            <div className='relative'>
                <HeroSection />
                <div className='absolute bottom-20 left-0 right-0 transform translate-y-1/2 z-20 px-4 hidden lg:block'>
                    <TeamCTASection
                        socialMedia={false}
                        imageSrc='/imgs/services/teamWork.png'
                        title="At Good Company,"
                        titleHighlight={true}
                        titleHighlightText="We Get It"
                        text="Growing businesses don’t just need someone to fix tech issues when things break. You need a real partner who helps you stay ahead of problems, optimize your processes, and keep your team running smoothly without breaking the bank." />
                </div>
            </div>
            <HowWeDo />
            <WhatMakesDiff />
            <OurProcess />
            <WeBuild
                centerTitle='Trusted by Founders'
                centerTitleHighlight='Founders'
                centerDescription='We could list all the ways we aim to support our clients, but we believe the most meaningful feedback comes from those who’ve experienced it firsthand.'
                centerDescriptionHighlight='experienced it firsthand'
                centerSecondParagraph='Here’s what some of our clients have shared about working with Good Company:' />
            <HeroCTA
                headings={[
                    { text: "You Have a Dream.", style: "mixed-gradient", highlight: "Dream" },
                    { text: "We'll Protect It.", style: "mixed-blue-gradient", highlight: "Protect" }
                ]}
                descriptions={[
                    "You're building something that matters, and you shouldn't have to worry about tech slowing you down.",
                    "We're here to make sure your infrastructure, data, and team are protected every step of the way."
                ]}
                cta={{ text: "Get in Touch", href: "/contact" }}
                backgroundType="video"
                videoSrc={"/imgs/backgroundCTA.mp4"}
            />
        </>
    );
}