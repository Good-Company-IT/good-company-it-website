"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedBlock({
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