// components/StatusBadge.js
export default function StatusBadge({ status }) {
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    ACTIVE: { color: "bg-green-100 text-green-800", label: "Active" },
    CLOSED: { color: "bg-gray-100 text-gray-800", label: "Closed" },
    REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
    DEFAULT: { color: "bg-blue-100 text-blue-800", label: status }
  };

  const config = statusConfig[status] || statusConfig.DEFAULT;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}