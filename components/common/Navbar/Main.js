"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useWindowDimensions } from "@/utils/screen-measure/getWindowDimensions";
import { usePathname } from "next/navigation";

import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import logo from "@/public/logo.svg";
import { Button } from "../Buttons/Button";

function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const path = usePathname();
  const { width } = useWindowDimensions();
  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true, threshold: 0.1 });

  const linksStyle = {
    desktop: `text-white hover:text-primary-orange cursor-pointer font-normal py-2 transition-all duration-200 flex items-center gap-1`,
    mobile: `text-text-dark cursor-pointer font-normal px-4 py-3 text-lg hover:text-black hover:bg-gray-50 transition-all duration-200 rounded-md block w-full text-left`,
  };

  // Navigation data structure
  const navigationItems = [
    {
      label: "IT Services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Web Development", href: "/services/web-development" },
        { label: "Mobile Apps", href: "/services/mobile-apps" },
        { label: "Cloud Solutions", href: "/services/cloud" },
        { label: "Cybersecurity", href: "/services/security" },
        { label: "IT Consulting", href: "/services/consulting" },
      ]
    },
    {
      label: "Blog",
      hasDropdown: true,
      dropdownItems: [
        { label: "Case Studies", href: "/clients/case-studies" },
        { label: "Testimonials", href: "/clients/testimonials" },
        { label: "Success Stories", href: "/clients/success-stories" },
        { label: "Client Portal", href: "/clients/portal" },
      ]
    },
    {
      label: "About Us",
      hasDropdown: true,
      dropdownItems: [
        { label: "Our Story", href: "/about/story" },
        { label: "Team", href: "/about/team" },
        { label: "Careers", href: "/about/careers" },
        { label: "Contact", href: "/about/contact" },
      ]
    },
    {
      label: "Community Work",
      hasDropdown: true,
      dropdownItems: [
        { label: "Local Initiatives", href: "/community/initiatives" },
        { label: "Partnerships", href: "/community/partnerships" },
        { label: "Volunteer Programs", href: "/community/volunteer" },
        { label: "Events", href: "/community/events" },
      ]
    }
  ];

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleCloseMenus = () => {
    setActiveDropdown(null);
    setMobileMenuIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY <= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = () => setMobileMenuIsOpen(!mobileMenuIsOpen);
  const handleCloseMenu = () => setMobileMenuIsOpen(false);

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

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 150,
        damping: 15,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 1, 1]
      }
    }
  };

  const dropdownItemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      x: -5
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

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
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative"
                variants={linkVariants}
              >
                <motion.button
                  onClick={() => handleDropdownToggle(index)}
                  className={linksStyle.desktop}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === index && (
                    <motion.div
                      className="absolute top-full left-0 w-72 bg-black/95 backdrop-blur-md text-white mt-2 rounded-lg shadow-xl z-50 border border-white/10"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {item.dropdownItems.map((dropdownItem, idx) => (
                        <motion.div key={dropdownItem.href} variants={dropdownItemVariants}>
                          <Link
                            href={dropdownItem.href}
                            onClick={handleCloseMenus}
                            className="block px-5 py-3 text-base hover:bg-orange-500/20 hover:text-primary-orange transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {dropdownItem.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

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
              className="px-6 py-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.3,
                staggerChildren: 0.12,
                delayChildren: 0.2
              }}
            >
              {navigationItems.map((item, index) => (
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
                  <p className="text-gray-500 uppercase text-xs mb-2 font-semibold">
                    {item.label}
                  </p>
                  {item.dropdownItems.map((dropdownItem, idx) => (
                    <motion.div
                      key={dropdownItem.href}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.44 + (index * 0.1) + (idx * 0.05),
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <Link
                        href={dropdownItem.href}
                        className={linksStyle.mobile}
                        onClick={handleCloseMenu}
                      >
                        {dropdownItem.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: -25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 180,
                  damping: 18
                }}
                className="pt-4 flex justify-center"
              >
                <Button appearance="primary">Secure Your Business</Button>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;