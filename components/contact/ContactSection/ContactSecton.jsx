"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialMediaIcons from "@/components/common/SocialMediaIcons/SocialMediaIcons";
import { Button } from "@/components/common/Buttons/Button";

const ContactSection = () => {

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://formspree.io/f/xkgzodkr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    companyName: formData.companyName,
                    email: formData.email,
                    phone: formData.phone,
                    industry: formData.industry,
                    services: formData.services.join(', '), // Convert array to string
                    message: formData.message,
                    subscribe: formData.subscribe,
                }),
            });

            if (response.ok) {
                console.log('✅ Form submitted successfully!', {
                    status: response.status,
                    statusText: response.statusText,
                    formData: formData
                });
                setSubmitStatus('success');
                // Reset form after successful submission
                setFormData({
                    fullName: "",
                    companyName: "",
                    email: "",
                    phone: "",
                    industry: "",
                    services: [],
                    message: "",
                    subscribe: false
                });
            } else {
                console.error('❌ Form submission failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    response: response
                });
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
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
            id="contact-section"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Top Section - Hero with geometric background */}
            <motion.section
                variants={sectionVariants}
                className="relative h-screen max-h-[640px] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #7c2d12 100%)'
                }}
            >
                {/* SVG Background Pattern */}
                <div className="absolute inset-0">
                    <img
                        src="/imgs/contact/linesBackground.svg"
                        alt="Background pattern"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        className="inline-block mb-8"
                        variants={itemVariants}
                    >
                        <span
                            className="inline-flex items-center px-8 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity"
                            style={{
                                borderRadius: '200px',
                                border: '1px solid #DBDDFB',
                                background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)'
                            }}
                        >
                            Contact
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl font-normal text-white mb-4 lg:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Let's Make Tech Easier
                    </motion.h1>

                    <motion.h2
                        className="text-5xl sm:text-6xl h-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400"
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
                className="relative h-[1750px] sm:h-[1400px] lg:max-h-[1000px] bg-slate-900 px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
            >
                {/* SVG Background Pattern */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')",
                    }}
                />

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
                            <motion.div
                                className="inline-block mb-8"
                                variants={itemVariants}
                            >
                                <span
                                    className="inline-flex items-center px-8 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity"
                                    style={{
                                        borderRadius: '200px',
                                        border: '1px solid #DBDDFB',
                                        background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)'
                                    }}
                                >
                                    Get in Touch
                                </span>
                            </motion.div>

                            <div className="space-y-6">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-normal" style={{ lineHeight: '1.3' }}>
                                    We believe great I.T. starts with{" "}
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
                            <SocialMediaIcons divClass="justify-start" />
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

                            {/* Success/Error Messages */}
                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <p className="text-green-800 text-sm">
                                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <p className="text-red-800 text-sm">
                                        Sorry, there was an error sending your message. Please try again.
                                    </p>
                                </div>
                            )}

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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                            "I.T. Security & Compliance",
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
                                                    disabled={isSubmitting}
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
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Newsletter Subscription */}
                                <div className="flex flex-col gap-y-5 justify-between sm:flex-row">
                                    <label className="flex items-start max-w-xs space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="subscribe"
                                            checked={formData.subscribe}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 mt-0.5"
                                            disabled={isSubmitting}
                                        />
                                        <span className="text-sm text-slate-700 leading-relaxed">
                                            I would like to subscribe to updates and insights from Good Company.
                                        </span>
                                    </label>

                                    {/* Submit Button */}
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </motion.div >
    );
};

export default ContactSection;