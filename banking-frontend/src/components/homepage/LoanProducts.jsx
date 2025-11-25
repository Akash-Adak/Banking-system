const loanProducts = [
  {
    type: "Home Loan",
    rate: "6.9%",
    amount: "Up to ₹5 Cr",
    tenure: "30 years",
    emi: "₹7,500/lakh*",
    features: ["Lowest interest rates", "Quick processing", "Balance transfer"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop"
  },
  {
    type: "Car Loan",
    rate: "7.5%",
    amount: "Up to ₹50 Lakhs",
    tenure: "7 years",
    emi: "₹1,650/lakh*",
    features: ["100% on-road funding", "Fast approval", "Flexible repayment"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop"
  },
  {
    type: "Education Loan",
    rate: "8.2%",
    amount: "Up to ₹1.5 Cr",
    tenure: "15 years",
    emi: "₹1,200/lakh*",
    features: ["Moratorium period", "No collateral", "Global education"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop"
  },
  {
    type: "Business Loan",
    rate: "11.5%",
    amount: "Up to ₹2 Cr",
    tenure: "5 years",
    emi: "₹2,200/lakh*",
    features: ["No security needed", "24hr approval", "Working capital"],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop"
  }
];

export default function LoanProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Quick <span className="text-blue-600">Loan Solutions</span>
          </h2>
          <p className="text-lg text-gray-600">Get instant loans with competitive interest rates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loanProducts.map((loan, index) => (
            <LoanCard key={index} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoanCard({ loan }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:transform hover:-translate-y-2">
      <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
        <img 
          src={loan.image}
          alt={loan.type}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-blue-900/30"></div>
        <div className="absolute top-4 left-4">
          <h3 className="text-lg font-bold text-white">{loan.type}</h3>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-3xl font-black text-green-600 mb-2">{loan.rate}</div>
        <div className="text-sm text-gray-500">Interest Rate</div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Loan Amount</span>
          <span className="font-semibold text-gray-900">{loan.amount}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Tenure</span>
          <span className="font-semibold text-gray-900">{loan.tenure}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">EMI Starts</span>
          <span className="font-semibold text-gray-900">{loan.emi}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {loan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center text-xs text-gray-600">
            <i className="fas fa-check text-blue-500 mr-2 text-xs"></i>
            {feature}
          </div>
        ))}
      </div>
      
      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
        Apply for Loan
      </button>
    </div>
  );
}