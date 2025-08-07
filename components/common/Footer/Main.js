"use client";

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';

const Footer = ({ locale, translations }) => {
    // Default fallbacks - Always use English
    const defaults = {
        services: "Services",
        resources: "Resources", 
        about: "About",
        allRightsReserved: "All rights reserved"
    };

    // Navigation sections matching the image layout
    const navigationSections = [
        {
            title: "Home",
            links: [
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" }
            ]
        },
        {
            title: defaults.services,
            links: [
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" }
            ]
        },
        {
            title: defaults.about,
            links: [
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" }
            ]
        },
        {
            title: defaults.resources,
            links: [
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" },
                { label: "Section here", href: "/" }
            ]
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.footer 
            className="relative bg-slate-900 text-white overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')",
                }}
            />

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: "url('/imgs/texture2.svg')",
                }}
            />

            {/* Background Pattern - Placeholder for your images */}
            <div className="absolute inset-0 opacity-10">
                {/* You can add your background images here */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                    {/* Left Side - Logo and Social */}
                    <motion.div 
                        className="flex flex-col space-y-8"
                        variants={itemVariants}
                    >
                        {/* Logo */}
                        <div>
                            <Image src="/logo.svg" alt="Good Company Logo" width={200} height={50} />
                        </div>

                        {/* Follow Us Section */}
                            <SocialMediaIcons divClass='justify-start' />
                    </motion.div>

                    {/* Right Side - Navigation Sections */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8">
                        {navigationSections.map((section, sectionIndex) => (
                            <motion.div 
                                key={section.title}
                                variants={itemVariants}
                                custom={sectionIndex}
                            >
                                <h4 className="text-lg font-semibold mb-6 text-white">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <motion.li 
                                            key={linkIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ 
                                                delay: sectionIndex * 0.1 + linkIndex * 0.05,
                                                duration: 0.4 
                                            }}
                                        >
                                            <Link 
                                                href={link.href} 
                                                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Copyright Section */}
                <motion.div 
                    className="border-t border-gray-700 pt-8 pb-0"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <p className="text-gray-400 text-sm">
                            © Good Company IT® Inc. {defaults.allRightsReserved}.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Large Company Logo at the very bottom */}
            <motion.div 
                className="relative w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <Image 
                    src="/imgs/GoCo.svg" 
                    alt="Good Company Logo" 
                    width={1600} 
                    height={400} 
                    className="w-full h-auto"
                />
            </motion.div>
        </motion.footer>
    );
};

export default Footer;