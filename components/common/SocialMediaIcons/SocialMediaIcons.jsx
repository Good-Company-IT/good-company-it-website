import { FaInstagram, FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from 'framer-motion';

const SocialMediaIcons = ({divClass = "justify-end"}) => {
    const socialLinks = [
        { 
            icon: FaInstagram, 
            href: '#', 
            hoverBg: 'hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400',
            name: 'Instagram'
        },
        { 
            icon: FaFacebookF, 
            href: '#', 
            hoverBg: 'hover:bg-blue-600',
            name: 'Facebook'
        },
        { 
            icon: FaSquareXTwitter, 
            href: '#', 
            hoverBg: 'hover:bg-black',
            name: 'Twitter'
        },
        { 
            icon: FaLinkedin, 
            href: '#', 
            hoverBg: 'hover:bg-blue-700',
            name: 'LinkedIn'
        }
    ];

    return (
        <div className="mt-8">
            <h3 className="text-white text-lg font-medium mb-4">Follow Us</h3>
            <div className={`flex ${divClass} gap-3`}>
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full bg-primary-orange flex items-center justify-center text-white transition-all duration-300 ${social.hoverBg} hover:scale-110 hover:shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        aria-label={`Follow us on ${social.name}`}
                    >
                        <social.icon size={20} />
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaIcons;