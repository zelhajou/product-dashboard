import { type ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const sizeVariants = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
} as const;

const paddingVariants = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-6 sm:px-8 lg:px-12",
} as const;

export function ResponsiveContainer({
  children,
  size = "xl",
  padding = "md",
  className = "",
}: ResponsiveContainerProps) {
  return (
    <div className={`${sizeVariants[size]} mx-auto ${paddingVariants[padding]} ${className}`}>
      {children}
    </div>
  );
}