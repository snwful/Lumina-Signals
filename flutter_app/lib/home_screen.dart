import 'package:flutter/material.dart';
import 'signal_card.dart';

class Signal {
  final String asset;
  final String timeframe;
  final double entry;
  final double takeProfit;
  final double stopLoss;
  final String confidence;
  final String status;

  const Signal({
    required this.asset,
    required this.timeframe,
    required this.entry,
    required this.takeProfit,
    required this.stopLoss,
    required this.confidence,
    required this.status,
  });
}

class HomeScreen extends StatefulWidget {
  final VoidCallback onToggleTheme;
  const HomeScreen({super.key, required this.onToggleTheme});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Signal> _signals = const [
    Signal(
        asset: 'XAUUSD',
        timeframe: 'H4',
        entry: 2387.50,
        takeProfit: 2415.00,
        stopLoss: 2370.25,
        confidence: 'High',
        status: 'Active'),
    Signal(
        asset: 'BTCUSD',
        timeframe: 'D1',
        entry: 64250.00,
        takeProfit: 68750.00,
        stopLoss: 62500.00,
        confidence: 'Medium',
        status: 'Waiting'),
    Signal(
        asset: 'EURUSD',
        timeframe: 'H1',
        entry: 1.0845,
        takeProfit: 1.0795,
        stopLoss: 1.0870,
        confidence: 'High',
        status: 'TP Hit'),
    Signal(
        asset: 'ETHUSD',
        timeframe: 'H4',
        entry: 3150.00,
        takeProfit: 3350.00,
        stopLoss: 3050.00,
        confidence: 'Medium',
        status: 'SL Hit'),
  ];

  String _filter = 'All';

  List<Signal> get _filteredSignals {
    if (_filter == 'All') return _signals;
    if (_filter == 'Active') {
      return _signals.where((s) => s.status == 'Active').toList();
    }
    if (_filter == 'High Confidence') {
      return _signals.where((s) => s.confidence == 'High').toList();
    }
    return _signals;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Live Signals'),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: widget.onToggleTheme,
          )
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Real-time trading opportunities around key market levels',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ),
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                const SizedBox(width: 16),
                _buildFilterChip('All'),
                _buildFilterChip('Active'),
                _buildFilterChip('High Confidence'),
                const SizedBox(width: 16),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _filteredSignals.length,
              itemBuilder: (context, index) {
                final signal = _filteredSignals[index];
                return SignalCard(signal: signal);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: _filter == label,
        onSelected: (_) {
          setState(() {
            _filter = label;
          });
        },
      ),
    );
  }
}
