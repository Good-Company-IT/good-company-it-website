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
      description: 'We track all tasks and issues through a centralized ticketing system. You’ll always get context, recommendations, and clear timelines from a human who knows your business.',
      color: 'bg-gray-800/80'
    },
    {
      id: 'Execution & support',
      title: 'Execution & support',
      description: 'Our team gets to work quickly and thoroughly. Whether it’s deploying new tools, securing your endpoints, or helping your team onboard securely, we deliver with structure, transparency, and speed.',
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imgs/services/background.png')"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 py-16 lg:py-24">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">PROCESS</span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
            From discovery to delivery and beyond, our structured process ensures your project stays on track, on budget, and exceeds expectations every step of the way.
          </p>
        </div>

        {/* Process Visualization */}
        <div className="hidden relative md:flex justify-center mb-16 lg:mb-24">
          <div className="relative w-full max-w-5xl">

            {/* SVG Arcs Container */}
            <div className="relative h-[450px] lg:h-[600px] overflow-hidden">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1600 800"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Review & Check-ins Arc - Outermost (Radius ~650) */}
                <path
                  d="M 150 750 A 650 650 0 0 1 1450 750"
                  fill="none"
                  stroke={activeStep === 'Review & Check-ins' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Review & Check-ins')}
                  style={{
                    filter: activeStep === 'Review & Check-ins' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />

                {/* Execution & support Arc (Radius ~520) */}
                <path
                  d="M 280 750 A 520 520 0 0 1 1320 750"
                  fill="none"
                  stroke={activeStep === 'Execution & support' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Execution & support')}
                  style={{
                    filter: activeStep === 'Execution & support' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />

                {/* Centralized Ticketing Arc (Radius ~390) */}
                <path
                  d="M 410 750 A 390 390 0 0 1 1190 750"
                  fill="none"
                  stroke={activeStep === 'Centralized Ticketing' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Centralized Ticketing')}
                  style={{
                    filter: activeStep === 'Centralized Ticketing' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />

                {/* Planning Arc (Radius ~260) */}
                <path
                  d="M 540 750 A 260 260 0 0 1 1060 750"
                  fill="none"
                  stroke={activeStep === 'Planning' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Planning')}
                  style={{
                    filter: activeStep === 'Planning' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />

                {/* Discovery & kickoff Arc - Innermost (Radius ~130) */}
                <path
                  d="M 670 750 A 130 130 0 0 1 930 750"
                  fill="none"
                  stroke={activeStep === 'Discovery & kickoff' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="4"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Discovery & kickoff')}
                  style={{
                    filter: activeStep === 'Discovery & kickoff' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />

                {/* Arc Labels - Positioned with more breathing room */}
                <text
                  x="800"
                  y="70"
                  textAnchor="middle"
                  className="fill-white text-lg lg:text-xl font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Review & Check-ins')}
                  style={{
                    textShadow: activeStep === 'Review & Check-ins' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Review & Check-ins' ? 'bold' : 'normal'
                  }}
                >
                  Review & Check-ins
                </text>
                <text
                  x="800"
                  y="190"
                  textAnchor="middle"
                  className="fill-white text-lg lg:text-xl font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Execution & support')}
                  style={{
                    textShadow: activeStep === 'Execution & support' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Execution & support' ? 'bold' : 'normal'
                  }}
                >
                  Execution & support
                </text>
                <text
                  x="800"
                  y="320"
                  textAnchor="middle"
                  className="fill-white text-lg lg:text-xl font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Centralized Ticketing')}
                  style={{
                    textShadow: activeStep === 'Centralized Ticketing' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Centralized Ticketing' ? 'bold' : 'normal'
                  }}
                >
                  Centralized Ticketing
                </text>
                <text
                  x="800"
                  y="450"
                  textAnchor="middle"
                  className="fill-white text-lg lg:text-xl font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Planning')}
                  style={{
                    textShadow: activeStep === 'Planning' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Planning' ? 'bold' : 'normal'
                  }}
                >
                  Planning
                </text>
                <text
                  x="800"
                  y="590"
                  textAnchor="middle"
                  className="fill-white text-xl lg:text-2xl font-bold cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Discovery & kickoff')}
                  style={{
                    textShadow: activeStep === 'Discovery & kickoff' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                    fontWeight: activeStep === 'Discovery & kickoff' ? 'bold' : 'normal'
                  }}
                >
                  Discovery & kickoff
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`
                rounded-xl p-4 lg:p-6 transition-all duration-300 cursor-pointer transform hover:scale-105
                ${activeStep === step.id
                  ? 'bg-gradient-to-tr from-[#AA2A1D] via-[#FF4300] to-[#FF8C62] shadow-xl shadow-orange-500/25'
                  : 'bg-gradient-to-br from-white/15 via-blue-900/15 to-slate-900/15 hover:border-gray-600/50'
                }
              `}
              onClick={() => handleStepClick(step.id)}
            >
              <h3 className="text-base lg:text-lg font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-white text-xs lg:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;