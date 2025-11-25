export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Ready to Start Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Banking Journey?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              Join India's fastest growing digital bank. Open your account in 5 minutes 
              with just your Aadhaar and PAN. Experience banking that works for you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Zero paperwork digital onboarding",
                "Instant account activation",
                "Free debit card & chequebook",
                "24/7 customer support",
                "Advanced security features",
                "Competitive interest rates"
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

          <CTACard />
        </div>
      </div>
    </section>
  );
}

function CTACard() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold mb-6 text-center">Open Your Account Today</h3>
      
      <div className="space-y-4 mb-8">
        {[
          { icon: "user-check", title: "Digital Verification", desc: "Using Aadhaar & PAN" },
          { icon: "bolt", title: "Instant Activation", desc: "Account ready in 5 minutes" },
          { icon: "gift", title: "Welcome Benefits", desc: "Free debit card & insurance" }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <i className={`fas fa-${item.icon} text-yellow-400 text-lg`}></i>
            </div>
            <div>
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-blue-200 text-sm">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <a
          href="/open-account"
          className="block bg-yellow-400 text-blue-900 px-6 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-colors text-center text-lg shadow-lg hover:shadow-xl"
        >
          Open Digital Account
        </a>
        <a
          href="/contact"
          className="block border border-white text-white px-6 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-colors text-center text-lg"
        >
          Visit Nearest Branch
        </a>
      </div>
    </div>
  );
}