import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  headerAction?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variants = {
  default: 'bg-white border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white border border-gray-200 shadow-lg',
};

const sizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function InfoCard({ 
  title, 
  children, 
  icon, 
  headerAction,
  variant = 'default',
  size = 'md',
  className = '' 
}: InfoCardProps) {
  return (
    <div className={`${variants[variant]} ${sizes[size]} rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {headerAction && (
          <div className="flex-shrink-0">
            {headerAction}
          </div>
        )}
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}