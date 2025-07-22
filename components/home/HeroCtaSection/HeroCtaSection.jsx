"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/common/Buttons/Button";

function HeroCtaSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const gradientTextVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.6,
      },
    },
  };

  const decorativeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 1,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background Placeholder with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-black"
        style={{ y: backgroundY }}
      >
        {/* Future video element will go here */}
        {/* <video 
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
        </video> */}
      </motion.div>

      {/* Overlay with scroll-based opacity */}
      <motion.div 
        className="absolute inset-0 bg-black/30"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Main Heading */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <motion.h1 
            variants={headingVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
          >
            We deliver
          </motion.h1>
          
          <motion.h2 
            variants={gradientTextVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
              security and efficiency,
            </span>
          </motion.h2>
          
          <motion.h3 
            variants={headingVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
          >
            so you can focus on
          </motion.h3>
          
          <motion.h4 
            variants={gradientTextVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-primary-blue">
              growth and innovation
            </span>
          </motion.h4>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center" 
          variants={buttonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button appearance="primary">
            Secure Your Business
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements with entrance animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Subtle gradient overlays for depth */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/20 to-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </motion.div>
    </section>
  );
}

export default HeroCtaSection;