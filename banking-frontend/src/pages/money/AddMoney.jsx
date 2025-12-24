import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import api_account from "../../api/axiosAccount";

export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const username=localStorage.getItem("username");
  const accountNumber=localStorage.getItem(`accountNumber-${username}`);
  const handleAdd = async () => {
    try {
      await api_account.post("/api/accounts/credit", {accountNumber, amount });
      setMessage("Money added to your account!");
    } catch (err) {
      setMessage("Failed to add money.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add Money</h1>

      {message && <div className="p-3 bg-green-100 rounded mb-4">{message}</div>}

      <div className="max-w-lg grid gap-4">
        <input
          type="number"
          placeholder="Amount"
          className="border p-3 rounded"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Money
        </button>
      </div>
    </DashboardLayout>
  );
}
