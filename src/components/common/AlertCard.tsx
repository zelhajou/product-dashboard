import { ReactNode } from "react";
import { Icons } from "@/components/icons";

interface AlertCardProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  children?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const alertStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: <Icons.info className="w-5 h-5 text-blue-600" />,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: <Icons.success className="w-5 h-5 text-green-600" />,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: <Icons.warning className="w-5 h-5 text-yellow-600" />,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: <Icons.error className="w-5 h-5 text-red-600" />,
  },
};

export function AlertCard({
  type,
  title,
  description,
  children,
  action,
  onDismiss,
  className = "",
}: AlertCardProps) {
  const styles = alertStyles[type];

  return (
    <div className={`border rounded-lg p-4 ${styles.container} ${className}`}>
      <div className="flex items-start gap-3">
        {styles.icon}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 mb-2">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
          {action && <div className="mt-3">{action}</div>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <Icons.close className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default AlertCard;