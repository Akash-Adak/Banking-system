import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../context/AuthContext";

const COLOR_MAP = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', groupBg: 'group-hover:from-blue-200', groupTo: 'group-hover:to-blue-300' },
  green: { bg: 'bg-green-100', text: 'text-green-600', groupBg: 'group-hover:from-green-200', groupTo: 'group-hover:to-green-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', groupBg: 'group-hover:from-purple-200', groupTo: 'group-hover:to-purple-300' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', groupBg: 'group-hover:from-orange-200', groupTo: 'group-hover:to-orange-300' },
  red: { bg: 'bg-red-100', text: 'text-red-600', groupBg: 'group-hover:from-red-200', groupTo: 'group-hover:to-red-300' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', groupBg: 'group-hover:from-teal-200', groupTo: 'group-hover:to-teal-300' },
};

// Icon mapping to fix any icon name mismatches
const ICON_MAP = {
  'piggy-bank': 'piggy-bank',
  'building': 'building',
  'money-check': 'money-check',
  'globe-americas': 'globe-americas',
  'hand-holding-usd': 'hand-holding-usd',
  'home': 'home',
  'car': 'car',
  'briefcase': 'briefcase',
  'credit-card': 'credit-card',
  'id-card': 'id-card',
  'wallet': 'wallet',
  'mobile-alt': 'mobile-alt',
  'file-invoice': 'file-invoice',
  'exchange-alt': 'exchange-alt',
  'chart-line': 'chart-line',
  'chart-bar': 'chart-bar',
  'shield-alt': 'shield-alt',
  'chart-pie': 'chart-pie',
  'calculator': 'calculator',
  'gem': 'gem',
  'project-diagram': 'project-diagram',
  'rocket': 'rocket',
  'file-contract': 'file-contract',
  'landmark': 'landmark',
  'balance-scale': 'balance-scale',
  'dollar-sign': 'dollar-sign',
  'chess-knight': 'chess-knight',
  'paper-plane': 'paper-plane',
  'receipt': 'receipt',
  'phone-alt': 'phone-alt',
  'envelope': 'envelope',
  'map-marker-alt': 'map-marker-alt',
  'question-circle': 'question-circle',
  'university': 'university',
  'cube': 'cube',
  'concierge-bell': 'concierge-bell',
  'gift': 'gift',
  'sign-in-alt': 'sign-in-alt',
  'user-plus': 'user-plus',
  'sign-out-alt': 'sign-out-alt',
  'times': 'times',
  'bars': 'bars',
  'chevron-down': 'chevron-down',
  'chevron-right': 'chevron-right'
};

export default function Navbar() {
  // Safe destructuring in case Context is not ready
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'products', 'services', 'invest', 'user' or null
  const [scrolled, setScrolled] = useState(false);
  
  const dropdownRef = useRef(null);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside (Specific for the User Click dropdown)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (activeDropdown === 'user') setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Simplified Hover Handlers
  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserDropdownToggle = () => {
    setActiveDropdown(activeDropdown === 'user' ? null : 'user');
  };

  const handleLogout = () => {
    if (logout) logout();
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Icon component to handle icon rendering
  const Icon = ({ name, className = "" }) => {
    const iconName = ICON_MAP[name] || name;
    return <i className={`fas fa-${iconName} ${className}`} />;
  };

  // --- DATA ARRAYS ---
  const bankingProducts = [
    {
      category: "Accounts",
      items: [
        { name: "Savings Account", icon: "piggy-bank", link: "/savings", description: "High interest savings" },
        { name: "Current Account", icon: "building", link: "/current", description: "For businesses" },
        { name: "Salary Account", icon: "money-check", link: "/salary", description: "Zero balance" },
        { name: "NRI Account", icon: "globe-americas", link: "/nri", description: "Global banking" }
      ]
    },
    {
      category: "Loans",
      items: [
        { name: "Personal Loan", icon: "hand-holding-usd", link: "/personal-loan", description: "Up to ₹25L" },
        { name: "Home Loan", icon: "home", link: "/home-loan", description: "Low interest rates" },
        { name: "Car Loan", icon: "car", link: "/car-loan", description: "100% funding" },
        { name: "Business Loan", icon: "briefcase", link: "/business-loan", description: "Quick approval" }
      ]
    },
    {
      category: "Cards",
      items: [
        { name: "Credit Cards", icon: "credit-card", link: "/credit-cards", description: "Rewards & cashback" },
        { name: "Debit Cards", icon: "id-card", link: "/debit-cards", description: "Instant issuance" },
        { name: "Prepaid Cards", icon: "wallet", link: "/prepaid-cards", description: "Gift & travel" }
      ]
    }
  ];

  const bankingServices = [
    {
      category: "Payments",
      items: [
        { name: "UPI Payments", icon: "mobile-alt", link: "/upi", description: "Instant transfers" },
        { name: "Bill Payments", icon: "file-invoice", link: "/bill-pay", description: "Auto pay" },
        { name: "Fund Transfer", icon: "exchange-alt", link: "/fund-transfer", description: "NEFT/IMPS" }
      ]
    },
    {
      category: "Investments",
      items: [
        { name: "Mutual Funds", icon: "chart-line", link: "/mutual-funds", description: "Expert advice" },
        { name: "Fixed Deposits", icon: "chart-bar", link: "/fixed-deposits", description: "High returns" },
        { name: "Insurance", icon: "shield-alt", link: "/insurance", description: "Life & health" }
      ]
    },
    {
      category: "Services",
      items: [
        { name: "Demat Account", icon: "chart-pie", link: "/demat", description: "Trading account" },
        { name: "Tax Services", icon: "calculator", link: "/tax", description: "e-filing" },
        { name: "Wealth Management", icon: "gem", link: "/wealth", description: "Portfolio advice" }
      ]
    }
  ];

  const investmentOptions = [
    {
      category: "Stocks & ETFs",
      items: [
        { name: "Equity Trading", icon: "chart-line", link: "/equity", description: "Stock market" },
        { name: "ETF Investments", icon: "project-diagram", link: "/etf", description: "Diversified funds" },
        { name: "IPO", icon: "rocket", link: "/ipo", description: "Initial offerings" }
      ]
    },
    {
      category: "Fixed Income",
      items: [
        { name: "Corporate Bonds", icon: "file-contract", link: "/bonds", description: "Fixed returns" },
        { name: "Government Securities", icon: "landmark", link: "/govt-securities", description: "Safe investment" },
        { name: "Debt Funds", icon: "balance-scale", link: "/debt-funds", description: "Regular income" }
      ]
    },
    {
      category: "Advanced",
      items: [
        { name: "Forex Trading", icon: "dollar-sign", link: "/forex", description: "Currency trading" },
        { name: "Commodities", icon: "gem", link: "/commodities", description: "Gold & silver" },
        { name: "Derivatives", icon: "chess-knight", link: "/derivatives", description: "Futures & options" }
      ]
    }
  ];

  const quickActions = [
    { name: "Quick Transfer", icon: "paper-plane", link: "/quick-transfer", color: "blue" },
    { name: "Pay Bills", icon: "receipt", link: "/pay-bills", color: "green" },
    { name: "Recharge", icon: "mobile-alt", link: "/recharge", color: "purple" },
    { name: "Book FD", icon: "chart-bar", link: "/book-fd", color: "orange" },
    { name: "Apply Loan", icon: "hand-holding-usd", link: "/apply-loan", color: "red" },
    { name: "Invest Now", icon: "chart-line", link: "/invest-now", color: "teal" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-2 text-sm relative z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="phone-alt" className="text-yellow-400 text-xs" />
                <span className="font-medium">24/7 Customer Care: 1800-123-4567</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <Icon name="envelope" className="text-yellow-400 text-xs" />
                <span>support@bankease.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <a href="/locator" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                <Icon name="map-marker-alt" />
                <span>Branch & ATM Locator</span>
              </a>
              <span className="text-gray-400">|</span>
              <a href="/help" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                <Icon name="question-circle" />
                <span>Help & Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-gradient-to-r from-white to-blue-50 shadow-lg sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl bg-white' : ''}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <Icon name="university" className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-blue-600 transition-all duration-300">BankEase</div>
                  <div className="text-xs text-gray-600 -mt-1 font-medium">Digital Banking</div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation - NOT LOGGED IN */}
            {!user && (
              <div className="hidden xl:flex items-center space-x-8">
                
                {/* Products Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-2 text-gray-800 hover:text-blue-700 font-semibold py-6 transition-colors group relative focus:outline-none">
                    <Icon name="cube" className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span>Products</span>
                    <Icon name="chevron-down" className={`text-xs transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                    <div className="absolute bottom-4 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </button>
                  
                  {activeDropdown === 'products' && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-200 py-6 z-50">
                      <div className="grid grid-cols-3 gap-8 px-8">
                        {bankingProducts.map((section, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide border-b border-blue-100 pb-2">{section.category}</h3>
                            <div className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <a key={itemIndex} href={item.link} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group/item border border-transparent hover:border-blue-200">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover/item:from-blue-200 group-hover/item:to-blue-300 transition-all duration-200 shadow-sm">
                                    <Icon name={item.icon} className="text-blue-600 text-lg" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-gray-800 font-semibold text-sm group-hover/item:text-blue-700 truncate">{item.name}</div>
                                    <div className="text-gray-500 text-xs truncate">{item.description}</div>
                                  </div>
                                  <Icon name="chevron-right" className="text-gray-300 text-xs group-hover/item:text-blue-500 transition-colors flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100 px-8 text-center">
                         <a href="/products" className="text-blue-600 font-semibold hover:underline">View All Products</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-2 text-gray-800 hover:text-green-700 font-semibold py-6 transition-colors group relative focus:outline-none">
                    <Icon name="concierge-bell" className="text-green-600 group-hover:scale-110 transition-transform" />
                    <span>Services</span>
                    <Icon name="chevron-down" className={`text-xs transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                    <div className="absolute bottom-4 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></div>
                  </button>
                  
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-200 py-6 z-50">
                      <div className="grid grid-cols-3 gap-8 px-8">
                        {bankingServices.map((section, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide border-b border-green-100 pb-2">{section.category}</h3>
                            <div className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <a key={itemIndex} href={item.link} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group/item border border-transparent hover:border-green-200">
                                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover/item:from-green-200 group-hover/item:to-green-300 transition-all duration-200 shadow-sm">
                                    <Icon name={item.icon} className="text-green-600 text-lg" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-gray-800 font-semibold text-sm group-hover/item:text-green-700 truncate">{item.name}</div>
                                    <div className="text-gray-500 text-xs truncate">{item.description}</div>
                                  </div>
                                  <Icon name="chevron-right" className="text-gray-300 text-xs group-hover/item:text-green-500 transition-colors flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                 {/* Invest Dropdown */}
                 <div 
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter('invest')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-2 text-gray-800 hover:text-purple-700 font-semibold py-6 transition-colors group relative focus:outline-none">
                    <Icon name="chart-line" className="text-purple-600 group-hover:scale-110 transition-transform" />
                    <span>Invest</span>
                    <Icon name="chevron-down" className={`text-xs transition-transform ${activeDropdown === 'invest' ? 'rotate-180' : ''}`} />
                    <div className="absolute bottom-4 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></div>
                  </button>
                  
                  {activeDropdown === 'invest' && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-200 py-6 z-50">
                      <div className="grid grid-cols-3 gap-8 px-8">
                        {investmentOptions.map((section, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide border-b border-purple-100 pb-2">{section.category}</h3>
                            <div className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <a key={itemIndex} href={item.link} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 group/item border border-transparent hover:border-purple-200">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover/item:from-purple-200 group-hover/item:to-purple-300 transition-all duration-200 shadow-sm">
                                    <Icon name={item.icon} className="text-purple-600 text-lg" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-gray-800 font-semibold text-sm group-hover/item:text-purple-700 truncate">{item.name}</div>
                                    <div className="text-gray-500 text-xs truncate">{item.description}</div>
                                  </div>
                                  <Icon name="chevron-right" className="text-gray-300 text-xs group-hover/item:text-purple-500 transition-colors flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <a href="/offers" className="flex items-center space-x-2 text-gray-800 hover:text-red-700 font-semibold py-2 transition-colors group relative">
                  <Icon name="gift" className="text-red-600 group-hover:scale-110 transition-transform" />
                  <span>Offers</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1 animate-pulse">New</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></div>
                </a>

                <div className="flex items-center space-x-4">
                  <a href="/login" className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-semibold px-4 py-2 transition-colors group border border-blue-200 rounded-lg hover:bg-blue-50">
                    <Icon name="sign-in-alt" className="group-hover:scale-110 transition-transform" />
                    <span>Net Banking</span>
                  </a>
                  <a href="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                    <Icon name="user-plus" />
                    <span>Open Account</span>
                  </a>
                </div>
              </div>
            )}

            {/* Desktop Navigation - LOGGED IN */}
            {user && (
              <div className="hidden xl:flex items-center space-x-6">
                {/* Quick Actions Grid */}
                <div className="flex items-center space-x-2">
                  {quickActions.slice(0, 4).map((action, index) => {
                     const colors = COLOR_MAP[action.color] || COLOR_MAP['blue'];
                     return (
                      <a key={index} href={action.link} className="flex flex-col items-center p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group border border-transparent hover:border-gray-200">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm mb-2 bg-gradient-to-br ${colors.bg} to-white ${colors.groupBg} ${colors.groupTo}`}>
                          <Icon name={action.icon} className={`${colors.text} text-lg`} />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.name}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleUserDropdownToggle}
                    className="flex items-center space-x-3 bg-white hover:bg-gray-50 rounded-xl px-4 py-2 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md focus:outline-none"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900">{user.email.split("@")[0]}</div>
                      <div className="text-xs text-gray-500">View Profile</div>
                    </div>
                    <Icon name="chevron-down" className={`text-gray-400 text-xs transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === 'user' && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 z-50">
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{user.email.split("@")[0]}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <a href="/my-accounts" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                          <Icon name="wallet" className="text-gray-400 w-5 group-hover:text-blue-500" />
                          <span>My Accounts</span>
                        </a>
                        <a href="/transactions" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                          <Icon name="receipt" className="text-gray-400 w-5 group-hover:text-blue-500" />
                          <span>Transactions</span>
                        </a>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left group">
                          <Icon name="sign-out-alt" className="text-red-500 w-5 group-hover:scale-110 transition-transform" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none"
              >
                <Icon name={isMobileMenuOpen ? 'times' : 'bars'} className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`xl:hidden transition-all duration-300 ease-in-out bg-white ${isMobileMenuOpen ? 'max-h-[90vh] overflow-y-auto opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6">
            {!user ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg border-b border-gray-200 pb-2">Banking Products</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {bankingProducts.flatMap(section => section.items).slice(0, 6).map((item, index) => (
                      <a key={index} href={item.link} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        <Icon name={item.icon} className="text-blue-600 text-sm" />
                        <span className="text-sm font-medium text-gray-700 flex-1">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-lg border-b border-gray-200 pb-2">Services</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {bankingServices.flatMap(section => section.items).slice(0, 6).map((item, index) => (
                      <a key={index} href={item.link} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        <Icon name={item.icon} className="text-green-600 text-sm" />
                        <span className="text-sm font-medium text-gray-700 flex-1">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <a href="/login" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center block hover:bg-blue-700 transition-colors shadow-lg">Login to Net Banking</a>
                  <a href="/signup" className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold text-center block hover:bg-blue-50 transition-colors">Open New Account</a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{user.email.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{user.email.split("@")[0]}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action, index) => {
                     const colors = COLOR_MAP[action.color] || COLOR_MAP['blue'];
                     return (
                      <a href={action.link} key={index} className="flex flex-col items-center p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${colors.bg}`}>
                          <Icon name={action.icon} className={`${colors.text} text-base`} />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.name}</span>
                      </a>
                    );
                  })}
                </div>
                
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-600 border border-red-200">
                  <Icon name="sign-out-alt" className="text-red-500" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overlay (Only for clicks if needed, removed from Hover menus to avoid bad UX) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}
      </nav>
    </>
  );
}