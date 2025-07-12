import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const { login, signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    if (!isLogin && !name) {
      setError("Please enter your name");
      return;
    }
    
    try {
      setSubmitting(true);
      
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password, name);
      }
      
      navigate("/");
    } catch (err) {
      setError("Authentication failed. Please try again.");
      setSubmitting(false);
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-accent-500 flex items-center justify-center">
              <svg
                width={28}
                height={28}
                viewBox="0 0 1920 1084"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M496.36 933.52V714.848C496.36 561.289 291.434 507.242 214.842 640.703L139.842 771.304C118.857 807.887 71.5077 820.157 35.068 798.026C-0.0838509 776.723 -9.85666 729.978 10.5223 694.373L365.525 76.1461C442.117 -57.2398 647.043 -3.26819 647.043 150.367V369.866C647.043 523.35 851.893 577.397 928.56 444.162L1140.46 75.6945C1217.12 -57.6162 1421.97 -3.56926 1421.97 149.99V371.071C1421.97 524.555 1626.67 578.602 1703.42 445.442L1780.23 312.131C1801.29 275.623 1848.64 263.353 1885.01 285.559C1920.16 307.012 1929.86 353.682 1909.4 389.287L1552.73 1008.42C1475.99 1141.58 1271.29 1087.53 1271.29 934.047V713.719C1271.29 560.235 1066.44 506.188 989.773 639.423L777.877 1007.89C701.21 1141.2 496.36 1087.15 496.36 933.595V933.52Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-primary-800">Lumina Chart</h1>
          <p className="text-surface-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white text-surface-900 w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 border border-surface-200"
                  placeholder="John Doe"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-surface-900 w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 border border-surface-200"
                placeholder="your@email.com"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-surface-900 w-full pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 border border-surface-200"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-zinc-500" />
                ) : (
                  <Eye className="h-5 w-5 text-zinc-500" />
                )}
              </button>
            </div>
          </div>
          
          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary-600 hover:text-primary-800">
                Forgot password?
              </button>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center"
            disabled={submitting}
          >
            {submitting ? (
              <div className="h-5 w-5 rounded-full border-2 border-black border-t-transparent animate-spin mr-2"></div>
            ) : (
              <ArrowRight className="h-5 w-5 mr-2" />
            )}
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-surface-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="ml-2 text-primary-600 hover:text-primary-800 font-medium"
              onClick={toggleAuthMode}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
