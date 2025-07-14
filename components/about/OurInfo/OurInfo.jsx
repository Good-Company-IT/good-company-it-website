"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import InfoCardCarousel from "@/components/common/Carrousels/InfoCardCarrousel";
import Image from "next/image";

const OurInfo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);

  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  const valuesData = [
    {
      title: "Thoroughness:",
      text: "We dig deep. We don't cut corners. Every solution we deliver is thought through with care and precision."
    },
    {
      title: "Transparency:",
      text: "At Good Company, transparency builds trust. We're open about how we protect what matters most."
    },
    {
      title: "Structure:",
      text: "We build structured processes that bring clarity and consistency to your I.T. operations."
    },
    {
      title: "Diligence:",
      text: "We take diligence seriously. Staying proactive, precise, and committed to securing every detail that matters."
    },
    {
      title: "Agility and Adaptability:",
      text: "Tech moves fast, so do we. We tailor solutions that meet your needs today and flex with you tomorrow."
    },
    {
      title: "Confidence:",
      text: "We bring the experience, tools, and calm you need to feel secure in your tech decisions."
    }
  ]

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLargeScreen(width >= 1920);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  };

  // Get responsive container classes
  const getContainerClasses = () => {
    if (isLargeScreen) {
      return "max-w-[1800px] mx-auto px-8 lg:px-16";
    }
    return "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8";
  };

  // Get responsive spacing
  const getSectionSpacing = () => {
    if (isLargeScreen) {
      return "py-24 lg:py-32";
    }
    return "py-12 sm:py-16 lg:py-24";
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-56 sm:py-60 lg:py-64 xl:py-72 overflow-hidden ${getSectionSpacing()}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/imgs/backgrounds/waves.png')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className={`${getContainerClasses()} relative z-10`}>
        {/* Main Content Container */}
        <div className="flex flex-col space-y-12 lg:space-y-16">

          {/* Our Mission Section */}
          <motion.div
            ref={missionRef}
            variants={containerVariants}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            className="flex flex-col lg:flex-row items-center justify-center lg:justify-around min-h-[250px] lg:h-80"
          >
            {/* Left Side - Diagonal Line (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex items-end w-1/2 h-full">
              <motion.div
                variants={lineVariants}
                className="w-full h-52"
              >
                <Image
                  src="/imgs/ornaments/diagonalLine.svg"
                  alt="Diagonal Line"
                  width={600}
                  height={192}
                  className="w-full h-full"
                />
              </motion.div>
            </div>

            {/* Right Side - Content Container */}
            <div className="flex flex-col flex-1 max-w-lg text-center lg:text-left">
              <motion.h2
                variants={textVariants}
                className={`font-bold text-white mb-4 sm:mb-6 ${
                  isLargeScreen 
                    ? 'text-5xl' 
                    : 'text-2xl sm:text-3xl md:text-4xl lg:text-4xl'
                }`}
              >
                OUR MISSION
              </motion.h2>

              <motion.p
                variants={textVariants}
                className={`text-gray-200 leading-relaxed ${
                  isLargeScreen 
                    ? 'text-lg' 
                    : 'text-sm sm:text-base md:text-base'
                }`}
              >
                To be an integral part of your team by offering top-tier I.T.
                consulting services that protect your company, keep you
                compliant, and power your growth. Our integrated solutions
                deliver seamless project development and proactive,
                scalable support.
              </motion.p>
            </div>
          </motion.div>

          {/* Our Vision Section */}
          <motion.div
            ref={visionRef}
            variants={containerVariants}
            initial="hidden"
            animate={isVisionInView ? "visible" : "hidden"}
            className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around min-h-[250px] lg:h-80"
          >
            {/* Left Side - Content Container */}
            <div className="flex flex-col flex-1 max-w-lg text-center lg:text-right">
              <motion.h2
                variants={textVariants}
                className={`font-bold text-white mb-4 sm:mb-6 ${
                  isLargeScreen 
                    ? 'text-5xl' 
                    : 'text-2xl sm:text-3xl md:text-4xl lg:text-4xl'
                }`}
              >
                OUR VISION
              </motion.h2>

              <motion.p
                variants={textVariants}
                className={`text-white leading-relaxed ${
                  isLargeScreen 
                    ? 'text-lg' 
                    : 'text-sm sm:text-base md:text-base'
                }`}
              >
                To become the go-to Managed Service Provider (MSP)
                in Florida's Tri-City region: Orlando, Miami, and Tampa,
                and across the U.S. by staying human-first, forward-
                thinking, and always dependable.
              </motion.p>
            </div>

            {/* Right Side - Straight Line (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex flex-row w-1/2 h-full items-end">
              <motion.div
                variants={lineVariants}
                className="flex flex-col w-full h-60"
              >
                <Image
                  src="/imgs/ornaments/line.svg"
                  alt="Straight Line"
                  width={600}
                  height={192}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Our Values Section */}
          <motion.div
            ref={valuesRef}
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            {/* Values Content */}
            <motion.div
              variants={textVariants}
              className="flex flex-col lg:flex-row relative"
            >
              {/* Bottom Diagonal Line (Hidden on mobile/tablet) */}
              <div className="hidden lg:flex w-1/2 items-center">
                <motion.div
                  variants={lineVariants}
                  className="w-full h-52"
                >
                  <Image
                    src="/imgs/ornaments/diagonalLine.svg"
                    alt="Diagonal Line"
                    width={192}
                    height={192}
                    className="w-full h-full"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col w-full lg:w-1/2">
                <div className="text-center lg:text-left mb-6 lg:mb-8">
                  <motion.h2
                    variants={textVariants}
                    className={`font-bold text-white ${
                      isLargeScreen 
                        ? 'text-5xl' 
                        : 'text-2xl sm:text-3xl md:text-4xl lg:text-4xl'
                    }`}
                  >
                    OUR VALUES
                  </motion.h2>
                </div>
                <InfoCardCarousel infoData={valuesData} variant="terciary" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-xl opacity-50" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl opacity-50" />
    </section>
  );
};

export default OurInfo;