import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Paintbrush, Sofa, CheckCircle, Star, Ruler, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LuxuryFinishingPage: React.FC = () => {
  const services = [
    {
      icon: Paintbrush,
      title: "الدهانات والديكورات",
      description: "دهانات فاخرة وديكورات جبسية وجدران ثلاثية الأبعاد بأحدث التصاميم"
    },
    {
      icon: Ruler,
      title: "الأرضيات والتكسيات",
      description: "سيراميك، رخام، بورسلين، باركيه بأرقى الخامات العالمية"
    },
    {
      icon: Lightbulb,
      title: "الكهرباء والإضاءة",
      description: "تأسيس كهربائي متكامل مع أنظمة إضاءة ذكية وحديثة"
    },
    {
      icon: Sofa,
      title: "النجارة والأثاث",
      description: "غرف نوم، مطابخ، دريسنج روم بتصاميم عصرية مخصصة"
    }
  ];

  const unitTypes = [
    { name: "شقق سكنية", description: "تشطيب كامل للشقق بجميع المساحات" },
    { name: "فلل", description: "تشطيب فلل مستقلة وتاون هاوس" },
    { name: "دوبلكس", description: "تشطيب وحدات دوبلكس وتربلكس" },
    { name: "بنتهاوس", description: "تشطيب فاخر للوحدات العلوية" },
    { name: "استوديوهات", description: "تصميم وتشطيب ذكي للمساحات الصغيرة" },
    { name: "شاليهات", description: "تشطيب وحدات الساحل والمصايف" }
  ];

  const finishingLevels = [
    {
      level: "تشطيب سوبر لوكس",
      features: ["دهانات فاخرة", "سيراميك درجة أولى", "أدوات صحية إيطالي", "نجارة خشب طبيعي"],
      color: "bg-amber-100 border-amber-300"
    },
    {
      level: "تشطيب هاي لوكس",
      features: ["دهانات بلاستيك فاخر", "بورسلين إسباني", "أدوات صحية أوروبية", "نجارة MDF فاخر"],
      color: "bg-amber-50 border-amber-200"
    },
    {
      level: "تشطيب لوكس",
      features: ["دهانات عالية الجودة", "سيراميك محلي ممتاز", "أدوات صحية جيدة", "نجارة MDF"],
      color: "bg-gray-50 border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Home className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              تشطيب راقي
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              نحول وحدتك السكنية إلى تحفة معمارية بأيدي أمهر الحرفيين وأجود الخامات
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 rounded-full px-8"
            >
              <Link to="/contact">
                احصل على عرض سعر
                <ArrowRight className="mr-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Unit Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              أنواع الوحدات التي نشطبها
            </h2>
            <p className="text-lg text-gray-600">
              خبرة واسعة في تشطيب جميع أنواع الوحدات السكنية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {unit.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {unit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              أعمال التشطيب
            </h2>
            <p className="text-lg text-gray-600">
              نقدم حلول تشطيب متكاملة تشمل جميع التخصصات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Finishing Levels Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مستويات التشطيب
            </h2>
            <p className="text-lg text-gray-600">
              اختر مستوى التشطيب الذي يناسب ذوقك وميزانيتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {finishingLevels.map((level, index) => (
              <Card key={index} className={`border-2 ${level.color} text-center`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-amber-800">
                    {level.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-right">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خطوات العمل
            </h2>
            <p className="text-lg text-gray-600">
              منهجية عمل مدروسة لضمان أفضل النتائج
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "المعاينة", desc: "زيارة الموقع وأخذ المقاسات" },
              { num: "2", title: "التصميم", desc: "عرض التصميمات والخامات" },
              { num: "3", title: "التنفيذ", desc: "تنفيذ الأعمال بإشراف هندسي" },
              { num: "4", title: "التسليم", desc: "مراجعة شاملة وتسليم المفتاح" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            جاهز لتشطيب وحدتك؟
          </h2>
          <p className="text-xl mb-8">
            تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 rounded-full"
            >
              <Link to="/contact">
                تواصل معنا
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600 rounded-full"
            >
              <Link to="/projects">
                شاهد أعمالنا
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LuxuryFinishingPage;
