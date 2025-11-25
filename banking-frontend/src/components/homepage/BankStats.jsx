const bankStats = [
  { value: "50M+", label: "Happy Customers" },
  { value: "₹10T+", label: "Assets Under Management" },
  { value: "5,000+", label: "Branches Across India" },
  { value: "15,000+", label: "ATM Networks" }
];

export default function BankStats() {
  return (
    <section className="bg-white py-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {bankStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}