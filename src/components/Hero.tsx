
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown, Phone, Building2 } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="القسم الرئيسي">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2370&auto=format&fit=crop')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-bl from-construction-dark/95 via-construction-primary/90 to-construction-secondary/85" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-construction-accent/5 rounded-full blur-3xl z-[2]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-construction-accent/8 rounded-full blur-3xl z-[2]" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-construction-accent/15 border border-construction-accent/30 text-construction-accent px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Building2 className="w-4 h-4" />
            <span>خبرة أكثر من 20 عامًا في المقاولات والتشطيبات</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            نبني <span className="text-construction-accent">مستقبلك</span>
            <br />
            بجودة لا تُضاهى
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            العزب للمقاولات والتشطيبات — نقدم خدمات متكاملة في البناء والتشييد والتشطيبات الراقية بأعلى معايير الجودة والاحترافية
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Button 
              className="bg-construction-accent hover:bg-construction-accent/90 text-construction-dark font-bold text-base px-8 py-6 rounded-xl shadow-lg shadow-construction-accent/25 transition-all hover:shadow-xl hover:shadow-construction-accent/30 hover:-translate-y-0.5"
              asChild
            >
              <Link to="/contact">
                <Phone className="w-5 h-5 ml-2" />
                تواصل معنا
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 text-base px-8 py-6 rounded-xl transition-all hover:-translate-y-0.5"
              asChild
            >
              <Link to="/projects-gallery">
                عرض المشاريع
              </Link>
            </Button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "+300", label: "مشروع منجز" },
              { value: "+20", label: "سنة خبرة" },
              { value: "+150", label: "عميل سعيد" },
              { value: "+50", label: "عامل محترف" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-construction-accent mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Down Arrow */}
      <a 
        href="#services" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white animate-bounce transition-colors z-10"
        aria-label="انتقل للأسفل"
      >
        <ArrowDown className="w-8 h-8" />
      </a>
    </section>
  );
};

export default Hero;
