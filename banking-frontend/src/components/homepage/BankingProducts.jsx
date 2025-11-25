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

export default function BankingProducts() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Our <span className="text-blue-600">Banking Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored for individuals and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bankingProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden hover:transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {product.interestRate}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg`}>
            <i className={`fas fa-${product.icon} text-${product.color}-600 text-xl`}></i>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-600">
              <i className="fas fa-check-circle text-green-500 mr-3 text-base"></i>
              {feature}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Min: <span className="font-semibold text-gray-700">{product.minBalance}</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm group-hover:shadow-lg">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}