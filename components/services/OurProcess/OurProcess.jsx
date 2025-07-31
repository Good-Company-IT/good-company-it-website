import React, { useState } from 'react';

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState('Discovery & kickoff');

  const steps = [
    {
      id: 'Discovery & kickoff',
      title: 'Discovery & kickoff',
      description: 'We start by getting to know your business, from your tools and workflows to your biggest tech frustrations. This step ensures we understand your risks, goals, where you are potentially losing money, and where you can begin saving money.',
      color: 'bg-gradient-to-br from-orange-400 to-primary-orange'
    },
    {
      id: 'Planning',
      title: 'Planning',
      description: 'We break down larger projects into implementations that are most meaningful to your business. We define priorities and assign hours based on real needs, proactive improvements, support tickets, or technical advice.',
      color: 'bg-gray-800/80'
    },
    {
      id: 'Centralized Ticketing',
      title: 'Centralized Ticketing',
      description: "We track all tasks and issues through a centralized ticketing system. You'll always get context, recommendations, and clear timelines from a human who knows your business.",
      color: 'bg-gray-800/80'
    },
    {
      id: 'Execution & support',
      title: 'Execution & support',
      description: "Our team gets to work quickly and thoroughly. Whether it's deploying new tools, securing your endpoints, or helping your team onboard securely, we deliver with structure, transparency, and speed.",
      color: 'bg-gray-800/80'
    },
    {
      id: 'Review & Check-ins',
      title: 'Review & Check-ins',
      description: 'We hold weekly or biweekly check-ins with your team to review progress, resolve blockers, and realign if priorities shift. This helps uncover new needs, hidden inefficiencies, and opportunities to improve.',
      color: 'bg-gray-800/80'
    }
  ];

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
  };

  // Get the currently active step data
  const activeStepData = steps.find(step => step.id === activeStep);

  return (
    <section className="relative min-h-screen lg:h-[900px] overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imgs/services/background.png')"
        }}
      />

      {/* Content Container - Flexbox for better space distribution */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 h-full lg:h-full flex flex-col">

        {/* Header - Reduced spacing */}
        <div className="text-center pt-12 pb-8 lg:pt-16 lg:pb-12 flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">PROCESS</span>
          </h2>
          <p className="text-white text-sm sm:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
            From discovery to delivery and beyond, our structured process ensures your project stays on track, on budget, and exceeds expectations every step of the way.
          </p>
        </div>

        {/* Main Content - Flex grow to fill remaining space on desktop, natural flow on mobile */}
        <div className="flex-1 lg:flex lg:flex-col lg:justify-center pb-12 lg:pb-0">
          
          {/* Desktop Layout - Flex Row */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 h-full max-h-[500px]">
            
            {/* Left Side - SVG Arcs Visualization */}
            <div className="flex-[2] max-w-4xl h-full flex items-center">
              <div className="relative w-full h-[450px]">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1600 800"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Review & Check-ins Arc - Outermost */}
                  <path
                    d="M 150 750 A 650 650 0 0 1 1450 750"
                    fill="none"
                    stroke={activeStep === 'Review & Check-ins' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                    onClick={() => handleStepClick('Review & Check-ins')}
                    style={{
                      filter: activeStep === 'Review & Check-ins' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                    }}
                  />

                  {/* Execution & support Arc */}
                  <path
                    d="M 280 750 A 520 520 0 0 1 1320 750"
                    fill="none"
                    stroke={activeStep === 'Execution & support' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                    onClick={() => handleStepClick('Execution & support')}
                    style={{
                      filter: activeStep === 'Execution & support' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                    }}
                  />

                  {/* Centralized Ticketing Arc */}
                  <path
                    d="M 410 750 A 390 390 0 0 1 1190 750"
                    fill="none"
                    stroke={activeStep === 'Centralized Ticketing' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                    onClick={() => handleStepClick('Centralized Ticketing')}
                    style={{
                      filter: activeStep === 'Centralized Ticketing' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                    }}
                  />

                  {/* Planning Arc */}
                  <path
                    d="M 540 750 A 260 260 0 0 1 1060 750"
                    fill="none"
                    stroke={activeStep === 'Planning' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                    onClick={() => handleStepClick('Planning')}
                    style={{
                      filter: activeStep === 'Planning' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                    }}
                  />

                  {/* Discovery & kickoff Arc - Innermost */}
                  <path
                    d="M 670 750 A 130 130 0 0 1 930 750"
                    fill="none"
                    stroke={activeStep === 'Discovery & kickoff' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                    onClick={() => handleStepClick('Discovery & kickoff')}
                    style={{
                      filter: activeStep === 'Discovery & kickoff' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                    }}
                  />

                  {/* Arc Labels */}
                  <text
                    x="800"
                    y="70"
                    textAnchor="middle"
                    className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                    onClick={() => handleStepClick('Review & Check-ins')}
                    style={{
                      textShadow: activeStep === 'Review & Check-ins' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontWeight: activeStep === 'Review & Check-ins' ? 'bold' : 'medium'
                    }}
                  >
                    Review & Check-ins
                  </text>
                  <text
                    x="800"
                    y="190"
                    textAnchor="middle"
                    className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                    onClick={() => handleStepClick('Execution & support')}
                    style={{
                      textShadow: activeStep === 'Execution & support' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontWeight: activeStep === 'Execution & support' ? 'bold' : 'medium'
                    }}
                  >
                    Execution & support
                  </text>
                  <text
                    x="800"
                    y="320"
                    textAnchor="middle"
                    className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                    onClick={() => handleStepClick('Centralized Ticketing')}
                    style={{
                      textShadow: activeStep === 'Centralized Ticketing' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontWeight: activeStep === 'Centralized Ticketing' ? 'bold' : 'medium'
                    }}
                  >
                    Centralized Ticketing
                  </text>
                  <text
                    x="800"
                    y="450"
                    textAnchor="middle"
                    className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                    onClick={() => handleStepClick('Planning')}
                    style={{
                      textShadow: activeStep === 'Planning' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontWeight: activeStep === 'Planning' ? 'bold' : 'medium'
                    }}
                  >
                    Planning
                  </text>
                  <text
                    x="800"
                    y="590"
                    textAnchor="middle"
                    className="fill-white text-lg lg:text-xl font-bold cursor-pointer transition-all duration-300 hover:fill-orange-400"
                    onClick={() => handleStepClick('Discovery & kickoff')}
                    style={{
                      textShadow: activeStep === 'Discovery & kickoff' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                      fontWeight: 'bold'
                    }}
                  >
                    Discovery & kickoff
                  </text>
                </svg>
              </div>
            </div>

            {/* Right Side - Selected Step Card */}
            <div className="flex-1 max-w-md">
              <div className="bg-gradient-to-tr from-[#AA2A1D] via-[#FF4300] to-[#FF8C62] rounded-xl p-6 shadow-xl shadow-orange-500/25 transition-all duration-300 cursor-pointer transform hover:scale-105">
                
                {/* Step indicator badge */}
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <span className="text-white text-xs font-medium">Step {steps.findIndex(step => step.id === activeStep) + 1} of {steps.length}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                  {activeStepData?.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/90 text-sm leading-relaxed mb-6">
                  {activeStepData?.description}
                </p>
                
                {/* Navigation dots */}
                <div className="flex justify-center space-x-2">
                  {steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeStep === step.id 
                          ? 'bg-white shadow-lg transform scale-125' 
                          : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            
            {/* Process Visualization for Tablet */}
            <div className="hidden md:flex justify-center mb-12 flex-shrink-0">
              <div className="relative w-full max-w-4xl">
                <div className="relative h-[350px]">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1600 800"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Same arcs with adjusted styling for tablet */}
                    <path
                      d="M 150 750 A 650 650 0 0 1 1450 750"
                      fill="none"
                      stroke={activeStep === 'Review & Check-ins' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                      onClick={() => handleStepClick('Review & Check-ins')}
                    />
                    <path
                      d="M 280 750 A 520 520 0 0 1 1320 750"
                      fill="none"
                      stroke={activeStep === 'Execution & support' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                      onClick={() => handleStepClick('Execution & support')}
                    />
                    <path
                      d="M 410 750 A 390 390 0 0 1 1190 750"
                      fill="none"
                      stroke={activeStep === 'Centralized Ticketing' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                      onClick={() => handleStepClick('Centralized Ticketing')}
                    />
                    <path
                      d="M 540 750 A 260 260 0 0 1 1060 750"
                      fill="none"
                      stroke={activeStep === 'Planning' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                      onClick={() => handleStepClick('Planning')}
                    />
                    <path
                      d="M 670 750 A 130 130 0 0 1 930 750"
                      fill="none"
                      stroke={activeStep === 'Discovery & kickoff' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:stroke-orange-400"
                      onClick={() => handleStepClick('Discovery & kickoff')}
                    />
                    
                    {/* Labels with smaller text for tablet */}
                    <text x="800" y="90" textAnchor="middle" className="fill-white text-sm font-medium cursor-pointer hover:fill-orange-400" onClick={() => handleStepClick('Review & Check-ins')}>Review & Check-ins</text>
                    <text x="800" y="210" textAnchor="middle" className="fill-white text-sm font-medium cursor-pointer hover:fill-orange-400" onClick={() => handleStepClick('Execution & support')}>Execution & support</text>
                    <text x="800" y="340" textAnchor="middle" className="fill-white text-sm font-medium cursor-pointer hover:fill-orange-400" onClick={() => handleStepClick('Centralized Ticketing')}>Centralized Ticketing</text>
                    <text x="800" y="470" textAnchor="middle" className="fill-white text-sm font-medium cursor-pointer hover:fill-orange-400" onClick={() => handleStepClick('Planning')}>Planning</text>
                    <text x="800" y="590" textAnchor="middle" className="fill-white text-base font-bold cursor-pointer hover:fill-orange-400" onClick={() => handleStepClick('Discovery & kickoff')}>Discovery & kickoff</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Process Cards Grid - Natural height for mobile/tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`
                    rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer
                    ${activeStep === step.id
                      ? 'bg-gradient-to-tr from-[#AA2A1D] via-[#FF4300] to-[#FF8C62] shadow-lg shadow-orange-500/25 transform scale-105'
                      : 'bg-gradient-to-br from-white/10 via-blue-900/10 to-slate-900/10 hover:from-white/15 hover:via-blue-900/15 hover:to-slate-900/15 border border-white/10 hover:border-orange-400/30'
                    }
                  `}
                  onClick={() => handleStepClick(step.id)}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;