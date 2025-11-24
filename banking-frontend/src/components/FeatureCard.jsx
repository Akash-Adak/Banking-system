export default function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 shadow rounded-xl bg-gray-50 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
