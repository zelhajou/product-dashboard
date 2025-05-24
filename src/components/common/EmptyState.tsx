import { ReactNode } from "react";
import { Button } from "@/components/ui";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: {
    container: "py-4",
    icon: "w-6 h-6",
    title: "text-sm",
    description: "text-xs",
  },
  md: {
    container: "py-6",
    icon: "w-8 h-8",
    title: "text-base",
    description: "text-sm",
  },
  lg: {
    container: "py-8",
    icon: "w-10 h-10",
    title: "text-lg",
    description: "text-base",
  },
};

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  size = "md",
  className = "",
}: EmptyStateProps) {
  const sizeClasses = sizes[size];

  return (
    <div className={`text-center ${sizeClasses.container} ${className}`}>
      <div className={`${sizeClasses.icon} text-gray-400 mx-auto mb-2 animate-fade-in`}>
        {icon}
      </div>
      <h3 className={`${sizeClasses.title} font-medium text-gray-900 mb-1`}>
        {title}
      </h3>
      <p className={`${sizeClasses.description} text-gray-500 mb-4`}>
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon as "add" | "close" | undefined}
              className="transition-colors focus:ring-2 focus:ring-blue-400"
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              leftIcon={secondaryAction.icon as "add" | "close" | undefined}
              className="transition-colors focus:ring-2 focus:ring-blue-400"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}