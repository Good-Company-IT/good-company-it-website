import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Buttons/Button';
import ServiceCard from '@/components/common/Cards/ServiceCard';

const OurServices = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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

  // Services data
  const services = [
    {
      id: 1,
      imageSrc: "/imgs/services/cybersecurity.png",
      title: "Cybersecurity & Threat Defense",
      text: "From incident detection and response to endpoint protection, our job is to make sure cyber threats never interrupt your momentum."
    },
    {
      id: 2,
      imageSrc: "/imgs/services/compliance.png", 
      title: "Compliance & Risk Assurance",
      text: "We help align your systems with regulatory standards like HIPAA, SOC 2, ISO 27001, and GDPR, turning complex frameworks into clear, actionable processes that protect your business."
    },
    {
      id: 3,
      imageSrc: "/imgs/services/cloud.png",
      title: "Cloud Security & Data Resilience", 
      text: "Your data is your business and we treat it that way. From encryption to access control, we make sure every byte is protected and every data transfer is protected."
    }
  ];

  // Handle service card click
  const handleServiceClick = (serviceId) => {
    console.log(`Service ${serviceId} clicked`);
    // Add navigation logic here
  };

  // Handle view all services click
  const handleViewAllServices = () => {
    console.log('View all services clicked');
    // Add navigation logic here
  };

  const getContainerClasses = () => {
    const baseClasses = "relative z-10 mx-auto px-4 sm:px-6";
    
    if (isLargeScreen) {
      return `${baseClasses} max-w-[1800px] lg:px-16`;
    }
    return `${baseClasses} max-w-[1440px] lg:px-8`;
  };

  const getGridClasses = () => {
    if (isLargeScreen) {
      return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12";
    }
    return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8";
  };

  const getTitleClasses = () => {
    if (isLargeScreen) {
      return "text-4xl sm:text-5xl font-bold text-center mb-6";
    }
    return "text-3xl sm:text-4xl font-bold text-center mb-6";
  };

  const getSubtitleClasses = () => {
    if (isLargeScreen) {
      return "text-base sm:text-lg text-center mb-16 max-w-4xl mx-auto leading-relaxed";
    }
    return "text-sm sm:text-base text-center mb-12 max-w-3xl mx-auto leading-relaxed";
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background SVG Container - Ready for your SVG */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
          `
        }}
      >
          
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/imgs/services/background.png')"
            }}
          />

      </div>

      {/* Content Container */}
      <div className={getContainerClasses()}>
        {/* Header Section */}
        <div className="text-white mb-12 lg:mb-16">
          <h2 className={getTitleClasses()}>
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Services
            </span>
          </h2>

        {/* View All Services Button */}
        <div className="flex justify-end mt-12 lg:mt-16">
          <Button
            onClick={handleViewAllServices}
            appearance="primary"
            className='w-full sm:w-auto text-center px-auto'
          >
            View all Services
          </Button>
        </div>
        </div>

        {/* Services Grid */}
        <div className={getGridClasses()}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              imageSrc={service.imageSrc}
              title={service.title}
              text={service.text}
              onButtonClick={() => handleServiceClick(service.id)}
              className="h-full" // Ensure equal height cards
            />
          ))}
        </div>


        {/* Optional decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
      </div>
    </section>
  );
};

export default OurServices;