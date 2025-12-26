import { NavLink } from "react-router-dom";
import {
  User,
  CreditCard,
  Bell,
  History,
  LogOut,
  Home,
  Banknote,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout, user } = useAuth();
  const roles = user?.roles || [];
  const username=localStorage.getItem("username");
  const menu = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { name: "Transactions", icon: History, path: "/dashboard/transactions" },
    { name: "Loans", icon: Banknote, path: "/dashboard/loans" },
    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  if (roles.includes("ADMIN")) {
    menu.push({
      name: "Admin",
      icon: Shield,
      path: "/admin",
    });
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 h-screen bg-white shadow-lg fixed left-0 z-40 p-5
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:h-screen
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* <h1 className="text-2xl font-bold text-blue-600">Banking App</h1> */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Welcome back,</p>
          <p className="text-lg font-bold text-blue-800 truncate">
            {username || "User"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {roles.includes("ADMIN") ? "Administrator" : "Premium User"}
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent 
                      size={20} 
                      className={isActive ? "text-white" : "text-gray-500"} 
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Logout Button */}
          <button
            className="flex items-center gap-3 p-3 rounded-lg text-red-600 mt-4 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-center text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
            <p>Secure Banking</p>
            <p className="text-green-600 font-medium mt-1">● Protected</p>
          </div>
        </div>
      </div>
    </>
  );
}