export type POIType = 'Support & Resistance' | 'Demand Zone' | 'Supply Zone' | 'Fair Value Gap';
export type TimeFrame = 'M5' | 'M15' | 'H1' | 'H4' | 'D1' | 'W1';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type SignalStatus = 'Active' | 'Waiting' | 'TP Hit' | 'SL Hit';
export type Direction = 'BUY' | 'SELL';
export type Category = 'Reversal' | 'Breakout' | 'Trend Continuation';

export interface SignalData {
  id: string;
  asset: string;
  timeframe: TimeFrame;
  poiType: POIType;
  entry: number;
  takeProfit: number;
  stopLoss: number;
  confidenceLevel: ConfidenceLevel;
  status: SignalStatus;
  direction: Direction;
  category: Category;
  createdAt: string;
  chartImage: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  watchlist: string[];
}
