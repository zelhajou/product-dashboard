// src/components/icons/index.ts

import {
  // Navigation & Actions
  Plus,
  Search,
  Filter,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Home,

  // Product & Business
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,

  // UI Elements
  Eye,
  Edit,
  Trash2,
  Settings,
  MoreHorizontal,
  Save,
  RotateCcw,
  Copy,

  // Status & Indicators
  Check,
  Info,
  Zap,
  Clock,
  Calendar,
  Star,

  // Data & Analytics
  BarChart3,
  PieChart,
  Activity,

  // Media & Files
  Image,
  Upload,
  Download,

  // Communication
  MessageCircle,
  Mail,

  // System
  Menu,
  User,
  LogOut,
  Loader2,
} from "lucide-react";

// Export with consistent naming convention
export const Icons = {
  // Navigation & Actions
  add: Plus,
  search: Search,
  filter: Filter,
  close: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  back: ArrowLeft,
  home: Home,

  // Product & Business
  product: Package,
  cart: ShoppingCart,
  dollar: DollarSign,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,// src/components/common/StatsCard.tsx

  failed: XCircle,

  // UI Elements
  view: Eye,
  edit: Edit,
  delete: Trash2,
  settings: Settings,
  more: MoreHorizontal,
  save: Save,
  reset: RotateCcw,
  copy: Copy,

  // Status & Indicators
  check: Check,
  info: Info,
  zap: Zap,
  clock: Clock,
  calendar: Calendar,
  star: Star,

  // Data & Analytics
  barChart: BarChart3,
  pieChart: PieChart,
  activity: Activity,

  // Media & Files
  image: Image,
  upload: Upload,
  download: Download,

  // Communication
  message: MessageCircle,
  mail: Mail,

  // System
  menu: Menu,
  user: User,
  logout: LogOut,
  loading: Loader2,
} as const;

// Export individual icons for direct use if needed
export {
  Plus,
  Search,
  Filter,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Home,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Settings,
  MoreHorizontal,
  Save,
  RotateCcw,
  Copy,
  Check,
  Info,
  Zap,
  Clock,
  Calendar,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Image,
  Upload,
  Download,
  MessageCircle,
  Mail,
  Menu,
  User,
  LogOut,
  Loader2,
};

// Type for icon props (useful for components that accept icons)
export type IconProps = {
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
};

// Type for icon names (useful for type-safe icon selection)
export type IconName = keyof typeof Icons;
