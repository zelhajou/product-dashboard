import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`mb-6 ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link to={item.href} className="hover:text-gray-700">{item.label}</Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}