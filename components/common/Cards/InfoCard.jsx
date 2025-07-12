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

// InfoCard Component - Fully Responsive & Optimized with Variant Support
function InfoCard({ info, isActive, variant = "primary" }) {
  // Color configurations based on variant
  const getVariantStyles = () => {
    if (variant === "secondary") {
      return {
        borderColor: "border-primary-orange",
        iconBgColor: "bg-primary-blue",
        iconTextColor: "text-white",
        titleColor: "text-white",
        descriptionColor: "text-white",
        bgColor: "backdrop-blur-[25px] bg-gradient-to-br from-white/15 via-blue-900/15 to-slate-900/15",
        borderColor: "border border-[#DBDDFB]",
      };
    }
    
    if (variant === "terciary") {
      return {
        borderColor: "border border-[#DBDDFB] rounded-xl",
        iconBgColor: "bg-transparent p-0",
        iconTextColor: "text-primary-blue",
        titleColor: "text-white",
        descriptionColor: "text-white",
        bgColor: "bg-gradient-to-br from-white/15 via-blue-900/15 to-slate-900/15"
      };
    }
    
    // Primary variant (default)
    return {
      borderColor: "border-primary-orange",
      iconBgColor: "bg-blue-50",
      iconTextColor: "text-primary-blue",
      titleColor: "text-text-dark",
      descriptionColor: "text-text-dark",
      bgColor: "bg-white"
    };
  };

  // Height configurations based on variant
  const getHeightStyles = () => {
    if (variant === "terciary") {
      return `w-[280px] h-[250px]
              sm:w-[300px] sm:h-[270px] 
              md:w-[320px] md:h-[280px]
              lg:w-[340px] lg:h-[290px]
              xl:w-[360px] xl:h-[300px]`;
    }
    
    // Default height for primary and secondary variants
    return `w-[280px] h-[320px]
            sm:w-[300px] sm:h-[340px] 
            md:w-[320px] md:h-[400px]
            lg:w-[340px] lg:h-[400px]
            xl:w-[360px] xl:h-[400px]`;
  };

  const styles = getVariantStyles();
  const heightStyles = getHeightStyles();

  const getIcon = (index) => {
    const iconClass = `w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${styles.iconTextColor}`;
    
    const icons = [
      <FaClock className={iconClass} />,
      <FaUsers className={iconClass} />,
      <FaComments className={iconClass} />,
      <FaGlobe className={iconClass} />,
      <FaShieldAlt className={iconClass} />,
      <FaHeart className={iconClass} />
    ];
    return icons[index] || icons[0];
  };

  return (
    <motion.div
      className={`flex-shrink-0 
                 ${heightStyles}
               ${styles.bgColor} ${styles.borderColor} rounded-xl px-4 py-6 sm:p-5 md:p-6 shadow-lg`}
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
      <div className="flex justify-start mb-3 sm:mb-4 md:mb-5">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${styles.iconBgColor} rounded-full flex items-center justify-center`}>
          {getIcon(info.index)}
        </div>
      </div>

      {/* Content */}
      <div className="text-left space-y-2 sm:space-y-3">
        {/* Title */}
        <h3 className={`font-bold 
                       text-md sm:text-lg md:text-xl 
                       leading-tight line-clamp-2 ${styles.titleColor}`}>
          {info.title}
        </h3>

        {/* Description */}
        <p className={`text-left
                      text-sm sm:text-base md:text-lg 
                      leading-relaxed line-clamp-3 sm:line-clamp-4 ${styles.descriptionColor}`}>
          {info.text}
        </p>
      </div>
    </motion.div>
  );
}

export default InfoCard;