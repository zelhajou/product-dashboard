import React from "react";
import { forwardRef } from "react";
import { Icons } from "@/components/icons";
import type { IconName } from "@/components/icons";

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const buttonVariants = {
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = '',
    asChild = false,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = buttonVariants.variant[variant];
    const sizeStyles = buttonVariants.size[size];
    
    const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`.trim();

    // Get icon components
    const LeftIconComponent = leftIcon ? Icons[leftIcon] : null;
    const RightIconComponent = rightIcon ? Icons[rightIcon] : null;

    if (asChild && React.isValidElement(children)) {
      const element = children as React.ReactElement<any, any>;
      const childProps = { ...props, className: combinedClassName };
      return React.cloneElement(element, childProps);
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <Icons.loading className="w-4 h-4 animate-spin" />
        ) : (
          LeftIconComponent && <LeftIconComponent className="w-4 h-4" />
        )}
        
        {children}
        
        {!isLoading && RightIconComponent && <RightIconComponent className="w-4 h-4" />}
      </button>
    );
  }
);

Button.displayName = 'Button';