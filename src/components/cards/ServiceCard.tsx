import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardHeader className="text-center">
        <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
        <CardTitle className="card-title text-lg md:text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="card-content text-sm md:text-base">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
