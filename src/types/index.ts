// Main data types for the construction company website

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  client: string;
  featured?: boolean;
  description?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Achievement {
  number: string;
  label: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface HeroStats {
  number: string;
  label: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  yearsOfExperience: number;
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
}
