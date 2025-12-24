import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import { format } from "date-fns";
import { Copy, CheckCircle2 } from "lucide-react";
import { accountTypes } from "../../config/accountsConfig";


export default function AccountTable({
  accounts,
  showBalance,
  copiedAccount,
  copyAccountNumber,
  setSelectedAccount,
  setViewModal,
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

  const columns = [
    {
      header: "Account Details",
      accessor: "accountNumber",
      render: (val, row) => (
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            row.accountType === "SAVINGS" ? "bg-blue-100" :
            row.accountType === "CURRENT" ? "bg-green-100" : "bg-purple-100"
          }`}>
            {accountTypes[row.accountType]?.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {maskAccountNumber(val)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyAccountNumber(val);
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Copy account number"
              >
                {copiedAccount === val ? (
                  <CheckCircle2 size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} className="text-gray-500" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {accountTypes[row.accountType]?.name || row.accountType}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Balance",
      accessor: "balance",
      render: (val, row) => (
        <div className="text-right">
          <div className="font-bold text-gray-900">
            {showBalance ? formatCurrency(val, row.currency) : "••••••"}
          </div>
          <div className="text-xs text-gray-500">{row.currency}</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      header: "Opened On",
      accessor: "createdAt",
      render: (val) => (
        <div className="text-sm text-gray-600">
          {val ? format(new Date(val), "dd MMM yyyy") : "-"}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedAccount(row);
              setViewModal(true);
            }}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => navigate("/transactions", { state: { accountNumber: row.accountNumber } })}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            History
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table columns={columns} data={accounts} />
    </div>
  );
}