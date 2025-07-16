import React, { useState } from 'react';

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState('Listen');

  const steps = [
    {
      id: 'Listen',
      title: 'Listen',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mus felis conubia class, ornare magnis lacinia massa. A vitae eget nam dapibus mattis condimentum urna gravida dis.',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      id: 'Plan',
      title: 'Plan',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mus felis conubia class, ornare magnis lacinia massa. A vitae eget nam dapibus mattis condimentum urna gravida dis.',
      color: 'bg-gray-800/80'
    },
    {
      id: 'Develop',
      title: 'Develop',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mus felis conubia class, ornare magnis lacinia massa. A vitae eget nam dapibus mattis condimentum urna gravida dis.',
      color: 'bg-gray-800/80'
    },
    {
      id: 'Deliver',
      title: 'Deliver',
      description: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit mus felis conubia class, ornare magnis lacinia massa. A vitae eget nam dapibus mattis condimentum urna gravida dis.',
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary-orange">PROCESS</span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit natoque aptent,
            fermentum nunc curae porta sodales rutrum egestas fermentum.
          </p>
        </div>

        {/* Process Visualization */}
        <div className="hidden relative md:flex justify-center mb-16 lg:mb-24">
          <div className="relative w-full max-w-5xl">
            
            {/* SVG Arcs Container */}
            <div className="relative h-80 lg:h-96 overflow-hidden">
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 1000 500" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Deliver Arc - Outermost (Radius ~400) */}
                <path
                  d="M 100 450 A 400 400 0 0 1 900 450"
                  fill="none"
                  stroke={activeStep === 'Deliver' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Deliver')}
                  style={{ 
                    filter: activeStep === 'Deliver' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />
                
                {/* Develop Arc (Radius ~320) */}
                <path
                  d="M 180 450 A 320 320 0 0 1 820 450"
                  fill="none"
                  stroke={activeStep === 'Develop' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Develop')}
                  style={{ 
                    filter: activeStep === 'Develop' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />
                
                {/* Plan Arc (Radius ~240) */}
                <path
                  d="M 260 450 A 240 240 0 0 1 740 450"
                  fill="none"
                  stroke={activeStep === 'Plan' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Plan')}
                  style={{ 
                    filter: activeStep === 'Plan' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />
                
                {/* Listen Arc - Innermost (Radius ~160) */}
                <path
                  d="M 340 450 A 160 160 0 0 1 660 450"
                  fill="none"
                  stroke={activeStep === 'Listen' ? '#f97316' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-300 hover:stroke-primary-orange"
                  onClick={() => handleStepClick('Listen')}
                  style={{ 
                    filter: activeStep === 'Listen' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }}
                />
                

                
                {/* Arc Labels */}
                <text 
                  x="500" 
                  y="80" 
                  textAnchor="middle" 
                  className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Deliver')}
                  style={{ 
                    textShadow: activeStep === 'Deliver' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Deliver' ? 'bold' : 'normal'
                  }}
                >
                  Deliver
                </text>
                <text 
                  x="500" 
                  y="160" 
                  textAnchor="middle" 
                  className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Develop')}
                  style={{ 
                    textShadow: activeStep === 'Develop' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Develop' ? 'bold' : 'normal'
                  }}
                >
                  Develop
                </text>
                <text 
                  x="500" 
                  y="240" 
                  textAnchor="middle" 
                  className="fill-white text-base lg:text-lg font-medium cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Plan')}
                  style={{ 
                    textShadow: activeStep === 'Plan' ? '0 0 10px rgba(249, 115, 22, 0.8)' : 'none',
                    fontWeight: activeStep === 'Plan' ? 'bold' : 'normal'
                  }}
                >
                  Plan
                </text>
                <text 
                  x="500" 
                  y="460" 
                  textAnchor="middle" 
                  className="fill-white text-lg lg:text-xl font-bold cursor-pointer transition-all duration-300 hover:fill-orange-400"
                  onClick={() => handleStepClick('Listen')}
                  style={{ 
                    textShadow: activeStep === 'Listen' ? '0 0 10px rgba(249, 115, 22, 0.8)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
                    fontWeight: activeStep === 'Listen' ? 'bold' : 'normal'
                  }}
                >
                  Listen
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`
                rounded-xl p-6 lg:p-8 transition-all duration-300 cursor-pointer transform hover:scale-105
                ${activeStep === step.id 
                  ? 'bg-gradient-to-tr from-[#AA2A1D] via-[#FF4300] to-[#FF8C62] shadow-xl shadow-orange-500/25' 
                  : 'bg-gradient-to-br from-white/15 via-blue-900/15 to-slate-900/15 hover:border-gray-600/50'
                }
              `}
              onClick={() => handleStepClick(step.id)}
            >
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-white text-sm lg:text-base leading-relaxed">
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