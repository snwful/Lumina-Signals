import { SignalData } from "../types";
import { Clock, Eye } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import ConfidenceBadge from "./ConfidenceBadge";

interface SignalCardProps {
  signal: SignalData;
}

export default function SignalCard({ signal }: SignalCardProps) {
  const { user, addToWatchlist, removeFromWatchlist } = useAuth();
  const navigate = useNavigate();
  
  const isInWatchlist = user?.watchlist.includes(signal.id) || false;

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(signal.id);
    } else {
      addToWatchlist(signal.id);
    }
  };

  const handleViewAnalysis = () => {
    navigate(`/signal/${signal.id}`);
  };

  const formatCurrency = (value: number) => {
    if (signal.asset.includes('USD')) {
      return value.toFixed(signal.asset.includes('JPY') ? 3 : signal.asset.includes('XAU') ? 2 : 5);
    }
    return value.toFixed(signal.asset.includes('XAU') ? 2 : 5);
  };

  const getTimeDifference = () => {
    const now = new Date();
    const createdAt = new Date(signal.createdAt);
    const diffInHours = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours === 1) {
      return '1 hour ago';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  // Calculate risk to reward ratio
  const profitPips = Math.abs(signal.takeProfit - signal.entry) * (signal.asset.includes('XAU') ? 10 : 10000);
  const lossPips = Math.abs(signal.entry - signal.stopLoss) * (signal.asset.includes('XAU') ? 10 : 10000);
  const riskReward = (profitPips / lossPips).toFixed(1);

  // Determine if the signal is a buy or sell for direction indicator
  const isBuy = signal.direction === 'BUY';
  
  // Background color based on direction
  const cardBackground = isBuy ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <div className={`${cardBackground} rounded-2xl p-4 mb-4 border border-surface-200 shadow-sm`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBuy ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
            {isBuy ? (
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-surface-900">{signal.asset}</h3>
            <div className="text-sm text-surface-600">{signal.timeframe} • {signal.poiType}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <StatusBadge status={signal.status} size="sm" />
          <div className="mt-1">
            <ConfidenceBadge level={signal.confidenceLevel} size="sm" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="flex flex-col">
          <span className="text-xs text-surface-600">Entry</span>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="font-medium">{formatCurrency(signal.entry)}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-surface-600">Stop Loss</span>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-red-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-red-600">{formatCurrency(signal.stopLoss)}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-surface-600">Take Profit</span>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-green-600">{formatCurrency(signal.takeProfit)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-xs text-surface-600">
          <span>Risk:Reward</span>
          <span className="font-medium text-surface-900 ml-1">
            {signal.direction === 'SELL' ? '1:' + riskReward : riskReward + ':1'}
          </span>
        </div>
        <div className="flex items-center text-xs text-surface-600">
          <Clock className="w-3 h-3 mr-1" />
          <span>{getTimeDifference()}</span>
        </div>
      </div>
      
      <div className="flex justify-between gap-2">
        <button 
          className="flex-1 py-2 px-4 bg-white border border-surface-300 text-primary-800 font-medium rounded-xl hover:bg-surface-100 transition-colors flex items-center justify-center"
          onClick={handleViewAnalysis}
        >
          <Eye className="w-4 h-4 mr-1" />
          View Analysis
        </button>
        <button 
          className={`flex-1 py-2 px-4 font-medium rounded-xl transition-colors ${
            isInWatchlist 
              ? 'bg-primary-100 text-primary-800 border border-primary-300' 
              : 'bg-white border border-surface-300 text-surface-600 hover:bg-surface-100'
          }`}
          onClick={handleToggleWatchlist}
        >
          {isInWatchlist ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
