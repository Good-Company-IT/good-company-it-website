import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/common/Buttons/Button';
import QuoteCard from '@/components/common/Cards/QuoteCard';

const QuotesSection = ({ 
  servicesPage = false,
  centerTitle = "We don't just build IT systems, we build relationships.",
  centerTitleHighlight = "we build relationships.",
  centerDescription = "Our clients trust us because we show up, solve problems, and deliver results that make their day-to-day easier and their growth more secure.",
  centerDescriptionHighlight = "we show up, solve problems, and deliver results",
  centerSecondParagraph = null,
  centerSecondParagraphHighlight = null,
  buttonText = "Learn More",
  onButtonClick
}) => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const centerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastScrollProgressRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  // Helper function to render title with highlight
  const renderTitle = () => {
    if (!centerTitleHighlight) {
      return centerTitle;
    }

    const parts = centerTitle.split(centerTitleHighlight);
    if (parts.length === 1) {
      return centerTitle;
    }

    return (
      <>
        {parts[0]}
        <span className="text-primary-orange">
          {centerTitleHighlight}
        </span>
        {parts[1]}
      </>
    );
  };

  // Helper function to render description with highlight
  const renderDescription = () => {
    if (!centerDescriptionHighlight) {
      return centerDescription;
    }

    const parts = centerDescription.split(centerDescriptionHighlight);
    if (parts.length === 1) {
      return centerDescription;
    }

    return (
      <>
        {parts[0]}
        <span className="font-semibold text-gray-900">{centerDescriptionHighlight}</span>
        {parts[1]}
      </>
    );
  };

  // Helper function to render second paragraph with highlight
  const renderSecondParagraph = () => {
    if (!centerSecondParagraph) return null;

    if (!centerSecondParagraphHighlight) {
      return centerSecondParagraph;
    }

    const parts = centerSecondParagraph.split(centerSecondParagraphHighlight);
    if (parts.length === 1) {
      return centerSecondParagraph;
    }

    return (
      <>
        {parts[0]}
        <span className="font-semibold text-gray-900">{centerSecondParagraphHighlight}</span>
        {parts[1]}
      </>
    );
  };

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optimized animation function - only for desktop
  const updateAnimation = useCallback((scrollProgress) => {
    if (isMobile || isTablet) return; // Skip animations on mobile/tablet

    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;
    const centerContent = centerRef.current;

    if (!leftColumn || !rightColumn || !centerContent) return;

    // Only update if scroll progress has changed significantly
    const progressDiff = Math.abs(scrollProgress - lastScrollProgressRef.current);
    if (progressDiff < 0.001) return;

    lastScrollProgressRef.current = scrollProgress;

    // Calculate transforms with easing for smoother end
    const maxTransform = Math.min(500, window.innerHeight * 0.6); // Responsive max transform
    const easedProgress = scrollProgress < 0.8 ? scrollProgress :
      0.8 + (scrollProgress - 0.8) * 0.5; // Slow down after 80%

    const leftTransform = Math.round(easedProgress * maxTransform);
    const rightTransform = Math.round(-easedProgress * maxTransform);

    // Apply column transforms
    leftColumn.style.transform = `translate3d(0, ${leftTransform}px, 0)`;
    rightColumn.style.transform = `translate3d(0, ${rightTransform}px, 0)`;

    // Calculate center content properties
    let opacity = 0;
    let scale = 0.95;
    let blur = 3;
    let isSticky = false;

    if (scrollProgress >= 0.05 && scrollProgress <= 0.15) {
      // Fade in phase
      const fadeProgress = (scrollProgress - 0.05) / 0.1;
      const easedProgress = 1 - Math.pow(1 - fadeProgress, 3); // Ease out cubic
      opacity = easedProgress;
      scale = 0.95 + (easedProgress * 0.05);
      blur = 3 * (1 - easedProgress);
      isSticky = true;
    } else if (scrollProgress > 0.15 && scrollProgress <= 0.55) {
      // Fully visible phase
      opacity = 1;
      scale = 1;
      blur = 0;
      isSticky = true;
    } else if (scrollProgress > 0.55 && scrollProgress <= 0.75) {
      // Extended fade out phase for smoother ending
      const fadeProgress = (scrollProgress - 0.55) / 0.2;
      const easedProgress = Math.pow(fadeProgress, 2); // Ease in quadratic
      opacity = 1 - easedProgress;
      scale = 1 - (easedProgress * 0.05);
      blur = 3 * easedProgress;
      isSticky = true;
    } else if (scrollProgress > 0.75 && scrollProgress <= 0.85) {
      // Final transition phase - smooth release from sticky
      const releaseProgress = (scrollProgress - 0.75) / 0.1;
      const easedRelease = 1 - Math.pow(1 - releaseProgress, 3);

      centerContent.style.position = 'relative';
      centerContent.style.top = 'auto';
      centerContent.style.left = 'auto';
      centerContent.style.transform = `scale(${0.95 + easedRelease * 0.05})`;
      centerContent.style.opacity = easedRelease;
      centerContent.style.filter = `blur(${3 * (1 - easedRelease)}px)`;
      centerContent.style.zIndex = 'auto';
      centerContent.style.pointerEvents = 'auto';
      centerContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      return; // Early return to avoid sticky logic
    }

    // Apply center content styles
    if (isSticky && scrollProgress <= 0.75) {
      centerContent.style.position = 'fixed';
      centerContent.style.top = '50%';
      centerContent.style.left = '50%';
      centerContent.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
      centerContent.style.opacity = opacity;
      centerContent.style.filter = `blur(${blur}px)`;
      centerContent.style.zIndex = '20';
      centerContent.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      centerContent.style.transition = 'none';
    } else if (scrollProgress > 0.85) {
      // Final state - fully reset and visible
      centerContent.style.position = 'relative';
      centerContent.style.top = 'auto';
      centerContent.style.left = 'auto';
      centerContent.style.transform = 'none';
      centerContent.style.opacity = '1';
      centerContent.style.filter = 'none';
      centerContent.style.zIndex = 'auto';
      centerContent.style.pointerEvents = 'auto';
      centerContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, [isMobile, isTablet]);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (isMobile || isTablet) return; // Skip scroll handling on mobile/tablet

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress with improved bounds
      const rawProgress = -sectionTop / (sectionHeight - windowHeight);
      const scrollProgress = Math.max(0, Math.min(0.95, rawProgress)); // Cap at 95% to ensure clean ending

      // Update visibility state
      const shouldBeVisible = scrollProgress > 0 && scrollProgress < 0.95;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }

      // Update animations only when section is visible
      if (shouldBeVisible) {
        updateAnimation(scrollProgress);
      } else if (scrollProgress >= 0.95) {
        // Final cleanup state - ensure everything is properly positioned
        const leftColumn = leftColumnRef.current;
        const rightColumn = rightColumnRef.current;
        const centerContent = centerRef.current;

        if (leftColumn && rightColumn && centerContent) {
          // Set final positions for columns
          const finalTransform = Math.round(0.8 * Math.min(500, window.innerHeight * 0.6));
          leftColumn.style.transform = `translate3d(0, ${finalTransform}px, 0)`;
          rightColumn.style.transform = `translate3d(0, ${-finalTransform}px, 0)`;
          leftColumn.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          rightColumn.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

          // Ensure center content is properly positioned and visible
          centerContent.style.position = 'relative';
          centerContent.style.top = 'auto';
          centerContent.style.left = 'auto';
          centerContent.style.transform = 'none';
          centerContent.style.opacity = '1';
          centerContent.style.filter = 'none';
          centerContent.style.zIndex = 'auto';
          centerContent.style.pointerEvents = 'auto';
          centerContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        // Reset last scroll progress
        lastScrollProgressRef.current = scrollProgress;
      } else {
        // Reset all transforms when section is completely out of view (beginning)
        const leftColumn = leftColumnRef.current;
        const rightColumn = rightColumnRef.current;
        const centerContent = centerRef.current;

        if (leftColumn && rightColumn && centerContent) {
          leftColumn.style.transform = 'translate3d(0, 0, 0)';
          rightColumn.style.transform = 'translate3d(0, 0, 0)';
          leftColumn.style.transition = 'transform 0.3s ease-out';
          rightColumn.style.transition = 'transform 0.3s ease-out';

          centerContent.style.position = 'relative';
          centerContent.style.top = 'auto';
          centerContent.style.left = 'auto';
          centerContent.style.transform = 'scale(0.95)';
          centerContent.style.opacity = '0';
          centerContent.style.filter = 'blur(3px)';
          centerContent.style.zIndex = 'auto';
          centerContent.style.pointerEvents = 'auto';
          centerContent.style.transition = 'all 0.3s ease-out';
        }

        // Reset last scroll progress
        lastScrollProgressRef.current = 0;
      }
    });
  }, [isVisible, updateAnimation, isMobile, isTablet]);

  useEffect(() => {
    if (isMobile || isTablet) {
      // Reset all styles for mobile/tablet
      const leftColumn = leftColumnRef.current;
      const rightColumn = rightColumnRef.current;
      const centerContent = centerRef.current;

      if (leftColumn && rightColumn && centerContent) {
        leftColumn.style.transform = 'none';
        rightColumn.style.transform = 'none';
        leftColumn.style.transition = 'none';
        rightColumn.style.transition = 'none';

        centerContent.style.position = 'relative';
        centerContent.style.top = 'auto';
        centerContent.style.left = 'auto';
        centerContent.style.transform = 'none';
        centerContent.style.opacity = '1';
        centerContent.style.filter = 'none';
        centerContent.style.zIndex = 'auto';
        centerContent.style.pointerEvents = 'auto';
        centerContent.style.transition = 'none';
      }
      return;
    }

    // Initial setup for desktop
    const centerContent = centerRef.current;
    if (centerContent) {
      centerContent.style.opacity = '0';
      centerContent.style.transform = 'scale(0.95)';
      centerContent.style.filter = 'blur(3px)';
      centerContent.style.transition = 'none';
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      // Cleanup
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll, isMobile, isTablet]);

  // Get responsive height
  const getSectionHeight = () => {
    if (isMobile) return 'auto';
    if (isTablet) return '200vh';
    return '300vh';
  };

  // Mobile/Tablet Layout
  if (isMobile || isTablet) {
    return (
      <div
        ref={sectionRef}
        className="relative bg-[#F3F5F9] overflow-hidden py-12 md:py-16"
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/imgs/texture.svg')",
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Center Content First on Mobile */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-6 leading-tight">
              {renderTitle()}
            </h2>

            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              {renderDescription()}
            </p>

            {centerSecondParagraph && (
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                {renderSecondParagraph()}
              </p>
            )}

            <Button 
              className="mx-auto"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>

          {/* Quote Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column Cards */}
            <div className="">
              {leftColumnQuotes.map((quote, index) => (
                <div key={quote.id} className="flex justify-center">
                  <QuoteCard {...quote} />
                </div>
              ))}
            </div>

            {/* Right Column Cards */}
            <div className="">
              {rightColumnQuotes.map((quote, index) => (
                <div key={quote.id} className="flex justify-center">
                  <QuoteCard {...quote} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout with Animations
  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F3F5F9] overflow-hidden max-h-[2500px]"
      style={{ height: getSectionHeight() }}
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/imgs/texture.svg')",
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        {/* Quote Cards Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch min-h-screen relative">
          {/* Left Column */}
          <div
            ref={leftColumnRef}
            className="flex flex-col items-center justify-center min-h-screen"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {leftColumnQuotes.map((quote, index) => (
              <div key={quote.id} className="flex justify-start">
                <QuoteCard {...quote} />
              </div>
            ))}
          </div>

          {/* Center Content */}
          <div
            ref={centerRef}
            className="flex-1 flex items-center justify-center px-8 lg:px-16 min-w-0 min-h-screen"
            style={{
              willChange: 'transform, opacity, filter',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <div className="text-center max-w-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark mb-6 leading-tight">
                {renderTitle()}
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                {renderDescription()}
              </p>

              {centerSecondParagraph && (
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  {renderSecondParagraph()}
                </p>
              )}

              <Button 
                className="mx-auto"
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightColumnRef}
            className="flex flex-col items-center justify-center min-h-screen"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {rightColumnQuotes.map((quote, index) => (
              <div key={quote.id} className="flex justify-end">
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