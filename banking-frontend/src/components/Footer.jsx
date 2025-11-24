export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <i className="fas fa-university text-white text-lg"></i>
              </div>
              <div>
                <div className="text-xl font-black">BankEase</div>
                <div className="text-xs text-gray-400">Digital Banking</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's most trusted digital bank, serving millions of customers with secure and innovative banking solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Products</h3>
            <div className="space-y-2">
              {['Savings Account', 'Current Account', 'Credit Cards', 'Personal Loan', 'Home Loan', 'Car Loan'].map((product, index) => (
                <a key={index} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  {product}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Services</h3>
            <div className="space-y-2">
              {['Net Banking', 'Mobile Banking', 'UPI Payments', 'Bill Payments', 'Investment', 'Insurance'].map((service, index) => (
                <a key={index} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone-alt text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">24/7 Customer Care</div>
                  <div className="font-semibold">1800-123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email Support</div>
                  <div className="font-semibold">support@bankease.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Branch Locator</div>
                  <div className="font-semibold">Find Nearest Branch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 BankEase Ltd. All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <i className="fas fa-shield-alt text-green-500"></i>
              <span>256-bit SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}