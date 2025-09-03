"use client";

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import gocoImg from "./assets/GoCO_copy.svg";

const Footer = ({ locale, translations }) => {

    const year = new Date().getFullYear();
    // Default fallbacks - Always use English
    const defaults = {
        services: "I.T. Services",
        community: "Community Work",
        about: "About Us",
        home: "Home",
        blog: "Blog",
        contact: "Contact Us",
        allRightsReserved: "All rights reserved"
    };

    // Navigation sections matching the image layout
    const navigationSections = [
        {
            title: defaults.home,
            links: [
                { label: "Home", href: "/" }
            ]
        },
        {
            title: defaults.about,
            links: [
                { label: "About Us", href: "/about" }
            ]
        },
        {
            title: defaults.services,
            links: [
                { label: "I.T. Services", href: "/services" }
            ]
        },
        {
            title: defaults.blog,
            links: [
                { label: "Blog", href: "/blog" }
            ]
        },
        {
            title: defaults.community,
            links: [
                { label: "Community Work", href: "/community" }
            ]
        },
        {
            title: defaults.contact,
            links: [
                { label: "Contact Us", href: "/contact" }
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

                    {/* Right Side - Navigation Sections with Orange Line */}
                    <div className="relative">
                        {/* Orange vertical line on the right */}
                        <div className="absolute top-0 right-0 w-1 h-full rounded-lg bg-gradient-to-b from-orange-400 to-primary-orange"></div>
                        
                        {/* Navigation Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 pr-10">
                            {navigationSections.map((section, sectionIndex) => (
                                <motion.div
                                    key={section.title}
                                    variants={itemVariants}
                                    custom={sectionIndex}
                                    className="flex flex-col"
                                >
                                    <Link
                                        href={section.links[0].href}
                                        className="text-base font-medium text-right mb-6 text-white hover:text-orange-400 transition-colors duration-200"
                                    >
                                        {section.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <motion.div
                    className="border-t border-gray-700 pt-8 pb-0"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <p className="text-gray-400 text-sm">
                            © Good Company I.T.® Inc. {defaults.allRightsReserved}. {year}
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
                    src={gocoImg}
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