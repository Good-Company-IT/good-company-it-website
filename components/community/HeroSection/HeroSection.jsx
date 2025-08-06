"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HeroSection = () => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-50px" });

  // Enhanced animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 1]
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1]
      }
    }
  };

  return (
    <>
      <section className="relative h-screen max-h-[950px] lg:h-[1000px] bg-black text-white overflow-hidden">
        {/* Background SVG Container */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <img
              src="/imgs/community/background.svg"
              alt="Background pattern"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          {/* Dark overlay for better text readability on mobile */}
          <div className="absolute inset-0 bg-black/20 lg:bg-black/10"></div>
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-[1440px] z-10 w-full h-full">
          <div className="min-h-screen lg:h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
            <motion.div 
              ref={contentRef}
              className="max-w-5xl mx-auto lg:mx-0 w-full"
              variants={fadeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Services Badge */}
              <motion.div 
                className="inline-block mb-8 sm:mb-10 lg:mb-8"
                variants={itemVariants}
              >
                <span
                  className="inline-flex items-center px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white hover:opacity-80 transition-all duration-300 hover:scale-105"
                  style={{
                    borderRadius: '200px',
                    border: '1px solid #DBDDFB',
                    background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Community Work
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div 
                className="space-y-3 sm:space-y-4 lg:space-y-2 mb-8 sm:mb-10 lg:mb-8"
                variants={headingVariants}
              >
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xl font-medium leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                    <motion.span 
                      className="text-white block sm:inline"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      We Partner. We Teach. We Built.{" "}
                    </motion.span>
                    <motion.span
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary-orange to-orange-400 block sm:inline"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      We Stay
                    </motion.span>
                  </h1>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="max-w-lg lg:max-w-2xl"
                variants={itemVariants}
              >
                <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed sm:leading-relaxed lg:leading-relaxed px-1 sm:px-0">
                  We believe good business isn&apos;t just about solving problems for our clients, it&apos;s also about showing up for the communities that need us most.
                </p>
              </motion.div>

              {/* Mobile spacing helper */}
              <div className="h-8 sm:h-12 lg:h-0"></div>

            </motion.div>
          </div>
        </div>

        {/* Bottom gradient for mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 lg:h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none lg:hidden"></div>
      </section>
    </>
  );
};

export default HeroSection;