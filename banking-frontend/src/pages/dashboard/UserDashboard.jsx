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
  Download
} from "lucide-react";

// Layout & API Imports
import DashboardLayout from "../../layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api_account from "../../api/axiosAccount";
import api_transaction from "../../api/axiosTransaction";

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

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [activeLoans, setActiveLoans] = useState(0);
  const [monthSpend, setMonthSpend] = useState(0);
  const [balanceTrend, setBalanceTrend] = useState([]);
  const [spendingCategory, setSpendingCategory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
   const username=localStorage.getItem("username");
  // Mock data for fallback
  const [accountNumber, setAccountNumber] = useState(localStorage.getItem("accountNumber") || "XXXX-XXXX-1234");

  // --- DATA FETCHING ---
  const loadDashboard = async () => {
    try {
      setLoading(true);

      // 1. Fetch Accounts
      let accounts = [];
      try {
        const accRes = await api_account.get(`/api/accounts/user/${accountNumber}`);
        accounts = Array.isArray(accRes.data) ? accRes.data : [accRes.data];
      } catch (e) {
        console.warn("API Error (Accounts), using mocks");
        accounts = [{ balance: 145000.50 }]; 
      }

      setTotalAccounts(accounts.length);
      const balanceSum = accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);
      setCurrentBalance(balanceSum);

      // 2. Trend Data
      const mockTrend = [
        { month: "May", balance: balanceSum - 15000 },
        { month: "Jun", balance: balanceSum - 12000 },
        { month: "Jul", balance: balanceSum - 8000 },
        { month: "Aug", balance: balanceSum - 15000 },
        { month: "Sep", balance: balanceSum - 2000 },
        { month: "Oct", balance: balanceSum },
      ];
      setBalanceTrend(mockTrend);

      // 3. Transactions
      let txns = [];
      try {
        const txnRes = await api_transaction.get(`/api/transactions/history/${accountNumber}`);
        txns = (txnRes.data || []).slice(0, 5);
      } catch (e) {
        txns = [
          { id: "TXN1001", type: "DEBIT", amount: 2500, description: "Grocery Store", date: "2023-10-24" },
          { id: "TXN1002", type: "CREDIT", amount: 45000, description: "Salary Credit", date: "2023-10-23" },
          { id: "TXN1003", type: "DEBIT", amount: 1200, description: "Netflix Sub", date: "2023-10-21" },
          { id: "TXN1004", type: "DEBIT", amount: 3400, description: "Fuel Station", date: "2023-10-20" },
          { id: "TXN1005", type: "DEBIT", amount: 890, description: "Zomato Food", date: "2023-10-18" },
        ];
      }
      setRecentTransactions(txns);

      // 4. Calculate Spending Metrics
      const debits = txns.filter((t) => t.type === "DEBIT");
      const spend = debits.reduce((sum, t) => sum + Number(t.amount || 0), 0);
      setMonthSpend(spend);
   
      // 5. Categories
      const categories = {};
      debits.forEach((t) => {
        const cat = t.description.split(" ")[0] || "Others"; 
        categories[cat] = (categories[cat] || 0) + Number(t.amount || 0);
      });
      
      const catData = Object.keys(categories).map((key) => ({
        category: key,
        value: categories[key],
        }));
      
      if(catData.length === 0) {
         setSpendingCategory([
             { category: "Food", value: 5000 },
             { category: "Travel", value: 3000 },
             { category: "Bills", value: 8000 },
             { category: "Shop", value: 2000 }
         ]);
      } else {
          setSpendingCategory(catData);
      }

      // 6. Loans
      setActiveLoans(1); 

    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

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

  const ActionButton = ({ icon: Icon, label, color }) => (
    <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all group bg-white">
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
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
              Good Evening, <span className="text-blue-700">{username || "User"}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Here is your financial overview for today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Safe & Secure
            </span>
            <p className="text-xs text-gray-400">Last login: Today, 10:30 AM</p>
          </div>
        </div>
      </div>

      {/* 1. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Net Balance" 
          value={formatCurrency(currentBalance)} 
          subtext={`Acct: ${accountNumber.slice(-4)}`} 
          icon={Wallet} 
          gradient={true} 
        />
        
        <StatCard 
          title="Monthly Spend" 
          value={formatCurrency(monthSpend)} 
          subtext="+12% from last month" 
          icon={TrendingUp} 
        />

        <StatCard 
          title="Active Loans" 
          value={activeLoans} 
          subtext="Next EMI: 5th Nov" 
          icon={FileText} 
        />

        <StatCard 
          title="Reward Points" 
          value="4,502" 
          subtext="Redeemable value: ₹1,125" 
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
              <select className="text-xs border rounded-md px-2 py-1 bg-gray-50 text-gray-600 outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceTrend}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#1d4ed8" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Expense Distribution</h2>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingCategory}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Ad / Offer */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
              <div>
                <span className="bg-white/20 text-xs px-2 py-1 rounded text-white font-medium mb-3 inline-block">PRE-APPROVED</span>
                <h3 className="text-xl font-bold leading-tight">Personal Loan up to ₹5 Lakhs</h3>
                <p className="text-indigo-100 text-sm mt-2 opacity-90">Interest rates starting at just 10.5% p.a. No documentation required.</p>
              </div>
              <button className="mt-4 w-full bg-white text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Transfer Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Pay</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {/* Avatars */}
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center min-w-[60px]">
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm mb-1 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-gray-600">User {i}</span>
                </div>
              ))}
              <button className="flex flex-col items-center justify-center min-w-[60px]">
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
                <input type="number" className="w-full outline-none text-xl font-bold text-gray-800 ml-2 bg-transparent" placeholder="0.00" />
              </div>
              <button className="w-full mt-4 bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2">
                Send Money <Send size={16}/>
              </button>
            </div>
          </div>

          {/* Grid Menu */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Services</h2>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton icon={CreditCard} label="Cards" color="bg-purple-500 text-purple-500" />
              <ActionButton icon={Smartphone} label="Recharge" color="bg-green-500 text-green-500" />
              <ActionButton icon={FileText} label="Statement" color="bg-orange-500 text-orange-500" />
              <ActionButton icon={MoreHorizontal} label="More" color="bg-gray-500 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
          <button className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
            View All History <ArrowUpRight size={16} className="ml-1"/>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {recentTransactions.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No transactions available</div>
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
                        <div className={`p-2 rounded-lg ${t.type === "CREDIT" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          {t.type === "CREDIT" ? <ArrowDownRight size={18}/> : <ArrowUpRight size={18}/>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{t.description}</p>
                          <p className="text-xs text-gray-500">Ref: {t.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t.date ? new Date(t.date).toLocaleDateString("en-IN", {day: 'numeric', month: 'short', year: 'numeric'}) : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Success
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold text-sm ${t.type === 'CREDIT' ? 'text-green-600' : 'text-gray-800'}`}>
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