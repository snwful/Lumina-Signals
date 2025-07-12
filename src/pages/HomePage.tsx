import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockSignals } from "../data/mockData";
import { SignalData } from "../types";
import SignalCard from "../components/SignalCard";
import Header from "../components/Header";
import { Filter, Grid3x3, ListFilter, Search } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setSignals(mockSignals);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const filterSignals = () => {
    let filtered = [...signals];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(signal => 
        signal.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.poiType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.timeframe.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== "all") {
      if (activeFilter === "high") {
        filtered = filtered.filter(signal => signal.confidenceLevel === "High");
      } else if (activeFilter === "active") {
        filtered = filtered.filter(signal => signal.status === "Active");
      } else if (activeFilter === "forex") {
        filtered = filtered.filter(signal => 
          signal.asset.includes("USD") || 
          signal.asset.includes("EUR") || 
          signal.asset.includes("GBP") || 
          signal.asset.includes("JPY")
        );
      } else if (activeFilter === "crypto") {
        filtered = filtered.filter(signal => 
          signal.asset.includes("BTC") || 
          signal.asset.includes("ETH")
        );
      }
    }
    
    return filtered;
  };

  const filteredSignals = filterSignals();

  return (
    <div className="pb-20 bg-surface-50">
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Live Signals</h1>
        <p className="text-surface-600 mb-4">Real-time trading opportunities around key market levels</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === "all" 
                  ? "bg-surface-900 text-white" 
                  : "bg-white text-surface-700 border border-surface-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("high")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === "high" 
                  ? "bg-surface-900 text-white" 
                  : "bg-white text-surface-700 border border-surface-200"
              }`}
            >
              High Confidence
            </button>
            <button
              onClick={() => setActiveFilter("active")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === "active" 
                  ? "bg-surface-900 text-white" 
                  : "bg-white text-surface-700 border border-surface-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("forex")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === "forex" 
                  ? "bg-surface-900 text-white" 
                  : "bg-white text-surface-700 border border-surface-200"
              }`}
            >
              Forex
            </button>
            <button
              onClick={() => setActiveFilter("crypto")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === "crypto" 
                  ? "bg-surface-900 text-white" 
                  : "bg-white text-surface-700 border border-surface-200"
              }`}
            >
              Crypto
            </button>
          </div>
        </div>
        
        <div className="flex mb-4">
          <div className="relative flex-1 mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-surface-400" />
            </div>
            <input
              type="text"
              className="bg-white text-surface-900 w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 border border-surface-200"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white p-2 rounded-xl border border-surface-200">
            <ListFilter className="h-5 w-5 text-surface-700" />
          </button>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {filteredSignals.length > 0 ? (
              filteredSignals.map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))
            ) : (
              <div className="text-center py-10 text-surface-500 bg-white rounded-xl border border-surface-200">
                No signals found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
