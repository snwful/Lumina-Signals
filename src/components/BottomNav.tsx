import { BarChart4, BookMarked, House, User } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-surface-200 px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        <Link 
          to="/"
          className={`flex flex-col items-center p-2 rounded-xl ${isActive('/') ? 'text-accent-600' : 'text-surface-600'}`}
        >
          <House className="h-5 w-5" />
          <span className="text-xs mt-1">House</span>
        </Link>
        
        <Link 
          to="/watchlist"
          className={`flex flex-col items-center p-2 rounded-xl ${isActive('/watchlist') ? 'text-accent-600' : 'text-surface-600'}`}
        >
          <BookMarked className="h-5 w-5" />
          <span className="text-xs mt-1">Watchlist</span>
        </Link>
        
        <Link 
          to="/performance"
          className={`flex flex-col items-center p-2 rounded-xl ${isActive('/performance') ? 'text-accent-600' : 'text-surface-600'}`}
        >
          <BarChart4 className="h-5 w-5" />
          <span className="text-xs mt-1">Performance</span>
        </Link>
        
        <Link 
          to="/profile"
          className={`flex flex-col items-center p-2 rounded-xl ${isActive('/profile') ? 'text-accent-600' : 'text-surface-600'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}
