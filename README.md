# Product Management Dashboard

A modern, responsive product management dashboard built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing product inventory with powerful filtering, sorting, and analytics capabilities.

![ProductHub Dashboard](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.7-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## 🌟 Features

### Core Functionality
- **Product List Management**: View all products in a responsive table with sorting and filtering
- **Product Details**: Comprehensive product detail pages with full information display
- **Add New Products**: Form-based product creation with validation
- **Advanced Filtering**: Filter by category, status, and search by name
- **Smart Sorting**: Sort by price, stock, name, and category
- **Real-time Search**: Instant search results as you type

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Professional loading indicators and skeleton screens
- **Error Handling**: Comprehensive error states and user feedback
- **Toast Notifications**: Success and error messages for user actions

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for efficient global state management
- **Form Validation**: Zod schema validation with React Hook Form
- **Routing**: React Router with protected routes and navigation
- **Icons**: Lucide React icon system
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

# Type Checking
tsc --noEmit        # Type check without building
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (alerts, cards, etc.)
│   ├── icons/           # Icon system and exports
│   ├── layout/          # Layout components (header, sidebar)
│   ├── product/         # Product-specific components
│   └── ui/              # Base UI components (buttons, inputs)
├── data/                # Mock data and API utilities
├── hooks/               # Custom React hooks
├── pages/               # Page components and routing
│   └── products/        # Product-related pages
├── shared/              # Shared utilities and constants
├── store/               # Zustand state management
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

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
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
- **Layout**: Main application layout wrapper
- **Header**: Top navigation with search and user menu
- **Sidebar**: Navigation sidebar with statistics
- **ResponsiveContainer**: Responsive content wrapper

### Product Components
- **ProductTable**: Sortable, filterable product table
- **ProductCard**: Card view for individual products
- **ProductForm**: Add/edit product form with validation
- **ProductFilters**: Advanced filtering interface

### UI Components
- **Button**: Versatile button component with variants
- **Input**: Form input with validation states
- **Select**: Dropdown select component
- **Table**: Accessible table components
- **LoadingScreen**: Full-screen loading state

### Common Components
- **StatsCard**: Dashboard statistics cards
- **AlertCard**: User notifications and alerts
- **EmptyState**: No-data state handler
- **LoadingSpinner**: Loading indicators

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
- Dark mode support ready

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

  // Actions
  loadProducts: () => Promise<void>
  addProduct: (data: ProductFormData) => Promise<void>
  updateFilters: (filters: Partial<ProductFilters>) => void
  updateSort: (config: SortConfig) => void
  
  // Analytics
  getProductStats: () => ProductStats
  getLowStockProducts: () => Product[]
}
```

### Custom Hooks
- **useProductList**: Complete product list management
- **useProductDetails**: Individual product data handling  
- **useProductForm**: Form state and submission logic
- **useProductStats**: Analytics and statistics
- **useResponsive**: Responsive design utilities

## 🧪 Testing Requirements Compliance

### ✅ Feature Implementation Status

#### Required Features (100% Complete)
- ✅ **Product List Page** (`/products`)
  - Table format display with all product information
  - Filter by category and status
  - Search by product name
  - Sort by price and stock
  - Click navigation to product details

- ✅ **Product Details Page** (`/product/:id`)
  - Complete product information display
  - 404 handling for non-existent products
  - Return to product list functionality

- ✅ **Add Product Page** (`/add-product`)
  - Complete form with all required fields
  - Comprehensive validation:
    - Name is required (2-100 characters)
    - Price must be greater than 0
    - Stock must be non-negative integer
    - Category is required
    - Status must be 'active' or 'archived'
  - Local storage simulation
  - Success feedback and redirection

- ✅ **Routing System**
  - All required routes implemented
  - Proper redirects (`/` → `/products`)
  - 404 page for unknown routes
  - React Router DOM integration

#### Technical Requirements (100% Complete)
- ✅ **React + TypeScript**: Latest versions with strict typing
- ✅ **Modular Architecture**: Clean, reusable component structure
- ✅ **Mock API Simulation**: `setTimeout` and `Promise.resolve()` usage
- ✅ **Local Data Storage**: JSON array as database simulation

#### Bonus Features (100% Complete)
- ✅ **Tailwind CSS Styling**: Modern, responsive design
- ✅ **Zustand State Management**: Efficient global state
- ✅ **React Hook Form + Zod**: Professional form handling
- ✅ **Loading States**: Comprehensive loading indicators
- ✅ **Error Handling**: User-friendly error states
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Advanced Filtering**: Multiple filter combinations
- ✅ **Analytics Dashboard**: Statistics and insights

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for main actions
- **Secondary**: Gray shades for neutral elements
- **Success**: Green for positive actions
- **Warning**: Yellow for cautions
- **Error**: Red for errors and alerts

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Readable, accessible contrast
- **Code**: Monospace for technical content

### Components
- **Cards**: Elevated surfaces with shadows
- **Buttons**: Multiple variants with consistent sizing
- **Forms**: Clear labels with validation states
- **Tables**: Responsive with sorting indicators

## 🔒 Data Validation

### Product Schema
```typescript
{
  name: string (2-100 chars, required)
  price: number (>0, max $999,999.99)
  stock: number (>=0, integer, max 999,999)
  category: string (required, max 50 chars)
  status: 'active' | 'archived' (required)
}
```

### Form Validation
- Real-time validation feedback
- Error message display
- Prevention of invalid submissions
- Success state indicators

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Efficient State**: Zustand selectors prevent unnecessary re-renders
- **Optimized Builds**: Vite's fast bundling and tree-shaking
