import React, { useState, useEffect } from "react";

const features = [
  {
    id: 1,
    title: "Instant Global Transfers",
    description: "Send money across 100+ countries with real-time currency conversion. Zero hidden fees and best-in-class exchange rates.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    stats: "50M+ Transactions",
    icon: "globe"
  },
  {
    id: 2,
    title: "AI-Powered Wealth",
    description: "Smart portfolio management that adapts to market trends. Get personalized investment insights and automated rebalancing.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    stats: "18% Avg Returns",
    icon: "chart-line"
  },
  {
    id: 3,
    title: "Priority Support 24/7",
    description: "Skip the queue with our dedicated relationship managers. Instant resolution via video call, chat, or phone anytime, anywhere.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    stats: "< 60s Response",
    icon: "headset"
  },
  {
    id: 4,
    title: "Bank-Grade Security",
    description: "Fortified with biometric authentication, 256-bit encryption, and real-time fraud monitoring to keep your assets safe.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    stats: "100% Secure",
    icon: "shield-alt"
  }
];

export default function FeaturesCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-gray-50 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-3">
            Premium Banking Experience
          </h2>
         
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Interactive Feature List (Accordion Style) */}
          <div className="flex flex-col justify-center space-y-4">
            {features.map((feature, index) => {
              const isActive = index === activeIdx;
              return (
                <div 
                  key={feature.id}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    isActive 
                    ? "bg-white border-blue-100 shadow-xl scale-100 lg:scale-105 z-10" 
                    : "bg-transparent border-transparent hover:bg-white/50 hover:border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveIdx(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon Box */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-blue-50 text-blue-600"
                    }`}>
                      <i className={`fas fa-${feature.icon} text-xl`}></i>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-xl font-bold ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                          {feature.title}
                        </h4>
                        {isActive && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-fade-in">
                            {feature.stats}
                          </span>
                        )}
                      </div>
                      
                      {/* Expanded Content (Description + Mobile Image) */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                        
                        {/* Mobile Only: Inline Image for context when right column is hidden */}
                        <div className="lg:hidden mt-4 rounded-lg overflow-hidden h-48 w-full relative shadow-md">
                           <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                           <div className="absolute bottom-3 left-3 text-white text-xs font-bold">
                             {feature.stats}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Animation for Active Item */}
                  {isActive && !isPaused && (
                     <div className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-b-2xl transition-all duration-linear w-full origin-left animate-progress"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden lg:block relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-900">
             
             {/* Abstract Background Blobs */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

             {/* Stacked Images with Transitions */}
             {features.map((feature, index) => (
               <div 
                 key={feature.id}
                 className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                   index === activeIdx 
                   ? "opacity-100 scale-100 translate-x-0" 
                   : "opacity-0 scale-110 translate-x-10"
                 }`}
               >
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Content Card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white transform transition-transform duration-700 delay-100 translate-y-0 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                         <i className="fas fa-check text-white"></i>
                       </div>
                       <div>
                         <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Key Benefit</p>
                         <p className="font-bold text-lg">{feature.stats}</p>
                       </div>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed border-t border-white/10 pt-4">
                      "{feature.description}"
                    </p>
                  </div>
               </div>
             ))}
          </div>

        </div>
      </div>
      
      {/* Styles for Animations */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}