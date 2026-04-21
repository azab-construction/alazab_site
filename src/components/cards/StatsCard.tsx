import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  number: string;
  label: string;
  variant?: 'default' | 'hero' | 'achievement';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  number, 
  label, 
  variant = 'default',
  className = '' 
}) => {
  // Hero variant with glass effect
  if (variant === 'hero') {
    return (
      <div className={`text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg ${className}`}>
        <div className="text-2xl md:text-3xl font-bold text-construction-accent">
          {number}
        </div>
        <div className="text-sm md:text-base text-white mt-2">
          {label}
        </div>
      </div>
    );
  }

  // Achievement variant
  if (variant === 'achievement') {
    return (
      <Card className={`text-center p-6 hover:shadow-lg transition-shadow ${className}`}>
        <CardContent className="pt-6">
          <div className="text-2xl md:text-3xl font-bold text-construction-primary mb-2">
            {number}
          </div>
          <div className="text-sm md:text-base text-gray-600 font-medium">
            {label}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`text-center p-6 hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="pt-6">
        <div className="text-2xl md:text-3xl font-bold text-construction-primary mb-2">
          {number}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium">
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
