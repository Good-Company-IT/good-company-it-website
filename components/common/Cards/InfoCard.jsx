"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FaClock, 
  FaUsers, 
  FaComments, 
  FaGlobe, 
  FaShieldAlt, 
  FaHeart,
} from "react-icons/fa";

// InfoCard Component - Fully Responsive & Optimized
function InfoCard({ info, isActive }) {
  const getIcon = (index) => {
    const icons = [
      <FaClock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
      <FaUsers className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
      <FaComments className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
      <FaGlobe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
      <FaShieldAlt className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
      <FaHeart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />
    ];
    return icons[index] || icons[0];
  };

  return (
    <motion.div
      className="flex-shrink-0 
                 w-[280px] h-[320px]
                 sm:w-[300px] sm:h-[340px] 
                 md:w-[320px] md:h-[400px]
                 lg:w-[340px] lg:h-[400px]
                 xl:w-[360px] xl:h-[400px]
                 bg-white rounded-xl px-4 py-10 sm:p-5 md:p-6 shadow-lg border border-primary-orange"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.8, 
        scale: isActive ? 1 : 0.95, 
        y: 0 
      }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Icon */}
      <div className="flex justify-start mb-4 sm:mb-5 md:mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center">
          {getIcon(info.index)}
        </div>
      </div>

      {/* Content */}
      <div className="text-left text-text-dark space-y-2 sm:space-y-3 md:space-y-4">
        {/* Title */}
        <h3 className="font-bold 
                       text-md sm:text-lg md:text-xl 
                       leading-tight line-clamp-2">
          {info.title}
        </h3>

        {/* Description */}
        <p className="text-left
                      text-sm sm:text-base md:text-lg 
                      leading-relaxed line-clamp-4 sm:line-clamp-5 md:line-clamp-6">
          {info.text}
        </p>
      </div>
    </motion.div>
  );
}
export default InfoCard;