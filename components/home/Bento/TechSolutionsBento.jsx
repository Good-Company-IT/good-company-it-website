import SocialMediaIcons from "@/components/common/SocialMediaIcons/SocialMediaIcons";
import ValuesSelector from "./ValuesSelector";
import { Button } from "@/components/common/Buttons/Button";

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
        <div className="relative px-3 sm:px-12 md:px-24 py-12 md:pb-20">
            <div className="absolute inset-0 w-full h-full -z-10" />
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-medium text-white mb-4">
                        Tech solutions for businesses that need{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary-orange">more than just IT support</span>
                    </h1>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px] mt-12 sm:my-12">
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
                                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-md">
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
                                    <p className="text-white text-sm md:text-base mb-6 max-w-[380px] ml-auto">
                                        We combine technical expertise with Business IQ to help you scale securely, operate smarter, and stay focused on growing your business.
                                    </p>
                                    <SocialMediaIcons />
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

                        <div
                className="-z-10 absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')",
                }}
            />

            <div
                className="-z-10 absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: "url('/imgs/texture2.svg')",
                }}
            />
        </div>
    );
};

export default TechSolutionsBento;