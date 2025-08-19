"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/common/Buttons/Button";
import InfoCard from "@/components/common/Cards/InfoCard";

// Main Section Component
function WorkingWithUs({ title, titleHightlight, subtitle }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Info data for cards
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
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative max-h-[800px] h-[800px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imgs/team/teamComplete.png')", 
        }}
      />
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded && isInView ? "visible" : "hidden"}
      >
        <div className="w-full h-full grid xl:grid-cols-12 gap-8 md:gap-12 px-0 lg:px-14 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="xl:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8"
            variants={textVariants}
          >
            {/* Heading */}
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <h2 className="text-2xl md:text-4xl font-regular text-gray-900 leading-[1.1] sm:leading-tight">
                {title}
                <br/>
                <span className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary-orange font-bold leading-[1.1] sm:leading-tight">
                  {" "}{titleHightlight}
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <motion.p 
              variants={textVariants}
              className="text-sm text-center md:text-left sm:text-base md:text-lg lg:text-xl text-text-dark leading-relaxed max-w-lg"
            >
              {subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={textVariants} className="pt-2">
              <Link href="/contact">
                <Button appearance="primary">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - InfoCards Grid */}
          <div className="xl:col-span-7">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto xl:mx-0"
              variants={containerVariants}
            >
              {infoData.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={cardVariants}
                  className="flex justify-center"
                >
                  <InfoCard
                    variant="fourth" 
                    info={{ ...info, index }} 
                    isActive={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default WorkingWithUs;