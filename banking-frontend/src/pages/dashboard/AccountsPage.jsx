import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";
import api from "../../api/axios";
import Modal from "../../components/Modal";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newAccountType, setNewAccountType] = useState("SAVINGS");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("username");

  // 🔥 GET ALL ACCOUNTS FROM BACKEND
  const loadAccounts = async () => {
    try {
      const res = await api.get(`/api/accounts/user/${username}`);
      setAccounts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading accounts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // 🔥 CREATE NEW ACCOUNT
  const createAccount = async () => {
    try {
      await api.post("/api/accounts", {
        username,
        type: newAccountType,
      });

      setMessage("Account created successfully!");
      setOpenModal(false);
      loadAccounts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to create account.");
    }
  };

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
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + Open New Account
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading accounts...</p>
      ) : (
        <Table columns={columns} data={accounts} />
      )}

      {/* 🔥 OPEN NEW ACCOUNT MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-semibold mb-4">Open New Account</h2>

        <label className="block mb-3 font-medium">Account Type</label>

        <select
          className="border p-3 rounded-lg w-full"
          value={newAccountType}
          onChange={(e) => setNewAccountType(e.target.value)}
        >
          <option value="SAVINGS">Savings Account</option>
          <option value="CURRENT">Current Account</option>
          <option value="LOAN">Loan Account</option>
        </select>

        <button
          onClick={createAccount}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Account
        </button>
      </Modal>
    </DashboardLayout>
  );
}
