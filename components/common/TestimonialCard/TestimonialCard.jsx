"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function TestimonialCard({ testimonial }) {
    return (
        <div
            className="w-[300px] h-[250px] flex-shrink-0 sm:w-[380px] sm:h-[160px]
                 rounded-xl p-6 sm:p-5 relative overflow-hidden border border-white/20"
            style={{
                background: 'linear-gradient(200deg, rgba(255,255,255,0.15) 3%, rgba(4,11,89,0.15) 52%, rgba(1,4,37,0.15) 100%)',
            }}
        >
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col sm:flex-row gap-4 sm:gap-0">
                {/* Left side - Avatar (only for cards that have avatars in the image) */}
                {testimonial.hasAvatar && (
                    <div className="flex-shrink-0 flex items-center mr-5 sm:mr-4 xs:mr-3">
                        <div className="w-16 h-16 sm:w-14 sm:h-14 xs:w-12 xs:h-12 rounded-full overflow-hidden">
                            <Image
                                src={`/imgs/testimonials/${testimonial.avatar}`}
                                alt={testimonial.name}
                                width={54}
                                height={54}
                                className="w-full h-full object-cover"
                                priority={false}
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}

                {/* Right side - Content */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    {/* Name */}
                    <h4 className="text-white font-bold text-[16px] sm:text-[15px] xs:text-[14px] leading-tight mb-3 sm:mb-2 xs:mb-2 truncate">
                        {testimonial.name}:
                    </h4>

                    {/* Quote */}
                    <p className="text-white/95 text-[14px] sm:text-[13px] xs:text-[12px] leading-[1.45] sm:leading-[1.4] xs:leading-[1.35] font-normal line-clamp-3 overflow-hidden">
                        "{testimonial.quote}"
                    </p>
                </div>
            </div>
        </div>
    );
}
export default TestimonialCard;