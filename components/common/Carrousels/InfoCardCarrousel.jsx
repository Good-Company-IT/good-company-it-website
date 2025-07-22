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

  // Mobile Card Component
  const MobileCard = ({ info, index }) => (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mx-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">{index + 1}</span>
        </div>
        <div className="text-xs text-gray-400 font-medium">
          {index + 1} of {infoData.length}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
        {info.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {info.text}
      </p>

      {/* Navigation arrows for mobile */}
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevious}
          disabled={index === 0}
          className={`p-2 rounded-full transition-all duration-300 ${
            index === 0 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
          }`}
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-xs text-gray-500 font-medium">
          Swipe or tap arrows
        </div>

        <button
          onClick={goToNext}
          disabled={index === infoData.length - 1}
          className={`p-2 rounded-full transition-all duration-300 ${
            index === infoData.length - 1 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
          }`}
        >
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

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
        /* MOBILE VERSION - Card Stack with Swipe Animation */
        <div className="w-full">
          {/* Mobile Title */}
          <div className="mb-4 sm:mb-6 text-center px-2 sm:px-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
              Why Choose Good Company
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="hidden xs:inline">Tap arrows or swipe to explore</span>
              <span className="xs:hidden">Tap arrows to explore</span>
            </p>
          </div>

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
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Dot Indicators - Bigger and more interactive */}
          <div className="flex justify-center items-center gap-3 mt-6 px-4">
            {infoData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`transition-all duration-300 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  index === currentIndex 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="text-sm font-bold">{index + 1}</span>
              </button>
            ))}
          </div>

{/*           <div className="flex justify-center gap-4 mt-4 px-4">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`flex-1 max-w-[140px] py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-lg'
              }`}
            >
              ← Previous
            </button>
            
            <button
              onClick={goToNext}
              disabled={currentIndex === infoData.length - 1}
              className={`flex-1 max-w-[140px] py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                currentIndex === infoData.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-lg'
              }`}
            >
              Next →
            </button>
          </div> */}

          {/* Progress info */}
          <div className="text-center mt-4 px-4">
            <span className="text-xs text-gray-500">
              {currentIndex + 1} of {infoData.length} reasons to choose us
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCardCarousel;