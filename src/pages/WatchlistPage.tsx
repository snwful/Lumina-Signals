import { useState, useEffect } from "react";
import { mockSignals } from "../data/mockData";
import { SignalData } from "../types";
import { useAuth } from "../context/AuthContext";
import SignalCard from "../components/SignalCard";
import Header from "../components/Header";
import { BookMarked, Search } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlistSignals, setWatchlistSignals] = useState<SignalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadWatchlist = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (user && user.watchlist.length > 0) {
        const signals = mockSignals.filter(signal => user.watchlist.includes(signal.id));
        setWatchlistSignals(signals);
      } else {
        setWatchlistSignals([]);
      }
      
      setLoading(false);
    };
    
    loadWatchlist();
  }, [user]);

  const filteredSignals = watchlistSignals.filter(signal => 
    signal.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signal.poiType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signal.timeframe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      <Header title="Watchlist" />
      
      <div className="px-4 py-3">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="bg-zinc-800 text-white w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <BookMarked className="h-12 w-12 text-zinc-600 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">No saved signals</h3>
                <p className="text-zinc-400 text-sm max-w-xs">
                  Add signals to your watchlist by tapping the star icon on any signal card.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
