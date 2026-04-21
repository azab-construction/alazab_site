import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  className?: string;
  type?: 'card' | 'text' | 'image';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  height = '200px',
  className = '',
  type = 'card',
}) => {
  const renderSkeleton = (index: number) => {
    switch (type) {
      case 'card':
        return (
          <div
            key={index}
            className={`bg-gray-200 animate-pulse rounded-lg overflow-hidden ${className}`}
            style={{ height }}
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        );
      case 'image':
        return (
          <div
            key={index}
            className={`bg-gray-200 animate-pulse rounded-lg ${className}`}
            style={{ height }}
          ></div>
        );
      case 'text':
      default:
        return (
          <div key={index} className={`space-y-3 ${className}`}>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded animate-pulse w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded animate-pulse w-4/6"></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </>
  );
};

export default SkeletonLoader;
