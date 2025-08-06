"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// You can replace this with your actual logo import
import logoImage from "@/public/isotype.svg"; // Replace with your actual logo path
import { Button } from "@/components/common/Buttons/Button";
import TestimonialCarousel from "./TestimonialCarrousel";

function LandingSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Slightly longer delay for smoother initial load
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced easing curves for smoother animations
  const smoothEase = [0.25, 0.1, 0.25, 1.0]; // More natural easing
  const bounceEase = [0.68, -0.55, 0.265, 1.55]; // Subtle bounce
  const gentleEase = [0.4, 0.0, 0.2, 1]; // Very smooth

  // Refined container animation with better timing
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: gentleEase,
        staggerChildren: 0.15, // Reduced stagger for smoother sequence
        delayChildren: 0.1
      }
    }
  };

  // Smoother text animations with reduced motion
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30, // Reduced movement for subtlety
      scale: 0.95 // Less dramatic scale
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: smoothEase,
        type: "tween" // Smoother than spring
      }
    }
  };

  // More refined heading animation
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.92
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: smoothEase,
        type: "tween"
      }
    }
  };

  // Gradient text animation with smooth color transition
  const gradientTextVariants = {
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
        duration: 1.6,
        ease: smoothEase,
        delay: 0.2
      }
    }
  };

  // Enhanced button animation with hover-ready state
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: bounceEase,
        delay: 0.8 // Later entrance for better hierarchy
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: gentleEase
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Refined logo animation with elegant entry
  const logoVariants = {
    hidden: {
      opacity: 0,
      x: 60, // Reduced movement
      y: 20,
      scale: 0.85,
      rotate: 5 // Subtle rotation
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.8,
        ease: smoothEase,
        delay: 0.6
      }
    }
  };

  // More subtle floating stars
  const starVariants = {
    animate: {
      y: [0, -8, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [0.8, 1.1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Smooth overlay fade-in
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2.0,
        ease: gentleEase
      }
    }
  };

  return (
    <section className="relative h-[1300px] text-white overflow-hidden py-12">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: videoLoaded ? 1 : 1.1, 
            opacity: videoLoaded ? 1 : 0 
          }}
          transition={{ duration: 2.0, ease: gentleEase }}
        >
          <source 
            src="https://res.cloudinary.com/dvqmtc0yd/video/upload/v1752173938/Video_HERO_GOCO_fxhind.mp4" 
            type="video/mp4" 
          />
          <div className="absolute inset-0 bg-black"></div>
        </motion.video>
        
        {/* Fallback background while video loads */}
        {!videoLoaded && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          />
        )}
      </div>

      {/* Dark overlay with smooth fade */}
      <motion.div 
        className="absolute inset-0 bg-black/40 z-10"
        variants={overlayVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      />

      {/* Animated Stars Overlay (more subtle) */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => ( // Reduced number for cleaner look
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={starVariants}
            animate="animate"
            transition={{
              delay: Math.random() * 3 + 1, // Later start
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-30 h-full max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Hero Content - Takes most of the space */}
        <div className="flex-1 flex flex-col md:flex-row justify-evenly md:justify-around items-center py-6 sm:py-8 md:py-12 lg:py-16">

          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl">

            {/* Main Heading */}
            <motion.div variants={headingVariants} className="space-y-2 sm:space-y-3">
              <div className="overflow-hidden"> {/* Prevents text from jumping during animation */}
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
                  variants={textVariants}
                >
                  <span className="text-white drop-shadow-lg">You have a </span>
                  <motion.span
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400 font-bold drop-shadow-lg"
                    variants={gradientTextVariants}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: gentleEase }
                    }}
                  >
                    DREAM
                  </motion.span>
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
                  variants={textVariants}
                >
                  <span className="text-white drop-shadow-lg">We </span>
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-primary-blue font-bold inline-block drop-shadow-lg"
                    variants={gradientTextVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      transition: { duration: 0.3, ease: gentleEase } 
                    }}
                  >
                    PROTECT I.T.
                  </motion.span>
                </motion.h2>
              </div>
            </motion.div>

            {/* Description */}
            <div className="overflow-hidden">
              <motion.p
                variants={textVariants}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed drop-shadow-md"
              >
                We help you get the suite of tech your company needs to protect
                and propel your business into the future.
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/contact">
                <Button appearance="primary">
                  Get in Touch with Us
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Logo/Image */}
          <div className="flex justify-center lg:justify-end mt-8 md:mt-0">
            <motion.div
              variants={logoVariants}
              className="relative"
              whileHover={{ 
                scale: 1.02,
                rotate: 1,
                transition: { duration: 0.4, ease: gentleEase }
              }}
            >
              {/* Logo Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Logo/Image */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={logoImage}
                    alt="Good Company Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority // Ensures faster loading
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Testimonial Carousel - Fixed at bottom */}
        <motion.div
          className="pb-2 sm:pb-3 md:pb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: smoothEase, 
            delay: 1.5 // Appears after main content
          }}
        >
          <TestimonialCarousel/>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay at Bottom with smooth fade */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, ease: gentleEase, delay: 1.0 }}
      />
    </section>
  );
}

export default LandingSection;