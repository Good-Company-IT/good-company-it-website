"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { usePathname } from "next/navigation";

import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import logo from "@/public/logo.svg";
import { Button } from "../Buttons/Button";

function Navbar() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const path = usePathname();
  const navRef = useRef(null);

  // Helper function to check if a link is active
  const isLinkActive = (href) => {
    // Handle language prefixes (e.g., /fr, /en, /es)
    const pathWithoutLang = path.replace(/^\/[a-z]{2}/, '') || '/';
    
    if (href === '/') {
      return pathWithoutLang === '/';
    }
    return pathWithoutLang.startsWith(href);
  };

  const linksStyle = {
    desktop: `hover:text-primary-orange cursor-pointer font-normal py-2 transition-all duration-200 flex items-center gap-1`,
    mobile: `cursor-pointer font-normal px-4 py-3 text-lg hover:text-black hover:bg-gray-50 transition-all duration-200 rounded-md block w-full text-left`,
  };

  // Navigation data structure - simplified to just links
  const navigationItems = [
    {
      label: "IT Services",
      href: "/services"
    },
    {
      label: "About Us",
      href: "/about"
    },
    {
      label: "Community Work",
      href: "/community"
    }
  ];

  const handleCloseMenu = () => {
    setMobileMenuIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuToggle = () => setMobileMenuIsOpen(!mobileMenuIsOpen);

  // Animation variants
  const navContainerVariants = {
    hidden: {
      opacity: 0,
      y: -50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      y: -60,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const navLinksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.2,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.9,
      rotate: -3
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const mobileButtonVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
      rotate: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Debug: Console log the current path
  console.log('Current path:', path);

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 w-full h-16 md:h-20 z-50 text-white bg-black"
        variants={navContainerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div variants={logoVariants}>
            <Link href="/">
              <Image src={logo} alt="Good Company Logo" className="h-10 md:h-12 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center gap-8"
            variants={navLinksVariants}
          >
            {navigationItems.map((item, index) => {
              const isActive = isLinkActive(item.href);
              return (
                <motion.div
                  key={item.label}
                  variants={linkVariants}
                >
                  <Link
                    href={item.href}
                    className={`${linksStyle.desktop} ${
                      isActive ? 'text-primary-orange' : 'text-white'
                    }`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA Button */}
            <motion.div variants={linkVariants}>
              <Button appearance="primary">
                Secure Your Business
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={handleMenuToggle}
            className="lg:hidden"
            variants={mobileButtonVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuIsOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuIsOpen ? (
                  <IoClose className="w-6 h-6" />
                ) : (
                  <IoMdMenu className="w-6 h-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 150,
              damping: 18
            }}
            className="lg:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-screen overflow-y-auto"
          >
            <motion.div
              className="px-6 py-6 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.3,
                staggerChildren: 0.12,
                delayChildren: 0.2
              }}
            >
              {navigationItems.map((item, index) => {
                const isActive = isLinkActive(item.href);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -25, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.32 + (index * 0.1),
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 180,
                      damping: 18
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`${linksStyle.mobile} ${
                        isActive ? 'text-primary-orange bg-orange-50' : 'text-text-dark'
                      }`}
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: -25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 180,
                  damping: 18
                }}
                className="pt-4 flex justify-center"
              >
                <Button appearance="primary" onClick={handleCloseMenu}>
                  Secure Your Business
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;