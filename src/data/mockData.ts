import { SignalData, User } from "../types";

// Sample user
export const mockUser: User = {
  id: "user123",
  email: "demo@luminachart.com",
  name: "Demo User",
  avatar: "https://i.pravatar.cc/150?img=68",
  watchlist: ["signal1", "signal3"]
};

// Sample trading signals
export const mockSignals: SignalData[] = [
  {
    id: "signal1",
    asset: "XAUUSD",
    timeframe: "H4",
    poiType: "Demand Zone",
    entry: 2387.50,
    takeProfit: 2415.00,
    stopLoss: 2370.25,
    confidenceLevel: "High",
    status: "Active",
    direction: "BUY",
    category: "Reversal",
    createdAt: "2025-07-11T18:30:00Z",
    chartImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    description: "Gold (XAUUSD) has entered a strong demand zone with multiple confirmations including volume spike and bullish price action. The recent lower timeframe structure break provides an excellent entry opportunity with a favorable risk-to-reward ratio."
  },
  {
    id: "signal2",
    asset: "BTCUSD",
    timeframe: "D1",
    poiType: "Fair Value Gap",
    entry: 64250.00,
    takeProfit: 68750.00,
    stopLoss: 62500.00,
    confidenceLevel: "Medium",
    status: "Waiting",
    direction: "BUY",
    category: "Breakout",
    createdAt: "2025-07-12T09:15:00Z",
    chartImage: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002&auto=format&fit=crop",
    description: "Bitcoin shows a significant Fair Value Gap on the daily timeframe. The price is approaching this zone with decreasing selling pressure. Watch for entry when price reaches the zone with confirmation of bullish momentum."
  },
  {
    id: "signal3",
    asset: "EURUSD",
    timeframe: "H1",
    poiType: "Supply Zone",
    entry: 1.0845,
    takeProfit: 1.0795,
    stopLoss: 1.0870,
    confidenceLevel: "High",
    status: "TP Hit",
    direction: "SELL",
    category: "Reversal",
    createdAt: "2025-07-10T14:00:00Z",
    chartImage: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071&auto=format&fit=crop",
    description: "EURUSD has reached a key supply zone where multiple rejections have occurred previously. The price action shows bearish divergence with RSI, and volume increased on approach. Target was hit within 24 hours for a clean 2.5R profit."
  },
  {
    id: "signal4",
    asset: "ETHUSD",
    timeframe: "H4",
    poiType: "Support & Resistance",
    entry: 3150.00,
    takeProfit: 3350.00,
    stopLoss: 3050.00,
    confidenceLevel: "Medium",
    status: "SL Hit",
    direction: "BUY",
    category: "Trend Continuation",
    createdAt: "2025-07-09T22:45:00Z",
    chartImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1887&auto=format&fit=crop",
    description: "Ethereum attempted to bounce from a key support level, but unexpected market news caused a deeper correction than anticipated. The trade hit its stop loss due to market-wide selling pressure across cryptocurrencies."
  },
  {
    id: "signal5",
    asset: "XAUUSD",
    timeframe: "M15",
    poiType: "Fair Value Gap",
    entry: 2392.75,
    takeProfit: 2401.25,
    stopLoss: 2388.50,
    confidenceLevel: "Low",
    status: "Active",
    direction: "BUY",
    category: "Breakout",
    createdAt: "2025-07-12T10:30:00Z",
    chartImage: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop",
    description: "Short-term scalp opportunity on Gold as price fills a fair value gap from the previous session. The short timeframe limits confidence, but the setup offers a good risk-to-reward for quick profits if momentum continues."
  }
];

export const performanceData = {
  winrateByPOI: [
    { name: 'Demand Zone', winrate: 78 },
    { name: 'Supply Zone', winrate: 72 },
    { name: 'Fair Value Gap', winrate: 65 },
    { name: 'Support & Resistance', winrate: 58 }
  ],
  winrateByConfidence: [
    { name: 'High', winrate: 82 },
    { name: 'Medium', winrate: 64 },
    { name: 'Low', winrate: 45 }
  ],
  monthlyPerformance: [
    { month: 'Jan', signals: 24, wins: 18, losses: 6 },
    { month: 'Feb', signals: 28, wins: 19, losses: 9 },
    { month: 'Mar', signals: 32, wins: 22, losses: 10 },
    { month: 'Apr', signals: 30, wins: 23, losses: 7 },
    { month: 'May', signals: 35, wins: 25, losses: 10 },
    { month: 'Jun', signals: 29, wins: 20, losses: 9 },
    { month: 'Jul', signals: 18, wins: 13, losses: 5 }
  ]
};
