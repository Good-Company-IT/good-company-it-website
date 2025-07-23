import React from 'react';
import CTASection from '../CTASection/CTASection';

const HeroSection = () => {
  return (
    <>

      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background SVG Container */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <img
              src="/imgs/services/heroBack.svg"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-12 mx-auto">
          <div className="flex flex-col justify-center min-h-screen sm:px-24 py-20">
            <div className="max-w-5xl">
              {/* Services Badge */}
              <div className="inline-block mb-8">
                <span
                  className="inline-flex items-center px-8 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity"
                  style={{
                    borderRadius: '200px',
                    border: '1px solid #DBDDFB',
                    background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)'
                  }}
                >
                  Services
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2 mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  <span className="text-white block">You Don't Have to</span>
                  <span
                    className="block text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400" >
                    Do IT Alone.
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-lg">
                <p className="text-base sm:text-lg text-white leading-relaxed">
                  From cybersecurity to day-to-day IT support, our services are built to protect your team, your data, and your business.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
{/*       <div className='absolute bottom-20 left-0 right-0 transform translate-y-1/2 z-20 px-4'>
        <CTASection />
      </div> */}
    </>
  );
};

export default HeroSection;