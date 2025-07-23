"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background SVG Container */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <img
              src="/imgs/community/background.svg"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full pb-64 sm:pb-60 md:pb-52 lg:pb-36 xl:pb-24 px-12 mx-auto">
          <div className="flex flex-col justify-center min-h-screen sm:px-24 py-20">
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
                  className="inline-flex items-center px-8 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity"
                  style={{
                    borderRadius: '200px',
                    border: '1px solid #DBDDFB',
                    background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)'
                  }}
                >
                  Community Work
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div 
                className="space-y-2 mb-8"
                variants={itemVariants}
              >
                <h1 className="text-4xl sm:text-5xl max-w-xl font-medium leading-tight">
                  <span className="text-white">We Partner. We Teach. We Built. </span>
                  <span
                    className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary-orange to-orange-400"
                  >
                    We Stay
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="max-w-lg"
                variants={itemVariants}
              >
                <p className="text-base sm:text-lg text-white leading-relaxed">
                  We believe good business isn&apos;t just about solving problems for our clients, it&apos;s also about showing up for the communities that need us most.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;