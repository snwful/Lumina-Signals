import 'package:flutter/material.dart';
import 'screens/home_page.dart';
import 'screens/login_page.dart';
import 'screens/profile_page.dart';
import 'screens/signal_detail_page.dart';
import 'screens/watchlist_page.dart';

void main() {
  runApp(const LuminaApp());
}

class LuminaApp extends StatelessWidget {
  const LuminaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lumina Signals',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/login': (context) => const LoginPage(),
        '/watchlist': (context) => const WatchlistPage(),
        '/profile': (context) => const ProfilePage(),
        '/signal': (context) => const SignalDetailPage(),
      },
    );
  }
}
