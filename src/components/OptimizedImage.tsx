import React, { useState } from 'react';
import { useLazyLoad } from '@/hooks';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });

  const shouldLoad = priority || isVisible;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {/* Placeholder Image */}
      {!isLoaded && shouldLoad && (
        <img
          src={placeholder}
          alt="placeholder"
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
