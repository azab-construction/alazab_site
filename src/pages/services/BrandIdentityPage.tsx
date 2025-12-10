import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Building2, Store, Lightbulb, CheckCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BrandIdentityPage: React.FC = () => {
  const services = [
    {
      icon: Store,
      title: "تجهيز المحلات التجارية",
      description: "تجهيز متكامل للمحلات والمعارض بتصاميم عصرية تجذب العملاء"
    },
    {
      icon: Building2,
      title: "تجهيز المكاتب الإدارية",
      description: "تصميم وتنفيذ مكاتب إدارية عملية وأنيقة تعكس احترافية شركتك"
    },
    {
      icon: Palette,
      title: "تصميم الهوية البصرية",
      description: "تصميم واجهات ولافتات مميزة تعكس هوية علامتك التجارية"
    },
    {
      icon: Lightbulb,
      title: "الإضاءة والديكور",
      description: "حلول إضاءة وديكور مبتكرة تعزز تجربة العملاء في مساحتك"
    }
  ];

  const spaceTypes = [
    { name: "محلات تجارية", desc: "معارض، بوتيكات، سوبر ماركت" },
    { name: "مكاتب إدارية", desc: "مكاتب شركات، عيادات، مراكز خدمة" },
    { name: "مطاعم وكافيهات", desc: "مطاعم، كافيهات، فود كورت" },
    { name: "صالونات ومراكز", desc: "صالونات تجميل، جيم، سبا" },
    { name: "فروع بنوك", desc: "فروع بنكية، صرافات، شركات تمويل" },
    { name: "معارض سيارات", desc: "معارض، وكالات، مراكز صيانة" }
  ];

  const features = [
    "تصميم واجهات خارجية مميزة",
    "تنفيذ اللافتات والإعلانات",
    "تجهيز الأرضيات والأسقف",
    "أنظمة الإضاءة الذكية",
    "تصميم أماكن الاستقبال",
    "تجهيز غرف الاجتماعات",
    "أنظمة العرض والديسبلاي",
    "التكييف والتهوية"
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Palette className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              هوية العلامة التجارية
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              متخصصون في تجهيز المحلات التجارية والمكاتب الإدارية بهوية بصرية مميزة تعكس علامتك التجارية
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8"
            >
              <Link to="/contact">
                احصل على استشارة مجانية
                <ArrowRight className="mr-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Space Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              أنواع المساحات التي نجهزها
            </h2>
            <p className="text-lg text-gray-600">
              خبرة واسعة في تجهيز جميع أنواع المساحات التجارية والإدارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceTypes.map((space, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Store className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {space.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {space.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدماتنا المتخصصة
            </h2>
            <p className="text-lg text-gray-600">
              نساعدك في إنشاء مساحات تجارية تجسد هوية علامتك التجارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ما نقدمه لك
              </h2>
              <p className="text-lg text-gray-600">
                خدمات شاملة لتطوير هوية علامتك التجارية في المساحات المادية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              منهجيتنا في العمل
            </h2>
            <p className="text-lg text-gray-600">
              عملية مدروسة لضمان تطبيق هويتك التجارية بشكل مثالي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">دراسة العلامة التجارية</h3>
              <p className="text-gray-600">تحليل شامل لهوية وقيم علامتك التجارية</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">التصميم المفاهيمي</h3>
              <p className="text-gray-600">وضع مفاهيم التصميم التي تجسد هويتك</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">التطوير والتنفيذ</h3>
              <p className="text-gray-600">تطبيق التصميم وتنفيذ المشروع بدقة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">التسليم والمتابعة</h3>
              <p className="text-gray-600">تسليم المشروع مع ضمان المتابعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              قصص نجاح
            </h2>
            <p className="text-lg text-gray-600">
              بعض من مشاريعنا الناجحة في تطوير الهوية التجارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">مجموعة الفنادق الراقية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  تطوير هوية بصرية متكاملة لسلسلة فنادق فاخرة تعكس التراث والحداثة
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">مراكز التسوق التجارية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  تصميم وتنفيذ هوية بصرية لمراكز تسوق كبرى تجذب جميع فئات المجتمع
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">المؤسسات المالية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  إنشاء مساحات مصرفية تجسد الثقة والاحترافية في التعامل
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            جاهز لتطوير هويتك التجارية؟
          </h2>
          <p className="text-xl mb-8">
            دعنا نساعدك في إنشاء مساحة تعكس قيم وهوية علامتك التجارية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full"
            >
              <Link to="/contact">
                ابدأ مشروعك
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 rounded-full"
            >
              <Link to="/projects">
                شاهد أعمالنا السابقة
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandIdentityPage;