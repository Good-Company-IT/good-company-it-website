import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const QuoteCard = ({
  image,
  quote,
  author,
  company,
  size = 'normal' // 'normal' or 'large'
}) => {
  // Define image dimensions based on size prop
  const getImageHeight = () => {
    return size === 'large' ? 445 : 285;
  };

  const getCardHeight = () => {
    return size === 'large' ? 'h-[300px] sm:h-[350px] md:h-[400px] lg:h-[445px]' : 'h-[200px] sm:h-[220px] md:h-[250px] lg:h-[285px]';
  };

  const getContainerWidth = () => {
    return 'w-[280px] xs:w-[300px] sm:w-[320px] md:w-[350px] lg:w-[400px]';
  };

  const getLineHeight = () => {
    return 'h-8 xs:h-12 sm:h-16 md:h-20 lg:h-40';
  };

  return (
    <div className={`flex flex-col items-center ${getContainerWidth()}`}>
      {/* Top Vertical Line */}
      <div className={`w-0.5 ${getLineHeight()} bg-orange-500`} />

      {/* Quote Card */}
      <div className={`relative ${getContainerWidth()} ${getCardHeight()} rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt="Quote background"
            width={400}
            height={getImageHeight()}
            className="w-full h-full object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6">
          {/* Quote Icon */}
          <div className="flex justify-start mb-2 sm:mb-3 lg:mb-4">
            <div className="text-blue-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none">
              "
            </div>
          </div>

          {/* Quote Text */}
          <div className="flex-1 flex items-center">
            <blockquote className="text-white text-xs sm:text-sm md:text-base font-medium leading-relaxed">
              {quote}
            </blockquote>
          </div>

          {/* Author & Company */}
          <div className="mt-2 sm:mt-3 lg:mt-4">
            <div className="text-white text-xs sm:text-sm md:text-base font-semibold">
              {author}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Vertical Line */}
      <div className={`w-0.5 ${getLineHeight()} bg-orange-500`} />
    </div>
  );
};

export default QuoteCard;