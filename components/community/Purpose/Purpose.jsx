"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Purpose = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    // Testimonial data
    const testimonials = [
        {
            id: 1,
            name: "Daniela Ramos",
            image: "/imgs/community/purpose1.png",
            quote: "Project Dagua has been a blessing in all its branches, I've known it for approximately 10 years. It gives us the opportunity to share with children and instill in them the love of God above all, the love for painting and to have quality time. My children have been part of Project Dagua for 10 years and they love it."
        },
        {
            id: 2,
            name: "Paula Borrero",
            image: "/imgs/community/purpose2.png",
            quote: "For me, Project Dagua is an opportunity to learn, grow and connect with all the people in the community who are part of this project. It has been especially meaningful to share and learn about different life stories that teach us to connect through gratitude, love for others and for who we are."
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-16 sm:pb-44 overflow-hidden"
        >

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('/imgs/why/texture.png')",
                }}
            />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-12 lg:space-y-16"
                >
                    {/* Header */}
                    <motion.div
                        variants={textVariants}
                        className="text-center"
                    >
                        <h2 className="text-text-dark text-3xl sm:text-4xl text-center relative">Inspiring Others for a <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-primary-orange to-orange-400">Great Purpose</span></h2>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 lg:items-stretch">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                variants={cardVariants}
                                className="relative pt-24 sm:pt-28 lg:pt-32 h-full flex flex-col"
                            >
                                {/* Profile Image - Overlapping and extending out */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[290px] lg:h-[290px] rounded-full overflow-hidden">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Testimonial Card */}
                                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-16 pt-20 sm:pt-24 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200 flex-1 flex flex-col">
                                    {/* Quote Icon */}
                                    <div className="mt-8">
                                        <svg width="65" height="42" viewBox="0 0 65 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M64.5178 0.438721V5.69013C58.9578 5.25251 53.8154 9.03139 52.0853 14.1231C69.9466 18.9606 65.5976 43.8456 46.5372 41.2081C40.3031 40.3447 35.9541 34.0288 35.7751 28.0382C35.3814 14.5193 47.2949 1.8935 60.7475 0.509686L64.5178 0.438721Z" fill="#34C8FF" />
                                            <path d="M29.0559 0.438775C28.9068 1.35541 29.2587 5.50094 29.0559 5.69018C28.9247 5.81437 26.4847 5.69018 25.4705 5.94447C21.4019 6.94981 18.1029 10.3739 16.6532 14.1528C34.2461 18.4816 30.8217 43.822 11.6659 41.2081C6.71436 40.534 1.41682 35.3121 0.730769 30.4215C-1.44671 14.8979 13.2528 -0.40689 29.0559 0.438775Z" fill="#34C8FF" />
                                        </svg>
                                    </div>

                                    {/* Quote text - takes up available space */}
                                    <div className="mb-6 mt-8 sm:mt-10 flex-1">
                                        <p className="text-text-dark text-sm sm:text-base leading-relaxed text-left">
                                            {testimonial.quote}
                                        </p>
                                    </div>

                                    {/* Name - stays at bottom */}
                                    <div className="flex justify-start mt-auto">
                                        <h3 className="text-lg sm:text-xl font-semibold text-primary-orange">
                                            {testimonial.name}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default Purpose;