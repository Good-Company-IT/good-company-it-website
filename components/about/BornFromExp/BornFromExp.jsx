"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/common/Buttons/Button";

const BornFromExp = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-white lg:px-24 py-44 sm:py-60 lg:py-64 xl:py-72"
    >
        {/* Overlay Image - Now behind content */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/imgs/why/texture.png')",
        }}
      />
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
        >
          {/* Left Side - Title and Description */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div variants={textVariants} className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-regular text-text-dark leading-tight">
                Born from Experience.
              </h2>
              <h3 className="text-3xl sm:text-4xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
                Built on Purpose.
              </h3>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="text-text-dark text-sm sm:text-base leading-relaxed max-w-lg"
            >
              We believe good support feels like part of your team: 
              thoughtful, responsive, and reliable.
            </motion.p>
          </div>

          {/* Right Side - Two Paragraphs */}
          <div className="space-y-8 lg:space-y-12">
            {/* First Paragraph */}
            <motion.p 
              variants={textVariants}
              className="text-text-dark text-sm sm:text-base leading-relaxed"
            >
              Good Company was founded in 2024 by two cybersecurity 
              professionals who saw the same pattern again and again: 
              businesses weren't just struggling with tech; they were 
              struggling to find honest, responsive, and human I.T. support. 
              We knew there had to be a better way. So we built it.
            </motion.p>

            {/* Second Paragraph with Orange Border */}
            <motion.div 
              variants={textVariants}
              className="border-2 border-primary-orange rounded-xl p-6 sm:p-8 bg-white"
            >
              <p className="text-text-dark text-sm sm:text-base leading-relaxed mb-4">
                Our goal was simple: <span className="font-semibold text-text-dark">
                to create a consulting partner that felt intimate and dependable, 
                even as companies scale.
                </span> A team that shows up early, communicates clearly, 
                and solves problems before they become emergencies.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Centered Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center mt-16 sm:mt-20 lg:mt-32 text-center space-y-8"
        >
          <motion.h4 
            variants={textVariants}
            className="text-2xl sm:text-3xl font-medium text-text-dark leading-tight max-w-5xl mx-auto"
          >
            We combine our technical expertise with AI-driven systems to 
            deliver practical, humane solutions to real-world problems.
          </motion.h4>

          <motion.div variants={buttonVariants}>
            <Button appearance="primary">
              Get in Touch with Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BornFromExp;