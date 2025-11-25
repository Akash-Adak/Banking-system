import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('netbanking');
  const [isMobile, setIsMobile] = useState(false);
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const API = import.meta.env.VITE_AUTH_URL;

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      console.log(res);
      localStorage.setItem("username", form.username);
      localStorage.setItem("token", res.data.token);
      login(res.data); // store in context
      setError(""); // Clear any previous errors
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user starts typing
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload(); // Refresh to show login form
  };

  // If user is authenticated, show dashboard
  if (isAuthenticated && user) {
    return (
      <section className="relative min-h-[85vh] flex flex-col font-sans">
        <div className="relative flex-1 flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" 
              alt="Bank Staff Helping Customer" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/70 to-blue-900/50"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Welcome Dashboard */}
              <div className="lg:col-span-8 space-y-6 lg:space-y-8 text-white text-center lg:text-left">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Welcome back, {user.username || user.name}!</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Your Financial <br className="hidden sm:block" />
                  <span className="text-yellow-400 border-b-4 border-yellow-400">Dashboard</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Manage your accounts, track investments, and access exclusive banking features all in one place.
                </p>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => navigate("/dashboard")}
                    className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-all text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Account Summary Cards */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6 text-white">
                  <h3 className="text-xl font-bold mb-6 text-center">Account Summary</h3>
                  
                  {/* Balance Cards */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-blue-200 text-sm">Available Balance</p>
                          <p className="text-2xl font-bold">₹{user.balance || '85,230.50'}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <i className="fas fa-wallet text-green-400 text-xl"></i>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                        <i className="fas fa-piggy-bank text-yellow-400 text-lg mb-2"></i>
                        <p className="text-blue-200 text-xs">Savings</p>
                        <p className="text-white font-bold">₹85,230</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
                        <i className="fas fa-chart-line text-green-400 text-lg mb-2"></i>
                        <p className="text-blue-200 text-xs">Investments</p>
                        <p className="text-white font-bold">₹2,45,000</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-yellow-400 font-bold text-lg">3</div>
                        <div className="text-white text-xs">Accounts</div>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-bold text-lg">12</div>
                        <div className="text-white text-xs">Cards</div>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-bold text-lg">98%</div>
                        <div className="text-white text-xs">Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If user is not authenticated, show login form
  return (
    <section className="relative min-h-[85vh] flex flex-col font-sans">

      {/* 2. MAIN HERO AREA */}
      <div className="relative flex-1 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" 
            alt="Bank Staff Helping Customer" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/70 to-blue-900/50 lg:bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Marketing Text */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8 text-white text-center lg:text-left">
              <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                #BankingApkeSaath
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight lg:leading-tight">
                Turning Your Dreams <br className="hidden sm:block" />
                Into <span className="text-yellow-400 border-b-4 border-yellow-400">Reality</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience India's most trusted banking partner. 
                From <strong>Instant Home Loans</strong> to <strong>Wealth Management</strong>, 
                we are here for every step of your journey.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base">
                  Open Savings Account
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-all text-sm sm:text-base">
                  Apply for Loan
                </button>
              </div>

              {/* Mobile Quick Stats */}
              {isMobile && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">50L+</div>
                    <div className="text-white text-xs">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">5000+</div>
                    <div className="text-white text-xs">Branches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">45+</div>
                    <div className="text-white text-xs">Years</div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Login Widget */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm mx-auto lg:max-w-none">
                
                {/* Tabs */}
                <div className="flex text-sm font-bold border-b">
                  {['netbanking', 'creditcard'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 text-center transition-colors ${
                        activeTab === tab 
                          ? 'bg-blue-900 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'netbanking' ? 'NetBanking' : 'Credit Card'}
                    </button>
                  ))}
                </div>

                {/* Login Form */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-gray-800 font-bold text-lg">Welcome to NetBanking</h3>
                    <p className="text-xs text-gray-500 mt-1">Secure 256-bit Encryption</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Customer ID / User ID
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-3 pl-10 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-800"
                        placeholder="Enter Customer ID"
                      />
                      <i className="fas fa-user absolute left-3 top-3.5 text-gray-400"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-3 pl-10 pr-10 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-800"
                        placeholder="Enter Password"
                      />
                      <i className="fas fa-lock absolute left-3 top-3.5 text-gray-400"></i>
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogin}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 active:scale-95"
                  >
                    <i className="fas fa-lock"></i> CONTINUE TO LOGIN
                  </button>

                  <div className="flex justify-between text-xs text-blue-700 font-semibold">
                    <a href="#" className="hover:underline">Forgot Password?</a>
                    <a href="/signup" className="hover:underline">Register Now</a>
                  </div>

                  {/* Security Tip */}
                  <div className="bg-yellow-50 border border-yellow-100 p-3 rounded flex gap-2 items-start">
                    <i className="fas fa-shield-alt text-yellow-600 mt-0.5"></i>
                    <p className="text-xs text-gray-600 leading-tight">
                      <strong>Security Tip:</strong> Never share OTP, PIN, or Password.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile App Download */}
              {isMobile && (
                <div className="flex gap-3 mt-4">
                  {['google-play', 'apple'].map((store) => (
                    <button key={store} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs flex-1 justify-center">
                      <i className={`fab fa-${store}`}></i>
                      <span>{store === 'google-play' ? 'Google Play' : 'App Store'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

    
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}