import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for 8 images with alternating sizes
  const images = [
    {
      id: 1,
      src: "/imgs/about/1.png",
      alt: "Team meeting",
      size: "tall" // 460x490
    },
    {
      id: 2,
      src: "/imgs/about/2.png",
      alt: "Professional woman",
      size: "wide" // 460x400
    },
    {
      id: 3,
      src: "/imgs/about/3.png",
      alt: "Business presentation",
      size: "tall"
    },
    {
      id: 4,
      src: "/imgs/about/4.png",
      alt: "Team collaboration",
      size: "wide"
    },
    {
      id: 5,
      src: "/imgs/about/5.png",
      alt: "Office environment",
      size: "tall"
    },
    {
      id: 6,
      src: "/imgs/about/6.png",
      alt: "Professional man",
      size: "wide"
    },
    {
      id: 7,
      src: "/imgs/about/7.png",
      alt: "Creative workspace",
      size: "tall"
    },
    {
      id: 8,
      src: "/imgs/about/8.png",
      alt: "Team discussion",
      size: "wide"
    }
  ];

  // Auto-play functionality - infinite and automatic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Main carousel container */}
        <div className="relative overflow-hidden">
          {/* Images container */}
          <div className="flex items-end justify-center gap-2 md:gap-4 lg:gap-8 min-h-[400px] md:min-h-[450px] lg:min-h-[490px]">
            {/* Previous image (hidden on mobile) */}
            <div className="hidden md:block relative transition-all duration-700 ease-in-out transform scale-90 z-10">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={images[(currentIndex - 1 + images.length) % images.length].src}
                  alt={images[(currentIndex - 1 + images.length) % images.length].alt}
                  className={`
                    object-cover transition-all duration-700 ease-in-out filter grayscale
                    ${images[(currentIndex - 1 + images.length) % images.length].size === 'tall' 
                      ? 'w-[320px] h-[350px] lg:w-[460px] lg:h-[490px]' 
                      : 'w-[320px] h-[280px] lg:w-[460px] lg:h-[400px]'
                    }
                  `}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-700" />
              </div>
            </div>

            {/* Current/Center image */}
            <div className="relative transition-all duration-700 ease-in-out transform scale-100 z-20">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className={`
                    object-cover transition-all duration-700 ease-in-out filter-none
                    ${images[currentIndex].size === 'tall' 
                      ? 'w-[280px] h-[300px] md:w-[360px] md:h-[390px] lg:w-[460px] lg:h-[490px]' 
                      : 'w-[280px] h-[240px] md:w-[360px] md:h-[320px] lg:w-[460px] lg:h-[400px]'
                    }
                  `}
                />
              </div>
            </div>

            {/* Next image (hidden on mobile) */}
            <div className="hidden md:block relative transition-all duration-700 ease-in-out transform scale-90 z-10">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={images[(currentIndex + 1) % images.length].src}
                  alt={images[(currentIndex + 1) % images.length].alt}
                  className={`
                    object-cover transition-all duration-700 ease-in-out filter grayscale
                    ${images[(currentIndex + 1) % images.length].size === 'tall' 
                      ? 'w-[320px] h-[350px] lg:w-[460px] lg:h-[490px]' 
                      : 'w-[320px] h-[280px] lg:w-[460px] lg:h-[400px]'
                    }
                  `}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;