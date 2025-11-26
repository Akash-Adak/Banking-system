import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Note: Ensure you have FontAwesome loaded in your index.html for the icons to work
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

const quickServices = [
  {
    id: 1,
    name: "Digital Account",
    desc: "Open a zero-balance savings account in just 5 minutes with video KYC.",
    link: "/open-account",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    icon: "user-plus",
    bgClass: "bg-blue-50",
    textAccent: "text-blue-600",
    buttonGradient: "from-blue-600 to-blue-700",
    badge: "Instant"
  },
  {
    id: 2,
    name: "Net Banking",
    desc: "Experience secure, 24/7 banking with military-grade encryption access.",
    link: "/login",
    image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=1000&auto=format&fit=crop",
    icon: "laptop-code",
    bgClass: "bg-emerald-50",
    textAccent: "text-emerald-600",
    buttonGradient: "from-emerald-600 to-emerald-700",
    badge: "Secure"
  },
  {
    id: 3,
    name: "Premium Cards",
    desc: "Lifetime free credit cards with exclusive airport lounge access and rewards.",
    link: "/credit-cards",
    image: "https://www.vijaymaheshwari.com/wp-content/uploads/2023/12/cc-1024x577.jpg",
    icon: "credit-card",
    bgClass: "bg-purple-50",
    textAccent: "text-purple-600",
    buttonGradient: "from-purple-600 to-purple-700",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Instant Loans",
    desc: "Get pre-approved personal loans disbursed to your account in 10 minutes.",
    link: "/loans",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    icon: "hand-holding-dollar",
    bgClass: "bg-orange-50",
    textAccent: "text-orange-600",
    buttonGradient: "from-orange-600 to-orange-700",
    badge: "Paperless"
  }
];

export default function QuickServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const nextService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % quickServices.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + quickServices.length) % quickServices.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      nextService();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentService = quickServices[currentIndex];

  return (
    <section className="relative py-20 bg-white font-sans overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Banking at Your Fingertips
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our range of digital services designed to make your financial life easier.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Navigation Buttons (Outside Card) */}
          <button 
            onClick={prevService}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm hover:shadow-md transition-all z-20"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={nextService}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm hover:shadow-md transition-all z-20"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 h-[600px] md:h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              
              {/* Left Column: Content */}
              <div className={`relative h-full p-8 md:p-12 flex flex-col justify-center transition-colors duration-500 ${currentService.bgClass}`}>
                {/* Animated Content Wrapper */}
                <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  
                  {/* Badge & Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm ${currentService.textAccent}`}>
                      <i className={`fas fa-${currentService.icon} text-xl`}></i>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 ${currentService.textAccent}`}>
                      {currentService.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {currentService.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {currentService.desc}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => navigate(currentService.link)}
                      className={`px-8 py-3.5 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r ${currentService.buttonGradient}`}
                    >
                      Get Started <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                    <button className="px-6 py-3.5 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                      Learn More
                    </button>
                  </div>

                </div>

                {/* Progress Indicators (Mobile/Tablet inside card) */}
                <div className="absolute bottom-8 left-8 md:left-12 flex gap-2">
                  {quickServices.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gray-800' : 'w-2 bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="relative h-full overflow-hidden hidden md:block group">
                {/* The Image - Fixed here! */}
                <img 
                  src={currentService.image} 
                  alt={currentService.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isAnimating ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
                />
                
                {/* Overlay Gradient for Text Contrast (if needed) or aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Mobile Image (Banner style for small screens) */}
              <div className="md:hidden h-48 relative overflow-hidden order-first">
                 <img 
                  src={currentService.image} 
                  alt={currentService.name}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}