import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Buttons/Button';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';

const TeamCTASection = ({socialMedia = true, imageSrc="/imgs/about/teamCTA.png",title,titleHighlight = false, titleHighlightText, text}) => {
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
                                src={imageSrc}
                                alt="Happy diverse team working together"
                                className="w-full h-full object-cover"
                            />
                            
                            {socialMedia && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                    <div className="absolute bottom-6 right-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            <SocialMediaIcons />
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        className="flex-1 lg:flex-[2] flex flex-col justify-center"
                        variants={itemVariants}
                    >
                        <div className="rounded-[22px] border-[0.5px] border-[#DBDDFB] bg-gradient-to-br from-white/15 via-[#040B59]/35 to-[#010425]/35 backdrop-blur-md p-8 lg:p-10 h-full flex flex-col justify-center">
                            <motion.h2
                                className="text-xl sm:text-2xl font-bold text-white mb-6"
                                variants={itemVariants}
                            >
                                {title}
                                {titleHighlight && (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-300"> {titleHighlightText}</span>
                                )}
                            </motion.h2>
                            
                            <motion.p
                                className="text-white text-sm sm:text-base leading-relaxed mb-8 flex-grow"
                                variants={itemVariants}
                            >
                                {text}
                            </motion.p>
                            
                            <motion.div
                                variants={itemVariants}
                            >
                                <Button href="/contact" className="w-full text-sm sm:text-base sm:w-auto">
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

export default TeamCTASection;