"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaCheckCircle, FaRegArrowAltCircleRight } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Buttons/Button";

// AnimatedBlock component included inline
function AnimatedBlock({
    children,
    delay = 0,
    duration = 0.6,
    className = "",
    direction = "up",
    distance = 50,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        threshold: 0.1,
        margin: "-100px 0px -100px 0px"
    });

    const getInitialPosition = () => {
        switch (direction) {
            case "up":
                return { y: distance, x: 0 };
            case "down":
                return { y: -distance, x: 0 };
            case "left":
                return { y: 0, x: distance };
            case "right":
                return { y: 0, x: -distance };
            default:
                return { y: distance, x: 0 };
        }
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition(),
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Service data structure
const servicesData = [
    {
        id: 1,
        title: "Regular check-ins",
        category: "Regular check-ins",
        description: "Starting from our kickoff meeting, we want to know what your team needs at that moment in time. We have weekly or biweekly meetings to ensure our solutions align with the business goals and your team's needs.",
        additionalInfo: "We also constantly check in with departments to offer tech/operational solutions for issues that are often at the root of what's preventing company growth.",
        image: "/imgs/whatWeDo/regular.png"
    },
    {
        id: 2,
        title: "Security Oriented",
        category: "Security Oriented",
        description: "Thoroughness is at the heart of how we build. Part of our thoroughness value is ensuring that our solutions use state of the art security measures.",
        additionalInfo: "We handle everything from data protection to 24/7 threat detection and response, so you can stay focused on growing your business, not fighting off cyber threats.",
        image: "/imgs/whatWeDo/security.png"
    },
    {
        id: 3,
        title: "Compliance Masters",
        category: "Compliance Masters",
        description: "We ensure your business meets all regulatory requirements and industry standards. Our team stays up-to-date with the latest compliance frameworks.",
        additionalInfo: "From GDPR to HIPAA, SOC2 to ISO 27001, we help you navigate complex compliance landscapes with confidence and peace of mind.",
        image: "/imgs/whatWeDo/compliance.png"
    },
    {
        id: 4,
        title: "Employee Onboarding & Offboarding",
        category: "Employee Onboarding & Offboarding",
        description: "Streamlined processes for bringing new team members aboard and ensuring secure transitions when they leave.",
        additionalInfo: "We create automated workflows that maintain security while providing seamless experiences for your growing team.",
        image: "/imgs/whatWeDo/employee.png"
    },
    {
        id: 5,
        title: "Devices, Handled",
        category: "Devices, Handled",
        description: "Complete device lifecycle management from procurement to retirement. We handle setup, maintenance, and security for all your technology.",
        additionalInfo: "Our device management ensures your team has the tools they need while maintaining enterprise-level security and compliance.",
        image: "/imgs/whatWeDo/devices.png"
    },
    {
        id: 6,
        title: "We Care About your Data",
        category: "We Care About your Data",
        description: "Your data is your most valuable asset. We implement robust backup, recovery, and protection strategies to keep it safe.",
        additionalInfo: "From automated backups to disaster recovery planning, we ensure your critical business data is always protected and accessible.",
        image: "/imgs/whatWeDo/weCare.png"
    },
    {
        id: 7,
        title: "Here When You Need Us",
        category: "Here When You Need Us",
        description: "24/7 support and monitoring to ensure your systems are always running smoothly. We're here when challenges arise.",
        additionalInfo: "Our proactive monitoring and rapid response team means issues are often resolved before they impact your business.",
        image: "/imgs/whatWeDo/hereWhen.png"
    }
];

function ServicesSection() {
    const [activeService, setActiveService] = useState(0);
    const [isInStickyMode, setIsInStickyMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [exitInProgress, setExitInProgress] = useState(false);
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const isScrollingRef = useRef(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Clean exit function
    const handleSectionExit = (deltaY) => {
        if (exitInProgress) return;

        setExitInProgress(true);
        isScrollingRef.current = true;

        // Single smooth fade-out animation
        if (containerRef.current) {
            containerRef.current.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            containerRef.current.style.opacity = '0';
            containerRef.current.style.transform = 'scale(0.95)';
        }

        // Clean exit after animation completes
        setTimeout(() => {
            setIsInStickyMode(false);
            setExitInProgress(false);

            // Reset styles
            if (containerRef.current) {
                containerRef.current.style.transition = '';
                containerRef.current.style.opacity = '1';
                containerRef.current.style.transform = 'scale(1)';
            }

            // Continue natural scroll
            setTimeout(() => {
                isScrollingRef.current = false;
                window.scrollBy(0, deltaY * 1.5);
            }, 100);
        }, 600);
    };

    useEffect(() => {
        // Skip sticky behavior on mobile
        if (isMobile) return;

        let scrollBuffer = 0;
        const SCROLL_THRESHOLD = 120;
        const SECTION_TRIGGER_OFFSET = 150;

        const handleWheel = (e) => {
            if (!sectionRef.current || exitInProgress) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;
            const isWellIntoSection = sectionTop <= -SECTION_TRIGGER_OFFSET && sectionBottom >= windowHeight + SECTION_TRIGGER_OFFSET;

            if (isWellIntoSection && !isScrollingRef.current) {
                e.preventDefault();

                scrollBuffer += Math.abs(e.deltaY);

                if (scrollBuffer >= SCROLL_THRESHOLD) {
                    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';

                    if (scrollDirection === 'down') {
                        if (activeService < servicesData.length - 1) {
                            setActiveService(prev => prev + 1);
                            scrollBuffer = 0;
                            isScrollingRef.current = true;
                            setTimeout(() => {
                                isScrollingRef.current = false;
                            }, 600);
                        } else {
                            // Clean exit for last service
                            scrollBuffer = 0;
                            handleSectionExit(e.deltaY);
                        }
                    } else {
                        if (activeService > 0) {
                            setActiveService(prev => prev - 1);
                            scrollBuffer = 0;
                            isScrollingRef.current = true;
                            setTimeout(() => {
                                isScrollingRef.current = false;
                            }, 600);
                        } else {
                            // Clean exit for first service
                            scrollBuffer = 0;
                            handleSectionExit(e.deltaY);
                        }
                    }
                }
            } else if (!isWellIntoSection) {
                scrollBuffer = 0;
            }
        };

        const handleScroll = () => {
            if (!sectionRef.current || exitInProgress) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const topThreshold = -50;
            const bottomThreshold = windowHeight + 50;

            if (sectionRect.top <= topThreshold && sectionRect.bottom >= bottomThreshold) {
                if (!isInStickyMode) {
                    setIsInStickyMode(true);
                    if (containerRef.current) {
                        containerRef.current.style.opacity = '1';
                        containerRef.current.style.transform = 'scale(1)';
                    }
                }
            } else {
                if (sectionRect.top > 100 || sectionRect.bottom < windowHeight - 100) {
                    if (isInStickyMode) {
                        setIsInStickyMode(false);
                        scrollBuffer = 0;

                        if (containerRef.current) {
                            containerRef.current.style.opacity = '1';
                            containerRef.current.style.transform = 'scale(1)';
                        }
                    }
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeService, isInStickyMode, exitInProgress, isMobile]);

    const handleServiceClick = (index) => {
        setActiveService(index);
        // Prevent scroll interference when clicking
        isScrollingRef.current = true;
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000); // Longer delay to prevent conflicts
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    const listItemVariants = {
        inactive: {
            opacity: 0.6,
            x: 0,
            transition: { duration: 0.3 }
        },
        active: {
            opacity: 1,
            x: 10,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`relative ${isMobile ? 'min-h-auto' : 'min-h-[500vh]'} py-24`}
        >
            {/* Fixed radial gradient background */}
            <div
                className="fixed inset-0 w-full h-full -z-10"
                style={{
                    background: `radial-gradient(circle at center 120%, 
            #00B2F9 0%, 
            #00AEF5 7%, 
            #008BCD 11%, 
            #0066AB 15%, 
            #00498D 19%, 
            #003174 24%, 
            #001F62 30%, 
            #001254 36%, 
            #000B4D 45%, 
            #01094B 61%, 
            #000000 100%
          )`
                }}
            />
            {isMobile ? (
                // Mobile Layout - All content in columns
                <div className="relative py-20">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                        {/* Mobile Header */}
                        <AnimatedBlock delay={0.2} className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                                What we do{" "}
                                <span className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                    BEST
                                </span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                We know that there isn't one solution that fits every business, and that technological/
                                security challenges change over time. That's why we work alongside your team to build
                                out the projects you need, when you need them. Here's how we do it:
                            </p>
                        </AnimatedBlock>

                        {/* Mobile Services List */}
                        <div className="space-y-12">
                            {servicesData.map((service, index) => (
                                <AnimatedBlock
                                    key={service.id}
                                    delay={0.2 + (index * 0.1)}
                                    className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
                                >
                                    {/* Mobile Service Image */}
                                    <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
                                        <Image
                                            src={service.image}
                                            alt={service.category}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>

                                    {/* Mobile Service Content */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FaCheckCircle className="w-6 h-6 text-primary-blue flex-shrink-0" />
                                            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                                                {service.category}
                                            </h3>
                                        </div>

                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                            {service.description}
                                        </p>

                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {service.additionalInfo}
                                        </p>

                                        <div className="pt-2">
                                            <Link href="/learn-more">
                                                <motion.button
                                                    className="px-6 py-2.5 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 text-sm bg-gradient-to-r from-orange-500 to-orange-600"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Learn More
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </AnimatedBlock>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Desktop Layout - Sticky behavior
                <div
                    ref={containerRef}
                    className={`${isInStickyMode ? 'fixed' : 'relative'} top-0 left-0 w-full h-screen overflow-hidden transition-all duration-1000 ease-out`}
                    style={{ opacity: 1, transform: 'scale(1)' }}
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">

                        <AnimatedBlock delay={0.2} className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">
                                What we do{" "}
                                <span className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                    BEST
                                </span>
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed px-4">
                                We know that there isn't one solution that fits every business, and that technological/
                                security challenges change over time. That's why we work alongside your team to build
                                out the projects you need, when you need them. Here's how we do it:
                            </p>
                        </AnimatedBlock>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">

                            <div className="lg:col-span-4 space-y-6">
                                <AnimatedBlock delay={0.4} direction="left">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue mb-6 md:mb-8">
                                        Here's How
                                    </h3>

                                    <div className="space-y-3 md:space-y-4">
                                        {servicesData.map((service, index) => (
                                            <motion.div
                                                key={service.id}
                                                variants={listItemVariants}
                                                animate={index === activeService ? "active" : "inactive"}
                                                className="flex items-center gap-3 md:gap-4 cursor-pointer group p-2 md:p-3 rounded-lg transition-all duration-300"
                                                onClick={() => handleServiceClick(index)}
                                                whileHover={{ x: 5 }}
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: index === activeService ? 1.2 : 1,
                                                        color: index === activeService ? "#60A5FA" : "#9CA3AF"
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <FaRegArrowAltCircleRight className="text-primary-blue w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                                </motion.div>

                                                <span className={`text-sm sm:text-base md:text-lg font-medium transition-all duration-300 ${index === activeService
                                                        ? 'text-white'
                                                        : 'text-white/55 group-hover:text-primary-blue'
                                                    }`}>
                                                    {service.title}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatedBlock>
                            </div>

                            <div className="lg:col-span-4 relative">
                                <AnimatedBlock delay={0.6}>
                                    {/* Vertical line above image */}
                                    <div className="absolute left-1/2 -top-48 w-[2.5px] h-44 bg-primary-orange transform -translate-x-1/2 hidden lg:block" />

                                    {/* Vertical line below image */}
                                    <div className="absolute left-1/2 -bottom-56 w-[2px] h-44 bg-primary-orange transform -translate-x-1/2 hidden lg:block" />

                                    <div className="relative h-56 sm:h-60 md:h-72 rounded-xl overflow-hidden mx-auto max-w-md lg:max-w-none">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeService}
                                                variants={imageVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={servicesData[activeService].image}
                                                    alt={servicesData[activeService].category}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    priority={activeService === 0}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </AnimatedBlock>
                            </div>

                            <div className="lg:col-span-4">
                                <AnimatedBlock delay={0.8} direction="right">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeService}
                                            variants={contentVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="space-y-4 md:space-y-6"
                                        >
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <motion.div
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 0.6, delay: 0.2 }}
                                                >
                                                    <GoShieldCheck className="w-6 h-6 md:w-14 md:h-14 text-primary-blue flex-shrink-0" />
                                                </motion.div>
                                                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-blue leading-tight">
                                                    {servicesData[activeService].category}
                                                </h4>
                                            </div>

                                            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                                                {servicesData[activeService].description}
                                            </p>

                                            <span className="flex flex-row items-center gap-3">
                                                <CiCircleCheck className="w-9 h-9 text-white flex-shrink-0" />
                                                <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                                                    {servicesData[activeService].additionalInfo}
                                                </p>
                                            </span>

                                            <div className="pt-2 md:pt-4">
                                                <Link href="/learn-more">
                                                    <Button>
                                                        Learn More
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </AnimatedBlock>
                            </div>
                        </div>

                        {/*             <div className="text-center mt-8">
              <div className="flex justify-center gap-2 mb-4">
                {servicesData.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeService ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Scroll to explore services • {activeService + 1} of {servicesData.length}
              </p>
            </div> */}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ServicesSection;