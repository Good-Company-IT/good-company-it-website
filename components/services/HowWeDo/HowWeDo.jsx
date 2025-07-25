import React, { useState, useEffect, useRef } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';

const HowWeDo = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const scrollContainerRef = useRef(null);

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

    // Desktop navigation functions
    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
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
        <div className="flex-shrink-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="p-6">
                <div className="flex gap-x-3 items-start mb-4 text-primary-blue">
                    <GoShieldCheck className='w-8 h-8 flex-shrink-0 mt-1' />
                    <h3 className="text-lg font-bold leading-tight">
                        {slide.title}
                    </h3>
                </div>

                <p className="text-text-dark text-sm leading-relaxed mb-6">
                    {slide.description}
                </p>

                <div className="space-y-2">
                    {slide.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-x-3 items-start">
                            <BiCheckCircle className='text-primary-blue h-5 w-5 flex-shrink-0 mt-0.5' />
                            <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen pb-12 pt-96 sm:pt-80 md:pt-80 lg:pt-56 xl:pt-44 overflow-hidden transition-all duration-300 ease-in-out">
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

            <div className="absolute inset-0 transition-all duration-300 ease-in-out">
                <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-400/10 rounded-full blur-3xl transition-all duration-300 ease-in-out"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-purple-400/10 rounded-full blur-3xl transition-all duration-300 ease-in-out"></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-cyan-400/5 rounded-full blur-2xl transition-all duration-300 ease-in-out"></div>
            </div>

            {/* Curved Lines Background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
                <path
                    d="M-100 100 Q200 50 400 100 T800 150 Q1000 120 1300 100"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d="M-50 300 Q300 250 600 300 T1200 350"
                    stroke="rgba(147, 51, 234, 0.08)"
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d="M100 600 Q400 550 700 600 T1300 650"
                    stroke="rgba(6, 182, 212, 0.06)"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-300 ease-in-out">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 transition-all duration-300 ease-in-out">
                        Here's how we do{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
                            IT
                        </span>
                    </h2>
                </div>

                {/* Mobile Version - Horizontal Scroll */}
                {isMobile ? (
                    <div className="w-full">
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
                        <div className="text-center mt-4">
                            <p className="text-white/70 text-sm">← Swipe to explore services →</p>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === activeSlide
                                            ? 'bg-white scale-125'
                                            : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Desktop Version - Original Slider */
                    <div className="relative">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-orange hover:bg-secondary-orange rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary-orange hover:bg-secondary-orange rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Card Container */}
                        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:w-[1200px] mx-auto transition-all duration-300 ease-in-out">
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
                                <div className="grid grid-cols-1 lg:grid-cols-2 h-[750px] sm:h-[800px] md:h-[850px] lg:h-[650px] transition-all duration-300 ease-in-out">
                                    {/* Image Section */}
                                    <div className="relative bg-gray-100 overflow-hidden order-2 lg:order-1 transition-all duration-300 ease-in-out h-48 sm:h-64 md:h-80 lg:h-full">
                                        <img
                                            src={slides[activeSlide].image}
                                            alt={slides[activeSlide].title}
                                            className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center order-1 lg:order-2 transition-all duration-300 ease-in-out flex-1 lg:h-full overflow-y-auto">
                                        <div className="py-6 sm:py-8 md:py-10 lg:py-8">
                                            <div className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start sm:items-center mb-4 sm:mb-6 text-primary-blue transition-all duration-300 ease-in-out">
                                                <GoShieldCheck className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1 sm:mt-0 transition-all duration-300 ease-in-out' />
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight transition-all duration-300 ease-in-out">
                                                    {slides[activeSlide].title}
                                                </h3>
                                            </div>

                                            <p className="text-text-dark text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 transition-all duration-300 ease-in-out">
                                                {slides[activeSlide].description}
                                            </p>

                                            <div className="space-y-2 sm:space-y-3 transition-all duration-300 ease-in-out">
                                                {slides[activeSlide].features.map((feature, index) => (
                                                    <div key={index} className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start transition-all duration-300 ease-in-out">
                                                        <BiCheckCircle className='text-primary-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-0 transition-all duration-300 ease-in-out' />
                                                        <span className="text-text-dark text-xs sm:text-sm md:text-base leading-relaxed transition-all duration-300 ease-in-out">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                        index === activeSlide
                                            ? 'bg-white scale-125'
                                            : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HowWeDo;