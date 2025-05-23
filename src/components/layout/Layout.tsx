import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
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
  breadcrumbs,
  maxWidth = "full",
  className = "",
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          breadcrumbs={breadcrumbs}
        />

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          <div className={`h-full ${maxWidthVariants[maxWidth]} mx-auto`}>
            <div className={`px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
              {/* Page header */}
              {(title || description) && (
                <div className="mb-8">
                  {title && (
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Page content */}
              <div className="h-full">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
