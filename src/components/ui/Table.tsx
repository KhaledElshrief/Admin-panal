import React from 'react';
import { motion } from 'framer-motion';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  className?: string;
  rowKey?: string | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  hoverable?: boolean;
  striped?: boolean;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyText = 'لا توجد بيانات',
  className = '',
  rowKey = 'id',
  onRowClick,
  hoverable = true,
  striped = false,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index.toString();
  };

  const getCellValue = (record: T, column: TableColumn<T>) => {
    const keys = column.key.split('.');
    let value = record;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value;
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    const value = getCellValue(record, column);
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return value;
  };

  const getTextAlign = (align?: string) => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
      default:
        return 'text-right';
    }
  };

  if (loading) {
    return (
      <div className={`bg-dark-300 rounded-xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-dark-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-dark-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-dark-300 rounded-xl overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-200 bg-dark-200/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-4 px-4 font-medium text-gray-300 ${getTextAlign(column.align)}`}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2 justify-end">
                    {column.title}
                    {column.sortable && (
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-gray-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <motion.tr
                  key={getRowKey(record, index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    border-b border-dark-200 transition-colors
                    ${hoverable ? 'hover:bg-dark-200/50 cursor-pointer' : ''}
                    ${striped && index % 2 === 1 ? 'bg-dark-200/20' : ''}
                  `}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-4 ${getTextAlign(column.align)}`}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;