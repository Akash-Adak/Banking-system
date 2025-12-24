import Modal from "../../components/Modal";
import { accountTypes } from "../../config/accountsConfig";


export default function NewAccountModal({
  open,
  onClose,
  newAccountType,
  setNewAccountType,
  createAccount
}) {
  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Open New Account</h2>
        <p className="text-gray-600 mb-6">Choose the account type that fits your needs</p>

        <div className="space-y-4 mb-6">
          {Object.entries(accountTypes).map(([key, config]) => (
            <div
              key={key}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                newAccountType === key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setNewAccountType(key)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg border">
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{config.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {config.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Minimum balance: {formatCurrency(config.minBalance)}
                    </p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  newAccountType === key ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}>
                  {newAccountType === key && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={createAccount}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
    </Modal>
  );
}