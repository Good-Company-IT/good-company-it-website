import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ValuesSelector from "./ValuesSelector";
import { Button } from "@/components/common/Buttons/Button";

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
                    <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full bg-primary-orange flex items-center justify-center text-white transition-all duration-200 ${social.color} hover:scale-110`}
                    >
                        <social.icon size={20} />
                    </a>
                ))}
            </div>
        </div>
    );
};

// Background SVG component
const SpaceBackground = () => (
    <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: 'url(/imgs/values/background.svg)'
        }}
    />
);

const TechSolutionsBento = () => {
    return (
        <div className="relative px-3 sm:px-12 md:px-24 py-40">
      <div className="absolute inset-0 w-full h-full -z-10" />
      {/* SVG Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 md:h-40 lg:h-48 -z-5"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)'
        }}
      />
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="text-center my-16">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-4">
                        Tech solutions for businesses that need{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary-orange">more than just IT support</span>
                    </h1>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px] my-12">
                    {/* Left Large Box */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10">
                        <SpaceBackground />

                        <div className="relative z-10 p-8 py-10 xl:py-14 h-full flex flex-col justify-between">
                            {/* Company Logo */}
                            <div className="mb-8">
                                <img
                                    src="/imgs/values/worldIcon.svg"
                                    alt="Network Logo"
                                    className="w-12 h-12"
                                />
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                                <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-6 max-w-md">
                                    To be in Good Company means you have an IT partner that has your back. Whether you're just getting started, or looking to expand securely. It means you have a dedicated IT and PM team that wants to see you reach success.
                                </p>

                                <Button>
                                    Learn More
                                </Button>
                            </div>

                            {/* Bottom Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                <div className="mt-10">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                        Our Motto is you are in
                                    </h2>
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary-orange">
                                        Good Company
                                    </h2>
                                </div>

                                <div className="text-right">
                                    <p className="text-white text-sm md:text-base lg:text-lg mb-6 max-w-[380px] ml-auto">
                                        We combine technical expertise with Business IQ to help you scale securely, operate smarter, and stay focused on growing your business.
                                    </p>
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Values Selector */}
                        <ValuesSelector />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechSolutionsBento;