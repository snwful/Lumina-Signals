import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignalDetailPage from './pages/SignalDetailPage';
import WatchlistPage from './pages/WatchlistPage';
import PerformancePage from './pages/PerformancePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import BottomNav from './components/BottomNav';
import './index.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="h-12 w-12 rounded-full animate-spin bg-gradient-to-b from-yellow-400 to-transparent"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-surface-50 text-surface-900">
        <Routes>
          <Route path="/welcome" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
              <BottomNav />
            </ProtectedRoute>
          } />
          
          <Route path="/signal/:signalId" element={
            <ProtectedRoute>
              <SignalDetailPage />
              <BottomNav />
            </ProtectedRoute>
          } />
          
          <Route path="/watchlist" element={
            <ProtectedRoute>
              <WatchlistPage />
              <BottomNav />
            </ProtectedRoute>
          } />
          
          <Route path="/performance" element={
            <ProtectedRoute>
              <PerformancePage />
              <BottomNav />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
              <BottomNav />
            </ProtectedRoute>
          } />
          
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
