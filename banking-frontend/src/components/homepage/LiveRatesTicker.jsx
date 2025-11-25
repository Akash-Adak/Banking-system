import { useState, useEffect } from "react";

export default function LiveRatesTicker() {
  const [rates, setRates] = useState({
    usd: 83.15,
    eur: 89.50,
    gbp: 105.40,
    gold: 6250,
    silver: 74500,
    nifty: 22450,
    sensex: 73920
  });

  // State to track if market is up or down for visual indicators
  const [trends, setTrends] = useState({
    usd: 'up', eur: 'down', gbp: 'up', gold: 'up', silver: 'down', nifty: 'up', sensex: 'up'
  });

  useEffect(() => {
    const rateInterval = setInterval(() => {
      setRates(prev => {
        const newRates = {
          usd: prev.usd + (Math.random() - 0.5) * 0.05,
          eur: prev.eur + (Math.random() - 0.5) * 0.05,
          gbp: prev.gbp + (Math.random() - 0.5) * 0.05,
          gold: prev.gold + (Math.random() - 0.5) * 10,
          silver: prev.silver + (Math.random() - 0.5) * 50,
          nifty: prev.nifty + (Math.random() - 0.5) * 20,
          sensex: prev.sensex + (Math.random() - 0.5) * 50
        };

        // Update trends based on new values vs old values
        setTrends({
          usd: newRates.usd >= prev.usd ? 'up' : 'down',
          eur: newRates.eur >= prev.eur ? 'up' : 'down',
          gbp: newRates.gbp >= prev.gbp ? 'up' : 'down',
          gold: newRates.gold >= prev.gold ? 'up' : 'down',
          silver: newRates.silver >= prev.silver ? 'up' : 'down',
          nifty: newRates.nifty >= prev.nifty ? 'up' : 'down',
          sensex: newRates.sensex >= prev.sensex ? 'up' : 'down',
        });

        return newRates;
      });
    }, 2000);

    return () => clearInterval(rateInterval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 text-white text-xs md:text-sm py-2.5 overflow-hidden relative z-50 border-b-2 border-yellow-500 shadow-lg font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Label */}
        <div className="flex-shrink-0 flex items-center mr-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
          <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs">Market Live</span>
        </div>

        {/* Ticker Content - Scrollable on Mobile, Flex on Desktop */}
        <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient">
          <div className="flex items-center space-x-8 whitespace-nowrap">
            
            {/* Currency Section */}
            <div className="flex items-center space-x-6 border-r border-gray-700 pr-6">
              <TickerItem label="USD/INR" value={rates.usd.toFixed(2)} trend={trends.usd} />
              <TickerItem label="EUR/INR" value={rates.eur.toFixed(2)} trend={trends.eur} />
              <TickerItem label="GBP/INR" value={rates.gbp.toFixed(2)} trend={trends.gbp} />
            </div>

            {/* Commodities Section */}
            <div className="flex items-center space-x-6 border-r border-gray-700 pr-6">
              <TickerItem label="GOLD (10g)" value={`₹${rates.gold.toFixed(0)}`} trend={trends.gold} />
              <TickerItem label="SILVER (1kg)" value={`₹${rates.silver.toFixed(0)}`} trend={trends.silver} />
            </div>

            {/* Market Indices */}
            <div className="flex items-center space-x-6">
              <TickerItem label="NIFTY 50" value={rates.nifty.toFixed(2)} trend={trends.nifty} isIndex />
              <TickerItem label="SENSEX" value={rates.sensex.toFixed(2)} trend={trends.sensex} isIndex />
            </div>

          </div>
        </div>

        {/* Date/Time (Hidden on small mobile) */}
        <div className="hidden md:block ml-6 pl-6 border-l border-gray-700 text-gray-400 text-xs">
          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Sub-component for individual ticker items
function TickerItem({ label, value, trend, isIndex = false }) {
  const isUp = trend === 'up';
  const ColorClass = isUp ? "text-green-400" : "text-red-400";
  const IconClass = isUp ? "fa-caret-up" : "fa-caret-down";
  
  return (
    <div className="flex items-center gap-2 group cursor-default">
      <span className="text-gray-400 font-semibold group-hover:text-white transition-colors">{label}</span>
      <span className={`font-bold flex items-center ${ColorClass}`}>
        {value}
        <i className={`fas ${IconClass} ml-1.5 ${isIndex ? 'text-xs' : 'text-[10px]'}`}></i>
      </span>
    </div>
  );
}