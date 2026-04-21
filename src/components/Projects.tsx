
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/cards";
import { PROJECTS, PROJECT_CATEGORIES } from "@/constants/data";

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(PROJECT_CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // استخدام useMemo لتحسين الأداء
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeCategory === PROJECT_CATEGORIES[0] || project.category === activeCategory;
      const matchesSearch = project.title.includes(searchTerm) || 
                            project.location.includes(searchTerm) || 
                            project.category.includes(searchTerm);
      return matchesCategory && (searchTerm === "" || matchesSearch);
    });
  }, [activeCategory, searchTerm]);

  // استخدام useCallback لتحسين الأداء
  const handleScroll = useCallback(() => {
    const elements = document.querySelectorAll('.project-card');
    
    elements.forEach((element, index) => {
      const position = element.getBoundingClientRect();
      
      if (position.top < window.innerHeight - 100) {
        setTimeout(() => {
          element.classList.add('animated');
        }, index * 100);
      }
    });
  }, []);
  
  // تحسين useEffect
  useEffect(() => {
    // فحص أولي مع تأخير قصير
    const initialTimeout = setTimeout(handleScroll, 300);
    
    // إضافة مستمع للتمرير مع throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">مشاريعنا</h2>
        <p className="section-subtitle">تصفح أحدث وأهم مشاريعنا المنفذة</p>
        
        {/* بحث وتصفية */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">
            {/* البحث */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="بحث عن مشروع..." 
                className="w-full py-3 pr-10 pl-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-construction-primary focus:border-construction-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="بحث في المشاريع"
              />
            </div>
            
            {/* أزرار التصفية */}
            <div className="w-full lg:flex-1 lg:mr-6">
              <Tabs 
                defaultValue={PROJECT_CATEGORIES[0]}
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="bg-gray-100 p-1 flex flex-wrap justify-center lg:justify-end w-full">
                  {PROJECT_CATEGORIES.map((category) => (
                    <TabsTrigger 
                      key={category}
                      value={category}
                      className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-construction-primary data-[state=active]:text-white transition-all hover:bg-construction-primary/10"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* مشاريع مميزة */}
        {!searchTerm && activeCategory === PROJECT_CATEGORIES[0] && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-construction-primary flex items-center gap-2">
              <span className="w-1 h-8 bg-construction-accent rounded-full"></span>
              مشاريع مميزة
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROJECTS
                .filter(project => project.featured)
                .map(project => (
                  <ProjectCard 
                    key={`featured-${project.id}`} 
                    project={project} 
                    featured={true}
                  />
                ))}
            </div>
          </div>
        )}
        
        {/* عرض المشاريع */}
        <div className="mt-8">
          {filteredProjects.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-construction-primary">
                  {searchTerm ? `نتائج البحث عن: "${searchTerm}"` : 
                   activeCategory === PROJECT_CATEGORIES[0] ? "جميع المشاريع" : activeCategory}
                </h3>
                <span className="text-gray-500 text-sm" aria-live="polite">
                  {filteredProjects.length} مشروع
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    featured={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl" role="alert">
              <div className="text-gray-500 mb-4">
                <Search size={60} className="mx-auto mb-6 text-gray-400" aria-hidden="true" />
                <p className="text-xl font-medium">لم يتم العثور على مشاريع مطابقة</p>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                حاول استخدام كلمات بحث مختلفة أو تصفية أخرى
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory(PROJECT_CATEGORIES[0]);
                }}
                variant="outline"
                className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white"
              >
                إعادة تعيين البحث
              </Button>
            </div>
          )}
        </div>
        
        {filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <Link to="/projects-gallery">
              <Button className="bg-construction-primary hover:bg-construction-dark text-white py-3 px-8 text-lg">
                عرض جميع المشاريع
                <ArrowLeft className="mr-2" size={18} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
