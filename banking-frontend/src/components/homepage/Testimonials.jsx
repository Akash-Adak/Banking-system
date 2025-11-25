import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh & Meera Iyer",
    location: "Mumbai, Maharashtra",
    title: "Home Loan Success",
    content: "We never thought buying a home in Mumbai would be this seamless. BankEase processed our loan in just 4 days with minimal paperwork. The door-step service was a game changer for us.",
    image: "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1000&auto=format&fit=crop",
    role: "IT Professionals",
    rating: 5
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    location: "Bangalore, Karnataka",
    title: "Business Expansion",
    content: "As a startup founder, liquidity is everything. The instant overdraft facility helped me manage cash flow during our critical growth phase. Truly a partner in my business journey.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    role: "Founder, TechStart",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Anjali Sharma",
    location: "Delhi, NCR",
    title: "Wealth Management",
    content: "The investment advisory team is exceptional. They helped me restructure my portfolio for better tax efficiency and long-term growth. I feel much more secure about my retirement now.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    role: "Senior Consultant",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  

  useEffect(() => {
    if(isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

 

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-3">
            Customer Stories
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            Trusted by <span className="text-blue-700">Millions.</span>
          </h3>
        </div>

        <div 
          className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            
            {/* Image Section */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              {testimonials.map((item, index) => (
                <div 
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent lg:hidden"></div>
                </div>
              ))}
              
              {/* Quote Icon Overlay */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400 rounded-br-3xl flex items-center justify-center shadow-lg z-20">
                <i className="fas fa-quote-right text-3xl text-blue-900"></i>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
               
               {testimonials.map((item, index) => (
                 <div 
                   key={item.id}
                   className={`transition-all duration-700 ease-in-out transform ${
                     index === currentSlide 
                       ? "opacity-100 translate-x-0 relative" 
                       : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
                   }`}
                 >
                   {/* Rating */}
                   <div className="flex gap-1 mb-6 text-yellow-400 text-sm">
                     {[...Array(item.rating)].map((_, i) => (
                       <i key={i} className="fas fa-star"></i>
                     ))}
                   </div>

                   <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                     "{item.title}"
                   </h3>
                   
                   <p className="text-lg text-gray-600 leading-relaxed mb-8 italic">
                     {item.content}
                   </p>

                   <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                     <div>
                       <div className="font-bold text-gray-900 text-lg">{item.name}</div>
                       <div className="text-sm text-blue-600 font-semibold">{item.role}</div>
                       <div className="text-xs text-gray-400 mt-1">{item.location}</div>
                     </div>
                     <div className="ml-auto flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                       <i className="fas fa-check-circle"></i> Verified Customer
                     </div>
                   </div>
                 </div>
               ))}

               {/* Controls */}
               <div className="flex items-center justify-between mt-12 pt-4">
                 
                 {/* Progress Dots */}
                 <div className="flex gap-2">
                   {testimonials.map((_, index) => (
                     <button
                       key={index}
                       onClick={() => setCurrentSlide(index)}
                       className={`h-1.5 rounded-full transition-all duration-300 ${
                         index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                       }`}
                       aria-label={`Go to slide ${index + 1}`}
                     />
                   ))}
                 </div>

                 {/* Arrows */}
                 <div className="flex gap-4">
                   <button 
                     onClick={prevSlide}
                     className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                   >
                     <i className="fas fa-arrow-left"></i>
                   </button>
                   <button 
                     onClick={nextSlide}
                     className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                   >
                     <i className="fas fa-arrow-right"></i>
                   </button>
                 </div>

               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}