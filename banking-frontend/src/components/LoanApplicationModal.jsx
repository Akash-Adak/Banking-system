import { useState, useEffect } from "react";

export default function LoanApplicationModal({ loanTypes, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    loanType: "",
    principal: "",
    tenureMonths: "",
    purpose: ""
  });

  const [calculations, setCalculations] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0
  });

  const [errors, setErrors] = useState({});

  const selectedLoanType = loanTypes?.find(lt => lt.value === formData.loanType) || null;

  // Calculate EMI when principal, tenure, or loan type changes
  useEffect(() => {
    calculateEMI();
  }, [formData.principal, formData.tenureMonths, formData.loanType]);

  const calculateEMI = () => {
    if (!selectedLoanType || !formData.principal || !formData.tenureMonths) {
      setCalculations({ emi: 0, totalInterest: 0, totalAmount: 0 });
      return;
    }

    const principal = parseFloat(formData.principal);
    const tenureMonths = parseInt(formData.tenureMonths);
    const monthlyRate = selectedLoanType.interestRate / 12 / 100;

    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;

    setCalculations({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.loanType) {
      newErrors.loanType = "Please select a loan type";
    }

    if (!formData.principal) {
      newErrors.principal = "Please enter loan amount";
    } else if (selectedLoanType) {
      const principal = parseFloat(formData.principal);
      if (principal < selectedLoanType.minAmount || principal > selectedLoanType.maxAmount) {
        newErrors.principal = `Amount must be between ₹${selectedLoanType.minAmount.toLocaleString()} and ₹${selectedLoanType.maxAmount.toLocaleString()}`;
      }
    }

    if (!formData.tenureMonths) {
      newErrors.tenureMonths = "Please enter tenure";
    } else if (selectedLoanType) {
      const tenure = parseInt(formData.tenureMonths);
      if (tenure < selectedLoanType.minTenure || tenure > selectedLoanType.maxTenure) {
        newErrors.tenureMonths = `Tenure must be between ${selectedLoanType.minTenure} and ${selectedLoanType.maxTenure} months`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        principal: parseFloat(formData.principal),
        tenureMonths: parseInt(formData.tenureMonths),
        interestRate: selectedLoanType.interestRate
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Apply for Loan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Loan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Type *
            </label>
            <select
              required
              value={formData.loanType}
              onChange={(e) => handleInputChange("loanType", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.loanType ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select Loan Type</option>
              {loanTypes?.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label} ({type.interestRate}% interest)
                </option>
              ))}
            </select>
            {errors.loanType && (
              <p className="text-red-600 text-sm mt-1">{errors.loanType}</p>
            )}
            {selectedLoanType && (
              <p className="text-sm text-gray-600 mt-1">{selectedLoanType.description}</p>
            )}
          </div>

          {/* Principal Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₹) *
            </label>
            <input
              type="number"
              required
              min={selectedLoanType?.minAmount || 0}
              max={selectedLoanType?.maxAmount || 10000000}
              value={formData.principal}
              onChange={(e) => handleInputChange("principal", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.principal ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter loan amount"
            />
            {errors.principal && (
              <p className="text-red-600 text-sm mt-1">{errors.principal}</p>
            )}
            {selectedLoanType && !errors.principal && (
              <p className="text-sm text-gray-600 mt-1">
                Range: ₹{selectedLoanType.minAmount.toLocaleString("en-IN")} - ₹{selectedLoanType.maxAmount.toLocaleString("en-IN")}
              </p>
            )}
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tenure (Months) *
            </label>
            <input
              type="number"
              required
              min={selectedLoanType?.minTenure || 12}
              max={selectedLoanType?.maxTenure || 360}
              value={formData.tenureMonths}
              onChange={(e) => handleInputChange("tenureMonths", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.tenureMonths ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter tenure in months"
            />
            {errors.tenureMonths && (
              <p className="text-red-600 text-sm mt-1">{errors.tenureMonths}</p>
            )}
            {selectedLoanType && !errors.tenureMonths && (
              <p className="text-sm text-gray-600 mt-1">
                Range: {selectedLoanType.minTenure} - {selectedLoanType.maxTenure} months
              </p>
            )}
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Purpose
            </label>
            <textarea
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Describe the purpose of this loan"
            />
          </div>

          {/* EMI Calculation */}
          {calculations.emi > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Loan Calculation</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Monthly EMI</div>
                  <div className="font-semibold">₹ {calculations.emi.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Interest</div>
                  <div className="font-semibold">₹ {calculations.totalInterest.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Amount</div>
                  <div className="font-semibold">₹ {calculations.totalAmount.toLocaleString("en-IN")}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}