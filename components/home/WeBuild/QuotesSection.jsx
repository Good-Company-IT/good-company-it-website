import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Buttons/Button';

// QuoteCard Component
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
    return 'h-8 xs:h-12 sm:h-16 md:h-20 lg:h-60';
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

// Main QuotesSection Component
const QuotesSection = () => {
  // Mock data for quote cards
  const leftColumnQuotes = [
    {
      id: 1,
      image: "/imgs/weBuild/1.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      author: "Name, Company",
      size: "normal"
    },
    {
      id: 2,
      image: "/imgs/weBuild/2.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo.",
      author: "Name, Company",
      size: "large"
    },
    {
      id: 3,
      image: "/imgs/weBuild/3.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      author: "Name, Company",
      size: "normal"
    }
  ];

  const rightColumnQuotes = [
    {
      id: 4,
      image: "/imgs/weBuild/4.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      author: "Name, Company",
      size: "normal"
    },
    {
      id: 5,
      image: "/imgs/weBuild/5.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      author: "Name, Company",
      size: "normal"
    },
    {
      id: 6,
      image: "/imgs/weBuild/6.png",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo.",
      author: "Name, Company",
      size: "large"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 h-full">
        {/* Quote Cards Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch h-full relative">
          {/* Left Column */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-start">
              <QuoteCard {...leftColumnQuotes[0]} />
            </div>
            <div className="flex justify-center">
              <QuoteCard {...leftColumnQuotes[1]} />
            </div>
            <div className="flex justify-start">
              <QuoteCard {...leftColumnQuotes[2]} />
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center px-8 lg:px-16 my-12 lg:my-0 min-w-0">
            <div className="text-center max-w-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark mb-6 leading-tight">
                We don't just build IT systems,{' '}
                <span className="text-primary-orange">
                  we build relationships.
                </span>
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Our clients trust us because{' '}
                <span className="font-semibold text-gray-900">we show up, solve problems, and deliver results</span>{' '}
                that make their day-to-day easier and their growth more secure.
              </p>
              
              <Button className="mx-auto">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-end">
              <QuoteCard {...rightColumnQuotes[0]} />
            </div>
            <div className="flex justify-end lg:justify-end">
              <QuoteCard {...rightColumnQuotes[1]} />
            </div>
            <div className="flex justify-end">
              <QuoteCard {...rightColumnQuotes[2]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesSection;