import 'package:flutter/material.dart';
import 'home_screen.dart';

class SignalCard extends StatelessWidget {
  final Signal signal;
  const SignalCard({super.key, required this.signal});

  Color _confidenceColor(String level, BuildContext context) {
    switch (level) {
      case 'High':
        return Colors.green.shade600;
      case 'Medium':
        return Colors.amber.shade600;
      case 'Low':
        return Colors.red.shade600;
      default:
        return Theme.of(context).colorScheme.primary;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(signal.asset,
                        style: Theme.of(context).textTheme.titleMedium),
                    Text(signal.timeframe,
                        style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        signal.status,
                        style: const TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: _confidenceColor(signal.confidence, context),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        signal.confidence,
                        style: const TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildLabel('Entry', signal.entry.toStringAsFixed(2),
                    color: Colors.blue.shade600),
                _buildLabel('SL', signal.stopLoss.toStringAsFixed(2),
                    color: Colors.red.shade600),
                _buildLabel('TP', signal.takeProfit.toStringAsFixed(2),
                    color: Colors.green.shade600),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {},
                    child: const Text('View Analysis'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {},
                    child: const Text('Follow'),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _buildLabel(String title, String value, {required Color color}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 12)),
        Row(
          children: [
            Container(
              width: 6,
              height: 6,
              margin: const EdgeInsets.only(right: 4),
              decoration: BoxDecoration(color: color, shape: BoxShape.circle),
            ),
            Text(value, style: const TextStyle(fontWeight: FontWeight.w500)),
          ],
        )
      ],
    );
  }
}
