import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Buttons/Button';

const TeamSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLargeScreen(width >= 1920);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock team member data
  const teamMembers = [
    {
      id: 1,
      name: "Marc Hart Botero",
      role: "Founder",
      image: "/imgs/team/member1.jpg"
    },
    {
      id: 2,
      name: "Julian Ussa",
      role: "Co-Founder",
      image: "/imgs/team/member2.jpg"
    },
    {
      id: 3,
      name: "Carolina Camargo",
      role: "Project Coordinator",
      image: "/imgs/team/member3.jpg"
    },
    {
      id: 4,
      name: "Laura Forero",
      role: "Designer",
      image: "/imgs/team/member4.JPG"
    },
    {
      id: 5,
      name: "Diego Lopez",
      role: "Consultant",
      image: "/imgs/team/member5.jpg"
    }
  ];

  // Handle button click
  const handleGetInTouch = () => {
    //On future will add navigation logic
    // For now, just log to console
    console.log('Get in Touch clicked');
  };

  // Mobile/Tablet Layout
  if (isMobile || isTablet) {
    return (
      <section className="relative bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-2">Who's Behind</p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-orange-500">Go</span>
                <span className="text-gray-900">od</span>{" "}
                <span className="text-orange-500">Co</span>
                <span className="text-gray-900">mpany?</span>
              </h2>
            </div>

            <div className="flex flex-col items-center mb-8">
              <p className="text-gray-600 text-base mb-4">
                we're here to make it easier for you.
              </p>
              <Button
                onClick={handleGetInTouch}
                className=''
              >
                Get in Touch with Us
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              We Work{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400 block sm:inline">TOGETHER</span>
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold text-text-dark mb-6">
              We Innovate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-blue-400 block sm:inline">TOGETHER</span>
            </h4>

            <div className="mb-8">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                We're operators, engineers, and ex-startup folks who've been on the ground.{' '}
                <span className="font-semibold text-gray-900">
                  We know what it's like to juggle growth, security, and sanity.
                </span>
              </p>
              <p className="text-gray-700 text-sm">
                You're in{' '}
                <span className="text-orange-500 font-semibold">Good Company</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-44 sm:h-44 mx-auto mb-2 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-text-dark">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout - Using Grid Structure as Guide (MODERATELY SMALLER VERSION)
  return (
    <section className="relative bg-white px-5 pl-32 py-12 lg:py-20 overflow-hidden">
      <div className={`mx-auto px-6 max-w-[1300px] flex justify-center`}>
        <div className="w-full max-w-[1200px]">

        {/* 4x3 Grid Layout - Moderately reduced size */}
        <div className="grid grid-cols-4 grid-rows-3 gap-6 lg:gap-7 min-h-[520px] lg:min-h-[580px]">

          {/* Row 1, Col 1 - "Who's Behind Good Company?" */}
          <div className="col-span-1 row-span-1 flex flex-col justify-center">
            <div className="text-right mr-5">
              <p className={`text-text-dark mb-2 ${isLargeScreen ? 'text-xl' : 'text-base'}`}>
                Who's Behind
              </p>
              <h2 className={`font-bold leading-tight ${isLargeScreen ? 'text-2xl' : 'text-xl lg:text-2xl'}`}>
                <span className="text-primary-orange">Go</span><span className="text-text-dark">od</span>{' '}
                <span className="text-primary-orange">Co</span><span className="text-text-dark">mpany?</span>
              </h2>
            </div>
          </div>

          {/* Row 1, Col 2 - First team member photo */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isLargeScreen ? 'w-[260px] h-[260px]' : 'w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64'
            }`}>
              <img
                src={teamMembers[0].image}
                alt={teamMembers[0].name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-orange/60 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{teamMembers[0].name}</h3>
                <span className="bg-white text-primary-orange px-3 py-1 rounded-full text-sm font-medium">
                  {teamMembers[0].role}
                </span>
              </div>
            </div>
          </div>

          {/* Row 1-2, Col 3-4 - Complete "We Work TOGETHER We Innovate TOGETHER" block with description */}
          <div className="col-span-2 row-span-2 ml-6 flex flex-col justify-center">
            <div className="text-left">
              <h3 className={`font-medium leading-tight mb-2 ${isLargeScreen ? 'text-5xl' : 'text-3xl lg:text-4xl'}`}>
                <span className="text-gray-900">We Work</span>
              </h3>
              <h3 className={`font-bold leading-tight mb-4 ${isLargeScreen ? 'text-5xl' : 'text-3xl lg:text-4xl'}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">TOGETHER</span>
              </h3>
              <h4 className={`font-medium leading-tight mb-4 ${isLargeScreen ? 'text-5xl' : 'text-3xl lg:text-4xl'}`}>
                <span className="text-gray-900">We Innovate</span>
              </h4>
              <h4 className={`font-bold leading-tight mb-6 ${isLargeScreen ? 'text-5xl' : 'text-3xl lg:text-4xl'}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-primary-blue">TOGETHER</span>
              </h4>
              <p className={`text-text-dark leading-relaxed ${isLargeScreen ? 'text-lg' : 'text-base lg:text-lg'}`}>
                We're operators, engineers, and ex-startup folks<br />
                who've been on the ground.{' '}
                <span className="font-semibold text-gray-900">
                  We know what it's like to<br />
                  juggle growth, security, and sanity.
                </span>
              </p>
            </div>
          </div>

          {/* Row 2, Col 1 - Second team member photo */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isLargeScreen ? 'w-[260px] h-[260px]' : 'w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64'
            }`}>
              <img
                src={teamMembers[1].image}
                alt={teamMembers[1].name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-orange/60 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{teamMembers[1].name}</h3>
                <span className="bg-white text-primary-orange px-3 py-1 rounded-full text-sm font-medium">
                  {teamMembers[1].role}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2, Col 2 - Third team member photo */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isLargeScreen ? 'w-[260px] h-[260px]' : 'w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64'
            }`}>
              <img
                src={teamMembers[2].image}
                alt={teamMembers[2].name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-blue/60 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{teamMembers[2].name}</h3>
                <span className="bg-white text-primary-blue px-3 py-1 rounded-full text-sm font-medium">
                  {teamMembers[2].role}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3, Col 1 - CTA section */}
          <div className="col-span-1 row-span-1 flex flex-col justify-center items-end">
            <div className="text-right">
              <p className={`text-text-dark leading-relaxed mb-4 ${isLargeScreen ? 'text-base' : 'text-sm'}`}>
                we're here to make it<br />
                easier for you.
              </p>
              <Button
                onClick={handleGetInTouch}
                className="text-sm px-4 py-2"
              >
                Get in Touch with Us
              </Button>
            </div>
          </div>

          {/* Row 3, Col 2 - Fourth team member photo */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isLargeScreen ? 'w-[260px] h-[260px]' : 'w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64'
            }`}>
              <img
                src={teamMembers[3].image}
                alt={teamMembers[3].name}
                className="w-full h-full object-cover transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-orange/60 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{teamMembers[3].name}</h3>
                <span className="bg-white text-primary-orange px-3 py-1 rounded-full text-sm font-medium">
                  {teamMembers[3].role}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3, Col 3 - Fifth team member photo */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isLargeScreen ? 'w-[260px] h-[260px]' : 'w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64'
            }`}>
              <img
                src={teamMembers[4].image}
                alt={teamMembers[4].name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-blue/60 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-6 text-white">
                <h3 className="text-lg font-bold mb-2">{teamMembers[4].name}</h3>
                <span className="bg-white text-primary-blue px-3 py-1 rounded-full text-sm font-medium">
                  {teamMembers[4].role}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3, Col 4 - "You're in Good Company" */}
          <div className="col-span-1 row-span-1 flex flex-col justify-center">
            <div className="text-left">
              <p className={`text-text-dark ${isLargeScreen ? 'text-lg' : 'text-base'}`}>
                You're in
              </p>
              <span className="text-orange-500 font-semibold text-base lg:text-lg">Good Company</span>
            </div>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;