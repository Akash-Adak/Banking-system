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

// Import components
import AccountsHeader from "../../components/account/AccountsHeader";
import StatsOverview from "../../components/account/StatsOverview";
import QuickActions from "../../components/account/QuickActions";
import AccountTable from "../../components/account/AccountTable";
import NewAccountModal from "../../components/account/NewAccountModal";
import ViewAccountModal from "../../components/account/ViewAccountModal";
import EmptyState from "../../components/account/EmptyState";
import MessageAlert from "../../components/account/MessageAlert";

// Configuration
import { bankConfig, accountTypes } from "../../config/accountsConfig";

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

  // Load accounts
  const loadAccounts = async () => {
    try {
      setLoading(true);
      const accountNumber = localStorage.getItem(`accountNumber-${username}`);
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
      
      localStorage.setItem("accountBalance", accountsData[0]?.balance || 0);
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
        localStorage.setItem(`accountNumber-${username}`, res.data.accountNumber);
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

  // Get total balance
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  // Get active accounts count
  const getActiveAccountsCount = () => {
    return accounts.filter(acc => acc.status === 'ACTIVE').length;
  };

  // Get unique account types count
  const getUniqueAccountTypesCount = () => {
    return new Set(accounts.map(acc => acc.accountType)).size;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <AccountsHeader
          bankConfig={bankConfig}
          showBalance={showBalance}
          setShowBalance={setShowBalance}
          setOpenModal={setOpenModal}
          accountsCount={accounts.length}
        />

        {/* Stats Overview */}
        <StatsOverview
          showBalance={showBalance}
          totalBalance={getTotalBalance()}
          activeAccounts={getActiveAccountsCount()}
          totalAccounts={accounts.length}
          uniqueTypes={getUniqueAccountTypesCount()}
        />

        {/* Message Alert */}
        <MessageAlert message={message} setMessage={setMessage} />

        {/* Quick Actions */}
        <QuickActions navigate={navigate} />

        {/* Accounts Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your accounts...</p>
          </div>
        ) : accounts.length === 0 ? (
          <EmptyState bankConfig={bankConfig} setOpenModal={setOpenModal} />
        ) : (
          <AccountTable
            accounts={accounts}
            showBalance={showBalance}
            copiedAccount={copiedAccount}
            copyAccountNumber={copyAccountNumber}
            setSelectedAccount={setSelectedAccount}
            setViewModal={setViewModal}
            navigate={navigate}
          />
        )}

        {/* New Account Modal */}
        <NewAccountModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          newAccountType={newAccountType}
          setNewAccountType={setNewAccountType}
          createAccount={createAccount}
        />

        {/* View Account Details Modal */}
        <ViewAccountModal
          open={viewModal}
          onClose={() => setViewModal(false)}
          selectedAccount={selectedAccount}
          copiedAccount={copiedAccount}
          copyAccountNumber={copyAccountNumber}
          navigate={navigate}
        />
      </div>
    </DashboardLayout>
  );
}