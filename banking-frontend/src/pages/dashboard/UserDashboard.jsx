import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  FileText,
  Shield,
  Smartphone,
  MoreHorizontal,
  Download,
  AlertCircle
} from "lucide-react";

// Layout & API Imports
import DashboardLayout from "../../layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api_account from "../../api/axiosAccount";
import api_transaction from "../../api/axiosTransaction";
import api_loan from "../../api/axiosLoan";

// --- CONSTANTS & CONFIG ---
const PIE_COLORS = ["#1d4ed8", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [activeLoans, setActiveLoans] = useState(0);
  const [monthSpend, setMonthSpend] = useState(0);
  const [balanceTrend, setBalanceTrend] = useState([]);
  const [spendingCategory, setSpendingCategory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [nextEMIDate, setNextEMIDate] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0);
  
  const username = localStorage.getItem("username");
  const accountNumber = localStorage.getItem("accountNumber");

  // --- DATA FETCHING ---
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      if (!accountNumber) {
        setError("Account number not found. Please login again.");
        return;
      }

      // 1. Fetch Accounts
      let accounts = [];
      try {
        const accRes = await api_account.get(`/api/accounts/user/${accountNumber}`);
        accounts = Array.isArray(accRes.data) ? accRes.data : [accRes.data];
        
        if (accounts.length === 0) {
          throw new Error("No accounts found");
        }
      } catch (e) {
        console.error("API Error (Accounts):", e);
        setError("Failed to load account information");
        return;
      }

      setTotalAccounts(accounts.length);
      const balanceSum = accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);
      setCurrentBalance(balanceSum);

      // 2. Fetch Transactions
      let txns = [];
      try {
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

        const txnRes = await api_transaction.get(
          `/api/transactions/history/${accountNumber}`, {
            params: {
              fromDate: sixMonthsAgo.toISOString().split('T')[0],
              toDate: currentDate.toISOString().split('T')[0]
            }
          }
        );
        txns = txnRes.data || [];
        setRecentTransactions(txns.slice(0, 5));
      } catch (e) {
        console.error("API Error (Transactions):", e);
        setError("Failed to load transaction history");
        return;
      }

      // 3. Calculate Monthly Metrics
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const currentMonthTxns = txns.filter(t => {
        const txnDate = new Date(t.date);
        return txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear;
      });

      const debits = currentMonthTxns.filter((t) => t.type === "DEBIT");
      const spend = debits.reduce((sum, t) => sum + Number(t.amount || 0), 0);
      setMonthSpend(spend);

      // 4. Calculate Categories
      const categories = {};
      debits.forEach((t) => {
        // Use transaction category if available, otherwise extract from description
        const cat = t.category || t.description.split(" ")[0] || "Others";
        categories[cat] = (categories[cat] || 0) + Number(t.amount || 0);
      });
      
      const catData = Object.keys(categories).map((key) => ({
        category: key,
        value: categories[key],
      }));
      
      setSpendingCategory(catData.length > 0 ? catData : [
        { category: "No spending data", value: 1 }
      ]);

      // 5. Generate Balance Trend (Last 6 months)
      const trendData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = date.toLocaleString('default', { month: 'short' });
        
        const monthTxns = txns.filter(t => {
          const txnDate = new Date(t.date);
          return txnDate.getMonth() === date.getMonth() && 
                 txnDate.getFullYear() === date.getFullYear();
        });

        const monthBalance = monthTxns.reduce((balance, txn) => {
          return txn.type === "CREDIT" ? balance + Number(txn.amount) : balance - Number(txn.amount);
        }, balanceSum - spend); // Start from current balance minus current month spend

        trendData.push({
          month: monthName,
          balance: monthBalance > 0 ? monthBalance : 0
        });
      }
      setBalanceTrend(trendData);

      // 6. Fetch Loans
      try {
        const loanRes = await api_loan.get(`/api/loans/user/${accountNumber}`);
        const activeLoansData = loanRes.data?.filter(loan => 
          loan.status === "ACTIVE" || loan.status === "APPROVED"
        ) || [];
        
        setActiveLoans(activeLoansData.length);
        
        // Find next EMI date
        const upcomingEMIs = activeLoansData
          .filter(loan => loan.nextEMIDate)
          .sort((a, b) => new Date(a.nextEMIDate) - new Date(b.nextEMIDate));
        
        if (upcomingEMIs.length > 0) {
          setNextEMIDate(formatDate(upcomingEMIs[0].nextEMIDate));
        }
      } catch (e) {
        console.error("API Error (Loans):", e);
        setActiveLoans(0);
      }

      // 7. Calculate Reward Points (1 point per ₹100 spent)
      const totalSpend = txns
        .filter(t => t.type === "DEBIT")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
      
      setRewardPoints(Math.floor(totalSpend / 100));

    } catch (err) {
      console.error("Dashboard load error:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [accountNumber]);

  // --- SUB-COMPONENTS ---
  const StatCard = ({ title, value, subtext, icon: Icon, gradient = false }) => (
    <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
      gradient ? "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white shadow-blue-200" : "bg-white border border-gray-100 shadow-sm"
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${gradient ? "text-blue-100" : "text-gray-500"}`}>{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {subtext && <p className={`text-xs mt-1 ${gradient ? "text-blue-200" : "text-green-600"}`}>{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl ${gradient ? "bg-white/10" : "bg-blue-50"}`}>
          <Icon size={24} className={gradient ? "text-white" : "text-blue-600"} />
        </div>
      </div>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, color, onClick }) => (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all group bg-white"
    >
      <div className={`p-3 rounded-full mb-2 ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </button>
  );

  // --- MAIN RENDER ---
  if (loading) return (
    <DashboardLayout>
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout>
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Unable to load dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboard}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      {/* Clean layout - no extra padding containers */}
      
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, <span className="text-blue-700">{username || "User"}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here is your financial overview for {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Safe & Secure
            </span>
            <p className="text-xs text-gray-400">
              Last login: {new Date().toLocaleDateString('en-IN')}, {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {/* 1. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Net Balance" 
          value={formatCurrency(currentBalance)} 
          subtext={`${totalAccounts} Account${totalAccounts !== 1 ? 's' : ''}`} 
          icon={Wallet} 
          gradient={true} 
        />
        
        <StatCard 
          title="Monthly Spend" 
          value={formatCurrency(monthSpend)} 
          subtext={`${spendingCategory.length} Categorie${spendingCategory.length !== 1 ? 's' : ''}`} 
          icon={TrendingUp} 
        />

        <StatCard 
          title="Active Loans" 
          value={activeLoans} 
          subtext={nextEMIDate ? `Next EMI: ${nextEMIDate}` : "No upcoming EMI"} 
          icon={FileText} 
        />

        <StatCard 
          title="Reward Points" 
          value={rewardPoints.toLocaleString()} 
          subtext={`Redeemable value: ${formatCurrency(rewardPoints * 0.25)}`} 
          icon={Activity} 
        />
      </div>

      {/* 2. CHARTS & ACTIONS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Left: Charts */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Balance History Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Balance Analytics</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Last 6 Months</span>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              {balanceTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceTrend}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9ca3af', fontSize: 12}} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{fill: '#9ca3af', fontSize: 12}}
                      tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Balance']}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderRadius: '8px', 
                        border: 'none', 
                        color: '#fff' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#1d4ed8" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No balance data available
                </div>
              )}
            </div>
          </div>

          {/* Spending Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Expense Distribution</h2>
              <div className="h-[220px]">
                {spendingCategory.length > 0 && spendingCategory[0].category !== "No spending data" ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendingCategory}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {spendingCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No spending data this month
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
              <div>
                <span className="bg-white/20 text-xs px-2 py-1 rounded text-white font-medium mb-3 inline-block">
                  QUICK ACTIONS
                </span>
                <h3 className="text-xl font-bold leading-tight">Need Assistance?</h3>
                <p className="text-blue-100 text-sm mt-2 opacity-90">
                  Get instant help with your banking needs or schedule a call with our support team.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-white text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-50 transition text-sm">
                  Contact Support
                </button>
                <button className="w-full bg-transparent border border-white text-white font-semibold py-2 rounded-xl hover:bg-white/10 transition text-sm">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Transfer Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Transfer</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {/* Recent Contacts - You can fetch this from API */}
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center min-w-[60px]">
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm mb-1 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i+10}&t=${Date.now()}`} 
                      alt="Contact" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-xs text-gray-600">Contact {i}</span>
                </div>
              ))}
              <button 
                onClick={() => navigate('/dashboard/transactions')}
                className="flex flex-col items-center justify-center min-w-[60px]"
              >
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition">
                  <span className="text-xl">+</span>
                </div>
                <span className="text-xs text-gray-500 mt-1">Add</span>
              </button>
            </div>
            
            <div className="mt-4">
              <label className="text-xs text-gray-500 font-medium">Amount</label>
              <div className="flex items-center mt-1 border-b-2 border-gray-200 focus-within:border-blue-600 pb-1">
                <span className="text-lg font-bold text-gray-400">₹</span>
                <input 
                  type="number" 
                  className="w-full outline-none text-xl font-bold text-gray-800 ml-2 bg-transparent" 
                  placeholder="0.00" 
                  min="0"
                />
              </div>
              <button 
                onClick={() => navigate('/dashboard/transactions?action=transfer')}
                className="w-full mt-4 bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
              >
                Send Money <Send size={16}/>
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Services</h2>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton 
                icon={CreditCard} 
                label="Cards" 
                color="bg-purple-500 text-purple-500"
                onClick={() => navigate('/dashboard/accounts')}
              />
              <ActionButton 
                icon={Smartphone} 
                label="Recharge" 
                color="bg-green-500 text-green-500"
                onClick={() => navigate('/dashboard/transactions?action=recharge')}
              />
              <ActionButton 
                icon={FileText} 
                label="Statement" 
                color="bg-orange-500 text-orange-500"
                onClick={() => navigate('/dashboard/transactions')}
              />
              <ActionButton 
                icon={MoreHorizontal} 
                label="More" 
                color="bg-gray-500 text-gray-500"
                onClick={() => navigate('/dashboard')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
          <button 
            onClick={() => navigate('/dashboard/transactions')}
            className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
          >
            View All History <ArrowUpRight size={16} className="ml-1"/>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {recentTransactions.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <CreditCard className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p>No transactions found</p>
              <button 
                onClick={() => navigate('/dashboard/transactions')}
                className="text-blue-600 text-sm mt-2 hover:underline"
              >
                View complete transaction history
              </button>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Transaction Details</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          t.type === "CREDIT" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                          {t.type === "CREDIT" ? <ArrowDownRight size={18}/> : <ArrowUpRight size={18}/>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            {t.description || "Transaction"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Ref: {t.id || t.transactionId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t.date ? formatDate(t.date) : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        t.status === 'SUCCESS' || t.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800'
                          : t.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {t.status || 'Success'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold text-sm ${
                      t.type === 'CREDIT' ? 'text-green-600' : 'text-gray-800'
                    }`}>
                      {t.type === 'CREDIT' ? '+' : '-'} {formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-blue-600 transition">
                        <Download size={18} className="mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}