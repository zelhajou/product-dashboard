export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface SortParams<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}
