import { Icons } from '@/components/icons';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  breadcrumbs?: Breadcrumb[];
}

// src/components/layout/Header.tsx - Updated for new layout
export function Header({ onMenuClick, title, breadcrumbs }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            aria-label="Open sidebar"
          >
            <Icons.menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav className="hidden sm:flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb: Breadcrumb, index: number) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <Icons.chevronRight className="w-4 h-4 mx-2 text-gray-400" />
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-semibold">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Page title */}
          {title && (
            <h1 className="text-xl font-semibold text-gray-900 sm:hidden">
              {title}
            </h1>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <Icons.activity className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <Icons.settings className="w-5 h-5" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icons.user className="w-4 h-4 text-white" />
              </div>
              <Icons.chevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}