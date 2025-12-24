import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import api_account from "../../api/axiosAccount";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const username=localStorage.getItem("username");
  const accountNumber=localStorage.getItem(`accountNumber-${username}`);
  const handleWithdraw = async () => {
    try {
      await api_account.post("/api/transactions/debit", { amount });
      setMessage("Money withdrawn successfully!");
    } catch (err) {
      setMessage("Withdrawal failed.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Withdraw Money</h1>

      {message && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
          {message}
        </div>
      )}

      <div className="max-w-lg grid gap-4">
        <input
          type="number"
          placeholder="Amount"
          className="border p-3 rounded"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleWithdraw}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Withdraw Money
        </button>
      </div>
    </DashboardLayout>
  );
}
