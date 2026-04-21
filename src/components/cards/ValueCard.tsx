import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { CompanyValue } from '@/types';

interface ValueCardProps {
  value: CompanyValue;
  className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({ value, className = '' }) => {
  return (
    <Card className={`text-center p-6 hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="pt-6">
        <div className="text-3xl mb-4" aria-hidden="true">
          {value.icon}
        </div>
        <h4 className="card-title text-lg md:text-xl mb-3">
          {value.title}
        </h4>
        <p className="card-content text-sm md:text-base">
          {value.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ValueCard;
