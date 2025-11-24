import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import api_transaction from "../../api/axiosTransaction";

export default function SendMoney() {

    const accountNumber=localStorage.getItem("accountNumber")
  const [form, setForm] = useState({
    // recipientName: "",
    fromAccount: accountNumber,
    toAccount: "",
    // ifsc: "",
    type:"TRANSFER",
    amount: "",
 
  });

  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      await api_transaction.post("/api/transactions", form);
      setMessage("Money sent successfully!");
    } catch (err) {
      setMessage("Failed to send money.");
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Send Money</h1>

      {message && (
        <div className="p-3 mb-4 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <div className="grid gap-4 max-w-lg">
        {/* <input
          type="text"
          placeholder="Recipient Name"
          className="border p-3 rounded"
          onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
        /> */}

        <input
          type="text"
          placeholder="Recipient Account Number"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, toAccount: e.target.value })
          }
        />

        {/* <input
          type="text"
          placeholder="IFSC Code"
          className="border p-3 rounded"
          onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
        /> */}

        <input
          type="number"
          placeholder="Amount"
          className="border p-3 rounded"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* <input
          type="text"
          placeholder="Description"
          className="border p-3 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        /> */}

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Money
        </button>
      </div>
    </DashboardLayout>
  );
}
