"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/common/Buttons/Button";

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.2 }
    }
  },
  heading: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  gradientText: {
    hidden: { opacity: 0, y: 40, scale: 0.98, rotateX: 15 },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 } }
  },
  description: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 } }
  },
  button: {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 } }
  }
};

// Heading styles configuration
const headingStyles = {
  'gradient-orange': {
    variant: 'gradientText',
    className: 'font-bold',
    wrapper: (text) => (
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
        {text}
      </span>
    )
  },
  'gradient-blue': {
    variant: 'gradientText',
    className: 'font-bold',
    wrapper: (text) => (
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-primary-blue">
        {text}
      </span>
    )
  },
  'highlight-orange': {
    variant: 'heading',
    className: 'font-normal text-white',
    wrapper: (text, highlight) => {
      const parts = text.split(highlight || '');
      return (
        <>
          {parts[0]}
          {highlight && <span className="text-primary-orange font-bold">{highlight}</span>}
          {parts[1]}
        </>
      );
    }
  },
  'mixed-gradient': {
    variant: 'heading',
    className: 'font-normal text-white',
    wrapper: (text, highlight) => {
      const parts = text.split(highlight || '');
      return (
        <>
          {parts[0]}
          {highlight && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400 font-bold">
              {highlight}
            </span>
          )}
          {parts[1]}
        </>
      );
    }
  },
  'mixed-blue-gradient': {
    variant: 'heading',
    className: 'font-normal text-white',
    wrapper: (text, highlight) => {
      const parts = text.split(highlight || '');
      return (
        <>
          {parts[0]}
          {highlight && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-primary-blue font-bold">
              {highlight}
            </span>
          )}
          {parts[1]}
        </>
      );
    }
  },
  'normal': {
    variant: 'heading',
    className: 'font-normal text-white',
    wrapper: (text) => text
  }
};

// Background components
const backgrounds = {
  video: (videoSrc, backgroundProps) => (
    <motion.div className="absolute inset-0" {...backgroundProps}>
      {videoSrc && (
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </motion.div>
  ),
  gradient: (_, backgroundProps) => (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800"
      {...backgroundProps}
    />
  ),
  starfield: (_, backgroundProps) => (
    <motion.div className="absolute inset-0 bg-black" {...backgroundProps}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px] opacity-20"></div>
      </div>
    </motion.div>
  )
};

function HeroCTA({
  headings = [],
  description = null,
  cta = { text: "Get Started", href: "#" },
  backgroundType = "starfield",
  videoSrc = null,
  hasParallax = true,
  className = "",
  ...props
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = hasParallax ? useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) : "0%";
  const overlayOpacity = hasParallax ? useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.8]) : 0.3;

  const baseClasses = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight";
  const backgroundProps = hasParallax ? { style: { y: backgroundY } } : {};

  const renderHeading = (heading, index) => {
    const style = headingStyles[heading.style] || headingStyles.normal;
    const Tag = style.variant === 'gradientText' ? motion.h2 : motion.h1;
    
    return (
      <Tag
        key={index}
        variants={animations[style.variant]}
        className={`${baseClasses} ${style.className}`}
        whileHover={style.variant === 'gradientText' ? { 
          scale: 1.02, 
          transition: { duration: 0.3, ease: "easeOut" } 
        } : undefined}
      >
        {style.wrapper(heading.text, heading.highlight)}
      </Tag>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen max-h-[600px] sm:h-screen sm:max-h-[800px] flex items-center justify-center overflow-hidden bg-black ${className}`}
      {...props}
    >
      {/* Background */}
      {backgrounds[backgroundType]?.(videoSrc, backgroundProps) || backgrounds.starfield(null, backgroundProps)}

      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/30"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        variants={animations.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Headings */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          {headings.map(renderHeading)}
        </div>

        {/* Description */}
        {description && (
          <motion.div variants={animations.description} className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {description}
            </p>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center" 
          variants={animations.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button appearance="primary" href={cta.href}>
            {cta.text}
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
      >
        {[
          { position: "top-0", gradient: "from-black/20 to-transparent", direction: "bg-gradient-to-b", y: -20 },
          { position: "bottom-0", gradient: "from-black/20 to-transparent", direction: "bg-gradient-to-t", y: 20 }
        ].map((deco, i) => (
          <motion.div 
            key={i}
            className={`absolute ${deco.position} left-0 w-full h-1/3 ${deco.direction} ${deco.gradient}`}
            initial={{ opacity: 0, y: deco.y }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: deco.y }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default HeroCTA;