import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import ChartCard from "../../components/ChartCard";
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

const balanceData = [
  { month: "Jun", balance: 50000 },
  { month: "Jul", balance: 55000 },
  { month: "Aug", balance: 62000 },
  { month: "Sep", balance: 58000 },
  { month: "Oct", balance: 64000 },
  { month: "Nov", balance: 68450 },
];

const spendingData = [
  { category: "Groceries", value: 15000 },
  { category: "Bills", value: 8000 },
  { category: "Shopping", value: 7000 },
  { category: "EMI", value: 10000 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#e11d48"];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.email || "User"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Accounts" value="3" />
        <Card title="Current Balance" value="₹ 82,450" />
        <Card title="This Month Spend" value="₹ 24,500" />
        <Card title="Active Loans" value="2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Balance Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#4f46e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Spending by Category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="category"
                outerRadius={80}
                label
              >
                {spendingData.map((entry, index) => (
                  <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <p className="text-gray-500 text-sm">
          Later you can show top 5 latest transactions fetched from transaction-service.
        </p>
      </div>
    </DashboardLayout>
  );
}
