import PublicLayout from "../layout/PublicLayout";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [rates, setRates] = useState({
    usd: 83.15,
    eur: 89.50,
    gold: 6250,
    nifty: 22450
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate live rates updates
    const rateInterval = setInterval(() => {
      setRates(prev => ({
        usd: prev.usd + (Math.random() - 0.5) * 0.1,
        eur: prev.eur + (Math.random() - 0.5) * 0.1,
        gold: prev.gold + (Math.random() - 0.5) * 10,
        nifty: prev.nifty + (Math.random() - 0.5) * 50
      }));
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(rateInterval);
    };
  }, []);

  // Banking products with real rates and features
  const bankingProducts = [
    {
      icon: "piggy-bank",
      title: "Savings Account",
      description: "High-interest savings with premium benefits",
      features: ["4.5% interest rate", "Zero balance requirement", "Free debit card", "Digital onboarding"],
      color: "blue",
      interestRate: "4.5%",
      minBalance: "Zero",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
    },
    {
      icon: "building",
      title: "Current Account",
      description: "For businesses with premium banking benefits",
      features: ["Unlimited transactions", "Business loans", "Dedicated manager", "Overdraft facility"],
      color: "green",
      interestRate: "3.2%",
      minBalance: "₹10,000",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      icon: "hand-holding-usd",
      title: "Personal Loan",
      description: "Instant loans with minimal documentation",
      features: ["Up to ₹25 lakhs", "24hr approval", "Flexible EMI", "Low interest rates"],
      color: "purple",
      interestRate: "10.5%",
      minBalance: "N/A",
      image: "https://images.unsplash.com/photo-1583753075961-0c49e0b14cf4?w=400&h=300&fit=crop"
    },
    {
      icon: "chart-line",
      title: "Investment Plans",
      description: "Wealth management and mutual funds",
      features: ["Expert advisory", "Demat account", "Tax savings", "Portfolio management"],
      color: "orange",
      interestRate: "12-18%",
      minBalance: "₹5,000",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    }
  ];

  // Loan products with real rates
  const loanProducts = [
    {
      type: "Home Loan",
      rate: "6.9%",
      amount: "Up to ₹5 Cr",
      tenure: "30 years",
      emi: "₹7,500/lakh*",
      features: ["Lowest interest rates", "Quick processing", "Balance transfer"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop"
    },
    {
      type: "Car Loan",
      rate: "7.5%",
      amount: "Up to ₹50 Lakhs",
      tenure: "7 years",
      emi: "₹1,650/lakh*",
      features: ["100% on-road funding", "Fast approval", "Flexible repayment"],
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&h=200&fit=crop"
    },
    {
      type: "Education Loan",
      rate: "8.2%",
      amount: "Up to ₹1.5 Cr",
      tenure: "15 years",
      emi: "₹1,200/lakh*",
      features: ["Moratorium period", "No collateral", "Global education"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop"
    },
    {
      type: "Business Loan",
      rate: "11.5%",
      amount: "Up to ₹2 Cr",
      tenure: "5 years",
      emi: "₹2,200/lakh*",
      features: ["No security needed", "24hr approval", "Working capital"],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop"
    }
  ];

  // Quick services
  const quickServices = [
    { name: "Open Account", icon: "user-plus", link: "/open-account", color: "from-blue-500 to-blue-600" },
    { name: "Net Banking", icon: "globe", link: "/login", color: "from-green-500 to-green-600" },
    { name: "Credit Card", icon: "credit-card", link: "/credit-cards", color: "from-purple-500 to-purple-600" },
    { name: "Loan", icon: "hand-holding-usd", link: "/loans", color: "from-orange-500 to-orange-600" },
    { name: "Invest", icon: "chart-line", link: "/investments", color: "from-red-500 to-red-600" },
    { name: "Insurance", icon: "shield-alt", link: "/insurance", color: "from-indigo-500 to-indigo-600" }
  ];

  // Features carousel
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

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      content: "The instant loan approval helped me expand my business. Got ₹25 lakhs in just 24 hours! Excellent service and support.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Small Business Owner"
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      content: "Mobile banking is incredibly convenient. I can do all transactions from my phone securely. The app is very user-friendly.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "Software Engineer"
    },
    {
      name: "Arun Patel",
      location: "Bangalore",
      content: "Best customer service and quick problem resolution. My issues are resolved in minutes! Highly recommended for everyone.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Marketing Manager"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length, features.length]);

  return (
    <PublicLayout>
      {/* Live Rates Ticker */}
      <div className="bg-gray-900 text-white text-sm py-3 overflow-hidden relative z-50 border-b border-yellow-400">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="mx-6 text-yellow-400 font-bold">LIVE RATES:</span>
          <span className="mx-6">USD/INR: <span className={rates.usd > 83.12 ? "text-green-400" : "text-red-400"}>{rates.usd.toFixed(2)}</span></span>
          <span className="mx-6">EUR/INR: <span className={rates.eur > 89.45 ? "text-green-400" : "text-red-400"}>{rates.eur.toFixed(2)}</span></span>
          <span className="mx-6">GOLD (1g): ₹{rates.gold.toFixed(0)}</span>
          <span className="mx-6">NIFTY: {rates.nifty.toFixed(0)}</span>
          <span className="mx-6 text-yellow-400 font-bold">OFFER: Get iPhone 1 at 0% EMI with BankEase Credit Cards*</span>
        </div>
      </div>

      {/* Hero Section with Real Banking Visuals */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-700/30"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <img 
            src="https://static.vecteezy.com/system/resources/previews/026/827/665/non_2x/banking-and-finance-concept-illustration-vector.jpg" 
            alt="Banking Background"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6 border border-white/30">
                <i className="fas fa-shield-check text-yellow-400"></i>
                <span className="font-semibold">India's Most Trusted Digital Bank</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Smart Banking
                <br />
                <span className="text-yellow-400">Brighter Future</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Experience next-generation banking with instant loans, zero-balance accounts, 
                and 24/7 digital services. Join 50 million+ satisfied customers across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/open-account"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3"
                >
                  <i className="fas fa-user-plus text-lg"></i>
                  Open Account Free
                </a>
                <a
                  href="/net-banking"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 text-center flex items-center justify-center gap-3"
                >
                  <i className="fas fa-lock text-lg"></i>
                  Net Banking Login
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-black text-yellow-400">50M+</div>
                  <div className="text-blue-200 text-sm">Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-black text-yellow-400">₹10T+</div>
                  <div className="text-blue-200 text-sm">Assets</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-black text-yellow-400">5000+</div>
                  <div className="text-blue-200 text-sm">Branches</div>
                </div>
              </div>
            </div>

            {/* Banking App Preview with Real Image */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-xl font-bold text-white mb-2">BankEase Mobile App</div>
                  <div className="text-blue-200 text-sm">All banking services in one secure app</div>
                </div>
                
                <img 
                  src="https://images.unsplash.com/photo-1563013546-7e58a167bb00?w=400&h=250&fit=crop" 
                  alt="Mobile Banking App"
                  className="w-full h-40 object-cover rounded-xl mb-6"
                />
                
                <div className="space-y-3 mb-6">
                  {[
                    { icon: "mobile-alt", text: "Instant Account Opening", color: "text-green-400" },
                    { icon: "bolt", text: "Quick Loan Approval", color: "text-blue-400" },
                    { icon: "shield-alt", text: "100% Secure Transactions", color: "text-red-400" },
                    { icon: "clock", text: "24/7 Customer Support", color: "text-purple-400" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <i className={`fas fa-${feature.icon} ${feature.color} text-base`}></i>
                      <span className="text-white font-medium text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm">
                    <i className="fab fa-google-play"></i>
                    Google Play
                  </button>
                  <button className="flex-1 bg-white text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm">
                    <i className="fab fa-apple"></i>
                    App Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quick <span className="text-blue-600">Banking Services</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickServices.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className="group text-center p-4 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <i className="fas fa-user-plus text-white text-2xl"></i>
                </div>
                <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-sm">
                  {service.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">BankEase?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience banking like never before with our cutting-edge features and premium services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="text-sm font-semibold text-yellow-400">{features[currentFeature].stats}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{features[currentFeature].title}</h3>
              <p className="text-gray-600 leading-relaxed">{features[currentFeature].description}</p>
              
              <div className="space-y-3">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                      index === currentFeature 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{features[index].title}</span>
                      {index === currentFeature && (
                        <i className="fas fa-chevron-right text-white"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banking Products with Real Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our <span className="text-blue-600">Banking Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored for individuals and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bankingProducts.map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-600 px-2 py-1 rounded-full text-xs font-bold">
                      {product.interestRate}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-${product.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`fas fa-${product.icon} text-${product.color}-600 text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                      <p className="text-xs text-gray-500">Min: {product.minBalance}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-600">
                        <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Quick <span className="text-blue-600">Loan Solutions</span>
            </h2>
            <p className="text-lg text-gray-600">Get instant loans with competitive interest rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((loan, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="relative h-28 mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={loan.image}
                    alt={loan.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{loan.type}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Interest Rate</span>
                    <span className="text-xl font-black text-green-600">{loan.rate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Loan Amount</span>
                    <span className="font-semibold text-gray-900 text-sm">{loan.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Tenure</span>
                    <span className="font-semibold text-gray-900 text-sm">{loan.tenure}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">EMI Starts</span>
                    <span className="font-semibold text-gray-900 text-sm">{loan.emi}</span>
                  </div>
                </div>

                <ul className="space-y-1 mb-4">
                  {loan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-600">
                      <i className="fas fa-check-circle text-blue-500 mr-2 text-xs"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                  Apply for Loan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Real User Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What Our <span className="text-blue-600">Customers Say</span>
            </h2>
            <p className="text-lg text-gray-600">Join millions of satisfied customers across India</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentSlide].avatar}
                      alt={testimonials[currentSlide].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                    />
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <div className="text-lg md:text-xl mb-4 leading-relaxed italic">
                      "{testimonials[currentSlide].content}"
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold mb-1">{testimonials[currentSlide].name}</div>
                      <div className="text-blue-200 text-sm">{testimonials[currentSlide].role}</div>
                      <div className="text-blue-200 text-sm">{testimonials[currentSlide].location}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-yellow-400 w-6' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Ready to Start Your
                <br />
                <span className="text-yellow-400">Banking Journey?</span>
              </h2>
              
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Join India's fastest growing digital bank. Open your account in 5 minutes 
                with just your Aadhaar and PAN. Experience banking that works for you.
              </p>

              <div className="space-y-4">
                {[
                  "Zero paperwork digital onboarding",
                  "Instant account activation",
                  "Free debit card & chequebook",
                  "24/7 customer support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-center">Open Your Account Today</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <i className="fas fa-user-check text-yellow-400 text-lg"></i>
                  <div>
                    <div className="font-semibold text-sm">Digital Verification</div>
                    <div className="text-blue-200 text-xs">Using Aadhaar & PAN</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <i className="fas fa-bolt text-yellow-400 text-lg"></i>
                  <div>
                    <div className="font-semibold text-sm">Instant Activation</div>
                    <div className="text-blue-200 text-xs">Account ready in 5 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <i className="fas fa-gift text-yellow-400 text-lg"></i>
                  <div>
                    <div className="font-semibold text-sm">Welcome Benefits</div>
                    <div className="text-blue-200 text-xs">Free debit card & insurance</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="/open-account"
                  className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-center text-sm"
                >
                  Open Digital Account
                </a>
                <a
                  href="/contact"
                  className="border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-colors text-center text-sm"
                >
                  Visit Nearest Branch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}