import React, { useRef } from 'react';

const quickServices = [
  { 
    name: "Open Account", 
    desc: "Digital savings in 5 mins",
    link: "/open-account", 
    image: "https://tse2.mm.bing.net/th/id/OIP.q9aCFsdaerT2AaCPdOrNEwHaFa?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: "user-plus"
  },
  { 
    name: "Net Banking", 
    desc: "Bank from anywhere",
    link: "/login", 
    image: "https://streetwisejournal.com/wp-content/uploads/2023/02/63e1692b5cbb3.jpg",
    icon: "globe"
  },
  { 
    name: "Credit Cards", 
    desc: "Lifetime free premium cards",
    link: "/credit-cards", 
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop",
    icon: "credit-card"
  },
  { 
    name: "Instant Loans", 
    desc: "Approvals in seconds",
    link: "/loans", 
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop",
    icon: "hand-holding-usd"
  },
  { 
    name: "Investments", 
    desc: "Grow your wealth",
    link: "/investments", 
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    icon: "chart-line"
  },
  { 
    name: "Insurance", 
    desc: "Secure your future",
    link: "/insurance", 
    image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=800&auto=format&fit=crop",
    icon: "shield-alt"
  }
];

export default function QuickServices() {
  const scrollRef = useRef(null);

  // Function to handle manual scrolling via buttons
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Scroll by the width of one card + gap (approx 340px)
      const scrollAmount = 340; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
      
          
          {/* Navigation Controls (Visible on all screens, but most useful on Desktop) */}
          <div className="flex gap-3">
             <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm active:scale-95 bg-white"
                aria-label="Scroll Left"
             >
                <i className="fas fa-arrow-left"></i>
             </button>
             <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-md active:scale-95 hover:shadow-lg"
                aria-label="Scroll Right"
             >
                <i className="fas fa-arrow-right"></i>
             </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative w-full">
          
          {/* CSS to Hide Scrollbars while keeping functionality */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}</style>

          {/* The Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" 
            style={{ scrollBehavior: 'smooth' }}
          >
            
            {quickServices.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className="relative flex-shrink-0 w-[85vw] sm:w-[300px] md:w-[340px] h-[450px] rounded-3xl overflow-hidden snap-center group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-gray-900"
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                    loading="lazy"
                  />
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    
                    {/* Icon Badge */}
                    <div className="w-12 h-12 mb-4 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                       <i className={`fas fa-${service.icon} text-xl text-yellow-400`}></i>
                    </div>

                    <h3 className="text-3xl font-bold mb-2 leading-tight">{service.name}</h3>
                    
                    <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                      {service.desc}
                    </p>

                    {/* Action Line */}
                    <div className="mt-6 flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span>Explore</span> <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* Spacer for Mobile Right Padding ensures last card isn't flush against edge */}
            <div className="w-4 flex-shrink-0 sm:hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}