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
    container: "py-8",
    icon: "w-8 h-8",
    title: "text-base",
    description: "text-sm",
  },
  md: {
    container: "py-12",
    icon: "w-12 h-12",
    title: "text-lg",
    description: "text-base",
  },
  lg: {
    container: "py-16",
    icon: "w-16 h-16",
    title: "text-xl",
    description: "text-lg",
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
      <div className={`${sizeClasses.icon} text-gray-400 mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className={`${sizeClasses.title} font-medium text-gray-900 mb-2`}>
        {title}
      </h3>
      <p className={`${sizeClasses.description} text-gray-500 mb-6`}>
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon as any}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              leftIcon={secondaryAction.icon as any}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
