import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  skeleton?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  fallback,
  skeleton = true,
  className,
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        className
      )}>
        {fallback ? (
          <img src={fallback} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-8 h-8" />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && skeleton && (
        <div className={cn(
          "absolute inset-0 bg-muted animate-pulse",
          className
        )} />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
}