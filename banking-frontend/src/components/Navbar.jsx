import { useState } from 'react';
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              BankEase
            </a>
          </div>

          {/* Desktop Navigation - NOT LOGGED IN */}
          {!user && (
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md"
              >
                Open Account
              </a>
            </div>
          )}

          {/* Desktop Navigation - LOGGED IN */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              {/* Main Navigation Links */}
              <div className="flex space-x-6">
                <a
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  Dashboard
                </a>
                <a
                  href="/accounts"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-wallet mr-2"></i>
                  Accounts
                </a>
                <a
                  href="/transactions"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-exchange-alt mr-2"></i>
                  Transactions
                </a>
                <a
                  href="/money"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-money-bill-wave mr-2"></i>
                  Money
                </a>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {user.email.split("@")[0]}
                  <i className={`fas fa-chevron-down ml-2 text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <i className="fas fa-user mr-3"></i>
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <i className="fas fa-cog mr-3"></i>
                      Settings
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center"
                    >
                      <i className="fas fa-sign-out-alt mr-3"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {!user ? (
            /* Mobile - NOT LOGGED IN */
            <div className="flex flex-col space-y-3">
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt mr-3"></i>
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-plus-circle mr-3"></i>
                Open Account
              </a>
            </div>
          ) : (
            /* Mobile - LOGGED IN */
            <>
              {/* User Info */}
              <div className="px-3 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.email.split("@")[0]}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-chart-line mr-3 w-5 text-center"></i>
                Dashboard
              </a>
              <a
                href="/accounts"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-wallet mr-3 w-5 text-center"></i>
                Accounts
              </a>
              <a
                href="/transactions"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-exchange-alt mr-3 w-5 text-center"></i>
                Transactions
              </a>
              <a
                href="/money"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-money-bill-wave mr-3 w-5 text-center"></i>
                Money
              </a>

              {/* User Menu */}
              <div className="pt-2 border-t border-gray-100">
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fas fa-user mr-3 w-5 text-center"></i>
                  Profile
                </a>
                <a
                  href="/settings"
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fas fa-cog mr-3 w-5 text-center"></i>
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:bg-red-50 block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-sign-out-alt mr-3 w-5 text-center"></i>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
}