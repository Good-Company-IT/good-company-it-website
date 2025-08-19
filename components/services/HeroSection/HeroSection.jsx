"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TeamCTASection from '@/components/common/TeamCTASection/TeamCTASection';

const HeroSection = () => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  // Simple fade animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section className="relative h-full max-h-[1150px] sm:max-h-[1150px] md:max-h-[1250px] lg:h-[750px] pt-16 bg-black text-white overflow-hidden">
        {/* Background SVG Container */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <img
              src="/imgs/services/heroBack.svg"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          
          {/* Additional focused overlay for text area */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-[1440px] z-10 w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-24 mx-auto">
          <div className="flex flex-col justify-start lg:justify-center">
            <motion.div
              ref={contentRef}
              className="max-w-5xl"
              variants={fadeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Services Badge */}
              <motion.div
                className="inline-block mb-8"
                variants={itemVariants}
              >
                <span
                  className="inline-flex items-center px-8 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity backdrop-blur-sm"
                  style={{
                    borderRadius: '200px',
                    border: '1px solid #DBDDFB',
                    background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.20) -9.79%, rgba(4, 11, 89, 0.20) 61.45%, rgba(1, 4, 37, 0.20) 130.31%)'
                  }}
                >
                  Services
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                className="space-y-2 mb-8"
                variants={itemVariants}
              >
                <h1 className="text-4xl sm:text-5xl font-medium leading-tight">
                  <span className="text-white block drop-shadow-lg">You Don't Have to</span>
                  <span
                    className="block font-bold text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-tr from-primary-orange to-orange-400 drop-shadow-lg"
                  >
                    Do IT Alone.
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                className="max-w-lg"
                variants={itemVariants}
              >
                <p className="text-base sm:text-lg text-white leading-relaxed drop-shadow-md">
                  From cybersecurity to day-to-day IT support, our services are built to protect your team, your data, and your business.
                </p>
              </motion.div>

            </motion.div>
            <div className='lg:hidden'>
              <TeamCTASection
                socialMedia={false}
                imageSrc='/imgs/services/teamWork.png'
                title="At Good Company,"
                titleHighlight={true}
                titleHighlightText="We Get It"
                text="Growing businesses don't just need someone to fix tech issues when things break. You need a real partner who helps you stay ahead of problems, optimize your processes, and keep your team running smoothly without breaking the bank." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;