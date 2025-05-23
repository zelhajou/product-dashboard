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
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar*/}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          w-64 xl:w-72 2xl:w-80
          flex flex-col
        `}
      >
        {/* Brand Header - Fixed height */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm">
              <Icons.product className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ProductHub</h1>
              <p className="text-xs text-gray-500">Management Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <Icons.close className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats - Fixed height */}
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icons.product className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-800">
                  Products
                </span>
              </div>
              <div className="text-lg font-bold text-blue-900">128</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icons.dollar className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-800">
                  Value
                </span>
              </div>
              <div className="text-lg font-bold text-green-900">$24K</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto pb-20">
          <div className="space-y-6">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = isActiveLink(item.href);

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`
                          group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }
                        `}
                      >
                        <IconComponent
                          className={`
                            w-5 h-5 mr-3 transition-transform duration-200
                            ${hoveredItem === item.href ? "scale-110" : ""}
                            ${
                              isActive
                                ? "text-white"
                                : "text-gray-500 group-hover:text-gray-700"
                            }
                          `}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`
                                  ml-2 px-2 py-0.5 text-xs font-medium rounded-full
                                  ${
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : "bg-red-100 text-red-800"
                                  }
                                `}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p
                              className={`
                                text-xs mt-0.5 truncate
                                ${isActive ? "text-white/70" : "text-gray-500"}
                              `}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Icons.user className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-800">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate group-hover:text-gray-600">
                admin@producthub.com
              </p>
            </div>
            <Icons.settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
      {/* Desktop sidebar spacer - only visible on large screens when sidebar is shown */}
      <div className="hidden lg:block flex-shrink-0 w-64 xl:w-72 2xl:w-80"></div>
    </>
  );
}
