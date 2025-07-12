import { Direction } from "../types";
import { TrendingDown, TrendingUp } from 'lucide-react';

interface DirectionBadgeProps {
  direction: Direction;
  size?: 'sm' | 'md' | 'lg';
}

export default function DirectionBadge({ direction, size = 'md' }: DirectionBadgeProps) {
  const directionColors = {
    BUY: "text-emerald-600",
    SELL: "text-rose-600"
  };
  
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={`flex items-center gap-1 font-medium ${directionColors[direction]} ${sizeClasses[size]}`}>
      {direction === 'BUY' ? (
        <TrendingUp className={iconSizes[size]} />
      ) : (
        <TrendingDown className={iconSizes[size]} />
      )}
      <span>{direction}</span>
    </div>
  );
}
