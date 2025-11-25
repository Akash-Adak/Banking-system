export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <img 
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Professional Banking"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">India's Most Trusted Digital Bank • Since 1994</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                Banking
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Reimagined</span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                Experience next-generation banking with instant loans, zero-balance accounts, 
                and 24/7 digital services. Join 50 million+ satisfied customers across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/open-account"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center flex items-center justify-center gap-3"
              >
                <i className="fas fa-user-plus text-lg group-hover:scale-110 transition-transform"></i>
                Open Account Free
              </a>
              <a
                href="/net-banking"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1 text-center flex items-center justify-center gap-3"
              >
                <i className="fas fa-lock text-lg group-hover:scale-110 transition-transform"></i>
                Net Banking Login
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-check text-green-400 text-xl"></i>
                <span className="text-sm">RBI Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-medal text-yellow-400 text-xl"></i>
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-clock text-blue-400 text-xl"></i>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* App Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-900 font-bold text-sm">BE</span>
            </div>
            <div>
              <div className="text-lg font-bold text-white">BankEase Pro</div>
              <div className="text-blue-200 text-xs">Premium Banking</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">₹1,45,230.50</div>
            <div className="text-green-400 text-xs">Available Balance</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: "arrow-up", label: "Send", color: "bg-blue-500" },
            { icon: "arrow-down", label: "Receive", color: "bg-green-500" },
            { icon: "mobile-alt", label: "Recharge", color: "bg-purple-500" },
            { icon: "bolt", label: "Pay", color: "bg-orange-500" }
          ].map((action, index) => (
            <button key={index} className="text-center group">
              <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fas fa-${action.icon} text-white text-lg`}></i>
              </div>
              <div className="text-white text-xs font-medium">{action.label}</div>
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-white text-sm">
            <div>Recent Transactions</div>
            <button className="text-blue-300 hover:text-white text-xs">View All</button>
          </div>
          {[
            { name: "Amazon India", amount: "-₹1,499.00", time: "10:30 AM", type: "shopping" },
            { name: "Salary Credit", amount: "+₹85,000.00", time: "9:15 AM", type: "credit" },
            { name: "UPI Transfer", amount: "-₹2,500.00", time: "Yesterday", type: "transfer" }
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <i className={`fas fa-${transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'} ${
                    transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                  } text-xs`}></i>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{transaction.name}</div>
                  <div className="text-blue-200 text-xs">{transaction.time}</div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.amount.startsWith('+') ? 'text-green-400' : 'text-white'
              }`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
        Secure ✓
      </div>
      <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
        24/7 Support
      </div>
    </div>
  );
}