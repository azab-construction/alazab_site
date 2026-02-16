import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Hammer, Palette, Home, ArrowLeft } from "lucide-react";

const premiumServices = [
  {
    id: "luxury-finishing",
    icon: Home,
    title: "تشطيب راقي",
    description: "تشطيب الوحدات السكنية بأعلى معايير الجودة والفخامة — شقق، فلل، دوبلكس",
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    route: "/services/luxury-finishing"
  },
  {
    id: "brand-identity",
    icon: Palette,
    title: "هوية العلامة التجارية",
    description: "تجهيز المحلات التجارية والمكاتب الإدارية بهوية بصرية مميزة واحترافية",
    gradient: "from-purple-500 to-indigo-600",
    bgLight: "bg-purple-50",
    route: "/services/brand-identity"
  },
  {
    id: "uber-fix",
    icon: Hammer,
    title: "أوبر فيكس",
    description: "خدمات الصيانة والتجديدات المعمارية الاحترافية بأحدث الأساليب",
    gradient: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    route: "/services/uber-fix"
  },
  {
    id: "general-supplies",
    icon: Truck,
    title: "التوريدات العمومية",
    description: "توريد جميع أنواع الخامات المعمارية بأفضل الأسعار والجودة",
    gradient: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
    route: "/services/general-supplies"
  },
];

const PremiumServices: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-construction-accent/15 text-construction-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ما نقدمه
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-construction-primary mb-4">
            خدماتنا المتميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            حلول متكاملة مصممة لتلبية جميع احتياجاتك في البناء والتشطيب
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white overflow-hidden">
                <CardHeader className="text-center pb-4 pt-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mx-auto mb-5 flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-construction-primary mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white rounded-xl transition-all duration-300 group-hover:bg-construction-primary group-hover:text-white"
                  >
                    <Link to={service.route} className="flex items-center gap-2">
                      اعرف أكثر
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;