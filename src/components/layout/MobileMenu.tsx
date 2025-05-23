import { Link, useLocation } from "react-router-dom";
import { Icons } from "@/components/icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileNavItems = [
  { label: "All Products", href: "/", icon: Icons.activity },
  { label: "All Products", href: "/products", icon: Icons.product },
  { label: "Add Product", href: "/add-product", icon: Icons.add },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Icons.product className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">ProductSync</h2>
              <p className="text-xs text-gray-500">Management Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Icons.close className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <div className="space-y-2">
            {mobileNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Icons.user className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@ProductSync.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}