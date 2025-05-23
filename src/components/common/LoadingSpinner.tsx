interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({
  size = "md",
  message,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div
          className={`animate-spin ${spinnerSizes[size]} border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4`}
        ></div>
        {message && (
          <div className="text-lg font-medium text-gray-600">{message}</div>
        )}
      </div>
    </div>
  );
}
