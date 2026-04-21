
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard, ValueCard } from '@/components/cards';
import { ACHIEVEMENTS, COMPANY_VALUES, QUALITY_CERTIFICATIONS, COMPANY_INFO } from '@/constants/data';

const About: React.FC = () => {

  return (
    <section id="about" className="section bg-construction-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About Image */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-72 h-72 lg:w-80 lg:h-80 bg-construction-primary rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2574&auto=format&fit=crop" 
              alt="شركة العزب للمقاولات" 
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-construction-accent rounded-lg"></div>
          </div>
          
          {/* About Content */}
          <div>
            <div className="inline-block bg-construction-accent/20 text-construction-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
              من نحن
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">
              شركة العزب للمقاولات <br />
              <span className="text-construction-accent">تاريخ من التميز والإبداع</span>
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              تأسست شركة العزب للمقاولات منذ أكثر من 20 عاماً لتصبح واحدة من أهم الشركات الرائدة في مجال المقاولات والبناء في المملكة العربية السعودية ومصر. تخصصنا في تقديم خدمات متكاملة في مجال الإنشاء والتعمير بأعلى معايير الجودة والالتزام بالمواعيد.
            </p>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              نعمل بشغف لتحويل أفكار عملائنا إلى واقع ملموس، مع التركيز على الاستدامة والابتكار في جميع مشاريعنا. فريقنا المكون من مهندسين وخبراء متخصصين يعملون معاً لتقديم أفضل الحلول الهندسية والإنشائية.
            </p>
            
            <Button className="bg-construction-primary hover:bg-construction-dark text-white" asChild>
              <Link to="/about">تعرف علينا أكثر</Link>
            </Button>
          </div>
        </div>

        {/* إحصائيات الشركة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {ACHIEVEMENTS.map((achievement, index) => (
            <StatsCard 
              key={index}
              number={achievement.number}
              label={achievement.label}
              variant="achievement"
            />
          ))}
        </div>

        {/* قيمنا الأساسية */}
        <div className="text-center mb-12">
          <h3 className="section-title">قيمنا الأساسية</h3>
          <p className="section-subtitle">
            نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتضمن تحقيق أهدافنا ورضا عملائنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COMPANY_VALUES.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>

        {/* شهادات الجودة */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-construction-primary mb-4">
              شهادات الجودة والاعتمادات
            </h3>
            <p className="text-base text-gray-600">
              حاصلون على شهادات الجودة العالمية والاعتمادات المحلية
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {QUALITY_CERTIFICATIONS.map((cert, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
