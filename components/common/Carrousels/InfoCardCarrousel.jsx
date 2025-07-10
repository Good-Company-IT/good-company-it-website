"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import InfoCard from "../Cards/InfoCard";

function InfoCardCarousel({ infoData, variant = "primary" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ cardWidth: 280, visibleCount: 1 });
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoized responsive calculation
  const calculateDimensions = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      
      if (width >= 1280) { // xl
        return { cardWidth: 360, visibleCount: 2 };
      } else if (width >= 1024) { // lg
        return { cardWidth: 340, visibleCount: 2 };
      } else if (width >= 768) { // md
        return { cardWidth: 320, visibleCount: 1.5 };
      } else if (width >= 640) { // sm
        return { cardWidth: 300, visibleCount: 1 };
      } else { // mobile
        return { cardWidth: 280, visibleCount: 1 };
      }
    }
    return { cardWidth: 280, visibleCount: 1 };
  }, []);

  // Debounced resize handler
  const debouncedResize = React.useCallback(() => {
    const newDimensions = calculateDimensions();
    setDimensions(newDimensions);
  }, [calculateDimensions]);

  // Handle mounting and resize with debouncing
  useEffect(() => {
    setIsMounted(true);
    setDimensions(calculateDimensions());
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(debouncedResize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateDimensions, debouncedResize]);

  // Optimized auto-scroll with cleanup
  useEffect(() => {
    if (!isMounted) return;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === infoData.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [infoData.length, isMounted]);

  // Optimized navigation functions
  const goToPrevious = React.useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? infoData.length - 1 : prev - 1);
  }, [infoData.length]);

  const goToNext = React.useCallback(() => {
    setCurrentIndex(prev => prev === infoData.length - 1 ? 0 : prev + 1);
  }, [infoData.length]);

  // Loading state
  if (!isMounted) {
    return (
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
        <div className="text-gray-600 text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  const { cardWidth, visibleCount } = dimensions;
  const gap = window.innerWidth >= 640 ? 24 : 16; // Responsive gap
  const totalCardWidth = cardWidth + gap;

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden mb-6 sm:mb-8">
        <motion.div
          className="flex p-0 sm:p-4 gap-4 sm:gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * totalCardWidth}px)`,
            willChange: 'transform',
          }}
        >
          {infoData.map((info, index) => (
            <InfoCard
              key={index}
              info={{ ...info, index }}
              isActive={
                index >= currentIndex && 
                index < currentIndex + Math.ceil(visibleCount)
              }
              variant={variant}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Responsive */}
      <div className="flex justify-start gap-3 sm:gap-4">
        <button
          onClick={goToPrevious}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange hover:bg-secondary-orange 
                     rounded-full flex items-center justify-center text-white 
                     shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous card"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={goToNext}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange hover:bg-secondary-orange 
                     rounded-full flex items-center justify-center text-white 
                     shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next card"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
export default InfoCardCarousel;