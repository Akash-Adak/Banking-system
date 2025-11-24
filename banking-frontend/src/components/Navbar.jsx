import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow bg-white">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-blue-600">
        BankEase
      </a>

      {/* NOT LOGGED IN */}
      {!user && (
        <div className="flex gap-4">
          <a
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Login
          </a>

          <a
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Open Account
          </a>
        </div>
      )}

      {/* LOGGED IN */}
      {user && (
        <div className="flex items-center gap-6">

          {/* Main Links */}
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </a>

          <a href="/accounts" className="text-gray-700 hover:text-blue-600">
            Accounts
          </a>

          <a href="/transactions" className="text-gray-700 hover:text-blue-600">
            Transactions
          </a>

          <a href="/money" className="text-gray-700 hover:text-blue-600">
            Money
          </a>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="font-medium text-gray-700 hover:text-blue-600">
              {user.email.split("@")[0]} ▼
            </button>

            <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded-lg p-3 w-40">
              <a
                href="/profile"
                className="block px-3 py-2 hover:bg-gray-100 rounded"
              >
                Profile
              </a>

              <a
                href="/settings"
                className="block px-3 py-2 hover:bg-gray-100 rounded"
              >
                Settings
              </a>

              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
