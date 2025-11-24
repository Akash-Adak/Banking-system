export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-64">{children}</div>
    </div>
  );
}
