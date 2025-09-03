import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/common/Buttons/Button';
import QuoteCard from '@/components/common/Cards/QuoteCard';

// Constants
const SCROLL_THRESHOLDS = {
  FADE_IN_START: 0.05,
  FADE_IN_END: 0.15,
  VISIBLE_END: 0.65,
  FADE_OUT_END: 0.8,
  ANIMATION_COMPLETE: 0.85
};

const SCREEN_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  LARGE: 1440,  // lg screens
  XL: 1920,     // xl screens  
  HUGE: 2560,   // huge screens
  ULTRAWIDE: 3440
};

const ANIMATION_CONFIG = {
  EASING: [0.4, 0, 0.2, 1],
  DURATION: {
    FAST: 0.3,
    MEDIUM: 0.6,
    SLOW: 1.0
  }
};

// Base quote data
const BASE_QUOTES = {
  left: [
    {
      id: 1,
      image: "/imgs/weBuild/1.png",
      quote: "Julian Ussa has been such a big help. Everytime I have any sort of technical problem, he is always there to work things out with me.",
      author: "Ana Esaa",
      size: "normal"
    },
    {
      id: 2,
      image: "/imgs/weBuild/2.png",
      quote: "Amazing company to work with! I worked with Julian, he was very patient with all my questions and showed my options to select from. Love working with a team like this.",
      author: "Viky Salazar",
      size: "large"
    },
    {
      id: 3,
      image: "/imgs/weBuild/3.png",
      quote: "If anyone's looking for reliable, friendly, and efficient I.T. support, I can't recommend Good Company I.T. enough!",
      author: "ON-Demand Trading Compliance",
      size: "normal"
    },
    {
      id: 8,
      image: "/imgs/weBuild/1.png",
      quote: "Julian Ussa has been such a big help. Everytime I have any sort of technical problem, he is always there to work things out with me.",
      author: "Ana Esaa",
      size: "normal"
    },
    {
      id: 9,
      image: "/imgs/weBuild/3.png",
      quote: "If anyone's looking for reliable, friendly, and efficient I.T. support, I can't recommend Good Company I.T. enough!",
      author: "ON-Demand Trading Compliance",
      size: "normal"
    },
    {
      id: 10,
      image: "/imgs/weBuild/2.png",
      quote: "Amazing company to work with! I worked with Julian, he was very patient with all my questions and showed my options to select from. Love working with a team like this.",
      author: "Viky Salazar",
      size: "large"
    }
  ],
  right: [
    {
      id: 4,
      image: "/imgs/weBuild/4.png",
      quote: "Julian Ussa is always super helpful and resolves my issues quickly. Thanks Julian!",
      author: "Bryce James",
      size: "normal"
    },
    {
      id: 5,
      image: "/imgs/weBuild/5.png",
      quote: "The team explained everything very well and were super helpful. They are easy to work with and great communicators.",
      author: "Skyler Perry",
      size: "normal"
    },
    {
      id: 6,
      image: "/imgs/weBuild/6.png",
      quote: "Amazing! Julian from Good Company I.T. is an incredible support for any I.T. issue. He is prompt, patient, and extremely helpful + knowledgeable. I HIGHLY recommend Good Company I.T.!",
      author: "Allysa Hoffman",
      size: "large"
    },
    {
      id: 7,
      image: "/imgs/weBuild/4.png",
      quote: "Julian Ussa is always super helpful and resolves my issues quickly. Thanks Julian!",
      author: "Bryce James",
      size: "normal"
    },
    {
      id: 11,
      image: "/imgs/weBuild/5.png",
      quote: "The team explained everything very well and were super helpful. They are easy to work with and great communicators.",
      author: "Skyler Perry",
      size: "normal"
    },
    {
      id: 12,
      image: "/imgs/weBuild/6.png",
      quote: "Amazing! Julian from Good Company I.T. is an incredible support for any I.T. issue. He is prompt, patient, and extremely helpful + knowledgeable. I HIGHLY recommend Good Company I.T.!",
      author: "Allysa Hoffman",
      size: "large"
    }
  ]
};

// Original unique quotes without duplicates
const ORIGINAL_QUOTES = {
  left: [
    {
      id: 1,
      image: "/imgs/weBuild/1.png",
      quote: "Julian Ussa has been such a big help. Everytime I have any sort of technical problem, he is always there to work things out with me.",
      author: "Ana Esaa",
      size: "normal"
    },
    {
      id: 2,
      image: "/imgs/weBuild/2.png",
      quote: "Amazing company to work with! I worked with Julian, he was very patient with all my questions and showed my options to select from. Love working with a team like this.",
      author: "Viky Salazar",
      size: "large"
    },
    {
      id: 3,
      image: "/imgs/weBuild/3.png",
      quote: "If anyone's looking for reliable, friendly, and efficient I.T. support, I can't recommend Good Company I.T. enough!",
      author: "ON-Demand Trading Compliance",
      size: "normal"
    }
  ],
  right: [
    {
      id: 4,
      image: "/imgs/weBuild/4.png",
      quote: "Julian Ussa is always super helpful and resolves my issues quickly. Thanks Julian!",
      author: "Bryce James",
      size: "normal"
    },
    {
      id: 5,
      image: "/imgs/weBuild/5.png",
      quote: "The team explained everything very well and were super helpful. They are easy to work with and great communicators.",
      author: "Skyler Perry",
      size: "normal"
    },
    {
      id: 6,
      image: "/imgs/weBuild/6.png",
      quote: "Amazing! Julian from Good Company I.T. is an incredible support for any I.T. issue. He is prompt, patient, and extremely helpful + knowledgeable. I HIGHLY recommend Good Company I.T.!",
      author: "Allysa Hoffman",
      size: "large"
    }
  ]
};

// Combine and shuffle quotes for mobile display
const getMobileQuotes = () => {
  const allOriginal = [...ORIGINAL_QUOTES.left, ...ORIGINAL_QUOTES.right];
  
  // Shuffle the array for better visual distribution
  return allOriginal.sort(() => Math.random() - 0.5);
};

// Utility functions
const getScreenType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const { innerWidth: width, innerHeight: height } = window;
  
  if (width < SCREEN_BREAKPOINTS.MOBILE) return 'mobile';
  if (width < SCREEN_BREAKPOINTS.TABLET) return 'tablet';
  if (width >= SCREEN_BREAKPOINTS.ULTRAWIDE) return 'ultrawide';
  if (width >= SCREEN_BREAKPOINTS.HUGE || height >= 1600) return 'huge';
  if (width >= SCREEN_BREAKPOINTS.XL || height >= 1200) return 'xl';
  if (width >= SCREEN_BREAKPOINTS.LARGE || height >= 900) return 'lg';
  return 'desktop';
};

const getScreenConfig = (screenType) => {
  const configs = {
    mobile: { multiplier: 1, maxTransform: 0, heightMultiplier: 0, sectionHeight: 'auto' },
    tablet: { multiplier: 1, maxTransform: 0, heightMultiplier: 0, sectionHeight: 'auto' },
    desktop: { multiplier: 1.2, maxTransform: 600, heightMultiplier: 0.8, sectionHeight: '380vh' },
    lg: { multiplier: 1.6, maxTransform: 700, heightMultiplier: 0.9, sectionHeight: '420vh' },
    xl: { multiplier: 2.0, maxTransform: 800, heightMultiplier: 1.0, sectionHeight: '450vh' },
    huge: { multiplier: 2.5, maxTransform: 1000, heightMultiplier: 1.2, sectionHeight: '500vh' },
    ultrawide: { multiplier: 3.0, maxTransform: 1200, heightMultiplier: 1.4, sectionHeight: '550vh' }
  };
  
  return configs[screenType] || configs.desktop;
};

const generateAdaptiveCards = (baseCards, screenType) => {
  const { multiplier } = getScreenConfig(screenType);
  const totalCards = Math.ceil(baseCards.length * multiplier);
  
  return Array.from({ length: totalCards }, (_, i) => {
    const originalCard = baseCards[i % baseCards.length];
    return {
      ...originalCard,
      id: `${originalCard.id}-ext-${i}`,
    };
  });
};

const renderHighlightedText = (text, highlight) => {
  if (!highlight) return text;
  
  const parts = text.split(highlight);
  if (parts.length === 1) return text;
  
  return (
    <>
      {parts[0]}
      <span className="text-primary-orange">{highlight}</span>
      {parts[1]}
    </>
  );
};

const renderDescriptionWithHighlight = (description, highlight) => {
  if (!highlight) return description;
  
  const parts = description.split(highlight);
  if (parts.length === 1) return description;
  
  return (
    <>
      {parts[0]}
      <span className="font-semibold text-gray-900">{highlight}</span>
      {parts[1]}
    </>
  );
};

// Animation calculations
const calculateCenterContentAnimation = (scrollProgress) => {
  const { FADE_IN_START, FADE_IN_END, VISIBLE_END, FADE_OUT_END } = SCROLL_THRESHOLDS;
  
  let opacity = 0;
  let scale = 0.95;
  let blur = 3;
  let isSticky = false;

  if (scrollProgress >= FADE_IN_START && scrollProgress <= FADE_IN_END) {
    const fadeProgress = (scrollProgress - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);
    const easedProgress = 1 - Math.pow(1 - fadeProgress, 3);
    opacity = easedProgress;
    scale = 0.95 + (easedProgress * 0.05);
    blur = 3 * (1 - easedProgress);
    isSticky = true;
  } else if (scrollProgress > FADE_IN_END && scrollProgress <= VISIBLE_END) {
    opacity = 1;
    scale = 1;
    blur = 0;
    isSticky = true;
  } else if (scrollProgress > VISIBLE_END && scrollProgress <= FADE_OUT_END) {
    const fadeProgress = (scrollProgress - VISIBLE_END) / (FADE_OUT_END - VISIBLE_END);
    const easedProgress = Math.pow(fadeProgress, 2);
    opacity = 1 - easedProgress;
    scale = 1 - (easedProgress * 0.05);
    blur = 3 * easedProgress;
    isSticky = true;
  } else if (scrollProgress > FADE_OUT_END) {
    opacity = 0;
    scale = 0.95;
    blur = 3;
    isSticky = false;
  }

  return { opacity, scale, blur, isSticky };
};

const calculateTransforms = (scrollProgress, screenType) => {
  const { maxTransform, heightMultiplier } = getScreenConfig(screenType);
  
  if (screenType === 'mobile' || screenType === 'tablet') {
    return { leftTransform: 0, rightTransform: 0 };
  }
  
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const finalMaxTransform = Math.min(maxTransform, screenHeight * heightMultiplier);
  
  const easedProgress = scrollProgress < 0.75 ? scrollProgress :
    0.75 + (scrollProgress - 0.75) * 0.2;

  return {
    leftTransform: Math.round(easedProgress * finalMaxTransform),
    rightTransform: Math.round(-easedProgress * finalMaxTransform)
  };
};

// Main component
const QuotesSection = ({
  centerTitle = "We don't just build I.T. systems, we build relationships.",
  centerTitleHighlight = "we build relationships.",
  centerDescription = "Our clients trust us because we show up, solve problems, and deliver results that make their day-to-day easier and their growth more secure.",
  centerDescriptionHighlight = "we show up, solve problems, and deliver results",
  centerSecondParagraph = null,
  centerSecondParagraphHighlight = null,
  buttonText = "Learn More",
  onButtonClick
}) => {
  // Refs
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const centerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastScrollProgressRef = useRef(0);

  // State
  const [screenType, setScreenType] = useState('desktop');
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Generate cards based on screen type
  const leftColumnQuotes = generateAdaptiveCards(BASE_QUOTES.left, screenType);
  const rightColumnQuotes = generateAdaptiveCards(BASE_QUOTES.right, screenType);

  // Screen type detection
  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation update function
  const updateAnimation = useCallback((scrollProgress) => {
    if (screenType === 'mobile' || screenType === 'tablet' || animationComplete) return;

    const elements = {
      leftColumn: leftColumnRef.current,
      rightColumn: rightColumnRef.current,
      centerContent: centerRef.current
    };

    if (!elements.leftColumn || !elements.rightColumn || !elements.centerContent) return;

    // Throttle updates
    const progressDiff = Math.abs(scrollProgress - lastScrollProgressRef.current);
    if (progressDiff < 0.001) return;
    lastScrollProgressRef.current = scrollProgress;

    // Calculate transforms and animations
    const { leftTransform, rightTransform } = calculateTransforms(scrollProgress, screenType);
    const { opacity, scale, blur, isSticky } = calculateCenterContentAnimation(scrollProgress);

    // Apply column transforms
    elements.leftColumn.style.transform = `translate3d(0, ${leftTransform}px, 0)`;
    elements.rightColumn.style.transform = `translate3d(0, ${rightTransform}px, 0)`;

    // Apply center content styles
    if (isSticky && scrollProgress >= SCROLL_THRESHOLDS.FADE_IN_START && scrollProgress <= SCROLL_THRESHOLDS.FADE_OUT_END) {
      Object.assign(elements.centerContent.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: '20',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        transition: 'none'
      });
    } else {
      Object.assign(elements.centerContent.style, {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: 'auto',
        pointerEvents: 'auto',
        transition: `all ${ANIMATION_CONFIG.DURATION.FAST}s cubic-bezier(${ANIMATION_CONFIG.EASING.join(',')})`
      });
    }
  }, [screenType, animationComplete]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (screenType === 'mobile' || screenType === 'tablet') return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const rawProgress = -rect.top / (rect.height - window.innerHeight);
      const scrollProgress = Math.max(0, Math.min(1, rawProgress));

      // Update visibility state
      const shouldBeVisible = scrollProgress > 0 && scrollProgress < SCROLL_THRESHOLDS.ANIMATION_COMPLETE;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }

      // Reset animation state when scrolling back
      if (scrollProgress < SCROLL_THRESHOLDS.FADE_OUT_END && animationComplete) {
        setAnimationComplete(false);
      }

      // Update animations
      if (scrollProgress > 0 && scrollProgress <= 1) {
        updateAnimation(scrollProgress);
      } else if (scrollProgress === 0) {
        // Reset transforms at the beginning
        const leftColumn = leftColumnRef.current;
        const rightColumn = rightColumnRef.current;

        if (leftColumn && rightColumn) {
          leftColumn.style.transform = 'translate3d(0, 0, 0)';
          rightColumn.style.transform = 'translate3d(0, 0, 0)';
          leftColumn.style.transition = `transform ${ANIMATION_CONFIG.DURATION.FAST}s ease-out`;
          rightColumn.style.transition = `transform ${ANIMATION_CONFIG.DURATION.FAST}s ease-out`;
        }
      }
    });
  }, [isVisible, updateAnimation, screenType, animationComplete]);

  // Setup effects
  useEffect(() => {
    if (screenType === 'mobile' || screenType === 'tablet') {
      // Reset all styles for mobile/tablet
      [leftColumnRef, rightColumnRef, centerRef].forEach(ref => {
        if (ref.current) {
          Object.assign(ref.current.style, {
            transform: 'none',
            transition: 'none',
            position: 'relative',
            top: 'auto',
            left: 'auto',
            opacity: '1',
            filter: 'none',
            zIndex: 'auto',
            pointerEvents: 'auto'
          });
        }
      });
      return;
    }

    // Desktop setup
    if (centerRef.current && !animationComplete) {
      Object.assign(centerRef.current.style, {
        opacity: '0',
        transform: 'scale(0.95)',
        filter: 'blur(3px)',
        transition: 'none'
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll, screenType, animationComplete]);

  // Mobile/Tablet Layout
  if (screenType === 'mobile' || screenType === 'tablet') {
    const mobileQuotes = getMobileQuotes();
    
    return (
      <div ref={sectionRef} className="relative bg-[#F3F5F9] overflow-hidden py-12 md:py-16">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/imgs/texture.svg')" }}
        />
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Center Content */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-text-dark mb-6 leading-tight">
              {renderHighlightedText(centerTitle, centerTitleHighlight)}
            </h2>

            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              {renderDescriptionWithHighlight(centerDescription, centerDescriptionHighlight)}
            </p>

            {centerSecondParagraph && (
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                {renderDescriptionWithHighlight(centerSecondParagraph, centerSecondParagraphHighlight)}
              </p>
            )}

            <Button className="mx-auto" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </div>

          {/* Quote Cards Grid - Original Unique Quotes Only */}
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            {mobileQuotes.map(quote => (
              <div key={quote.id} className="flex justify-center">
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  const { sectionHeight } = getScreenConfig(screenType);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F3F5F9] overflow-hidden"
      style={{ height: sectionHeight }}
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/imgs/texture.svg')" }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-stretch min-h-screen relative">
          {/* Left Column */}
          <div
            ref={leftColumnRef}
            className="flex flex-col items-center justify-center min-h-screen"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden', perspective: '1000px' }}
          >
            {leftColumnQuotes.map(quote => (
              <div key={quote.id} className={`flex justify-start`}>
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>

          {/* Center Content */}
          <div
            ref={centerRef}
            className="flex-1 flex items-center justify-center px-8 lg:px-16 min-w-0 min-h-screen"
            style={{ willChange: 'transform, opacity, filter', backfaceVisibility: 'hidden', perspective: '1000px' }}
          >
            <div className="text-center max-w-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark mb-6 leading-tight">
                {renderHighlightedText(centerTitle, centerTitleHighlight)}
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                {renderDescriptionWithHighlight(centerDescription, centerDescriptionHighlight)}
              </p>

              {centerSecondParagraph && (
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  {renderDescriptionWithHighlight(centerSecondParagraph, centerSecondParagraphHighlight)}
                </p>
              )}

              <Button className="mx-auto" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightColumnRef}
            className="flex flex-col items-center justify-center min-h-screen"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden', perspective: '1000px' }}
          >
            {rightColumnQuotes.map(quote => (
              <div key={quote.id} className={`flex justify-end`}>
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;