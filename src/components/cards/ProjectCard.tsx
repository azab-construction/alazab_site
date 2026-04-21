import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { LazyImage } from '@/components/ui/lazy-image';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  featured = false, 
  className = '' 
}) => {
  if (featured) {
    return (
      <article className={`group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        <LazyImage 
          src={project.image} 
          alt={project.title} 
          className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
          <div className="bg-construction-accent/90 backdrop-blur-sm text-white text-xs py-2 px-4 rounded-full absolute top-6 right-6 font-medium">
            {project.category}
          </div>
          <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} aria-hidden="true" />
            <span className="text-lg">{project.location}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">سنة: {project.year}</span>
            <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">العميل: {project.client}</span>
          </div>
          <Link 
            to={`/projects-gallery/${project.id}`} 
            className="flex items-center gap-2 bg-white text-construction-primary font-bold py-3 px-6 rounded-lg transition-all hover:bg-construction-accent hover:text-white self-start group-hover:scale-105"
            aria-label={`عرض تفاصيل مشروع ${project.title}`}
          >
            تفاصيل المشروع
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article 
      className={`project-card group relative overflow-hidden rounded-xl shadow-md opacity-0 translate-y-8 transition-all duration-500 hover:shadow-xl ${className}`}
      role="listitem"
    >
      <Link 
        to={`/projects-gallery/${project.id}`}
        aria-label={`عرض تفاصيل مشروع ${project.title}`}
        className="block w-full h-full"
      >
        <LazyImage 
          src={project.image} 
          alt={project.title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-bold mb-2 group-hover:text-construction-accent transition-colors">{project.title}</h3>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <MapPin size={16} aria-hidden="true" />
            <p className="text-sm">{project.location}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-construction-accent text-white text-xs py-1 px-3 rounded-full font-medium">
              {project.category}
            </div>
            <span className="text-white/80 text-xs">{project.year}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
