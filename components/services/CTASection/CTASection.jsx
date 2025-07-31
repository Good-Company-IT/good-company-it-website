import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/common/Buttons/Button';

const SocialMedia = () => {
    const socialLinks = [
        { icon: FaInstagram, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaFacebookF, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaTwitter, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaLinkedin, href: '#', color: 'hover:bg-secondary-orange' }
    ];

    return (
        <div className="mt-8">
            <h3 className="text-white text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex justify-end gap-3">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full bg-primary-orange flex items-center justify-center text-white transition-all duration-200 ${social.color} hover:scale-110`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                        <social.icon size={20} />
                    </motion.a>
                ))}
            </div>
        </div>
    );
};


const CTASection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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
        <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Left Side - Team Image */}
                    <motion.div
                        className="flex-1 lg:flex-[3]"
                        variants={itemVariants}
                    >
                        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/imgs/about/teamCTA.png"
                                alt="Happy diverse team working together"
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay with Follow Us */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                <div className="absolute bottom-6 right-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        <SocialMedia />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        className="flex-1 lg:flex-[2] flex flex-col justify-center"
                        variants={itemVariants}
                    >
                        <div className="rounded-[22px] border border-[#DBDDFB] bg-gradient-to-br from-white/15 via-[#040B59]/35 to-[#010425]/35 backdrop-blur-md p-8 lg:p-10 h-full flex flex-col justify-center">
                            <motion.h2
                                className="text-2xl sm:text-3xl font-bold text-white mb-6"
                                variants={itemVariants}
                            >
                                Who We Are
                            </motion.h2>
                            
                            <motion.p
                                className="text-white text-base leading-relaxed mb-8 flex-grow"
                                variants={itemVariants}
                            >
                                We offer I.T. consulting that goes beyond solving technical issues. Our 
                                focus is on helping companies grow with clarity, structure, and long-term 
                                support. That means not just fixing what's broken, but helping improve the 
                                way things run.
                            </motion.p>
                            
                            <motion.div
                                variants={itemVariants}
                            >
                                <Button href={"/contact"} className="w-full sm:w-auto">
                                    Get in Touch with Us
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;