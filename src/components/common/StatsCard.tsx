import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  iconColor: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  onClick?: () => void;
  className?: string;
  hasAlert?: boolean;
  alertType?: "warning" | "danger";
}

export function StatsCard({
  icon,
  iconColor,
  title,
  value,
  subtitle,
  trend,
  onClick,
  className = "",
  hasAlert = false,
  alertType = "danger",
}: StatsCardProps) {
  const baseClasses = "bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 relative";
  const interactiveClasses = onClick 
    ? "cursor-pointer hover:shadow-lg hover:border-gray-300 hover:-translate-y-1" 
    : "";
  
  // Alert dot colors
  const alertColors = {
    warning: "bg-yellow-500",
    danger: "bg-red-500"
  };
  
  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {/* Alert dot in top-right corner */}
      {hasAlert && (
        <div className={`absolute top-3 right-3 w-3 h-3 ${alertColors[alertType]} rounded-full animate-bounce`}>
          <div className={`absolute inset-0 w-3 h-3 ${alertColors[alertType]} rounded-full animate-ping`}></div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Left section with icon and content aligned */}
        <div className="flex items-center space-x-4">
          {/* Icon container */}
          <div className={`p-3 ${iconColor} rounded-lg`}>
            <div className="w-7 h-7">
              {icon}
            </div>
          </div>
          
          {/* Content aligned with icon */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Right section with trend */}
        {trend && (
          <div className="text-right">
            <div className={`flex items-center text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">
                {trend.isPositive ? '↗' : '↘'}
              </span>
              {Math.abs(trend.value)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">{trend.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;