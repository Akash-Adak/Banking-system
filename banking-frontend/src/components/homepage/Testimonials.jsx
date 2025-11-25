import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    content: "The instant loan approval helped me expand my business. Got ₹25 lakhs in just 24 hours! Excellent service and support.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    role: "Small Business Owner"
  },
  {
    name: "Priya Sharma",
    location: "Delhi",
    content: "Mobile banking is incredibly convenient. I can do all transactions from my phone securely. The app is very user-friendly.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
    role: "Software Engineer"
  },
  {
    name: "Arun Patel",
    location: "Bangalore",
    content: "Best customer service and quick problem resolution. My issues are resolved in minutes! Highly recommended for everyone.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    role: "Marketing Manager"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            What Our <span className="text-blue-600">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600">Join millions of satisfied customers across India</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <div className="text-2xl mb-6 leading-relaxed text-gray-700 italic">
                    "{testimonials[currentSlide].content}"
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-gray-900">{testimonials[currentSlide].name}</div>
                    <div className="text-blue-600 font-medium">{testimonials[currentSlide].role}</div>
                    <div className="text-gray-500 text-sm">{testimonials[currentSlide].location}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}