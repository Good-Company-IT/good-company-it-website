import { Button } from '@/components/common/Buttons/Button';
import React from 'react';

const CTASection = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-stretch">
                    {/* Left Side - Image (Hidden on mobile/tablet) */}
                    <div className="relative hidden lg:block">
                        <div className="relative">
                            {/* Image Container with rounded corners */}
                            <div className="relative rounded-3xl overflow-hidden">
                                <div className="aspect-[4/3] bg-gray-200">
                                    <img
                                        src="/imgs/services/teamWork.png"
                                        alt="Business team meeting discussing IT solutions"
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div 
                        className="
                            lg:aspect-[4/3] 
                            flex items-center 
                            px-4 sm:px-6 lg:px-8 
                            py-6 sm:py-8 lg:py-16 
                            border border-[#DBDDFB] 
                            rounded-2xl
                            w-full
                        " 
                        style={{
                            background: 'linear-gradient(238deg, rgba(255, 255, 255, 0.15) -9.79%, rgba(4, 11, 89, 0.15) 61.45%, rgba(1, 4, 37, 0.15) 130.31%)'
                        }}
                    >
                        <div className="space-y-4 sm:space-y-6 w-full">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                                <span className="text-white">At Good Company </span>
                                <span
                                    className="inline-block font-bold"
                                    style={{
                                        background: 'linear-gradient(42deg, #21024D -77.23%, #601436 -46.28%, #AA2A1D 2.12%, #FF4300 40.99%, #FF8C62 72.73%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    we get it.
                                </span>
                            </h2>

                            <div className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                                <p>
                                    Growing businesses don't just need someone to fix tech issues when things break.
                                    <span className="text-white font-semibold"> You need a real partner who helps you stay ahead of problems,</span>
                                    optimize your processes, and keep your team running smoothly without breaking the bank.
                                </p>
                            </div>

                            <div className="pt-2 sm:pt-4">
                                <Button>
                                    Get in Touch with Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;