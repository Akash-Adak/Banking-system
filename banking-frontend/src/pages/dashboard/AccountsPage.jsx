import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";
import api_account from "../../api/axiosAccount";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newAccountType, setNewAccountType] = useState("SAVINGS");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("username");
const navigate = useNavigate();
  // 🔥 GET ALL ACCOUNTS FROM BACKEND
  const loadAccounts = async () => {
    try {
      const accountNumber=localStorage.getItem("accountNumber");
      console.log(accountNumber);
      const res = await api_account.get(`/api/accounts/user/${accountNumber}`);
      console.log(res);
      // Prevent crash if backend returns null or undefined
      const safeData = Array.isArray(res.data) ? res.data : [];
      const arr = [res.data];
      setAccounts(arr);
      setLoading(false);
    } catch (err) {
      console.error("Error loading accounts:", err);
      setAccounts([]); // fallback
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // 🔥 CREATE NEW ACCOUNT
  const createAccount = async () => {
    try {
     const res= await api_account.post("/api/accounts", {
        type: newAccountType,
      });
      localStorage.setItem("accountNumber",res.data.accountNumber);
      setMessage("Account created successfully!");
      setOpenModal(false);
      loadAccounts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to create account.");
    }
  };

const maskAccountNumber = (num) => {
  const str = String(num);
  return "X".repeat(str.length - 4) + str.slice(-4);
};

  const columns = [
{ header: "Account Number", accessor: "accountNumber",
    render: (val) => maskAccountNumber(val)},

    { header: "Type", accessor: "accountType" },
    {
      header: "Balance",
      accessor: "balance",
      render: (val, row) => `₹ ${val?.toLocaleString("en-IN") || 0} ${row.currency}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      header: "Opened On",
      accessor: "createdAt",
      render: (val) => (val ? format(new Date(val), "dd MMM yyyy") : "-"),
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
      ) : accounts.length === 0 ? (
        <div className="p-6 bg-gray-100 text-gray-700 rounded-lg text-center">
          <p className="text-lg font-medium">No accounts found.</p>
          <p className="text-sm text-gray-500 mb-4">You have not opened any account yet.</p>
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            + Open Your First Account
          </button>
        </div>
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
          <option value="BUSINESS">Business Account</option>
        </select>

        <button
          onClick={createAccount}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Account
        </button>
      </Modal>

        <button
    onClick={() => navigate("/send-money")}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
  >
    💸 Send Money
  </button>

  <button
    onClick={() => navigate("/add-money")}
    className="px-4 py-2 bg-green-600 text-white rounded-lg"
  >
    ➕ Add Money
  </button>

  <button
    onClick={() => navigate("/withdraw")}
    className="px-4 py-2 bg-red-600 text-white rounded-lg"
  >
    🔻 Withdraw
  </button>
    </DashboardLayout>
  );
}
