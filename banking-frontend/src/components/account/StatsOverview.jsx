import { TrendingUp, CheckCircle2, CreditCard } from "lucide-react";

export default function StatsOverview({ 
  showBalance, 
  totalBalance, 
  activeAccounts, 
  totalAccounts, 
  uniqueTypes 
}) {
  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {showBalance ? formatCurrency(totalBalance) : "••••••"}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <TrendingUp size={24} className="text-blue-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Across {totalAccounts} account{totalAccounts !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Accounts</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {activeAccounts}
            </h3>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <CheckCircle2 size={24} className="text-green-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {totalAccounts - activeAccounts} inactive
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Account Types</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {uniqueTypes}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl">
            <CreditCard size={24} className="text-purple-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Different account varieties
        </p>
      </div>
    </div>
  );
}