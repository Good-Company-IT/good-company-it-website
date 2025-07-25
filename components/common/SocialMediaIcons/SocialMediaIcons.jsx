import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialMediaIcons = ({divClass = "justify-end"}) => {
    const socialLinks = [
        { icon: FaInstagram, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaFacebookF, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaTwitter, href: '#', color: 'hover:bg-secondary-orange' },
        { icon: FaLinkedin, href: '#', color: 'hover:bg-secondary-orange' }
    ];

    return (
        <div className="mt-8">
            <h3 className="text-white text-lg font-medium mb-4">Follow Us</h3>
            <div className={`flex ${divClass} gap-3`}>
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

export default SocialMediaIcons;