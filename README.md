# Product Management Dashboard

A modern, responsive product management dashboard built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing product inventory with powerful filtering, sorting, and analytics capabilities.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.7-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## 🚀 Live Preview

**[View Live Demo](https://product-dashboard-h43f.vercel.app/)**

Experience the full functionality of the Product Management Dashboard with the live preview deployed on Vercel.

## 🌟 Features

### Core Functionality
- **Product List Management**: View all products in a responsive table with sorting and filtering
- **Product Details**: Comprehensive product detail pages with full information display
- **Add New Products**: Form-based product creation with validation
- **Advanced Filtering**: Filter by category, status, stock level, and search by name
- **Smart Sorting**: Sort by price, stock, name, and category
- **Real-time Search**: Instant search results as you type
- **Bulk Operations**: Select multiple products for bulk actions

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Professional loading indicators and skeleton screens
- **Error Handling**: Comprehensive error states and user feedback
- **Interactive Dashboard**: Statistics cards and quick action buttons
- **Collapsible Sidebar**: Expandable/collapsible navigation with tooltips

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for efficient global state management
- **Form Validation**: Zod schema validation with React Hook Form
- **Routing**: React Router with protected routes and navigation
- **Icons**: Lucide React icon system
- **Testing**: Vitest with React Testing Library
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run test:watch   # Run tests in watch mode

# Type Checking
tsc --noEmit        # Type check without building
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (alerts, cards, loading, etc.)
│   ├── icons/           # Icon system and exports
│   ├── layout/          # Layout components (header, sidebar, containers)
│   ├── product/         # Product-specific components
│   └── ui/              # Base UI components (buttons, inputs, tables)
├── data/                # Mock data and API utilities
├── hooks/               # Custom React hooks
├── pages/               # Page components and routing
│   └── products/        # Product-related pages
├── shared/              # Shared utilities and constants
├── store/               # Zustand state management
├── test/                # Test utilities and setup
├── types/               # TypeScript type definitions
└── utils/               # Helper functions and utilities
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type safety and developer experience
- **Vite 6.3.5** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **Lucide React 0.511.0** - Beautiful, customizable icons

### State Management & Forms
- **Zustand 5.0.5** - Lightweight state management
- **React Hook Form 7.56.4** - Performant forms with validation
- **Zod 3.25.20** - Schema validation library

### Routing & Navigation
- **React Router DOM 7.6.0** - Declarative routing for React

### Development & Testing
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Testing utilities for React
- **Vite Plugins** - Development and build optimizations

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | ProductList | Redirects to products list |
| `/products` | ProductList | Main product listing page |
| `/product/:id` | ProductDetails | Individual product details |
| `/add-product` | AddProduct | Add new product form |
| `/not-found` | NotFound | 404 error page |
| `*` | NotFound | Catch-all for unknown routes |

## 🎯 Component Architecture

### Layout Components
- **Layout**: Main application layout wrapper with sidebar
- **Header**: Top navigation with breadcrumbs and user menu
- **Sidebar**: Collapsible navigation sidebar with statistics
- **ResponsiveContainer**: Responsive content wrapper
- **PageContainer**: Page layout with header and breadcrumbs

### Product Components
- **ProductTable**: Sortable, filterable product table with bulk actions
- **ProductFilters**: Advanced filtering interface with stock level filters
- **ProductForm**: Add/edit product form with validation and preview

### UI Components
- **Button**: Versatile button component with variants and icons
- **Input**: Form input with validation states and icons
- **Select**: Dropdown select component with validation
- **Table**: Accessible table components with sorting
- **Pagination**: Page navigation component

### Common Components
- **StatsCard**: Dashboard statistics cards with click actions
- **AlertCard**: User notifications and alerts with actions
- **EmptyState**: No-data state handler with actions
- **LoadingSpinner**: Loading indicators with messages
- **Breadcrumb**: Navigation breadcrumb component

## 🔧 Configuration

### TypeScript Configuration
The project uses strict TypeScript configuration with:
- Path mapping for clean imports (`@/components`, `@/types`, etc.)
- Strict type checking enabled
- ES2020 target for modern JavaScript features

### Tailwind CSS
Custom Tailwind configuration with:
- Design system colors and spacing
- Responsive breakpoints
- Custom component classes
- Utility-first approach

### Vite Configuration
Optimized Vite setup with:
- Path aliases matching TypeScript configuration
- React plugin for Fast Refresh
- Tailwind CSS plugin for styling
- Optimized build settings

## 📊 State Management

### Zustand Store Structure
```typescript
interface ProductStore {
  // State
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  error: string | null
  filters: ProductFilters
  sortConfig: SortConfig
  lastUpdated: Date | null

  // Actions
  loadProducts: () => Promise<void>
  addProduct: (data: ProductFormData) => Promise<void>
  updateFilters: (filters: Partial<ProductFilters>) => void
  updateSort: (config: SortConfig) => void
  clearFilters: () => void
  
  // Analytics
  getProductStats: () => ProductStats
  getLowStockProducts: () => Product[]
  getTopProducts: (limit?: number) => Product[]
}
```

### Custom Hooks
- **useProductList**: Complete product list management with filtering
- **useProductDetails**: Individual product data handling with loading states
- **useProductForm**: Form state and submission logic
- **useProductStats**: Analytics and statistics calculations
- **useResponsive**: Responsive design utilities
- **useSidebar**: Sidebar state management

## 🧪 Testing

### Testing Setup
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Additional Jest matchers
- **jsdom**: DOM environment for testing

### Test Coverage
- Minimum 80% coverage thresholds
- Automated coverage reporting
- Test utilities for mock data creation

### Running Tests
```bash
npm run test           # Run all tests
npm run test:ui        # Run tests with visual UI
npm run test:coverage  # Generate coverage report
npm run test:watch     # Run tests in watch mode
```

## ✅ Feature Implementation Status

### Core Features (100% Complete)
- ✅ **Product List Page** (`/products`)
  - Table format display with all product information
  - Filter by category, status, and stock level
  - Search by product name
  - Sort by price, stock, name, and category
  - Bulk selection and operations
  - Click navigation to product details

- ✅ **Product Details Page** (`/product/:id`)
  - Complete product information display
  - Stock status indicators and alerts
  - Quick action buttons
  - 404 handling for non-existent products
  - Return to product list functionality

- ✅ **Add Product Page** (`/add-product`)
  - Complete form with all required fields
  - Real-time validation with error messages
  - Product preview sidebar
  - Form completion progress indicator
  - Comprehensive validation:
    - Name is required (2-100 characters)
    - Price must be greater than 0
    - Stock must be non-negative integer
    - Category is required
    - Status must be 'active' or 'archived'

- ✅ **Routing System**
  - All required routes implemented
  - Proper redirects (`/` → `/products`)
  - 404 page for unknown routes
  - React Router DOM integration

### Technical Requirements (100% Complete)
- ✅ **React + TypeScript**: Latest versions with strict typing
- ✅ **Modular Architecture**: Clean, reusable component structure
- ✅ **Mock API Simulation**: `setTimeout` and `Promise.resolve()` usage
- ✅ **Local Data Storage**: Zustand with persistence

### Advanced Features (100% Complete)
- ✅ **Tailwind CSS Styling**: Modern, responsive design
- ✅ **Zustand State Management**: Efficient global state with persistence
- ✅ **React Hook Form + Zod**: Professional form handling and validation
- ✅ **Loading States**: Comprehensive loading indicators and skeleton screens
- ✅ **Error Handling**: User-friendly error states and recovery
- ✅ **Responsive Design**: Mobile-first approach with breakpoint utilities
- ✅ **Advanced Filtering**: Multiple filter combinations including stock levels
- ✅ **Analytics Dashboard**: Statistics cards with interactive elements
- ✅ **Testing Suite**: Comprehensive test setup with utilities

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for main actions and navigation
- **Secondary**: Gray shades for neutral elements
- **Success**: Green for positive actions and status
- **Warning**: Yellow for cautions and low stock alerts
- **Error**: Red for errors and critical states

### Typography
- **Headings**: Bold, hierarchical sizing with proper contrast
- **Body Text**: Readable, accessible contrast ratios
- **Monospace**: Used for numerical values and IDs

### Components
- **Cards**: Elevated surfaces with consistent shadows
- **Buttons**: Multiple variants with consistent sizing and icons
- **Forms**: Clear labels with comprehensive validation states
- **Tables**: Responsive design with sorting indicators
- **Icons**: Consistent icon system from Lucide React

## 🔒 Data Validation

### Product Schema
```typescript
{
  name: string (2-100 chars, required, alphanumeric + basic symbols)
  price: number (>0, max $999,999.99, 2 decimal places)
  stock: number (>=0, integer, max 999,999)
  category: string (required, max 50 chars)
  status: 'active' | 'archived' (required)
}
```

### Form Validation Features
- Real-time validation feedback
- Comprehensive error message display
- Prevention of invalid submissions
- Success state indicators
- Input sanitization and formatting

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **State Management**: Efficient Zustand selectors prevent unnecessary re-renders
- **Form Optimization**: React Hook Form reduces re-renders
- **Memoization**: Strategic use of React.memo for expensive components
- **Optimized Builds**: Vite's fast bundling and tree-shaking
- **Image Optimization**: Prepared for future image upload features

## 🌐 Deployment

The application is configured for deployment on Vercel with:
- Automatic builds from Git repository
- SPA routing configuration
- Environment variable support
- Optimized build output
