import React from 'react';

const loanProducts = [
  {
    type: "Home Loan",
    rate: "8.35% p.a.*",
    amount: "Up to ₹10 Cr",
    tenure: "Max 30 Years",
    features: ["Digital Sanction in 30 mins", "Part Payment Facility", "No Hidden Charges"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tag: "BEST SELLER"
  },
  {
    type: "Car Loan",
    rate: "8.85% p.a.*",
    amount: "Up to 100% On-Road",
    tenure: "Max 7 Years",
    features: ["Instant Disbursal", "Minimal Documentation", "Flexible EMI Options"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop",
    tag: "POPULAR"
  },
  {
    type: "Personal Loan",
    rate: "10.50% p.a.*",
    amount: "Up to ₹40 Lakhs",
    tenure: "Max 5 Years",
    features: ["Money in 10 seconds", "No Collateral Required", "24/7 Assistance"],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
    tag: "INSTANT"
  },
  {
    type: "Education Loan",
    rate: "9.25% p.a.*",
    amount: "Up to ₹1.5 Cr",
    tenure: "Max 15 Years",
    features: ["Moratorium Period", "Tax Benefit u/s 80E", "Covers Global Universities"],
    image: "https://th.bing.com/th/id/OIP.XIeWced83xY8MRGJziOazgHaD4?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    tag: "STUDENT SPECIAL"
  }
];

export default function LoanProducts() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
    

        {/* Loan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanProducts.map((loan, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group flex flex-col">
              
              {/* Image Header with Tag */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={loan.image} 
                  alt={loan.type} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                
                {/* Status Tag */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-[10px] font-black px-3 py-1 rounded-sm shadow-md uppercase tracking-wide">
                  {loan.tag}
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold text-shadow">{loan.type}</h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Key Metrics */}
                <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Interest Rate</p>
                    <p className="text-2xl font-bold text-blue-800">{loan.rate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Tenure</p>
                    <p className="text-sm font-bold text-gray-800">{loan.tenure}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6 flex-1">
                   {loan.features.map((feat, i) => (
                     <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                       <i className="fas fa-check-circle text-green-500 mt-0.5 text-xs flex-shrink-0"></i>
                       <span className="leading-tight">{feat}</span>
                     </div>
                   ))}
                </div>

                {/* Corporate Actions */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="px-4 py-2.5 border border-blue-800 text-blue-800 rounded-lg font-bold text-xs hover:bg-blue-50 transition-colors uppercase tracking-wide">
                    Know More
                  </button>
                  <button className="px-4 py-2.5 bg-blue-800 text-white rounded-lg font-bold text-xs hover:bg-blue-900 shadow-md hover:shadow-lg transition-all uppercase tracking-wide">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}