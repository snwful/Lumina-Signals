import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
}

export default function Header({ title, showBack = false, showNotification = true }: HeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="relative h-16 flex items-center justify-center px-4 border-b border-surface-200 bg-white">
      {showBack && (
        <button 
          className="absolute left-4 text-surface-700"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      
      <h1 className="font-bold text-lg text-primary-800">{title}</h1>
      
      {showNotification && (
        <button className="absolute right-4 text-surface-700">
          <Bell className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
