import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockSignals } from "../data/mockData";
import { SignalData } from "../types";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import ConfidenceBadge from "../components/ConfidenceBadge";
import DirectionBadge from "../components/DirectionBadge";
import { Calendar, Clock, Star, Zap } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";

export default function SignalDetailPage() {
  const { signalId } = useParams<{ signalId: string }>();
  const [signal, setSignal] = useState<SignalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const { user, addToWatchlist, removeFromWatchlist } = useAuth();
  const navigate = useNavigate();
  
  const isInWatchlist = user?.watchlist.includes(signalId || "") || false;

  useEffect(() => {
    const loadSignal = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const foundSignal = mockSignals.find(s => s.id === signalId);
      if (foundSignal) {
        setSignal(foundSignal);
      } else {
        navigate("/404");
      }
      
      setLoading(false);
    };
    
    loadSignal();
  }, [signalId, navigate]);

  const handleToggleWatchlist = () => {
    if (!signalId) return;
    
    if (isInWatchlist) {
      removeFromWatchlist(signalId);
    } else {
      addToWatchlist(signalId);
    }
  };

  const handleGenerateAI = async () => {
    if (aiExplanation) return;
    
    setLoadingAI(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const explanations = [
      "This signal shows a high-probability trade setup at a key demand zone. Multiple time frame confluence and strong historical support in this area increase the chances of a bullish reaction. The trade has a favorable risk-to-reward ratio with clearly defined entry, stop loss, and take profit levels.",
      "The price has reached a significant fair value gap that often acts as a magnet for price action. Market structure suggests exhaustion of the previous trend, and volume analysis confirms decreasing selling pressure. This creates an excellent opportunity for a reversal trade.",
      "Technical analysis shows this level has strong historical significance with multiple rejections. RSI divergence and declining volume on approach further confirm the likelihood of a reversal. The trade offers an asymmetric risk-reward with potential for extended targets if momentum accelerates."
    ];
    
    setAiExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
    setLoadingAI(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    });
  };

  const formatCurrency = (value: number) => {
    if (!signal) return "";
    
    if (signal.asset.includes('USD')) {
      return value.toFixed(2);
    }
    return value.toFixed(signal.asset.includes('XAU') ? 2 : 4);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!signal) {
    return <div>Signal not found</div>;
  }

  const profitPips = Math.abs(signal.takeProfit - signal.entry) * (signal.asset.includes('XAU') ? 10 : 10000);
  const lossPips = Math.abs(signal.entry - signal.stopLoss) * (signal.asset.includes('XAU') ? 10 : 10000);
  const riskReward = (profitPips / lossPips).toFixed(1);

  return (
    <div className="pb-20">
      <Header title="Signal Details" showBack={true} />
      
      <div className="p-4">
        <div className="relative mb-4 h-48 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={signal.chartImage}
            alt={`${signal.asset} chart`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-white">{signal.asset}</div>
                <div className="text-sm text-zinc-300">{signal.timeframe} • {signal.poiType}</div>
              </div>
              <StatusBadge status={signal.status} size="lg" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <DirectionBadge direction={signal.direction} size="lg" />
            <ConfidenceBadge level={signal.confidenceLevel} size="lg" />
          </div>
          <button 
            className={`p-2 rounded-full ${isInWatchlist ? 'text-yellow-400' : 'text-zinc-500'}`}
            onClick={handleToggleWatchlist}
          >
            <Star className={`h-6 w-6 ${isInWatchlist ? 'fill-yellow-400' : ''}`} />
          </button>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-4 border border-surface-200 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Entry</span>
              <span className="font-medium text-white">{formatCurrency(signal.entry)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Take Profit</span>
              <span className="font-medium text-green-500">{formatCurrency(signal.takeProfit)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Stop Loss</span>
              <span className="font-medium text-red-500">{formatCurrency(signal.stopLoss)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Profit (pips)</span>
              <span className="font-medium text-green-500">{profitPips.toFixed(1)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Loss (pips)</span>
              <span className="font-medium text-red-500">{lossPips.toFixed(1)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Risk : Reward</span>
              <span className="font-medium text-white">1 : {riskReward}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-4 border border-surface-200 shadow-sm">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">Signal Analysis</h3>
          <p className="text-zinc-300 text-sm mb-3">{signal.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center text-xs text-zinc-400 bg-zinc-800 rounded-full px-3 py-1">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(signal.createdAt)}
            </div>
            <div className="flex items-center text-xs text-zinc-400 bg-zinc-800 rounded-full px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {signal.category}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-4 border border-surface-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-primary-800">AI Explanation</h3>
            <Zap className="h-5 w-5 text-accent-500" />
          </div>
          
          {aiExplanation ? (
            <p className="text-zinc-300 text-sm">{aiExplanation}</p>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-zinc-400 text-sm text-center mb-3">
                Generate an AI-powered explanation of this trading signal.
              </p>
              <button 
                className="py-2 px-4 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center"
                onClick={handleGenerateAI}
                disabled={loadingAI}
              >
                {loadingAI ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>Generate AI Explanation</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
