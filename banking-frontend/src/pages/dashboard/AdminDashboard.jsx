import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel {user?.email && `– ${user.email}`}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Users" value="1,250" />
        <Card title="Total Accounts" value="3,540" />
        <Card title="Today's Transactions" value="5,420" />
        <Card title="System Health" value="OK" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Microservices Overview</h2>
        <p className="text-gray-500 text-sm">
          Here you can later integrate Eureka, Prometheus, Kafka metrics, etc.
        </p>
      </div>
    </DashboardLayout>
  );
}
