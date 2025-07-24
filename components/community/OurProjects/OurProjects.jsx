import SlidesCarousel from "@/components/common/Carrousels/SlidesCarrousel";

const slides = [
    {
        id: 1,
        title: "Project Dagua",
        location: "Dagua, Colombia",
        subtitle: "What we support",
        description: "Since 2017, this has been at the heart of our social mission. Founded by our CEO, Marc Botero, Project Dagua uplifts families through education, leadership, and hands-on community building.",
        image: "/imgs/community/dagua.png",
        features: [
            "Leadership workshops for women running the nonprofit",
            "Teaching and volunteering at Vacation Bible School",
            "Financial donations for food, transportation & educational materials",
            "Construction of safe, dignified housing: like Daniela’s family home, rebuilt in 2025 from one room to a full family house.",
        ]
    },
    {
        id: 2,
        title: "Fundación Kilamara",
        location: "Cali, Colombia",
        subtitle: "What we support",
        description: "We proudly support Fundación Kilamara, an animal welfare organization dedicated to rescuing, rehabilitating, and rehoming animals in vulnerable conditions.",
        image: "/imgs/community/kilamara.png",
        features: [
            "Ongoing financial contributions that help keep the mission moving forward.",
            "Rescue and adoption of abandoned and abused animals",
            "Sterilization campaigns for street animals"
        ]
    }
];

const OurProjects = () => {
    return (
        <section className="relative overflow-hidden py-12 px-6">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/services/background.png')"
                }}
            />

            <div className="mx-auto">
            <h1 className="text-white text-4xl sm:text-5xl py-12 text-center relative">Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary-orange to-orange-400">Projects</span></h1>
            <SlidesCarousel variant="colorful" slides={slides} />
            </div>
        </section>
    );
}

export default OurProjects;