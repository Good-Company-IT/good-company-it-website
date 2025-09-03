import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BiCheckCircle } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  
  header: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  },

  slide: {
    enter: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  content: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  },

  image: {
    hidden: { opacity: 0, scale: 1.02 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },

  feature: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },

  navButton: {
    rest: { scale: 1, backgroundColor: "#f97316" },
    hover: { 
      scale: 1.05,
      backgroundColor: "#ea580c",
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" }
    }
  },

  dot: {
    inactive: { scale: 1, opacity: 0.5 },
    active: {
      scale: 1.25,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }
};

// Slide data
const slidesData = [
  {
    id: 1,
    title: "Smart Support & Strategic Advisory",
    description: "More than tech support — we're part of your team. We're responsive, reliable, and always thinking ahead. Our goal isn't just to solve problems, it's to prevent them, with people-first service and clear communication that builds trust.",
    image: "/imgs/services/howWeDo/smart.png",
    features: [
      "Remote Support & Help Desk",
      "Ticket-Based & Project-Based Requests",
      "Strategic Technology Planning",
      "Weekly/Biweekly Check-ins",
      "I.T. Roadmapping & Forecasting"
    ]
  },
  {
    id: 2,
    title: "Cybersecurity & Threat Defense",
    description: "We design layered security strategies that reduce risk and keep your business moving. From incident detection and response to endpoint protection, our job is to make sure cyber threats never interrupt your momentum.",
    image: "/imgs/services/howWeDo/cybersecurity.png",
    features: [
      "Threat Detection & Response (with AV)",
      "Endpoint Protection (EDR/XDR)",
      "MDR service (with our AV)",
      "Network Security Monitoring & Incident Response Planning",
      "Firewall & Perimeter Security",
      "Email filtering & HTTPS scanning"
    ]
  },
  {
    id: 3,
    title: "Compliance & Risk Assurance",
    description: "We help align your systems with regulatory standards like HIPAA, SOC 2, ISO 27001, and GDPR — turning complex frameworks into clear, actionable processes that protect your business.",
    image: "/imgs/services/howWeDo/compliance.png",
    features: [
      "I.T. Security & Compliance Consulting",
      "Policy Mapping",
      "Log Documentation",
      "Risk & Gap Assessments",
      "Compliance Implementation Support",
      "Vendor Management & System Audits"
    ]
  },
  {
    id: 4,
    title: "Cloud Security & Data Resilience",
    description: "Your data is your business — and we treat it that way. From encryption to access control, we make sure every byte is protected and every data transfer is protected.",
    image: "/imgs/services/howWeDo/cloud.png",
    features: [
      "Cloud Security Best Practices (IAM, MFA)",
      "Secure Data Migration & Backups",
      "Disaster Recovery Planning",
      "Data Retention Policy Support",
      "Encryption & Storage Management"
    ]
  },
  {
    id: 5,
    title: "Identity Lifecycle & Access Management",
    description: "People come and go, your systems stay protected. We implement structured onboarding and offboarding workflows that ensure employees have the access they need — and nothing they shouldn't.",
    image: "/imgs/services/howWeDo/identify.png",
    features: [
      "Employee Onboarding/Offboarding",
      "Role-Based Access Controls (RBAC)",
      "SaaS & Tool Access Provisioning",
      "Password & Credential Management",
      "User Lifecycle Visibility"
    ]
  },
  {
    id: 6,
    title: "Device Lifecycle & Support Management",
    description: "Your team's devices are the front lines of your business. We handle full lifecycle management, keeping your hardware secure, efficient, and ready to scale.",
    image: "/imgs/services/howWeDo/device.png",
    features: [
      "Device Deployment & Maintenance",
      "Mobile Device Management (MDM)",
      "Inventory Management",
      "Remote Configuration & Monitoring",
      "Endpoint Compliance Enforcement"
    ]
  },
  {
    id: 7,
    title: "Vendor Management & Technology Procurement",
    description: "We help you take control of your vendor ecosystem, making sure contracts are smart, costs are optimized, and platforms are fully implemented.",
    image: "/imgs/services/howWeDo/vendor.png",
    features: [
      "Vendor Evaluation for best fit for your needs",
      "Tech Stack Audit & Consolidation",
      "Subscription & Billing Management",
      "Implementation Oversight",
      "Vendor-Side Support Coordination"
    ]
  }
];

const HowWeDo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1);
  
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const goToSlide = (index) => {
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  };

  // Mobile scroll handler
  const handleScroll = (e) => {
    if (!isMobile) return;
    
    const container = e.target;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < slidesData.length) {
      setActiveSlide(newIndex);
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 h-full lg:h-[1050px] overflow-hidden"
      variants={animations.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <BackgroundElements />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full lg:h-full flex flex-col">
        <Header />
        
        <div className="flex-1 lg:flex lg:flex-col lg:justify-center pb-12 lg:pb-8">
          {isMobile ? (
            <MobileVersion 
              slides={slidesData}
              activeSlide={activeSlide}
              scrollContainerRef={scrollContainerRef}
              handleScroll={handleScroll}
            />
          ) : (
            <DesktopVersion 
              slides={slidesData}
              activeSlide={activeSlide}
              direction={direction}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              goToSlide={goToSlide}
            />
          )}
        </div>
      </div>
    </motion.section>
  );
};

// Background elements component
const BackgroundElements = () => (
  <>
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')" }}
    />
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
      style={{ backgroundImage: "url('/imgs/texture2.svg')" }}
    />
    
    {/* Animated blobs */}
    <motion.div 
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      {[
        { size: "w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96", position: "top-0 left-0", color: "bg-blue-400/10", duration: 8 },
        { size: "w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80", position: "bottom-0 right-0", color: "bg-purple-400/10", duration: 10, delay: 1 },
        { size: "w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64", position: "top-1/2 left-1/4", color: "bg-cyan-400/5", duration: 12, delay: 2 }
      ].map((blob, index) => (
        <motion.div 
          key={index}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} rounded-full blur-3xl`}
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay || 0
          }}
        />
      ))}
    </motion.div>

    {/* Curved lines */}
    <motion.svg 
      className="absolute inset-0 w-full h-full" 
      viewBox="0 0 1200 800" 
      fill="none"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 3, delay: 1 }}
    >
      {[
        { d: "M-100 100 Q200 50 400 100 T800 150 Q1000 120 1300 100", stroke: "rgba(59, 130, 246, 0.1)", delay: 1.5 },
        { d: "M-50 300 Q300 250 600 300 T1200 350", stroke: "rgba(147, 51, 234, 0.08)", delay: 2 },
        { d: "M100 600 Q400 550 700 600 T1300 650", stroke: "rgba(6, 182, 212, 0.06)", delay: 2.5 }
      ].map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          stroke={path.stroke}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 + index * 0.5, delay: path.delay }}
        />
      ))}
    </motion.svg>
  </>
);

// Header component
const Header = () => (
  <motion.div 
    className="text-center pt-12 sm:pt-16 lg:pt-44 pb-8 lg:pb-0 flex-shrink-0"
    variants={animations.header}
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
      Here's how we do{' '}
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
        I.T.
      </span>
    </h2>
  </motion.div>
);

// Mobile version component
const MobileVersion = ({ slides, activeSlide, scrollContainerRef, handleScroll }) => (
  <motion.div 
    className="w-full"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <div 
      ref={scrollContainerRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
      onScroll={handleScroll}
    >
      {slides.map((slide, index) => (
        <div key={slide.id} className="snap-center" style={{ minWidth: '85vw' }}>
          <MobileCard slide={slide} index={index} />
        </div>
      ))}
    </div>

    <motion.div 
      className="text-center mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <p className="text-white/70 text-sm">← Swipe to explore services →</p>
    </motion.div>

    <DotsIndicator slides={slides} activeSlide={activeSlide} />
  </motion.div>
);

// Mobile card component
const MobileCard = ({ slide, index }) => (
  <motion.div 
    className="flex-shrink-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  >
    <motion.div 
      className="relative h-48 bg-gray-100 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${slide.image})`
      }}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    
    <motion.div 
      className="p-6"
      variants={animations.content}
      initial="hidden"
      animate="visible"
    >
      <SlideContent slide={slide} isMobile={true} />
    </motion.div>
  </motion.div>
);

// Desktop version component
const DesktopVersion = ({ slides, activeSlide, direction, nextSlide, prevSlide, goToSlide }) => (
  <motion.div 
    className="relative lg:flex-1 lg:flex lg:flex-col lg:justify-center lg:max-h-[750px]"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    {/* Container with space for arrows */}
    <div className="relative mx-auto px-16 md:px-20 lg:px-24 xl:px-28">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <NavigationButtons nextSlide={nextSlide} prevSlide={prevSlide} />
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={activeSlide}
            custom={direction}
            variants={animations.slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[750px] sm:h-[800px] md:h-[900px] lg:h-[600px] xl:h-[650px]">
              <motion.div 
                className="relative bg-gray-100 overflow-hidden order-2 lg:order-1 h-48 sm:h-64 md:h-[450px] lg:h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slides[activeSlide].image})`
                }}
                variants={animations.image}
                initial="hidden"
                animate="visible"
              />

              <motion.div 
                className="p-6 sm:p-8 md:p-12 lg:p-8 xl:p-10 flex flex-col justify-center order-1 lg:order-2 flex-1 lg:h-full overflow-y-auto"
                variants={animations.content}
                initial="hidden"
                animate="visible"
              >
                <div className="py-4 lg:py-6">
                  <SlideContent slide={slides[activeSlide]} isMobile={false} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    <DotsIndicator slides={slides} activeSlide={activeSlide} goToSlide={goToSlide} isDesktop={true} />
  </motion.div>
);

// Navigation buttons component
const NavigationButtons = ({ nextSlide, prevSlide }) => (
  <>
    <motion.button
      onClick={prevSlide}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-primary-orange rounded-full flex items-center justify-center shadow-lg"
      aria-label="Previous slide"
      variants={animations.navButton}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>

    <motion.button
      onClick={nextSlide}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-primary-orange rounded-full flex items-center justify-center shadow-lg"
      aria-label="Next slide"
      variants={animations.navButton}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>
  </>
);

// Slide content component
const SlideContent = ({ slide, isMobile }) => (
  <>
    <motion.div 
      className={`flex ${isMobile ? 'gap-x-3' : 'gap-x-2 sm:gap-x-3 md:gap-x-4'} items-start ${isMobile ? '' : 'sm:items-center'} mb-4 ${isMobile ? '' : 'sm:mb-6'} text-primary-blue`}
      variants={animations.feature}
    >
      <GoShieldCheck className={`${isMobile ? 'w-8 h-8' : 'w-8 h-8 sm:w-10 sm:h-10'} flex-shrink-0 ${isMobile ? 'mt-1' : 'mt-1 sm:mt-0'}`} />
      <h3 className={`${isMobile ? 'text-lg' : 'text-lg sm:text-xl md:text-2xl'} font-bold leading-tight`}>
        {slide.title}
      </h3>
    </motion.div>

    <motion.p 
      className={`text-text-dark ${isMobile ? 'text-sm' : 'text-sm sm:text-base'} leading-relaxed mb-6 ${isMobile ? '' : 'sm:mb-8'}`}
      variants={animations.feature}
    >
      {slide.description}
    </motion.p>

    <motion.div className={`space-y-2 ${isMobile ? '' : 'sm:space-y-3'}`}>
      {slide.features.map((feature, index) => (
        <motion.div 
          key={index} 
          className={`flex ${isMobile ? 'gap-x-3' : 'gap-x-2 sm:gap-x-3 md:gap-x-4'} items-start`}
          variants={animations.feature}
        >
          <BiCheckCircle className={`text-primary-blue ${isMobile ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} flex-shrink-0 ${isMobile ? 'mt-0.5' : 'mt-0.5 sm:mt-0'}`} />
          <span className={`text-${isMobile ? 'gray-700' : 'text-dark'} ${isMobile ? 'text-xs' : 'text-xs sm:text-sm md:text-base'} leading-relaxed`}>
            {feature}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </>
);

// Dots indicator component
const DotsIndicator = ({ slides, activeSlide, goToSlide, isDesktop = false }) => (
  <motion.div 
    className={`flex justify-center ${isDesktop ? 'mt-6 sm:mt-8 lg:mt-6' : 'mt-6'} space-x-2 ${isDesktop ? 'flex-shrink-0' : ''}`}
    initial={{ opacity: 0, y: isDesktop ? 30 : 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: isDesktop ? 0.6 : 0.8 }}
  >
    {slides.map((_, index) => (
      <motion.button
        key={index}
        onClick={goToSlide ? () => goToSlide(index) : undefined}
        className={`${isDesktop ? 'w-2 h-2 sm:w-3 sm:h-3' : 'w-2 h-2'} rounded-full ${
          index === activeSlide ? 'bg-white' : 'bg-white/50'
        }`}
        aria-label={`Go to slide ${index + 1}`}
        variants={animations.dot}
        animate={index === activeSlide ? "active" : "inactive"}
        whileHover={isDesktop ? { scale: 1.2 } : undefined}
      />
    ))}
  </motion.div>
);

export default HowWeDo;