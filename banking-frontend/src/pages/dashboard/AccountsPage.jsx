import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);

  // Later replace with real API call
  useEffect(() => {
    setAccounts([
      {
        id: "ACC123",
        type: "SAVINGS",
        balance: 52000.45,
        currency: "INR",
        status: "ACTIVE",
        createdAt: "2024-06-01T10:00:00Z",
      },
      {
        id: "ACC456",
        type: "CURRENT",
        balance: 180000.0,
        currency: "INR",
        status: "ACTIVE",
        createdAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "ACC789",
        type: "LOAN",
        balance: -45000,
        currency: "INR",
        status: "PENDING",
        createdAt: "2023-12-20T10:00:00Z",
      },
    ]);
  }, []);

  const columns = [
    { header: "Account ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    {
      header: "Balance",
      accessor: "balance",
      render: (val, row) => `₹ ${val.toLocaleString("en-IN")} ${row.currency}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      header: "Opened On",
      accessor: "createdAt",
      render: (val) => format(new Date(val), "dd MMM yyyy"),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Accounts</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          + Open New Account
        </button>
      </div>

      <Table columns={columns} data={accounts} />
    </DashboardLayout>
  );
}
