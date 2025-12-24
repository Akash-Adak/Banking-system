export default function MessageAlert({ message, setMessage }) {
  if (!message) return null;

  return (
    <div className={`p-4 rounded-lg ${
      message.includes("❌") 
        ? "bg-red-100 text-red-700 border border-red-200" 
        : "bg-green-100 text-green-700 border border-green-200"
    }`}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{message}</span>
        <button onClick={() => setMessage("")} className="text-lg">×</button>
      </div>
    </div>
  );
}