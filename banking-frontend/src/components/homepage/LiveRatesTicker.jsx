import { useState, useEffect } from "react";

export default function LiveRatesTicker() {
  const [rates, setRates] = useState({
    usd: 83.15,
    eur: 89.50,
    gold: 6250,
    nifty: 22450,
    sensex: 73920
  });

  useEffect(() => {
    const rateInterval = setInterval(() => {
      setRates(prev => ({
        usd: prev.usd + (Math.random() - 0.5) * 0.1,
        eur: prev.eur + (Math.random() - 0.5) * 0.1,
        gold: prev.gold + (Math.random() - 0.5) * 10,
        nifty: prev.nifty + (Math.random() - 0.5) * 50,
        sensex: prev.sensex + (Math.random() - 0.5) * 80
      }));
    }, 3000);

    return () => clearInterval(rateInterval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden relative z-50 border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="text-yellow-400 font-bold flex items-center">
              <i className="fas fa-chart-line mr-2"></i>
              LIVE RATES
            </span>
            <span className="flex items-center">
              USD/INR: <span className={`ml-1 font-semibold ${rates.usd > 83.12 ? "text-green-400" : "text-red-400"}`}>{rates.usd.toFixed(2)}</span>
            </span>
            <span className="flex items-center">
              EUR/INR: <span className={`ml-1 font-semibold ${rates.eur > 89.45 ? "text-green-400" : "text-red-400"}`}>{rates.eur.toFixed(2)}</span>
            </span>
            <span className="flex items-center">
              GOLD: <span className="ml-1 font-semibold">₹{rates.gold.toFixed(0)}/g</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              NIFTY: <span className="ml-1 font-semibold">{rates.nifty.toFixed(0)}</span>
            </span>
            <span className="flex items-center">
              SENSEX: <span className="ml-1 font-semibold">{rates.sensex.toFixed(0)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}