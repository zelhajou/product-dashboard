import { type ReactNode } from "react";
import { ResponsiveContainer } from "./ResponsiveContainer";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function PageContainer({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs,
  size = "xl",
  className = "",
}: PageContainerProps) {
  return (
    <ResponsiveContainer size={size} className={className}>
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-gray-700 font-medium">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-semibold">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Page Header */}
      {(title || subtitle || actions) && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 truncate">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex-shrink-0 w-full sm:w-auto">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div>{children}</div>
    </ResponsiveContainer>
  );
}
