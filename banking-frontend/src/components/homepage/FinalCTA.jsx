import React from 'react';

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden font-sans">
      {/* Background Image with Corporate Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Banking Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/90 to-blue-800/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content: Value Proposition */}
          <div className="space-y-8 text-white">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-800 border border-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                Join 5 Million+ Indians
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Ready to Upgrade to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Titanium Banking?
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              Experience the power of a zero-balance premium account with lifetime free credit cards and instant loans. Paperless, seamless, and secure.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {[
                "Lifetime Free Credit Card",
                "Upto 7% Interest on Savings",
                "Zero Forex Markup",
                "24/7 Concierge Service",
                "Instant Digital Onboarding",
                "Complimentary Lounge Access"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 flex-shrink-0">
                    <i className="fas fa-check text-green-400 text-xs"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Stack */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
               <div className="flex -space-x-3">
                  {[10, 12, 32, 44].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-900 bg-gray-300 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-blue-900 bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
                    +5M
                  </div>
               </div>
               <p className="text-sm text-blue-200 font-medium">Trusted by families across the nation.</p>
            </div>
          </div>

          {/* Right Content: The "Application Steps" Card */}
          <div className="relative">
             {/* Decorative Elements behind card */}
             <div className="absolute top-[-20px] right-[-20px] w-full h-full border-2 border-yellow-400/30 rounded-[2rem] transform translate-x-4 translate-y-4 hidden md:block"></div>
             
             <div className="bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                
                <div className="text-center mb-8">
                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                      <i className="fas fa-fingerprint text-3xl text-blue-600"></i>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900">Open Digital Account</h3>
                   <p className="text-gray-500 text-sm mt-2">Complete your KYC in 3 simple steps</p>
                </div>

                {/* Steps Visualizer */}
                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 transition-all cursor-default">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                      <div className="flex-1">
                         <h4 className="font-bold text-gray-900 text-sm">Enter Mobile Number</h4>
                         <p className="text-xs text-gray-500">Link with Aadhaar for faster process</p>
                      </div>
                      <i className="fas fa-check-circle text-green-500"></i>
                   </div>
                   
                   <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 transition-all hover:border-blue-200 hover:shadow-md cursor-default group">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">2</div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">Verify PAN Details</h4>
                         <p className="text-xs text-gray-500">Secure verification with NSDL</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 transition-all hover:border-blue-200 hover:shadow-md cursor-default group">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">3</div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">Video KYC</h4>
                         <p className="text-xs text-gray-500">Instant activation in 5 minutes</p>
                      </div>
                   </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98]">
                   Get Started Now 
                   <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4 flex justify-center items-center gap-2">
                   <i className="fas fa-lock text-green-500"></i> 256-bit Secure Encryption
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}