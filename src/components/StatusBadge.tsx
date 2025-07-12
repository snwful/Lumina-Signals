import { SignalStatus } from "../types";

interface StatusBadgeProps {
  status: SignalStatus;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusColors = {
    Active: "bg-blue-600 text-white",
    Waiting: "bg-amber-500 text-white",
    "TP Hit": "bg-green-600 text-white",
    "SL Hit": "bg-red-500 text-white"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 rounded-md",
    md: "text-sm px-3 py-1 rounded-lg",
    lg: "text-base px-4 py-1.5 rounded-xl"
  };

  // Updated names to match the screenshot
  const displayName = {
    Active: "Active",
    Waiting: "Waiting",
    "TP Hit": "Hit TP",
    "SL Hit": "Hit SL"
  };

  return (
    <span className={`font-medium ${statusColors[status]} ${sizeClasses[size]}`}>
      {displayName[status]}
    </span>
  );
}
