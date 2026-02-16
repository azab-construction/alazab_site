
import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PremiumServices from "../components/PremiumServices";
import Projects from "../components/Projects";
import About from "../components/About";
import CompanyVision from "../components/CompanyVision";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index: React.FC = () => {
  // تحسين scroll animation handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const elements = document.querySelectorAll('.fade-in-view, .slide-up-view');
          
          elements.forEach((element) => {
            const position = element.getBoundingClientRect();
            
            if (position.top < window.innerHeight - 100) {
              element.classList.add('animated');
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // فحص أولي
    handleScroll();
    
    // إضافة scroll event listener مع passive
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>العزب للمقاولات والتشطيبات - خدمات بناء وتشطيب متميزة</title>
        <meta name="description" content="العزب للمقاولات والتشطيبات - رائدة في مجال المقاولات والتشطيبات في السعودية ومصر. تشطيب راقي، هوية تجارية، أوبر فيكس، توريدات عمومية." />
        <meta name="keywords" content="مقاولات, تشطيبات, صيانة, السعودية, مصر, البناء, تشطيب راقي, توريدات" />
        <meta property="og:title" content="العزب للمقاولات والتشطيبات" />
        <meta property="og:description" content="رائدة في مجال المقاولات والتشطيبات في السعودية ومصر" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://al-azab.co/" />
      </Helmet>

      <div className="bg-white min-h-screen" dir="rtl">
        <Header />
        <main className="space-y-0">
          <Hero />
          
          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-construction-primary to-construction-secondary" aria-labelledby="cta-section">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-section" className="text-2xl md:text-3xl font-bold text-white mb-4">هل تحتاج إلى خدمة صيانة؟</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">قدّم طلب صيانة الآن واحصل على استجابة سريعة من فريقنا المتخصص</p>
              <Button 
                className="bg-construction-accent hover:bg-construction-accent/90 text-construction-dark font-bold py-6 px-10 rounded-xl text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-construction-accent/25"
                asChild
              >
                <Link to="/maintenance-request">
                  تقديم طلب صيانة
                </Link>
              </Button>
            </div>
          </section>
          
          <PremiumServices />
          <Services />
          <Projects />
          <About />
          <CompanyVision />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
