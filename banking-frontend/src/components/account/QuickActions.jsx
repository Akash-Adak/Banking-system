import { Send, ArrowDownLeft, ArrowUpRight, History } from "lucide-react";

export default function QuickActions({ navigate }) {
  const actions = [
    {
      icon: <Send size={18} />,
      label: "Send Money",
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => navigate("/send-money")
    },
    {
      icon: <ArrowDownLeft size={18} />,
      label: "Add Money",
      color: "bg-green-600 hover:bg-green-700",
      onClick: () => navigate("/add-money")
    },
    {
      icon: <ArrowUpRight size={18} />,
      label: "Withdraw",
      color: "bg-red-600 hover:bg-red-700",
      onClick: () => navigate("/withdraw")
    },
    {
      icon: <History size={18} />,
      label: "Transaction History",
      color: "bg-gray-600 hover:bg-gray-700",
      onClick: () => navigate("/transactions")
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex items-center gap-2 px-4 py-3 text-white rounded-xl transition-colors shadow-sm ${action.color}`}
          >
            {action.icon}
            <span className="font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}