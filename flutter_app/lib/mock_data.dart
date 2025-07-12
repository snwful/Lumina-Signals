class SignalData {
  final String id;
  final String asset;
  final String timeframe;
  final String poiType;
  final double entry;
  final double takeProfit;
  final double stopLoss;
  final String confidenceLevel;
  final String status;
  final String direction;
  final String category;
  final String description;

  SignalData({
    required this.id,
    required this.asset,
    required this.timeframe,
    required this.poiType,
    required this.entry,
    required this.takeProfit,
    required this.stopLoss,
    required this.confidenceLevel,
    required this.status,
    required this.direction,
    required this.category,
    required this.description,
  });
}

final mockSignals = [
  SignalData(
    id: 'signal1',
    asset: 'XAUUSD',
    timeframe: 'H4',
    poiType: 'Demand Zone',
    entry: 2387.50,
    takeProfit: 2415.00,
    stopLoss: 2370.25,
    confidenceLevel: 'High',
    status: 'Active',
    direction: 'BUY',
    category: 'Reversal',
    description: 'Gold has entered a strong demand zone.',
  ),
  SignalData(
    id: 'signal2',
    asset: 'BTCUSD',
    timeframe: 'D1',
    poiType: 'Fair Value Gap',
    entry: 64250.0,
    takeProfit: 68750.0,
    stopLoss: 62500.0,
    confidenceLevel: 'Medium',
    status: 'Waiting',
    direction: 'BUY',
    category: 'Breakout',
    description: 'Bitcoin shows a daily fair value gap.',
  ),
];
