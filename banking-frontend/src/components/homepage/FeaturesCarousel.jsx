import { useState, useEffect } from "react";

const features = [
  {
    title: "Instant Money Transfer",
    description: "Send money to any bank account in India within seconds using UPI, IMPS, or NEFT. Real-time processing with complete security.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    stats: "50M+ transactions monthly"
  },
  {
    title: "Smart Investments",
    description: "AI-powered investment recommendations and portfolio management for maximum returns. Expert advisory and tax-saving options.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    stats: "12-18% average returns"
  },
  {
    title: "24/7 Customer Support",
    description: "Round-the-clock customer service with instant query resolution via chat, call, or email. Dedicated relationship managers.",
    image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=600&h=400&fit=crop",
    stats: "2 min average response time"
  },
  {
    title: "Advanced Security",
    description: "Multi-layer security with biometric authentication and real-time fraud detection. 256-bit encryption for all transactions.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    stats: "Zero fraud incidents"
  }
];

export default function FeaturesCarousel() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">BankEase?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience banking like never before with our cutting-edge features and premium services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={features[currentFeature].image}
              alt={features[currentFeature].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
              <div className="text-sm font-semibold text-yellow-400 mb-2">{features[currentFeature].stats}</div>
              <h3 className="text-2xl font-bold mb-2">{features[currentFeature].title}</h3>
              <p className="text-blue-100 text-sm">{features[currentFeature].description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 ${
                    index === currentFeature 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xl transform -translate-y-1' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        index === currentFeature ? 'bg-white/20' : 'bg-blue-100'
                      }`}>
                        <i className={`fas fa-${['money-bill-transfer', 'chart-line', 'headset', 'shield-alt'][index]} ${
                          index === currentFeature ? 'text-white' : 'text-blue-600'
                        } text-lg`}></i>
                      </div>
                      <div>
                        <div className={`font-bold text-lg mb-1 ${index === currentFeature ? 'text-white' : 'text-gray-900'}`}>
                          {feature.title}
                        </div>
                        <div className={`text-sm ${index === currentFeature ? 'text-blue-100' : 'text-gray-600'}`}>
                          {feature.stats}
                        </div>
                      </div>
                    </div>
                    {index === currentFeature && (
                      <i className="fas fa-chevron-right text-white text-lg"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}