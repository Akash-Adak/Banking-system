const statusColors = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }) {
  const cls = statusColors[status] || "bg-gray-100 text-gray-700";
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${cls}`}>
      {status}
    </span>
  );
}
