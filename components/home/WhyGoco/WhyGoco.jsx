"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/common/Buttons/Button"
import InfoCardCarousel from "@/components/common/Carrousels/InfoCardCarrousel";

// Main Section Component
function WhyGoco({ title, titleHightlight, subtitle }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Info data for carousel
  const infoData = [
    {
      title: "Flexible hourly plans that scale with your needs",
      text: "Forget rigid monthly retainers or boxed in service plans. Our flexible hourly packages give you exactly what you need. As your business grows, we grow with you"
    },
    {
      title: "Proactive consultants, not reactive fixers",
      text: "Our consultants work side by side with your team to audit, plan, and improve your infrastructure before issues arise. You'll get strategic guidance, ongoing optimization and real partnership"
    },
    {
      title: "Fast response times and clear communication",
      text: "We believe clear communication is just as important as good technology. We communicate before, during and after to ensure you're getting where you need to go."
    },
    {
      title: "Bilingual support (English, Spanish, French)",
      text: "We've got you covered. We provide full bilingual support across all services, so your entire organization feels heard and included."
    },
    {
      title: "Secure solutions for hybrid and remote teams",
      text: "Our infrastructure is built for the way today's businesses work. From endpoint protection to employee onboarding, we design security and support systems optimized for hybrid and remote teams."
    },
    {
      title: "We give 10% of our profits to causes we believe in",
      text: "We believe tech should do good. That's why we donate 10% of our profits to nonprofit organizations and shelters that support vulnerable communities and animals."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const carouselVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.4
      }
    }
  };

  return (
    <section className="relative max-h-[800px] h-[800px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imgs/team/teamComplete.png')", 
        }}
      />
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-0 md:px-14 py-12 md:py-16 flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="w-full h-full grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="flex flex-col justify-center px-4 sm:px-5 space-y-4 sm:space-y-6 lg:pr-8"
            variants={itemVariants}
          >
            {/* Heading */}
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-4xl font-regular text-gray-900 leading-[1.1] sm:leading-tight">
                {title}
                <br/>
              <span className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary-orange font-bold leading-[1.1] sm:leading-tight">
                  {" "}{titleHightlight}
              </span>
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-dark leading-relaxed max-w-none sm:max-w-lg">
              {subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-1 sm:pt-2">
              <Link href="/contact">
                <Button appearance="primary">
                    Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - InfoCard Carousel */}
          <motion.div
            variants={carouselVariants}
            className="flex flex-col justify-center h-full lg:pl-8"
          >
            {/* Carousel - Optimized for 800px height */}
            <div className="w-full h-full flex items-center">
              {/* Mobile: Full viewport width carousel */}
              <div className="lg:hidden w-full">
                <InfoCardCarousel infoData={infoData} />
              </div>
              
              {/* Desktop: Normal container */}
              <div className="hidden lg:block w-full">
                <InfoCardCarousel infoData={infoData} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default WhyGoco;