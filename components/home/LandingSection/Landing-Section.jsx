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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for the container
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

  // Animation variants for text elements
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Animation variants for the main heading
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  // Animation variants for the button
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: 0.5
      }
    }
  };

  // Animation variants for the logo/image
  const logoVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      rotate: 10
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.8
      }
    }
  };

  // Floating animation for stars
  const starVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={starVariants}
            animate="animate"
            transition={{
              delay: Math.random() * 2,
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-[1440px] mx-auto px-6 py-20 md:py-32 lg:py-40"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="grid lg:grid-cols-2 items-center min-h-[calc(100vh-10rem)]">

          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">

            {/* Main Heading */}
            <motion.div variants={headingVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">You have a </span>
                <motion.span
                  className="inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'var(--Light-Orange-gradient)',
                    backgroundSize: '300%', // Make it much wider than the text
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  DREAM
                </motion.span>

              </h1>

              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">We </span>
                <motion.span
                  className="bg-gradient-blue-1 bg-clip-text text-transparent inline-block"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  PROTECT I.T
                </motion.span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              We help you get the suite of tech your company needs to protect
              and propel your business into the future.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={buttonVariants}>
              <Link href="/contact">
                <Button appearance="primary">
                  Get in Touch with Us
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Logo/Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              variants={logoVariants}
              className="relative"
            >

              {/* Logo Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[37rem] xl:h-[28rem] transform transition-transform duration-300">

                {/* Logo/Image Placeholder */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={logoImage}
                    alt="Good Company Logo"
                    width={590}
                    height={450}
                    className=" object-contain drop-shadow-2xl"
                  />

                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <TestimonialCarousel/>
      </motion.div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}

export default LandingSection;