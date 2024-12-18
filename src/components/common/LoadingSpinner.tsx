import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'medium', fullScreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const spinner = (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}