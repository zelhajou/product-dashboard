import { type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';

// Root Table component
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table 
          className={`w-full divide-y divide-gray-200 ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

// Table Header component
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
}

// Table Body component
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-gray-200 bg-white ${className}`}>
      {children}
    </tbody>
  );
}

// Table Row component
interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export function TableRow({ children, className = '', onClick, isClickable, ...props }: TableRowProps) {
  const rowClasses = `
    ${isClickable || onClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
    ${className}
  `.trim();

  return (
    <tr 
      className={rowClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
}

// Table Header Cell component
interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export function TableHeaderCell({ 
  children, 
  sortable, 
  sortDirection, 
  onSort,
  className = '',
  ...props 
}: TableHeaderCellProps) {
  const cellClasses = `
    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
    ${sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}
    ${className}
  `.trim();

  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  return (
    <th 
      className={cellClasses}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <div className="flex flex-col">
            <svg 
              className={`w-3 h-3 ${sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <svg 
              className={`w-3 h-3 -mt-1 ${sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </th>
  );
}

// Table Cell component
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableCell({ children, className = '', ...props }: TableCellProps) {
  return (
    <td 
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

// Export types
export type { 
  TableProps, 
  TableHeaderProps, 
  TableBodyProps, 
  TableRowProps, 
  TableHeaderCellProps, 
  TableCellProps 
};