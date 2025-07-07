"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FaEye, 
  FaCheckCircle, 
  FaRocket, 
  FaSync, 
  FaSearch, 
  FaCog 
} from "react-icons/fa";

const valuesData = [
    {
        id: 0,
        title: "Transparency",
        description: "At Good Company, transparency builds trust. We're open about how we protect what matters most.",
        imageSrc: "/imgs/values/transparency.png",
        imageAlt: "transparency image",
        color: "blue",
        icon: FaEye
    },
    {
        id: 1,
        title: "Diligence",
        description: "We take diligence seriously. Staying proactive, precise, and committed to securing every detail that matters.",
        imageSrc: "/imgs/values/diligence.png",
        imageAlt: "diligence image",
        color: "orange",
        icon: FaCheckCircle
    },
    {
        id: 2,
        title: "Agility",
        description: "We move fast, adapt quickly, and evolve with every challenge to keep clients protected in real time.",
        imageSrc: "/imgs/values/agility.png",
        imageAlt: "agility image",
        color: "blue",
        icon: FaRocket
    },
    {
        id: 3,
        title: "Adaptability",
        description: "We know startups move fast. Our consulting is proactive, flexible, and integrated into your team's rhythm.",
        imageSrc: "/imgs/values/adaptability.png",
        imageAlt: "adaptability image",
        color: "orange",
        icon: FaSync
    },
    {
        id: 4,
        title: "Thoroughness",
        description: "Every task is approached with precision and care to ensure nothing is overlooked in protecting your data.",
        imageSrc: "/imgs/values/thoroughness.png",
        imageAlt: "thoroughness image",
        color: "blue",
        icon: FaSearch
    },
    {
        id: 5,
        title: "Structure",
        description: "We build clear, organized processes that ensure consistent, reliable security every step of the way.",
        imageSrc: "/imgs/values/structure.png",
        imageAlt: "structure image",
        color: "blue",
        icon: FaCog
    }
];

function ValuesSelector() {
    const [activeValue, setActiveValue] = useState(0);

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.98,
            transition: {
                duration: 0.3,
            },
        },
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 1.05
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.3,
            },
        },
    };

    const getTextGradient = (color) => {
        if (color === "orange") {
            return "bg-gradient-to-r from-orange-500 via-orange-400 to-red-500";
        }
        return "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600";
    };

    const getButtonStyle = (index, color) => {
        const isActive = index === activeValue;

        if (isActive) {
            if (color === "orange") {
                return "bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 text-white shadow-lg";
            }
            return "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white shadow-lg";
        }

        return "bg-gradient-to-bl from-[#DBDDFB]/40 to-[#555886]/40 text-white hover:bg-white/30 hover:text-white/90";
    };

    const getCardGradient = (color) => {
        if (color === "orange") {
            return "bg-gradient-to-br from-orange-500/90 via-orange-400/90 to-red-500/90";
        }
        return "bg-gradient-to-br from-blue-500/90 via-blue-400/90 to-blue-600/90";
    };

    return (
        <>
            {/* Desktop Version (1024px and above) */}
            <div className="hidden lg:block w-full max-w-[480px] h-[650px] overflow-hidden">
                {/* Text Section */}
                <div className="h-[190px] flex items-center justify-center rounded-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeValue}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`${getTextGradient(valuesData[activeValue].color)} rounded-2xl px-8 py-11 w-full h-full flex items-center justify-center`}
                        >
                            <p className="text-white text-lg sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-medium leading-relaxed text-center">
                                {valuesData[activeValue].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Image Section */}
                <div className="h-[280px] py-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-300">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeValue}
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <Image
                                    src={valuesData[activeValue].imageSrc}
                                    alt={valuesData[activeValue].imageAlt}
                                    fill
                                    className="object-cover grayscale"
                                    sizes="(max-width: 480px) 100vw, 480px"
                                    priority={activeValue === 0}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="h-[170px] rounded-xl p-6 bg-gradient-to-br from-[#555886]/70 from-5% to-[#DBDDFB]">
                    <div className="flex flex-wrap gap-x-5 gap-y-3 h-full items-start content-start">
                        {valuesData.map((value, index) => (
                            <motion.button
                                key={value.id}
                                onClick={() => setActiveValue(index)}
                                className={`
                                ${getButtonStyle(index, value.color)}
                                rounded-full text-xs lg:text-sm font-light
                                transition-all duration-300 ease-out
                                border border-white/20
                                flex items-center justify-center
                                px-5 lg:px-5 xl:px-10 py-1
                                whitespace-nowrap
                              `}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                }}
                                initial={false}
                                animate={{
                                    scale: index === activeValue ? 1.05 : 1,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {value.title}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Version (below 1024px) */}
            <div className="lg:hidden w-full">
                {/* Title */}
                <h3 className="text-white text-xl font-semibold mb-6 text-center">Our Core Values</h3>
                
                {/* Horizontal Scrollable Cards */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 w-max">
                        {valuesData.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <motion.div
                                    key={value.id}
                                    className={`
                                        ${getCardGradient(value.color)}
                                        rounded-2xl p-6 w-80 sm:w-96 flex-shrink-0
                                        backdrop-blur-sm border border-white/20
                                        shadow-lg hover:shadow-xl transition-all duration-300
                                    `}
                                    whileHover={{ 
                                        scale: 1.02,
                                        y: -5
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Icon and Title */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <IconComponent className="text-white text-xl" />
                                        </div>
                                        <h4 className="text-white text-xl font-semibold">
                                            {value.title}
                                        </h4>
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                                        {value.description}
                                    </p>

                                    {/* Image */}
                                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white/10">
                                        <Image
                                            src={value.imageSrc}
                                            alt={value.imageAlt}
                                            fill
                                            className="object-cover grayscale opacity-80"
                                            sizes="(max-width: 640px) 320px, 384px"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-4 gap-2">
                    {valuesData.map((_, index) => (
                        <div
                            key={index}
                            className="w-2 h-2 rounded-full bg-white/30"
                        />
                    ))}
                    <div className="ml-2 text-white/60 text-xs">
                        Scroll to explore →
                    </div>
                </div>
            </div>
        </>
    );
}

export default ValuesSelector;