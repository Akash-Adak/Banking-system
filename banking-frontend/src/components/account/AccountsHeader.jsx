import { Eye, EyeOff, Plus } from "lucide-react";

export default function AccountsHeader({ 
  bankConfig, 
  showBalance, 
  setShowBalance, 
  setOpenModal, 
  accountsCount 
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          My Accounts
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your {bankConfig.name} accounts in one place
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          <span className="text-sm font-medium">
            {showBalance ? "Hide Balance" : "Show Balance"}
          </span>
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span className="font-medium">New Account</span>
        </button>
      </div>
    </div>
  );
}