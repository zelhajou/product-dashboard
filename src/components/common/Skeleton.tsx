import { ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

// Base Skeleton component
export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
      {children}
    </div>
  );
}

// Skeleton Card component
interface SkeletonCardProps {
  className?: string;
  hasIcon?: boolean;
  hasSubtitle?: boolean;
  hasTrend?: boolean;
}

export function SkeletonCard({ 
  className = "", 
  hasIcon = true, 
  hasSubtitle = true, 
  hasTrend = true 
}: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {hasIcon && (
            <Skeleton className="w-14 h-14 rounded-lg" />
          )}
          <div className="flex flex-col justify-center space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
            {hasSubtitle && <Skeleton className="h-3 w-20" />}
          </div>
        </div>
        {hasTrend && (
          <div className="text-right space-y-1">
            <Skeleton className="h-4 w-12 ml-auto" />
            <Skeleton className="h-3 w-16" />
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton Table component
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({ 
  rows = 5, 
  columns = 6, 
  className = "" 
}: SkeletonTableProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {[...Array(columns)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex} className="flex items-center">
                  {colIndex === 0 ? (
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ) : colIndex === columns - 1 ? (
                    // Last column with action buttons
                    <div className="flex space-x-2">
                      <Skeleton className="w-8 h-8 rounded" />
                      <Skeleton className="w-8 h-8 rounded" />
                    </div>
                  ) : (
                    // Regular columns
                    <Skeleton className="h-4 w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton Filter component
export function SkeletonFilter({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Skeleton Action Bar component  
interface SkeletonActionBarProps {
  className?: string;
  hasViewToggle?: boolean;
  hasAddButton?: boolean;
}

export function SkeletonActionBar({ 
  className = "", 
  hasViewToggle = true, 
  hasAddButton = true 
}: SkeletonActionBarProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {hasViewToggle && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>
          )}
          {hasAddButton && (
            <Skeleton className="h-10 w-28 rounded-md" />
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton Stats Grid component
interface SkeletonStatsProps {
  cards?: number;
  className?: string;
}

export function SkeletonStats({ cards = 4, className = "" }: SkeletonStatsProps) {
  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(cards)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Skeleton Page component for full page loading
interface SkeletonPageProps {
  hasStats?: boolean;
  hasFilters?: boolean;
  hasTable?: boolean;
  className?: string;
}

export function SkeletonPage({ 
  hasStats = true, 
  hasFilters = true, 
  hasTable = true,
  className = "" 
}: SkeletonPageProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {hasStats && <SkeletonStats className="mb-8" />}
      {hasFilters && (
        <>
          <SkeletonActionBar className="mb-6" />
          <SkeletonFilter className="mb-6" />
        </>
      )}
      {hasTable && <SkeletonTable />}
    </div>
  );
}

// Skeleton List Item for mobile/card views
export function SkeletonListItem({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
    </div>
  );
}

// Skeleton Product Details component
interface SkeletonProductDetailsProps {
  className?: string;
}

export function SkeletonProductDetails({ className = "" }: SkeletonProductDetailsProps) {
  return (
    <div className={`grid grid-cols-1 xl:grid-cols-4 gap-8 ${className}`}>
      {/* Main Content Skeleton */}
      <div className="xl:col-span-3">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Product Header Skeleton */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded" />
                <Skeleton className="w-8 h-8 rounded" />
              </div>
            </div>
          </div>

          {/* Product Image Skeleton */}
          <div className="p-6 border-b border-gray-100">
            <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-lg mx-auto mb-3" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            </div>
          </div>

          {/* Product Information Skeleton */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <Skeleton className="h-5 w-40 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="xl:col-span-1 space-y-6">
        {/* Stock Status Card Skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="w-full h-2 rounded-full" />
            </div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded" />
            ))}
          </div>
        </div>

        {/* Alert Card Skeleton */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 rounded mt-0.5 mr-3" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}