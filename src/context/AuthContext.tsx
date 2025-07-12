import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockUser } from '../data/mockData';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  updateWatchlist: (signalIds: string[]) => void;
  addToWatchlist: (signalId: string) => void;
  removeFromWatchlist: (signalId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('luminaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, we'll just use the mock user
    if (email && password) {
      setUser(mockUser);
      localStorage.setItem('luminaUser', JSON.stringify(mockUser));
    }
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate signup delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user based on the mock user with the provided details
    const newUser = {
      ...mockUser,
      email,
      name,
      watchlist: []
    };
    
    setUser(newUser);
    localStorage.setItem('luminaUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luminaUser');
  };

  const updateWatchlist = (signalIds: string[]) => {
    if (user) {
      const updatedUser = {
        ...user,
        watchlist: signalIds
      };
      setUser(updatedUser);
      localStorage.setItem('luminaUser', JSON.stringify(updatedUser));
    }
  };

  const addToWatchlist = (signalId: string) => {
    if (user) {
      const newWatchlist = user.watchlist.includes(signalId) 
        ? user.watchlist 
        : [...user.watchlist, signalId];
      
      updateWatchlist(newWatchlist);
    }
  };

  const removeFromWatchlist = (signalId: string) => {
    if (user) {
      const newWatchlist = user.watchlist.filter(id => id !== signalId);
      updateWatchlist(newWatchlist);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      signUp,
      updateWatchlist,
      addToWatchlist,
      removeFromWatchlist 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
