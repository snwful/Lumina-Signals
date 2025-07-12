import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { performanceData } from "../data/mockData";
import Header from "../components/Header";
import { Calendar } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";

export default function PerformancePage() {
  const [loading, setLoading] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState("all");
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };
    
    loadData();
  }, []);

  const timeframes = [
    { id: "all", label: "All" },
    { id: "month", label: "Month" },
    { id: "week", label: "Week" }
  ];

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header title="Performance" />
      
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Trading Statistics</h2>
          <div className="flex items-center text-sm text-zinc-400 bg-zinc-800 rounded-full px-3 py-1">
            <Calendar className="h-3 w-3 mr-1" />
            July 2025
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-4 border border-surface-200 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-surface-600 mb-1">Signals</span>
              <span className="font-bold text-primary-800 text-xl">196</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-surface-600 mb-1">Win Rate</span>
              <span className="font-bold text-emerald-600 text-xl">72%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-surface-600 mb-1">Avg. R:R</span>
              <span className="font-bold text-primary-800 text-xl">2.3</span>
            </div>
          </div>
          
          <div className="flex mb-2">
            {timeframes.map(timeframe => (
              <button
                key={timeframe.id}
                className={`flex-1 py-1 text-sm font-medium rounded-lg mr-2 last:mr-0 ${
                  activeTimeframe === timeframe.id
                    ? "bg-primary-800 text-white"
                    : "bg-surface-200 text-surface-600"
                }`}
                onClick={() => setActiveTimeframe(timeframe.id)}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
          
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData.monthlyPerformance}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f1f1f', 
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#eee', fontWeight: 'bold' }}
                />
                <Bar dataKey="wins" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="losses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-sm">
            <h3 className="text-base font-semibold text-primary-800 mb-3">Win Rate by POI Type</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData.winrateByPOI}
                  layout="vertical"
                  margin={{ top: 5, right: 0, left: -30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Win Rate']}
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#eee', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="winrate" radius={[0, 4, 4, 0]}>
                    {performanceData.winrateByPOI.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-sm">
            <h3 className="text-base font-semibold text-primary-800 mb-3">Win Rate by Confidence</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData.winrateByConfidence}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="winrate"
                    nameKey="name"
                    label={(entry) => `${entry.name}: ${entry.winrate}%`}
                    labelLine={false}
                  >
                    {performanceData.winrateByConfidence.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Win Rate']}
                    contentStyle={{ 
                      backgroundColor: '#1f1f1f', 
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#eee', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
