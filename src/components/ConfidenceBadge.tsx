import { ConfidenceLevel } from "../types";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConfidenceBadge({ level, showIcon = false, size = 'md' }: ConfidenceBadgeProps) {
  const confidenceColors = {
    High: "bg-green-500 text-white",
    Medium: "bg-amber-500 text-white",
    Low: "bg-red-500 text-white"
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 rounded-md",
    md: "text-sm px-3 py-1 rounded-lg",
    lg: "text-base px-4 py-1.5 rounded-xl"
  };

  return (
    <span className={`font-medium ${confidenceColors[level]} ${sizeClasses[size]}`}>
      {level}
    </span>
  );
}
