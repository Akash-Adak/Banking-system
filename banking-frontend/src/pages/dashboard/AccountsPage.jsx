import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";
import api_account from "../../api/axiosAccount";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import {
  Plus,
  Send,
  Download,
  CreditCard,
  Building,
  Wallet,
  TrendingUp,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  History,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newAccountType, setNewAccountType] = useState("SAVINGS");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Bank configuration
  const bankConfig = {
    name: "HDFC Bank",
    logo: "🏦",
    colors: {
      primary: "#004C6C",
      secondary: "#0088CC",
      accent: "#00B4B4"
    }
  };

  // Account type configurations
  const accountTypes = {
    SAVINGS: {
      name: "Savings Account",
      icon: <Wallet size={20} className="text-blue-600" />,
      description: "Perfect for everyday banking with interest earnings",
      features: ["4% interest p.a.", "Free debit card", "Digital banking"],
      minBalance: 5000
    },
    CURRENT: {
      name: "Current Account",
      icon: <CreditCard size={20} className="text-green-600" />,
      description: "For business transactions with no interest",
      features: ["Unlimited transactions", "Overdraft facility", "Business banking"],
      minBalance: 10000
    },
    BUSINESS: {
      name: "Business Account",
      icon: <Building size={20} className="text-purple-600" />,
      description: "Advanced features for business needs",
      features: ["Multi-user access", "Higher limits", "Priority support"],
      minBalance: 25000
    }
  };

  // Load accounts
  const loadAccounts = async () => {
    try {
      setLoading(true);
      const accountNumber = localStorage.getItem("accountNumber");
      console.log("Fetching accounts for:", accountNumber);
      
      const res = await api_account.get(`/api/accounts/user/${accountNumber}`);
      console.log("Accounts response:", res);
      
      // Handle both array and single object responses
      let accountsData = [];
      if (Array.isArray(res.data)) {
        accountsData = res.data;
      } else if (res.data && typeof res.data === 'object') {
        accountsData = [res.data];
      }
      
      setAccounts(accountsData);
    } catch (err) {
      console.error("Error loading accounts:", err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // Create new account
  const createAccount = async () => {
    try {
      const res = await api_account.post("/api/accounts", {
        type: newAccountType,
        currency: "INR"
      });
      
      // If this is the first account, set it as primary
      if (accounts.length === 0) {
        localStorage.setItem("accountNumber", res.data.accountNumber);
      }
      
      setMessage(`🎉 ${accountTypes[newAccountType].name} created successfully!`);
      setOpenModal(false);
      setNewAccountType("SAVINGS");
      loadAccounts();
      
      // Auto-hide success message
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error("Account creation error:", err);
      setMessage("❌ Failed to create account. Please try again.");
    }
  };

  // Copy account number to clipboard
  const copyAccountNumber = async (accountNumber) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Mask account number for display
  const maskAccountNumber = (num) => {
    const str = String(num);
    return "•".repeat(str.length - 4) + str.slice(-4);
  };

  // Format currency
  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Get total balance
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  // Table columns
  const columns = [
    {
      header: "Account Details",
      accessor: "accountNumber",
      render: (val, row) => (
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            row.accountType === "SAVINGS" ? "bg-blue-100" :
            row.accountType === "CURRENT" ? "bg-green-100" : "bg-purple-100"
          }`}>
            {accountTypes[row.accountType]?.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {maskAccountNumber(val)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyAccountNumber(val);
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Copy account number"
              >
                {copiedAccount === val ? (
                  <CheckCircle2 size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} className="text-gray-500" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {accountTypes[row.accountType]?.name || row.accountType}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Balance",
      accessor: "balance",
      render: (val, row) => (
        <div className="text-right">
          <div className="font-bold text-gray-900">
            {showBalance ? formatCurrency(val, row.currency) : "••••••"}
          </div>
          <div className="text-xs text-gray-500">{row.currency}</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      header: "Opened On",
      accessor: "createdAt",
      render: (val) => (
        <div className="text-sm text-gray-600">
          {val ? format(new Date(val), "dd MMM yyyy") : "-"}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedAccount(row);
              setViewModal(true);
            }}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => navigate("/transactions", { state: { accountNumber: row.accountNumber } })}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            History
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Balance</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {showBalance ? formatCurrency(getTotalBalance()) : "••••••"}
                  </h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <TrendingUp size={24} className="text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Across {accounts.length} account{accounts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {accounts.filter(acc => acc.status === 'ACTIVE').length}
                  </h3>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {accounts.length - accounts.filter(acc => acc.status === 'ACTIVE').length} inactive
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Account Types</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {new Set(accounts.map(acc => acc.accountType)).size}
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
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes("❌") 
              ? "bg-red-100 text-red-700 border border-red-200" 
              : "bg-green-100 text-green-700 border border-green-200"
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{message}</span>
              <button onClick={() => setMessage("")} className="text-lg">×</button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/send-money")}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Send size={18} />
              <span className="font-medium">Send Money</span>
            </button>

            <button
              onClick={() => navigate("/add-money")}
              className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              <ArrowDownLeft size={18} />
              <span className="font-medium">Add Money</span>
            </button>

            <button
              onClick={() => navigate("/withdraw")}
              className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm"
            >
              <ArrowUpRight size={18} />
              <span className="font-medium">Withdraw</span>
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-sm"
            >
              <History size={18} />
              <span className="font-medium">Transaction History</span>
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your accounts...</p>
          </div>
        ) : accounts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No accounts yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't opened any accounts with {bankConfig.name} yet. Start by opening your first account to enjoy our banking services.
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus size={20} />
              <span className="font-medium">Open Your First Account</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Table columns={columns} data={accounts} />
          </div>
        )}

        {/* New Account Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Open New Account</h2>
            <p className="text-gray-600 mb-6">Choose the account type that fits your needs</p>

            <div className="space-y-4 mb-6">
              {Object.entries(accountTypes).map(([key, config]) => (
                <div
                  key={key}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    newAccountType === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setNewAccountType(key)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg border">
                        {config.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{config.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {config.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Minimum balance: {formatCurrency(config.minBalance)}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      newAccountType === key ? "bg-blue-500 border-blue-500" : "border-gray-300"
                    }`}>
                      {newAccountType === key && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={createAccount}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Account
              </button>
            </div>
          </div>
        </Modal>

        {/* View Account Details Modal */}
        <Modal open={viewModal} onClose={() => setViewModal(false)}>
          {selectedAccount && (
            <div className="p-6 max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Account Number</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-gray-900">
                      {maskAccountNumber(selectedAccount.accountNumber)}
                    </span>
                    <button
                      onClick={() => copyAccountNumber(selectedAccount.accountNumber)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copiedAccount === selectedAccount.accountNumber ? (
                        <CheckCircle2 size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Account Type</span>
                  <span className="font-semibold text-gray-900">
                    {accountTypes[selectedAccount.accountType]?.name}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Current Balance</span>
                  <span className="font-bold text-gray-900">
                    {formatCurrency(selectedAccount.balance, selectedAccount.currency)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Status</span>
                  <StatusBadge status={selectedAccount.status} />
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Opened On</span>
                  <span className="text-gray-900">
                    {selectedAccount.createdAt ? format(new Date(selectedAccount.createdAt), "dd MMM yyyy") : "-"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setViewModal(false);
                    navigate("/transactions", { state: { accountNumber: selectedAccount.accountNumber } });
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Transactions
                </button>
                <button
                  onClick={() => setViewModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}