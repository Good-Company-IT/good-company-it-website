"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";
import InfoCard from "../Cards/InfoCard";

function InfoCardCarousel({ infoData, variant = "primary", buttonsOnTop = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState(0);

  // Desktop detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Auto-scroll for desktop only
  useEffect(() => {
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % infoData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isDesktop, infoData.length]);

  // Navigation functions
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(prev => prev === 0 ? infoData.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % infoData.length);
  };

  const goToCard = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Desktop Navigation Buttons
  const NavigationButtons = () => (
    <div className="flex justify-start gap-4">
      <button
        onClick={goToPrevious}
        className="w-12 h-12 bg-primary-orange hover:bg-secondary-orange 
                   rounded-full flex items-center justify-center text-white 
                   shadow-lg transition-all duration-300"
        aria-label="Previous card"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="w-12 h-12 bg-primary-orange hover:bg-secondary-orange 
                   rounded-full flex items-center justify-center text-white 
                   shadow-lg transition-all duration-300"
        aria-label="Next card"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Mobile Card Component with Variant Support
  const MobileCard = ({ info, index, variant }) => {
    // Get variant styles for mobile card
    const getMobileVariantStyles = () => {
      if (variant === "terciary") {
        return {
          cardBg: "bg-gradient-to-br from-white/15 via-blue-900/15 to-slate-900/15 border border-[#DBDDFB]",
          titleColor: "text-white",
          textColor: "text-white",
          numberBg: "bg-gradient-to-r from-orange-400 to-orange-600",
          numberText: "text-white",
          counterText: "text-white/70",
          arrowActiveBg: "bg-orange-100/20",
          arrowActiveText: "text-orange-300",
          arrowInactiveBg: "bg-white/10",
          arrowInactiveText: "text-white/30",
          instructionText: "text-white/50"
        };
      }
      
      // Default (primary) variant
      return {
        cardBg: "bg-white border border-gray-100",
        titleColor: "text-gray-900",
        textColor: "text-gray-600",
        numberBg: "bg-gradient-to-r from-orange-400 to-orange-600",
        numberText: "text-white",
        counterText: "text-gray-400",
        arrowActiveBg: "bg-orange-100",
        arrowActiveText: "text-orange-600",
        arrowInactiveBg: "bg-gray-100",
        arrowInactiveText: "text-gray-300",
        instructionText: "text-gray-500"
      };
    };

    const styles = getMobileVariantStyles();

    return (
      <motion.div 
        className={`${styles.cardBg} rounded-2xl p-6 shadow-xl mx-4`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 ${styles.numberBg} rounded-full flex items-center justify-center`}>
            <span className={`${styles.numberText} text-sm font-bold`}>{index + 1}</span>
          </div>
          <div className={`text-xs ${styles.counterText} font-medium`}>
            {index + 1} of {infoData.length}
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-bold ${styles.titleColor} mb-4 leading-tight`}>
          {info.title}
        </h3>

        {/* Description */}
        <p className={`text-sm ${styles.textColor} leading-relaxed mb-6`}>
          {info.text}
        </p>

        {/* Navigation arrows for mobile */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrevious}
            disabled={index === 0}
            className={`p-2 rounded-full transition-all duration-300 ${
              index === 0 
                ? `${styles.arrowInactiveBg} ${styles.arrowInactiveText} cursor-not-allowed` 
                : `${styles.arrowActiveBg} ${styles.arrowActiveText} hover:opacity-80`
            }`}
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>

          <div className={`text-xs ${styles.instructionText} font-medium`}>
            Swipe or tap arrows
          </div>

          <button
            onClick={goToNext}
            disabled={index === infoData.length - 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              index === infoData.length - 1 
                ? `${styles.arrowInactiveBg} ${styles.arrowInactiveText} cursor-not-allowed` 
                : `${styles.arrowActiveBg} ${styles.arrowActiveText} hover:opacity-80`
            }`}
          >
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  // Mobile swipe variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  // Get dot indicator styles based on variant
  const getDotStyles = () => {
    if (variant === "terciary") {
      return {
        active: "bg-orange-500 text-white shadow-lg",
        inactive: "bg-white/20 text-white/70 hover:bg-white/30 active:bg-white/40 border border-white/20"
      };
    }
    return {
      active: "bg-orange-500 text-white shadow-lg",
      inactive: "bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400"
    };
  };

  const dotStyles = getDotStyles();

  return (
    <div className="w-full">
      {/* DESKTOP VERSION */}
      {isDesktop ? (
        <div>
          {/* Navigation Arrows - Top */}
          {buttonsOnTop && (
            <div className="mb-8">
              <NavigationButtons />
            </div>
          )}

          {/* Desktop Carousel */}
          <div className="mb-8 overflow-hidden">
            <motion.div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 384}px)`,
              }}
            >
              {infoData.map((info, index) => (
                <div key={index} className="flex-shrink-0 w-[360px]">
                  <InfoCard
                    info={{ ...info, index }}
                    isActive={index === currentIndex || index === currentIndex + 1}
                    variant={variant}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows - Bottom */}
          {!buttonsOnTop && (
            <div className="mt-4">
              <NavigationButtons />
            </div>
          )}
        </div>
      ) : (
        /* MOBILE VERSION - Custom Card with Variant Support */
        <div className="w-full">
          {/* Single Card with Swipe Animation */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="absolute inset-0"
              >
                <MobileCard 
                  info={infoData[currentIndex]} 
                  index={currentIndex}
                  variant={variant}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Dot Indicators with Variant Support */}
          <div className="flex justify-center items-center gap-3 mt-6 px-4">
            {infoData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`transition-all duration-300 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  index === currentIndex 
                    ? dotStyles.active
                    : dotStyles.inactive
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="text-sm font-bold">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCardCarousel;