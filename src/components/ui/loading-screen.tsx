import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingScreen({ 
  message = "جاري التحميل...", 
  size = 'md',
  className 
}: LoadingScreenProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[200px] space-y-4",
      className
    )}>
      <div className="relative">
        <Loader2 className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )} />
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
      </div>
      
      {message && (
        <p className="text-muted-foreground text-center animate-fade-in">
          {message}
        </p>
      )}
      
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function FullScreenLoader({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingScreen message={message} size="lg" />
    </div>
  );
}