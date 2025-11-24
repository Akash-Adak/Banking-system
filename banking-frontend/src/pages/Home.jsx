import PublicLayout from "../layout/PublicLayout";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Modern Banking, Made Simple
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Manage accounts, transfer money, pay bills, and more — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="px-6 py-3 bg-gray-200 text-lg rounded-lg"
          >
            Login
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-8 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose BankEase?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            title="Secure Banking"
            desc="Your money is protected with bank-grade security and encryption."
          />

          <FeatureCard
            title="Instant Transfers"
            desc="Send and receive money within seconds across the country."
          />

          <FeatureCard
            title="Smart Dashboard"
            desc="Track spending, manage accounts, and view financial insights."
          />
        </div>
      </div>
    </PublicLayout>
  );
}
