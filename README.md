# Product Management Dashboard

A comprehensive, modern product management dashboard built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing product inventory with advanced filtering, sorting, analytics, and professional UI/UX design.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.7-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

**[View Live Application](https://product-dashboard-h43f.vercel.app/)**

Experience the full functionality of the Product Management Dashboard deployed on Vercel.

## ✨ Key Features

### 📊 Dashboard & Analytics
- **Interactive Statistics Cards** - Real-time inventory metrics with animated alert indicators
- **Visual Status Indicators** - Color-coded alerts for low stock and out-of-stock items
- **Trend Analysis** - Month-over-month comparisons with directional indicators
- **Live Data Updates** - Real-time status with animated pulse indicators

### 📋 Product Management
- **Product Listing** - Comprehensive table view with advanced sorting capabilities
- **Product Details** - Detailed product pages with comprehensive information display
- **Add Products** - Intuitive form with real-time validation and preview
- **Bulk Operations** - Multi-select functionality for efficient bulk management
- **Status Management** - Active/archived product status with visual indicators

### 🔍 Advanced Search & Filtering
- **Smart Search** - Real-time search across product names, categories, and descriptions
- **Multi-Filter System** - Filter by category, status, and stock levels simultaneously
- **Compact Filter Design** - Space-efficient horizontal layout with intuitive controls
- **Active Filter Management** - Visual filter chips with individual remove options
- **Quick Clear Actions** - One-click filter clearing with smart reset functionality

### 🎨 Modern UI/UX
- **Professional Design** - Clean, modern interface following current design trends
- **Skeleton Loading** - Comprehensive loading states for all major components
- **Responsive Design** - Mobile-first approach with perfect adaptability across devices
- **Smooth Animations** - Micro-interactions and hover effects throughout the interface
- **Accessibility Compliant** - WCAG guidelines with keyboard navigation and screen reader support

### 🛠️ Technical Excellence
- **Type Safety** - 100% TypeScript implementation with strict type checking
- **State Management** - Efficient Zustand store with persistent state
- **Form Validation** - Zod schema validation with React Hook Form integration
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Testing Ready** - Complete testing setup with Vitest and React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zelhajou/product-dashboard.git
   cd product-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   Navigate to `http://localhost:5173` in your browser

## 📋 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production with optimizations
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with TypeScript support
```

### Testing
```bash
npm run test         # Run complete test suite
npm run test:ui      # Run tests with interactive UI
npm run test:coverage # Generate detailed coverage report
npm run test:watch   # Run tests in watch mode for development
```

### Type Checking
```bash
tsc --noEmit        # Type check without building output
```

## 🏗️ Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   │   ├── StatsCard.tsx        # Analytics display cards
│   │   ├── Skeleton.tsx         # Loading state components
│   │   ├── AlertCard.tsx        # Notification components
│   │   ├── EmptyState.tsx       # Empty state handlers
│   │   ├── LoadingSpinner.tsx   # Loading indicators
│   │   └── Breadcrumb.tsx       # Navigation breadcrumbs
│   ├── icons/           # Icon system with Lucide React
│   ├── layout/          # Application layout components
│   │   ├── Layout.tsx           # Main application wrapper
│   │   ├── Header.tsx           # Top navigation bar
│   │   ├── Sidebar.tsx          # Collapsible navigation
│   │   └── ResponsiveContainer.tsx # Responsive content wrapper
│   ├── product/         # Product-specific components
│   │   ├── ProductFilters.tsx   # Advanced filtering system
│   │   ├── ProductForm.tsx      # Product creation/editing
│   │   └── ProductTable.tsx     # Product data table
│   └── ui/              # Base UI components
│       ├── Button.tsx           # Reusable button component
│       ├── Input.tsx            # Form input component
│       ├── Select.tsx           # Dropdown select component
│       ├── Table.tsx            # Table components
│       └── Pagination.tsx       # Pagination controls
├── data/                # Mock data and utilities
│   └── mockData.ts             # Sample product data
├── hooks/               # Custom React hooks
│   ├── useProductList.ts       # Product list management
│   ├── useProductDetails.ts    # Individual product handling
│   ├── useProductForm.ts       # Form state management
│   ├── useProductStats.ts      # Analytics calculations
│   └── useResponsive.ts        # Responsive design utilities
├── pages/               # Application pages
│   ├── products/        # Product-related pages
│   │   ├── ProductList.tsx     # Main product listing
│   │   ├── ProductDetails.tsx  # Individual product view
│   │   └── AddProduct.tsx      # Product creation form
│   └── NotFound.tsx            # 404 error page
├── shared/              # Shared utilities and constants
│   ├── constants.ts            # Application constants
│   └── types.ts               # Shared type definitions
├── store/               # State management
│   └── productStore.ts         # Zustand product store
├── types/               # TypeScript type definitions
│   └── product.ts              # Product-related types
├── utils/               # Utility functions
│   ├── helpers.ts              # General helper functions
│   └── validation.ts           # Validation schemas
└── test/                # Testing utilities
    ├── setup.ts               # Test configuration
    └── utils.ts               # Test helper functions
```

## 🛠️ Technology Stack

### Core Framework
- **React 19.1.0** - Latest React with concurrent features and improved performance
- **TypeScript 5.8.3** - Full type safety with strict configuration
- **Vite 6.3.5** - Lightning-fast build tool with hot module replacement

### Styling & Design
- **Tailwind CSS 4.1.7** - Utility-first CSS framework with JIT compilation
- **Lucide React 0.511.0** - Modern icon library with consistent design
- **Custom Animations** - CSS transitions and transforms for smooth interactions

### State & Forms
- **Zustand 5.0.5** - Lightweight state management with persistence
- **React Hook Form 7.56.4** - Performant forms with minimal re-renders
- **Zod 3.25.20** - Runtime type validation with TypeScript integration

### Routing & Navigation
- **React Router DOM 7.6.0** - Client-side routing with nested routes

### Development & Testing
- **ESLint** - Code linting with TypeScript support
- **Vitest 2.1.9** - Fast unit testing framework
- **React Testing Library 16.3.0** - Component testing utilities
- **JSDOM** - DOM environment for testing

## 📱 Application Pages

### Product Management
| Route | Component | Description | Features |
|-------|-----------|-------------|----------|
| `/` | Redirect | Redirects to products list | Automatic navigation |
| `/products` | ProductList | Main product listing | Filtering, sorting, pagination, bulk actions |
| `/product/:id` | ProductDetails | Individual product view | Detailed information, quick actions, stock alerts |
| `/add-product` | AddProduct | Product creation form | Validation, preview, progress tracking |
| `/not-found` | NotFound | 404 error page | Helpful navigation and recovery options |

### Navigation Features
- **Breadcrumb Navigation** - Clear page hierarchy with clickable links
- **Responsive Sidebar** - Collapsible navigation with statistics
- **Smart Redirects** - Automatic routing and error handling
- **Deep Linking** - Direct access to specific products and pages

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-primary: #3B82F6;     /* Main actions and links */
--blue-secondary: #1E40AF;   /* Hover states and emphasis */

/* Status Colors */
--green-success: #10B981;    /* Success states and positive metrics */
--yellow-warning: #F59E0B;   /* Warnings and low stock alerts */
--red-danger: #EF4444;       /* Errors and critical states */

/* Neutral Colors */
--gray-50: #F9FAFB;          /* Light backgrounds */
--gray-500: #6B7280;         /* Secondary text */
--gray-900: #111827;         /* Primary text */
```

### Typography
- **Headings** - Font weights from 600-700 with clear hierarchy
- **Body Text** - 14px base with 1.5 line height for readability
- **Monospace** - Used for numerical values and IDs
- **Responsive Sizing** - Scales appropriately across device sizes

### Spacing System
- **4px Grid** - All spacing follows 4px increments (4, 8, 12, 16, 24, 32, 48, 64)
- **Consistent Margins** - Standardized gaps between components
- **Responsive Padding** - Adapts to screen size with mobile-first approach

## 🔧 Component Library

### Layout Components
- **Layout** - Main application wrapper with sidebar and header
- **Header** - Top navigation with breadcrumbs and user controls
- **Sidebar** - Collapsible navigation with statistics and menu items
- **ResponsiveContainer** - Flexible content wrapper with breakpoints

### Data Display
- **StatsCard** - Analytics cards with icons, values, and trend indicators
- **ProductTable** - Advanced table with sorting, filtering, and bulk selection
- **EmptyState** - Helpful empty state with actions and illustrations
- **AlertCard** - Notifications and alerts with different severity levels

### Form Components
- **ProductForm** - Complete product creation/editing with validation
- **ProductFilters** - Advanced filtering with search and dropdown controls
- **Button** - Flexible button component with variants and icons
- **Input** - Form input with validation states and helper text
- **Select** - Dropdown component with search and custom options

### Loading States
- **Skeleton System** - Comprehensive loading placeholders
  - `SkeletonCard` - For statistics and card components  
  - `SkeletonTable` - For data tables and lists
  - `SkeletonStats` - For dashboard statistics grid
  - `SkeletonProductDetails` - For detailed product pages
  - `SkeletonFilter` - For filter and search components

## 📊 State Management

### Zustand Store Structure
```typescript
interface ProductStore {
  // Core Data
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null

  // Filtering & Sorting  
  filters: ProductFilters
  sortConfig: SortConfig

  // Core Actions
  loadProducts: () => Promise<void>
  addProduct: (data: ProductFormData) => Promise<void>
  setProducts: (products: Product[]) => void
  
  // Filter Management
  updateFilters: (filters: Partial<ProductFilters>) => void
  updateSort: (config: SortConfig) => void
  clearFilters: () => void
  applyFiltersAndSort: () => void

  // Data Retrieval
  getProductById: (id: number) => Product | undefined
  getProductStats: () => ProductStats
  getLowStockProducts: () => Product[]
  getTopProducts: (limit?: number) => Product[]
}
```

### Custom Hooks
- **useProductList** - Complete product list management with filtering and sorting
- **useProductDetails** - Individual product data handling with loading states
- **useProductForm** - Form state management with validation and submission
- **useProductStats** - Analytics calculations and statistics formatting
- **useResponsive** - Responsive design utilities and breakpoint detection

## 🔍 Advanced Features

### Filtering System
```typescript
interface ProductFilters {
  category: string        // Filter by product category
  status: string         // Filter by active/archived status
  searchTerm: string     // Search across name and category
  stockLevel: string     // Filter by stock level (high/low/out)
}
```

### Search Capabilities
- **Real-time Search** - Instant results as you type
- **Multi-field Search** - Searches across product name, category, and description
- **Search Highlighting** - Visual indication of search terms in results
- **Search History** - Maintains search state across navigation

### Sorting Options
- **Multi-column Sorting** - Sort by name, price, stock, category
- **Sort Direction** - Ascending and descending order with visual indicators
- **Persistent Sorting** - Maintains sort preferences across sessions
- **Smart Sorting** - Intelligent sorting for different data types

### Stock Management
```typescript
// Stock Level Categorization
enum StockLevel {
  HIGH = "high",      // > 20 units
  LOW = "low",        // 1-10 units  
  OUT = "out"         // 0 units
}
```

## 🧪 Testing Strategy

### Test Coverage
- **Unit Tests** - Individual component and function testing
- **Integration Tests** - Component interaction and data flow testing
- **Accessibility Tests** - Screen reader and keyboard navigation testing
- **Visual Regression** - UI consistency and design system compliance

### Testing Utilities
```typescript
// Mock Data Generation
export const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: "Test Product",
  price: 99.99,
  stock: 10,
  category: "Electronics", 
  status: "active",
  ...overrides,
});
```

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets and large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile Optimizations
- **Touch Targets** - Minimum 44px touch areas for mobile interactions
- **Responsive Tables** - Tables adapt to smaller screens with horizontal scrolling
- **Collapsible Navigation** - Sidebar converts to overlay on mobile devices
- **Optimized Forms** - Form layouts stack vertically on small screens

### Tablet & Desktop
- **Multi-column Layouts** - Efficient use of larger screen real estate
- **Hover Interactions** - Enhanced hover states for desktop users
- **Keyboard Navigation** - Full keyboard accessibility for power users
- **Multi-tasking Support** - Optimized for side-by-side window usage

## 🚀 Performance Optimizations

### Loading Performance
- **Code Splitting** - Route-based lazy loading ready for implementation  
- **Tree Shaking** - Unused code elimination in production builds
- **Asset Optimization** - Minified CSS and JavaScript bundles
- **Skeleton Loading** - Perceived performance improvement with loading placeholders

### Runtime Performance  
- **Efficient Rendering** - Strategic use of React.memo and useMemo
- **State Optimization** - Zustand with selective subscriptions
- **Animation Performance** - CSS transforms with GPU acceleration
- **Memory Management** - Proper cleanup of event listeners and subscriptions

### Bundle Analysis
```bash
# Analyze bundle size and composition
npm run build
npm run preview
```

## 🔒 Data Validation

### Product Schema
```typescript
const productSchema = z.object({
  name: z.string()
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_&.()]+$/, "Invalid characters"),
    
  price: z.number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price too high")
    .refine(val => Number((val * 100).toFixed(0)) / 100 === val, 
            "Maximum 2 decimal places"),
            
  stock: z.number()
    .int("Must be whole number")
    .min(0, "Cannot be negative")
    .max(999999, "Stock limit exceeded"),
    
  category: z.string()
    .min(1, "Category required")
    .max(50, "Category name too long"),
    
  status: z.enum(["active", "archived"])
});
```

### Form Validation Features
- **Real-time Validation** - Immediate feedback as user types
- **Error Messages** - Clear, actionable error descriptions
- **Success States** - Visual confirmation of valid inputs
- **Accessibility** - ARIA labels and screen reader support

## 🌐 Deployment

### Production Build
```bash
npm run build        # Create optimized production build
npm run preview      # Test production build locally
```

### Vercel Deployment
- **Automatic Builds** - Triggered by Git pushes to main branch
- **SPA Configuration** - Proper routing setup for single-page application
- **Environment Variables** - Support for different deployment environments
- **Performance Monitoring** - Built-in analytics and performance tracking

## 🔧 Configuration Files

### TypeScript Configuration
- **Strict Mode** - Enabled for maximum type safety
- **Path Mapping** - Clean imports with `@/` aliases
- **Modern Target** - ES2020 for modern JavaScript features
- **Build Optimization** - Optimized for both development and production

### ESLint Configuration
- **TypeScript Support** - Full TypeScript linting integration
- **React Rules** - React-specific linting rules and best practices
- **Custom Rules** - Project-specific linting configurations
- **Auto-fixing** - Automatic code formatting and error correction

### Tailwind Configuration
- **Design System** - Custom colors, spacing, and typography scales
- **Responsive Design** - Mobile-first breakpoint system
- **Component Classes** - Reusable component-level styling
- **Production Optimization** - Automatic unused CSS elimination
