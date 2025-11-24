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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const roles = user?.roles || [];

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Accounts", icon: <CreditCard size={20} />, path: "/dashboard/accounts" },
    { name: "Transactions", icon: <History size={20} />, path: "/dashboard/transactions" },
    { name: "Loans", icon: <Banknote size={20} />, path: "/dashboard/loans" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/dashboard/notifications" },
    { name: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
  ];

  if (roles.includes("ADMIN")) {
    menu.push({
      name: "Admin",
      icon: <Shield size={20} />,
      path: "/admin",
    });
  }

  return (
    <div className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">Banking App</h1>

      <nav className="flex flex-col gap-4">
        {menu.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

        <button
          className="flex items-center gap-3 p-3 rounded-lg text-red-600 mt-6 hover:bg-red-100"
          onClick={logout}
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
}
