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
}: StatsCardProps) {
  const baseClasses = "bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200";
  const interactiveClasses = onClick ? "cursor-pointer hover:shadow-md hover:border-gray-300" : "";
  
  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 ${iconColor} rounded-lg`}>{icon}</div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
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