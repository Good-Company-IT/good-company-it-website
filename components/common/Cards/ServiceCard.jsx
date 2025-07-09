import React from 'react';
import { Button } from '@/components/common/Buttons/Button';
import { GoShieldCheck } from 'react-icons/go';

const ServiceCard = ({
    imageSrc,
    title,
    text,
    buttonText = "Learn More",
    onButtonClick,
    className = ""
}) => {
    return (
        <div
            className={`
        group relative bg-white rounded-2xl overflow-hidden shadow-lg 
        hover:shadow-xl transition-all duration-300 ease-out
        transform hover:-translate-y-2 hover:scale-[1.02]
        ${className}
      `}
        >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 
                   group-hover:scale-110 grayscale"
                    loading="lazy"
                />
                {/* Gradient overlay for better text readability on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col h-full p-6 sm:p-8">
                {/* Icon + Title Container */}
                <div className="flex items-center gap-4 mb-4">

                    <GoShieldCheck className='w-11 h-11 text-primary-blue' />

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold leading-tight 
                        text-primary-blue transition-colors duration-300">
                        {title}
                    </h3>
                </div>

                <p className="text-text-dark text-sm sm:text-base leading-relaxed h-24 mb-3 
                     line-clamp-4">
                    {text}
                </p>

                <div className='flex items-end'>

                    <Button
                        onClick={onButtonClick}
                        variant="primary"
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>

            {/* Subtle border highlight on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                     group-hover:border-blue-200 transition-colors duration-300 
                     pointer-events-none" />
        </div>
    );
};

export default ServiceCard;