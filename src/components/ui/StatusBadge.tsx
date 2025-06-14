import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  size = 'md' 
}) => {
  const getVariantClasses = () => {
    const variants = {
      success: 'bg-success-600/20 text-success-400',
      warning: 'bg-warning-600/20 text-warning-400',
      error: 'bg-error-600/20 text-error-400',
      info: 'bg-primary-600/20 text-primary-400',
      default: 'bg-gray-600/20 text-gray-400',
    };
    
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };
    
    return sizes[size];
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${getVariantClasses()}
      ${getSizeClasses()}
    `}>
      {status}
    </span>
  );
};

export default StatusBadge;