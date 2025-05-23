import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Icons, type IconName } from "@/components/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: IconName | ReactNode;
  rightIcon?: IconName | ReactNode;
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isInvalid,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error) || isInvalid;

    const baseInputStyles =
      "w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorStyles = hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300";
    const iconPadding = leftIcon ? "pl-10" : rightIcon ? "pr-10" : "";

    const inputClassName =
      `${baseInputStyles} ${errorStyles} ${iconPadding} ${className}`.trim();

    // Helper function to render icons
    const renderIcon = (icon: IconName | ReactNode) => {
      if (typeof icon === "string") {
        const IconComponent = Icons[icon as IconName];
        return IconComponent ? (
          <IconComponent className="w-4 h-4 text-gray-400" />
        ) : null;
      }
      return icon;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {renderIcon(leftIcon)}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClassName}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {renderIcon(rightIcon)}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export type { InputProps };
