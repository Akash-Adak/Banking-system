export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 40%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <i className="fas fa-university text-white text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  BankEase
                </div>
                <div className="text-sm text-blue-300 font-medium">Digital Banking Reimagined</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Trusted by over 10 million customers across India. Experience next-generation digital banking 
              with state-of-the-art security, instant services, and 24/7 customer support.
            </p>

            {/* App Download Buttons */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-200">Download Our App</div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600 group">
                  <i className="fab fa-google-play text-2xl text-green-400 group-hover:text-green-300"></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600 group">
                  <i className="fab fa-apple text-2xl text-gray-300 group-hover:text-white"></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3 pt-4">
              {[
                { icon: 'facebook-f', color: 'blue-600', hover: 'blue-500' },
                { icon: 'twitter', color: 'blue-400', hover: 'blue-300' },
                { icon: 'linkedin-in', color: 'blue-700', hover: 'blue-600' },
                { icon: 'instagram', color: 'pink-600', hover: 'pink-500' },
                { icon: 'youtube', color: 'red-600', hover: 'red-500' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-700 group`}
                >
                  <i className={`fab fa-${social.icon} text-gray-400 group-hover:text-white text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Banking Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <i className="fas fa-cube text-blue-400 text-sm"></i>
              <span>Banking Products</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Savings Account', icon: 'piggy-bank' },
                { name: 'Current Account', icon: 'building' },
                { name: 'Credit Cards', icon: 'credit-card' },
                { name: 'Personal Loan', icon: 'hand-holding-usd' },
                { name: 'Home Loan', icon: 'home' },
                { name: 'Car Loan', icon: 'car' },
                { name: 'Fixed Deposits', icon: 'chart-line' },
                { name: 'Demat Account', icon: 'chart-pie' }
              ].map((product, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-200 group hover:translate-x-1"
                >
                  <i className={`fas fa-${product.icon} text-blue-400 text-xs w-4 group-hover:scale-110 transition-transform`}></i>
                  <span className="text-sm">{product.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <i className="fas fa-concierge-bell text-green-400 text-sm"></i>
              <span>Our Services</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Net Banking', icon: 'laptop' },
                { name: 'Mobile Banking', icon: 'mobile-alt' },
                { name: 'UPI Payments', icon: 'qrcode' },
                { name: 'Bill Payments', icon: 'file-invoice' },
                { name: 'Fund Transfer', icon: 'exchange-alt' },
                { name: 'Investment', icon: 'chart-line' },
                { name: 'Insurance', icon: 'shield-alt' },
                { name: 'Tax Services', icon: 'calculator' }
              ].map((service, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-200 group hover:translate-x-1"
                >
                  <i className={`fas fa-${service.icon} text-green-400 text-xs w-4 group-hover:scale-110 transition-transform`}></i>
                  <span className="text-sm">{service.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <i className="fas fa-headset text-purple-400 text-sm"></i>
              <span>Support</span>
            </h3>
            <div className="space-y-4">
              {/* Customer Care */}
              <div className="flex items-start space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                  <i className="fas fa-phone-alt text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">24/7 Customer Care</div>
                  <div className="font-bold text-lg text-white">1800-123-4567</div>
                  <div className="text-xs text-green-400 flex items-center space-x-1 mt-1">
                    <i className="fas fa-circle text-xs"></i>
                    <span>Toll Free</span>
                  </div>
                </div>
              </div>

              {/* Email Support */}
              <div className="flex items-start space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                  <i className="fas fa-envelope text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email Support</div>
                  <div className="font-bold text-white">support@bankease.com</div>
                  <div className="text-xs text-blue-400 flex items-center space-x-1 mt-1">
                    <i className="fas fa-clock text-xs"></i>
                    <span>Response within 2 hours</span>
                  </div>
                </div>
              </div>

              {/* Branch Locator */}
              <div className="flex items-start space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Branch & ATM Locator</div>
                  <div className="font-bold text-white">5,000+ Locations</div>
                  <div className="text-xs text-orange-400 flex items-center space-x-1 mt-1">
                    <i className="fas fa-search text-xs"></i>
                    <span>Find Nearest Branch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">256-bit SSL Secured</div>
                  <div className="text-xs text-gray-400">Your data is protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 relative z-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm flex items-center space-x-2">
              <i className="fas fa-copyright text-xs"></i>
              <span>2025 BankEase Ltd. All Rights Reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                'Privacy Policy', 
                'Terms & Conditions', 
                'Security', 
                'Disclaimer', 
                'Compliance',
                'Sitemap'
              ].map((link, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Regulatory Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-balance-scale text-yellow-500"></i>
                <span>RBI Registered</span>
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-user-shield text-green-500"></i>
                <span>Insured up to ₹5,00,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
    </footer>
  );
}