import { CreditCard, Plus } from "lucide-react";

export default function EmptyState({ bankConfig, setOpenModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CreditCard size={32} className="text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No accounts yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        You haven't opened any accounts with {bankConfig.name} yet. Start by opening your first account to enjoy our banking services.
      </p>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
      >
        <Plus size={20} />
        <span className="font-medium">Open Your First Account</span>
      </button>
    </div>
  );
}