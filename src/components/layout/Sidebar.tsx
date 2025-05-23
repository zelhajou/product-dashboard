"use client";

import type React from "react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "@/components/icons";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
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
        icon: Icons.product,
        description: "Browse inventory",
      },
      {
        label: "Add Product",
        href: "/add-product",
        icon: Icons.add,
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
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white/95 backdrop-blur-md border-r border-gray-100 z-50 transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          w-72
          flex flex-col
          shadow-xl lg:shadow-none
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/80 bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <Icons.product className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">ProductSync</h1>
              <p className="text-xs text-gray-500 font-medium">Management Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icons.close className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-8">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <h3 className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
                <div className="space-y-1">
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
                          relative group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-out
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }
                        `}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"></div>
                        )}
                        
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`
                            flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
                            ${isActive 
                              ? "bg-blue-100 text-blue-600" 
                              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                            }
                            ${isHovered ? "scale-110" : ""}
                          `}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate font-medium">{item.label}</span>
                              {item.badge && (
                                <span className={`
                                  ml-2 px-2 py-0.5 text-xs font-medium rounded-full
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
                              <p className={`
                                text-xs mt-0.5 truncate transition-colors
                                ${isActive ? "text-blue-600/70" : "text-gray-500"}
                              `}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Hover effect */}
                        <div className={`
                          absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-200
                          ${isHovered && !isActive ? "opacity-100" : ""}
                        `}></div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Icons.user className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-gray-800">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate group-hover:text-gray-600">
                admin@ProductSync.com
              </p>
            </div>
            <Icons.settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar spacer */}
      <div className="hidden lg:block flex-shrink-0 w-72"></div>
    </>
  );
}