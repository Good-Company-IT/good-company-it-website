import React, { useState, useEffect, useRef } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';

const SlidesCarousel = ({ slides, variant = 'default' }) => {
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

    // Variant-based styles
    const styles = {
        default: {
            titleColor: 'text-primary-blue',
            iconColor: 'text-primary-blue',
            checkColor: 'text-primary-blue',
            showSubtitle: false,
            showIcon: true,
            showLocation: false,
            showSocialMedia: false
        },
        colorful: {
            titleColor: 'text-primary-orange',
            iconColor: 'text-primary-blue',
            checkColor: 'text-primary-blue',
            showSubtitle: true,
            subtitleColor: 'text-primary-blue',
            showIcon: false,
            showLocation: true,
            showSocialMedia: true
        }
    };

    const currentStyle = styles[variant];

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

    // Instagram link component
    const InstagramLink = ({ className = "" }) => (
        <a
            href="https://www.instagram.com/goodcompanyit?igsh=endxemxmcHFyNnZj"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-x-3 hover:opacity-80 transition-opacity duration-200 ${className}`}
            aria-label="Follow us on Instagram"
        >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-orange hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            </div>
            <span className="text-text-dark text-sm hover:text-primary-orange transition-colors duration-200">Follow our Instagram</span>
        </a>
    );

    // Mobile Card Component
    const MobileCard = ({ slide, index }) => (
        <div className="flex-shrink-0 w-full h-full bg-white rounded-2xl overflow-hidden">
            {!variant.includes('no-image') && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className={`w-full h-full object-cover ${variant === 'default' ? 'grayscale' : ''}`}
                    />
                </div>
            )}

            <div className="p-6">
                <div className={`flex gap-x-3 items-start mb-4 ${currentStyle.showIcon ? currentStyle.iconColor : ''}`}>
                    {currentStyle.showIcon && (
                        <GoShieldCheck className='w-8 h-8 flex-shrink-0 mt-1' />
                    )}
                    <div className="flex-1">
                        <div className="flex items-center gap-x-2 flex-wrap">
                            <h3 className={`text-lg font-bold leading-tight ${currentStyle.titleColor}`}>
                                {slide.title}
                            </h3>
                            {currentStyle.showLocation && slide.location && (
                                <span className="text-black font-normal">
                                    - {slide.location}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {currentStyle.showSubtitle && slide.subtitle && (
                    <h4 className={`text-base font-semibold mb-3 ${currentStyle.subtitleColor}`}>
                        {slide.subtitle}
                    </h4>
                )}

                <p className="text-text-dark text-xs sm:text-sm leading-relaxed mb-6">
                    {slide.description}
                </p>

                <div className="space-y-2 mb-6">
                    {slide.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-x-3 items-start">
                            <BiCheckCircle className={`${currentStyle.checkColor} h-5 w-5 flex-shrink-0 mt-0.5`} />
                            <span className="text-text-dark text-xs leading-relaxed">{feature}</span>
                        </div>
                    ))}
                </div>

                {currentStyle.showSocialMedia && (
                    <InstagramLink />
                )}
            </div>
        </div>
    );

    return (
        <div className="relative">
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
                        <p className="text-white/70 text-sm">← Swipe to explore →</p>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeSlide
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                /* Desktop Version - Slider */
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
                                {!variant.includes('no-image') && (
                                    <div className="relative bg-gray-100 overflow-hidden order-2 lg:order-1 transition-all duration-300 ease-in-out h-48 sm:h-64 md:h-80 lg:h-full">
                                        <img
                                            src={slides[activeSlide].image}
                                            alt={slides[activeSlide].title}
                                            className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${variant === 'default' ? 'grayscale' : ''}`}
                                        />
                                    </div>
                                )}

                                {/* Content Section */}
                                <div className={`p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center order-1 lg:order-2 transition-all duration-300 ease-in-out flex-1 lg:h-full overflow-y-auto ${variant.includes('no-image') ? 'col-span-2' : ''}`}>
                                    <div className="py-6 sm:py-8 md:py-10 lg:py-8">
                                        <div className={`flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start sm:items-center mb-4 sm:mb-6 ${currentStyle.showIcon ? currentStyle.iconColor : ''} transition-all duration-300 ease-in-out`}>
                                            {currentStyle.showIcon && (
                                                <GoShieldCheck className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1 sm:mt-0 transition-all duration-300 ease-in-out' />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-x-2 flex-wrap">
                                                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold leading-tight transition-all duration-300 ease-in-out ${currentStyle.titleColor}`}>
                                                        {slides[activeSlide].title}
                                                    </h3>
                                                    {currentStyle.showLocation && slides[activeSlide].location && (
                                                        <span className="text-text-dark font-normal text-sm sm:text-base">
                                                            - {slides[activeSlide].location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-text-dark text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 transition-all duration-300 ease-in-out">
                                            {slides[activeSlide].description}
                                        </p>

                                        {currentStyle.showSubtitle && slides[activeSlide].subtitle && (
                                            <h4 className={`text-base sm:text-lg font-medium text-primary-blue mb-4 sm:mb-6 transition-all duration-300 ease-in-out ${currentStyle.subtitleColor}`}>
                                                {slides[activeSlide].subtitle}
                                            </h4>
                                        )}

                                        <div className="space-y-2 sm:space-y-3 transition-all duration-300 ease-in-out mb-6 sm:mb-8">
                                            {slides[activeSlide].features.map((feature, index) => (
                                                <div key={index} className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-start transition-all duration-300 ease-in-out">
                                                    <BiCheckCircle className={`${currentStyle.checkColor} h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-0 transition-all duration-300 ease-in-out`} />
                                                    <span className="text-text-dark text-xs sm:text-sm leading-relaxed transition-all duration-300 ease-in-out">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {currentStyle.showSocialMedia && (
                                            <InstagramLink />
                                        )}
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
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === activeSlide
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
    );
};

export default SlidesCarousel;