import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
      setAnimate(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, user]);
  
  const handleGetStarted = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50">
      <div className={`transition-all duration-1000 ${animate ? 'transform translate-y-[-40px]' : ''}`}>
        <div className={`h-24 w-24 rounded-full mx-auto ${loading ? 'bg-accent-500 animate-pulse' : 'bg-accent-500'} flex items-center justify-center mb-6`}>
          <svg
            width={48}
            height={48}
            viewBox="0 0 1920 1084"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
          >
            <path
              d="M496.36 933.52V714.848C496.36 561.289 291.434 507.242 214.842 640.703L139.842 771.304C118.857 807.887 71.5077 820.157 35.068 798.026C-0.0838509 776.723 -9.85666 729.978 10.5223 694.373L365.525 76.1461C442.117 -57.2398 647.043 -3.26819 647.043 150.367V369.866C647.043 523.35 851.893 577.397 928.56 444.162L1140.46 75.6945C1217.12 -57.6162 1421.97 -3.56926 1421.97 149.99V371.071C1421.97 524.555 1626.67 578.602 1703.42 445.442L1780.23 312.131C1801.29 275.623 1848.64 263.353 1885.01 285.559C1920.16 307.012 1929.86 353.682 1909.4 389.287L1552.73 1008.42C1475.99 1141.58 1271.29 1087.53 1271.29 934.047V713.719C1271.29 560.235 1066.44 506.188 989.773 639.423L777.877 1007.89C701.21 1141.2 496.36 1087.15 496.36 933.595V933.52Z"
              fill="black"
            />
          </svg>
        </div>
        
        <div className={`text-center transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-3xl font-bold text-primary-800 mb-2">Lumina Chart</h1>
          <p className="text-xl text-accent-600 mb-6">Sniper your next trade</p>
          <p className="text-surface-600 mb-8 max-w-xs mx-auto">
            Discover high-probability trades with precision analysis at key Points of Interest.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="py-3 px-6 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <div className="text-xs text-surface-600 bg-surface-100 rounded-full px-3 py-1">Forex</div>
            <div className="text-xs text-surface-600 bg-surface-100 rounded-full px-3 py-1">Gold</div>
            <div className="text-xs text-surface-600 bg-surface-100 rounded-full px-3 py-1">Crypto</div>
            <div className="text-xs text-surface-600 bg-surface-100 rounded-full px-3 py-1">Smart Signals</div>
          </div>
        </div>
      </div>
    </div>
  );
}
