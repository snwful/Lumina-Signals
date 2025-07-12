import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Bell, CircleHelp, Lock, LogOut, Mail, Plus, Settings, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    logout();
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="pb-20">
      <Header title="Profile" showNotification={false} />
      
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-yellow-500">
            <img 
              src={user.avatar || "https://i.pravatar.cc/150?img=68"} 
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-2 mb-4 border border-surface-200 shadow-sm">
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Settings className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Account Settings</div>
              <div className="text-xs text-surface-600">Privacy, security, and preferences</div>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Star className="h-4 w-4 text-accent-500" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Upgrade to Pro</div>
              <div className="text-xs text-surface-600">Advanced features and analysis</div>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Bell className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Notifications</div>
              <div className="text-xs text-surface-600">Customize alerts and notifications</div>
            </div>
          </button>
        </div>
        
        <div className="bg-white rounded-2xl p-2 mb-4 border border-surface-200 shadow-sm">
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <CircleHelp className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Help & Support</div>
              <div className="text-xs text-surface-600">Get help with using Lumina Chart</div>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Lock className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Privacy Policy</div>
              <div className="text-xs text-surface-600">How we protect your data</div>
            </div>
          </button>
          
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Mail className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Contact Us</div>
              <div className="text-xs text-surface-600">Get in touch with our team</div>
            </div>
          </button>
        </div>
        
        <div className="bg-white rounded-2xl p-2 mb-6 border border-surface-200 shadow-sm">
          <button className="w-full flex items-center p-3 text-left rounded-xl hover:bg-surface-100">
            <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center mr-3">
              <Plus className="h-4 w-4 text-surface-700" />
            </div>
            <div className="flex-1">
              <div className="text-primary-800 font-medium">Invite Friends</div>
              <div className="text-xs text-surface-600">Share Lumina Chart with others</div>
            </div>
          </button>
        </div>
        
        <button 
          className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-xl transition-colors flex items-center justify-center"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <div className="h-4 w-4 rounded-full border-2 border-red-400 border-t-transparent animate-spin mr-2"></div>
          ) : (
            <LogOut className="h-4 w-4 mr-2" />
          )}
          Log Out
        </button>
      </div>
    </div>
  );
}
