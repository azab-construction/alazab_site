
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, PenTool, Wrench, ClipboardList, Paintbrush, FolderKanban } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "مقاولات عامة",
    description: "نقدم خدمات شاملة في البناء والتشييد من الأساس حتى التسليم النهائي بأعلى معايير الجودة."
  },
  {
    icon: PenTool,
    title: "تصميم معماري",
    description: "فريق متخصص من المهندسين المعماريين لتصميم مشروعك بالشكل الذي تتخيله."
  },
  {
    icon: Wrench,
    title: "صيانة وترميم",
    description: "خدمات صيانة دورية وترميم للمباني القديمة مع الحفاظ على الطابع الأصلي."
  },
  {
    icon: ClipboardList,
    title: "استشارات هندسية",
    description: "نقدم استشارات هندسية متكاملة لمساعدتك في اتخاذ القرارات المناسبة لمشروعك."
  },
  {
    icon: Paintbrush,
    title: "تشطيبات داخلية",
    description: "تشطيبات عالية الجودة للمنازل والمكاتب والمحلات التجارية بأحدث التصاميم."
  },
  {
    icon: FolderKanban,
    title: "إدارة المشاريع",
    description: "إدارة مشروعك من البداية حتى النهاية مع متابعة دقيقة لكل مرحلة من مراحل البناء."
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-construction-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-construction-primary/10 text-construction-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-construction-primary mb-4">خدماتنا الهندسية</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">نقدم مجموعة متكاملة من الخدمات الهندسية والإنشائية</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader className="text-center">
                  <div className="w-14 h-14 bg-construction-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-construction-primary group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-construction-primary group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-bold text-construction-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
