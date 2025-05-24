"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Plus, User, Settings, X, Menu } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  description?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    title: "Products",
    items: [
      {
        label: "All Products",
        href: "/products",
        icon: Package,
        description: "Browse inventory",
      },
      {
        label: "Add Product",
        href: "/add-product",
        icon: Plus,
        description: "Create new product",
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isCollapsed ? "w-20" : "w-72"}
          flex flex-col
          shadow-sm
        `}
      >
        {/* Brand Header */}
        <div className={`flex items-center border-b border-gray-200 transition-all duration-300 ${
          isCollapsed ? "justify-center px-4 py-6" : "justify-between px-6 py-6"
        }`}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            
            {/* Brand text */}
            <div className={`transition-all duration-300 overflow-hidden ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}>
              <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Products</h1>
              <p className="text-sm text-gray-500 whitespace-nowrap">Management Suite</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className={`flex items-center space-x-2 transition-all duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapse Toggle for Collapsed State */}
        {isCollapsed && (
          <div className="px-4 py-3 border-b border-gray-100">
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-full p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
              title="Expand sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 py-6 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? "px-3" : "px-6"
        }`}>
          <div className="space-y-6">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                {!isCollapsed && (
                  <h3 className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
                    {group.title}
                  </h3>
                )}
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = isActiveLink(item.href);
                    const isHovered = hoveredItem === item.href;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`
                          group relative flex items-center rounded-xl text-sm cursor-pointer transition-all duration-200
                          ${isCollapsed 
                            ? "p-3 justify-center" 
                            : "px-4 py-3"
                          }
                          ${isActive
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                          }
                        `}
                        title={isCollapsed ? `${item.label} - ${item.description}` : undefined}
                      >
                        {/* Icon */}
                        <div className={`
                          flex items-center justify-center rounded-lg transition-all duration-200 flex-shrink-0
                          ${isCollapsed ? "w-9 h-9" : "w-10 h-10 mr-3"}
                          ${isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                          }
                          ${isHovered && !isActive ? "scale-105" : ""}
                        `}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        
                        {/* Content */}
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">{item.label}</span>
                              {item.badge && (
                                <span className={`
                                  ml-2 px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0
                                  ${isActive 
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                                  }
                                `}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <div className={`text-xs mt-1 truncate transition-colors ${
                                isActive ? "text-blue-600" : "text-gray-500"
                              }`}>
                                {item.description}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-blue-500"></div>
                        )}

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && isHovered && (
                          <div className="absolute left-full ml-6 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl z-50 whitespace-nowrap max-w-xs">
                            <div className="font-medium">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                            )}
                            {/* Arrow */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className={`border-t border-gray-200 transition-all duration-300 ${
          isCollapsed ? "p-4" : "p-6"
        }`}>
          <div className={`
            group flex items-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer
            ${isCollapsed ? "p-3 justify-center" : "space-x-3 p-4"}
          `}
          title={isCollapsed ? "Admin User - admin@Product.com" : undefined}>
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            
            {/* User info */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
            }`}>
              <p className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">Admin User</p>
              <p className="text-xs text-gray-500 truncate whitespace-nowrap">admin@Product.com</p>
            </div>
            
            {/* Settings icon */}
            <div className={`transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
            }`}>
              <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar spacer */}
      <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}></div>
    </>
  );
}