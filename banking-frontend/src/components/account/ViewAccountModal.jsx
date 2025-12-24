import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";
import { Copy, CheckCircle2 } from "lucide-react";
import { accountTypes } from "../../config/accountsConfig";

export default function ViewAccountModal({
  open,
  onClose,
  selectedAccount,
  copiedAccount,
  copyAccountNumber,
  navigate
}) {
  // Mask account number for display
  const maskAccountNumber = (num) => {
    const str = String(num);
    return "•".repeat(str.length - 4) + str.slice(-4);
  };

  // Format currency
  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (!selectedAccount) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Account Number</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-gray-900">
                {maskAccountNumber(selectedAccount.accountNumber)}
              </span>
              <button
                onClick={() => copyAccountNumber(selectedAccount.accountNumber)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedAccount === selectedAccount.accountNumber ? (
                  <CheckCircle2 size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Account Type</span>
            <span className="font-semibold text-gray-900">
              {accountTypes[selectedAccount.accountType]?.name}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Current Balance</span>
            <span className="font-bold text-gray-900">
              {formatCurrency(selectedAccount.balance, selectedAccount.currency)}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Status</span>
            <StatusBadge status={selectedAccount.status} />
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Opened On</span>
            <span className="text-gray-900">
              {selectedAccount.createdAt ? format(new Date(selectedAccount.createdAt), "dd MMM yyyy") : "-"}
            </span>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => {
              onClose();
              navigate("/transactions", { state: { accountNumber: selectedAccount.accountNumber } });
            }}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Transactions
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}