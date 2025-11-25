const quickServices = [
  { name: "Open Account", icon: "user-plus", link: "/open-account", color: "from-blue-500 to-blue-700" },
  { name: "Net Banking", icon: "globe", link: "/login", color: "from-green-500 to-green-700" },
  { name: "Credit Card", icon: "credit-card", link: "/credit-cards", color: "from-purple-500 to-purple-700" },
  { name: "Loan", icon: "hand-holding-usd", link: "/loans", color: "from-orange-500 to-orange-700" },
  { name: "Invest", icon: "chart-line", link: "/investments", color: "from-red-500 to-red-700" },
  { name: "Insurance", icon: "shield-alt", link: "/insurance", color: "from-indigo-500 to-indigo-700" }
];

export default function QuickServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Banking <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial solutions for all your banking needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {quickServices.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="group text-center p-6 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-transparent hover:transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fas fa-${service.icon} text-white text-2xl`}></i>
              </div>
              <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {service.name}
              </div>
              <div className="w-0 group-hover:w-8 h-0.5 bg-blue-600 mx-auto mt-2 transition-all duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}