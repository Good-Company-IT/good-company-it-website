import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BiCheckCircle } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';

const HowWeDo = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slides = [
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
                "IT Roadmapping & Forecasting"
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
                "IT Security & Compliance Consulting",
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

    // Animation variants
    const containerVariants = {
        hidden: { 
            opacity: 0,
            y: 50
        },
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
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1] 
                },
                opacity: { 
                    duration: 0.4, 
                    ease: "easeOut" 
                },
                scale: { 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1] 
                }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { 
                    duration: 0.4, 
                    ease: [0.22, 1, 0.36, 1] 
                },
                opacity: { 
                    duration: 0.3, 
                    ease: "easeIn" 
                },
                scale: { 
                    duration: 0.4, 
                    ease: [0.22, 1, 0.36, 1] 
                }
            }
        })
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
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
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 1.02
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const featureVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const buttonVariants = {
        rest: { 
            scale: 1,
            backgroundColor: "#f97316"
        },
        hover: { 
            scale: 1.05,
            backgroundColor: "#ea580c",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: { 
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    };

    const dotVariants = {
        inactive: {
            scale: 1,
            opacity: 0.5
        },
        active: {
            scale: 1.25,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    // Desktop navigation functions
    const nextSlide = () => {
        setDirection(1);
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
        
        if (newIndex !== activeSlide && newIndex >= 0 && newIndex < slides.length) {
            setActiveSlide(newIndex);
        }
    };

    // Mobile Card Component
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
                className="relative h-48 bg-gray-100 overflow-hidden"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>
            
            <motion.div 
                className="p-6"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="flex gap-x-3 items-start mb-4 text-primary-blue"
                    variants={featureVariants}
                >
                    <GoShieldCheck className='w-8 h-8 flex-shrink-0 mt-1' />
                    <h3 className="text-lg font-bold leading-tight">
                        {slide.title}
                    </h3>
                </motion.div>

                <motion.p 
                    className="text-text-dark text-sm leading-relaxed mb-6"
                    variants={featureVariants}
                >
                    {slide.description}
                </motion.p>

                <motion.div className="space-y-2">
                    {slide.features.map((feature, featureIndex) => (
                        <motion.div 
                            key={featureIndex} 
                            className="flex gap-x-3 items-start"
                            variants={featureVariants}
                            custom={featureIndex}
                        >
                            <BiCheckCircle className='text-primary-blue h-5 w-5 flex-shrink-0 mt-0.5' />
                            <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );

    return (
        <motion.section 
            ref={sectionRef}
            className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 h-[1200px] sm:h-[1100px] md:h-[1400px] lg:h-[1050px] overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Background Elements */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')",
                }}
            />

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: "url('/imgs/texture2.svg')",
                }}
            />

            {/* Animated Background Blobs */}
            <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
            >
                <motion.div 
                    className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-400/10 rounded-full blur-3xl"
                    animate={{ 
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-purple-400/10 rounded-full blur-3xl"
                    animate={{ 
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        duration: 10, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-cyan-400/5 rounded-full blur-2xl"
                    animate={{ 
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                        scale: [1, 0.8, 1]
                    }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </motion.div>

            {/* Curved Lines Background */}
            <motion.svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 1200 800" 
                fill="none"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 3, delay: 1 }}
            >
                <motion.path
                    d="M-100 100 Q200 50 400 100 T800 150 Q1000 120 1300 100"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                />
                <motion.path
                    d="M-50 300 Q300 250 600 300 T1200 350"
                    stroke="rgba(147, 51, 234, 0.08)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 2 }}
                />
                <motion.path
                    d="M100 600 Q400 550 700 600 T1300 650"
                    stroke="rgba(6, 182, 212, 0.06)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2.5 }}
                />
            </motion.svg>

            {/* Content Container - Flexbox layout for desktop height control */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full lg:h-full flex flex-col">
                
                {/* Header - Flexible spacing for mobile, controlled for desktop */}
                <motion.div 
                    className="text-center pt-80 sm:pt-80 md:pt-80 lg:pt-36 xl:pt-40 pb-8 flex-shrink-0"
                    variants={headerVariants}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
                        Here's how we do{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
                            IT
                        </span>
                    </h2>
                </motion.div>

                {/* Main Content - Flex grow for desktop, natural flow for mobile */}
                <div className="flex-1 lg:flex lg:flex-col lg:justify-center pb-12 lg:pb-8">

                    {/* Mobile Version - Horizontal Scroll */}
                    {isMobile ? (
                        <motion.div 
                            className="w-full"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Scroll Container */}
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

                            {/* Scroll Hint */}
                            <motion.div 
                                className="text-center mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <p className="text-white/70 text-sm">← Swipe to explore services →</p>
                            </motion.div>

                            {/* Dots Indicator */}
                            <motion.div 
                                className="flex justify-center mt-6 space-x-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                {slides.map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${
                                            index === activeSlide
                                                ? 'bg-white'
                                                : 'bg-white/50'
                                        }`}
                                        variants={dotVariants}
                                        animate={index === activeSlide ? "active" : "inactive"}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* Desktop Version - Original Slider */
                        <motion.div 
                            className="relative lg:flex-1 lg:flex lg:flex-col lg:justify-center lg:max-h-[750px]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Navigation Buttons */}
                            <motion.button
                                onClick={prevSlide}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-orange rounded-full flex items-center justify-center shadow-lg"
                                aria-label="Previous slide"
                                variants={buttonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>

                            <motion.button
                                onClick={nextSlide}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-orange rounded-full flex items-center justify-center shadow-lg"
                                aria-label="Next slide"
                                variants={buttonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>

                            {/* Card Container */}
                            <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:w-[1200px] mx-auto">
                                <motion.div 
                                    className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
                                    whileHover={{ 
                                        scale: 1.02,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AnimatePresence mode="wait" custom={direction}>
                                        <motion.div
                                            key={activeSlide}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="grid grid-cols-1 lg:grid-cols-2 h-[750px] sm:h-[800px] md:h-[850px] lg:h-[600px] xl:h-[650px]"
                                        >
                                            {/* Image Section */}
                                            <motion.div 
                                                className="relative bg-gray-100 overflow-hidden order-2 lg:order-1 h-48 sm:h-64 md:h-80 lg:h-full"
                                                variants={imageVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <img
                                                    src={slides[activeSlide].image}
                                                    alt={slides[activeSlide].title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>

                                            {/* Content Section */}
                                            <motion.div 
                                                className="p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 flex flex-col justify-center order-1 lg:order-2 flex-1 lg:h-full overflow-y-auto"
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <div className="py-4 lg:py-6">
                                                    <motion.div 
                                                        className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start sm:items-center mb-4 sm:mb-6 text-primary-blue"
                                                        variants={featureVariants}
                                                    >
                                                        <GoShieldCheck className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1 sm:mt-0' />
                                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                                                            {slides[activeSlide].title}
                                                        </h3>
                                                    </motion.div>

                                                    <motion.p 
                                                        className="text-text-dark text-sm sm:text-base leading-relaxed mb-6 sm:mb-8"
                                                        variants={featureVariants}
                                                    >
                                                        {slides[activeSlide].description}
                                                    </motion.p>

                                                    <motion.div className="space-y-2 sm:space-y-3">
                                                        {slides[activeSlide].features.map((feature, index) => (
                                                            <motion.div 
                                                                key={index} 
                                                                className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start"
                                                                variants={featureVariants}
                                                            >
                                                                <BiCheckCircle className='text-primary-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-0' />
                                                                <span className="text-text-dark text-xs sm:text-sm md:text-base leading-relaxed">{feature}</span>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Dots Indicator */}
                            <motion.div 
                                className="flex justify-center mt-6 sm:mt-8 lg:mt-6 space-x-2 flex-shrink-0"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                {slides.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                            index === activeSlide
                                                ? 'bg-white'
                                                : 'bg-white/50'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                        variants={dotVariants}
                                        animate={index === activeSlide ? "active" : "inactive"}
                                        whileHover={{ scale: 1.2 }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default HowWeDo;