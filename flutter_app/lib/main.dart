import 'package:flutter/material.dart';
import 'mock_data.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lumina Chart',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<SignalData> filteredSignals = mockSignals;
  String search = '';
  String filter = 'all';

  void _applyFilters() {
    setState(() {
      filteredSignals = mockSignals.where((s) {
        final matchesSearch = s.asset.toLowerCase().contains(search.toLowerCase());
        final matchesFilter = filter == 'all' ||
            (filter == 'high' && s.confidenceLevel == 'High') ||
            (filter == 'active' && s.status == 'Active');
        return matchesSearch && matchesFilter;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Live Signals')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: const InputDecoration(
                      hintText: 'Search assets...',
                      prefixIcon: Icon(Icons.search),
                    ),
                    onChanged: (value) {
                      search = value;
                      _applyFilters();
                    },
                  ),
                ),
                const SizedBox(width: 8),
                DropdownButton<String>(
                  value: filter,
                  items: const [
                    DropdownMenuItem(value: 'all', child: Text('All')),
                    DropdownMenuItem(value: 'high', child: Text('High Confidence')),
                    DropdownMenuItem(value: 'active', child: Text('Active')),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      filter = value;
                      _applyFilters();
                    }
                  },
                )
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: filteredSignals.length,
                itemBuilder: (context, index) {
                  final signal = filteredSignals[index];
                  return Card(
                    child: ListTile(
                      title: Text(signal.asset),
                      subtitle: Text(signal.description),
                      trailing: Text(signal.direction),
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
