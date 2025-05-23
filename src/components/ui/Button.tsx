import { forwardRef, type ButtonHTMLAttributes } from 'react';
import React from 'react';
import { Icons, type IconName } from '@/components/icons';

// variant system using const assertions
const buttonVariants = {
  variant: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
} as const;

type ButtonVariant = keyof typeof buttonVariants.variant;
type ButtonSize = keyof typeof buttonVariants.size;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

    if (asChild) {
      const child = children as React.ReactElement;
      return React.cloneElement(child, {
        className: combinedClassName,
        ref,
        ...props
      });
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

export type { ButtonProps, ButtonVariant, ButtonSize };