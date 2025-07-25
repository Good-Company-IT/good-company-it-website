"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialMediaIcons from "@/components/common/SocialMediaIcons/SocialMediaIcons";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        industry: "",
        services: [],
        message: "",
        subscribe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (name === "services") {
                setFormData(prev => ({
                    ...prev,
                    services: checked 
                        ? [...prev.services, value]
                        : prev.services.filter(service => service !== value)
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Handle form submission here
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <motion.div 
            className="relative w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Top Section - Hero with geometric background */}
            <motion.section 
                variants={sectionVariants}
                className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #7c2d12 100%)'
                }}
            >
                {/* SVG Background Pattern */}
                <div className="absolute inset-0 w-full h-full">
                    <svg 
                        className="absolute inset-0 w-full h-full" 
                        viewBox="0 0 1200 800" 
                        fill="none" 
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Geometric grid pattern */}
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1"/>
                            </pattern>
                            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                                <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                        </defs>
                        
                        {/* Grid background */}
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Center glow */}
                        <circle cx="600" cy="400" r="400" fill="url(#centerGlow)" />
                        
                        {/* Animated lines */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        >
                            {Array.from({ length: 8 }, (_, i) => (
                                <motion.line
                                    key={i}
                                    x1="600"
                                    y1="400"
                                    x2={600 + Math.cos(i * Math.PI / 4) * 300}
                                    y2={400 + Math.sin(i * Math.PI / 4) * 300}
                                    stroke="rgba(59, 130, 246, 0.2)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ 
                                        duration: 1.5, 
                                        delay: 0.8 + i * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </motion.g>
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="text-white/80 text-sm sm:text-base font-medium mb-4 block">
                            Contact
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4 lg:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Let's Make Tech Easier
                    </motion.h1>
                    
                    <motion.h2 
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Together
                    </motion.h2>
                </div>
            </motion.section>

            {/* Bottom Section - Form with dark background */}
            <motion.section 
                variants={sectionVariants}
                className="relative min-h-screen bg-slate-900 px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
            >
                {/* SVG Background Pattern */}
                <div className="absolute inset-0 w-full h-full">
                    <svg 
                        className="absolute inset-0 w-full h-full" 
                        viewBox="0 0 1200 1200" 
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Subtle circuit-like pattern */}
                        <defs>
                            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="50" cy="50" r="1" fill="rgba(59, 130, 246, 0.1)" />
                                <path d="M 25 50 L 75 50 M 50 25 L 50 75" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                        
                        {/* Floating geometric shapes */}
                        <motion.circle
                            cx="200"
                            cy="200"
                            r="2"
                            fill="rgba(59, 130, 246, 0.3)"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.circle
                            cx="1000"
                            cy="800"
                            r="1.5"
                            fill="rgba(251, 146, 60, 0.4)"
                            animate={{
                                y: [0, 15, 0],
                                opacity: [0.4, 0.7, 0.4]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left Side - Text Content */}
                        <motion.div 
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-block">
                                <span className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    Get in Touch
                                </span>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                                    We believe great IT starts with{" "}
                                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                        clear communication.
                                    </span>
                                </h3>

                                <div className="space-y-4 text-white/80 text-base sm:text-lg leading-relaxed">
                                    <p>
                                        Whether you have a question, need support, or are ready 
                                        to talk strategy, we're here and happy to connect.
                                    </p>
                                    <p>
                                        Fill out the form, send us a message, or book a time to 
                                        chat. We'll get back to you as soon as possible.
                                    </p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <SocialMediaIcons divClass="justify-start"/>
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.div 
                            variants={formVariants}
                            className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl lg:text-3xl font-normal text-slate-900 mb-2">
                                    Get in <span className="font-bold text-orange-500">Touch</span>
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full name *"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Company's name *"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email address *"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+57 | Phone number *"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Industry Dropdown */}
                                <div>
                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none"
                                        required
                                    >
                                        <option value="">Company's Industry *</option>
                                        <option value="technology">Technology</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="finance">Finance</option>
                                        <option value="education">Education</option>
                                        <option value="retail">Retail</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Services Checkboxes */}
                                <div>
                                    <p className="text-slate-900 font-medium mb-4">What services are you interested in?</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            "IT Security & Compliance",
                                            "Remote Support",
                                            "Cloud Support & Consulting",
                                            "Employee Onboarding/Offboarding",
                                            "Device Management",
                                            "Data Protection & Threat Response"
                                        ].map((service) => (
                                            <label key={service} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="services"
                                                    value={service}
                                                    onChange={handleInputChange}
                                                    className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                                />
                                                <span className="text-sm text-slate-700">{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <p className="text-slate-900 font-medium mb-3">Please provide a brief description of your needs</p>
                                    <textarea
                                        name="message"
                                        placeholder="Message here"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                                    />
                                </div>

                                {/* Newsletter Subscription */}
                                <div>
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="subscribe"
                                            checked={formData.subscribe}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 mt-0.5"
                                        />
                                        <span className="text-sm text-slate-700 leading-relaxed">
                                            I would like to subscribe to updates and insights from Good Company.
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
};

export default ContactSection;