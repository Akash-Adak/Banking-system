import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import FilterBar from "../../components/FilterBar";
import { format } from "date-fns";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTransactions([
      {
        id: "TXN001",
        date: "2024-11-20T09:30:00Z",
        type: "DEBIT",
        amount: 2500,
        accountId: "ACC123",
        status: "COMPLETED",
        description: "Groceries",
      },
      {
        id: "TXN002",
        date: "2024-11-19T14:10:00Z",
        type: "CREDIT",
        amount: 40000,
        accountId: "ACC456",
        status: "COMPLETED",
        description: "Salary",
      },
      {
        id: "TXN003",
        date: "2024-11-18T12:00:00Z",
        type: "DEBIT",
        amount: 1500,
        accountId: "ACC123",
        status: "FAILED",
        description: "UPI Payment",
      },
    ]);
  }, []);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "ALL" && t.type !== typeFilter) return false;
      if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
      if (
        search &&
        !(
          t.id.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.accountId.toLowerCase().includes(search.toLowerCase())
        )
      )
        return false;
      return true;
    });
  }, [transactions, typeFilter, statusFilter, search]);

  const columns = [
    {
      header: "Date",
      accessor: "date",
      render: (val) =>
        format(new Date(val), "dd MMM yyyy, HH:mm"),
    },
    { header: "Txn ID", accessor: "id" },
    { header: "Account", accessor: "accountId" },
    {
      header: "Type",
      accessor: "type",
      render: (val) => (
        <span
          className={
            val === "CREDIT"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {val}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (val) => `₹ ${val.toLocaleString("en-IN")}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
    { header: "Description", accessor: "description" },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <FilterBar>
        <input
          type="text"
          placeholder="Search by ID, description, account..."
          className="border rounded-lg px-3 py-2 text-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </FilterBar>

      <Table columns={columns} data={filtered} />
    </DashboardLayout>
  );
}
