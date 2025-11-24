import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import ChartCard from "../../components/ChartCard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import api_account from "../../api/axiosAccount";
import api_transaction from "../../api/axiosTransaction";
// import api_loan from "../../api/axiosLoan";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Colors for pie chart
const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#e11d48"];

export default function UserDashboard() {
  const { user } = useAuth();

  // 🔥 Dynamic Data States
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [activeLoans, setActiveLoans] = useState(0);
  const [monthSpend, setMonthSpend] = useState(0);

  const [balanceTrend, setBalanceTrend] = useState([]);
  const [spendingCategory, setSpendingCategory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const accountNumber =  localStorage.getItem("accountNumber");
 const username =  localStorage.getItem("username");
  // ----------------------------------------------------------
  // 🔥 FETCH DASHBOARD DATA
  // ----------------------------------------------------------
  const loadDashboard = async () => {
    try {
      // ⬅️ GET ACCOUNTS
      const accRes = await api_account.get(`/api/accounts/user/${accountNumber}`);
      const accounts = [accRes.data] ;
      setTotalAccounts(accounts.length);

      // Total balance calculation
      const balanceSum = accounts.reduce(
        (sum, a) => sum + Number(a.balance || 0),
        0
      );
      setCurrentBalance(balanceSum);

      // Generate dummy trend from account balance (you can replace with backend data)
      setBalanceTrend([
        { month: "Jun", balance: balanceSum - 12000 },
        { month: "Jul", balance: balanceSum - 8000 },
        { month: "Aug", balance: balanceSum - 5000 },
        { month: "Sep", balance: balanceSum - 4000 },
        { month: "Oct", balance: balanceSum - 2500 },
        { month: "Nov", balance: balanceSum },
      ]);

      // ⬅️ GET LAST 5 TRANSACTIONS
      const txnRes = await api_transaction.get(`/api/transactions/history/${accountNumber}`);
      const txns = (txnRes.data || []).slice(0, 5);
      setRecentTransactions(txns);

      // Monthly spending (only DEBIT)
      const spend = txns
        .filter((t) => t.type === "DEBIT")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
      setMonthSpend(spend);

      // Spending by category (grouping debits)
      const categories = {};
      txns
        .filter((t) => t.type === "DEBIT")
        .forEach((t) => {
          categories[t.description] =
            (categories[t.description] || 0) + Number(t.amount || 0);
        });
      setSpendingCategory(
        Object.keys(categories).map((key) => ({
          category: key,
          value: categories[key],
        }))
      );

      // ⬅️ GET ACTIVE LOANS COUNT
      const loanRes = await api_loan.get(`/api/loans/user/${username}`);
      const loans = loanRes.data || [];
      setActiveLoans(loans.filter((l) => l.status === "ACTIVE").length);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.email}
      </h1>

      {/* 🔥 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Accounts" value={totalAccounts} />
        <Card title="Current Balance" value={`₹ ${currentBalance.toLocaleString("en-IN")}`} />
        <Card title="This Month Spend" value={`₹ ${monthSpend.toLocaleString("en-IN")}`} />
        <Card title="Active Loans" value={activeLoans} />
      </div>

      {/* 🔥 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Balance Trend Chart */}
        <ChartCard title="Balance Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Spending Category Chart */}
        <ChartCard title="Spending by Category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingCategory}
                dataKey="value"
                nameKey="category"
                outerRadius={90}
                label
              >
                {spendingCategory.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 🔥 Recent Transactions */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Txn ID</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="border-b text-sm">
                  <td className="py-2">{t.id}</td>
                  <td className="py-2">{t.type}</td>
                  <td className="py-2">₹ {t.amount.toLocaleString("en-IN")}</td>
                  <td className="py-2">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* QUICK ACTIONS */}
<div className="flex gap-4 mb-8">



</div>

    </DashboardLayout>
  );
}
