import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Hammer, Zap, Droplets, Wind, CheckCircle, Clock, Shield, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UberFixPage: React.FC = () => {
  const services = [
    {
      icon: Droplets,
      title: "السباكة",
      description: "إصلاح التسريبات، تركيب الأدوات الصحية، صيانة شبكات المياه"
    },
    {
      icon: Zap,
      title: "الكهرباء",
      description: "إصلاح الأعطال، تركيب الإضاءة، صيانة اللوحات الكهربائية"
    },
    {
      icon: Wind,
      title: "التكييف",
      description: "صيانة وتركيب وإصلاح جميع أنواع التكييفات"
    },
    {
      icon: Hammer,
      title: "النجارة",
      description: "إصلاح الأبواب والنوافذ، صيانة الأثاث والمطابخ"
    }
  ];

  const maintenanceTypes = [
    "صيانة دورية وقائية",
    "صيانة طارئة على مدار الساعة",
    "تجديد الدهانات والديكورات",
    "إصلاح التسريبات والرطوبة",
    "صيانة الأرضيات والتكسيات",
    "تركيب وصيانة السخانات",
    "صيانة المصاعد",
    "أعمال العزل المائي والحراري"
  ];

  const features = [
    { icon: Clock, title: "استجابة سريعة", desc: "وصول الفني خلال ساعات" },
    { icon: Shield, title: "ضمان الجودة", desc: "ضمان على جميع الأعمال" },
    { icon: Wrench, title: "فنيين محترفين", desc: "خبرة أكثر من 10 سنوات" },
    { icon: Phone, title: "دعم 24/7", desc: "متاحين على مدار الساعة" }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Wrench className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              أوبر فيكس
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              خدمات الصيانة والتجديدات المعمارية الاحترافية - نصلك أينما كنت
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 rounded-full px-8"
              >
                <Link to="/maintenance-request">
                  اطلب صيانة الآن
                  <ArrowRight className="mr-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 rounded-full px-8"
              >
                <Link to="/maintenance-tracking">
                  تتبع طلبك
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدمات الصيانة المتخصصة
            </h2>
            <p className="text-lg text-gray-600">
              فريق متكامل من الفنيين المحترفين في جميع التخصصات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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

      {/* Maintenance Types Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                أنواع الصيانة المتاحة
              </h2>
              <p className="text-lg text-gray-600">
                نغطي جميع احتياجات الصيانة والتجديدات المعمارية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {maintenanceTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              كيف يعمل أوبر فيكس؟
            </h2>
            <p className="text-lg text-gray-600">
              خطوات بسيطة للحصول على خدمة الصيانة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "اطلب الخدمة", desc: "أرسل طلب الصيانة عبر الموقع أو الهاتف" },
              { num: "2", title: "تأكيد الموعد", desc: "نتواصل معك لتأكيد الموعد المناسب" },
              { num: "3", title: "وصول الفني", desc: "يصل الفني المتخصص في الموعد المحدد" },
              { num: "4", title: "إتمام العمل", desc: "تنفيذ الصيانة بجودة عالية مع ضمان" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
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
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            تحتاج صيانة؟ نحن هنا لمساعدتك
          </h2>
          <p className="text-xl mb-8">
            اطلب الآن واحصل على خدمة احترافية وسريعة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 rounded-full"
            >
              <Link to="/maintenance-request">
                اطلب صيانة الآن
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 rounded-full"
            >
              <Link to="/maintenance-tracking">
                تتبع طلب الصيانة
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UberFixPage;
