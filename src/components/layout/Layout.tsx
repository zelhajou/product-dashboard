import { type ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

const maxWidthVariants = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
} as const;

export function Layout({
  children,
  title,
  description,
  maxWidth = "xl",
  className = "",
}: LayoutProps) {

  const containerClasses =
    `${maxWidthVariants[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className={containerClasses}>
        {/* Page header section */}
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
          </div>
        )}

        {/* Page content */}
        {children}
      </main>
    </div>
  );
}

export default Layout;
