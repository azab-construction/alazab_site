
import React from 'react';
import { ServiceCard } from '@/components/cards';
import { SERVICES } from '@/constants/data';

const Services: React.FC = () => {
  return (
    <section id="services" className="section bg-construction-light">
      <div className="container mx-auto">
        <h2 className="section-title">خدماتنا</h2>
        <p className="section-subtitle">نقدم مجموعة متكاملة من الخدمات الهندسية والإنشائية</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
