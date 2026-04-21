import type { Project, Service, Achievement, CompanyValue, HeroStats, CompanyInfo } from '@/types';

// Company information
export const COMPANY_INFO: CompanyInfo = {
  name: "شركة العزب للمقاولات",
  tagline: "نبني مستقبلك بأمان",
  description: "شركة العزب للمقاولات العامة، خبرة أكثر من 20 عامًا في المجال، نقدم خدمات متكاملة في البناء والتشييد بأعلى معايير الجودة",
  yearsOfExperience: 20,
  heroTitle: "نبني مستقبلك بأمان",
  heroSubtitle: "شركة العزب للمقاولات العامة، خبرة أكثر من 20 عامًا في المجال، نقدم خدمات متكاملة في البناء والتشييد بأعلى معايير الجودة",
  heroBackgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2370&auto=format&fit=crop"
};

// Projects data
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "برج الأمير السكني",
    category: "المباني السكنية",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
    location: "الرياض، المملكة العربية السعودية",
    year: "2023",
    client: "شركة الأمير للاستثمار العقاري",
    featured: true,
    description: "برج سكني حديث يضم 200 وحدة سكنية بتصاميم عصرية وتجهيزات فاخرة"
  },
  {
    id: 2,
    title: "مجمع التميز التجاري",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    location: "جدة، المملكة العربية السعودية",
    year: "2022",
    client: "مجموعة التميز",
    description: "مجمع تجاري متعدد الطوابق بمساحة 50,000 متر مربع"
  },
  {
    id: 3,
    title: "فيلا الواحة الخضراء",
    category: "الفلل الخاصة",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    location: "الدمام، المملكة العربية السعودية",
    year: "2024",
    client: "عائلة السعيد",
    description: "فيلا فاخرة بتصميم معماري حديث مع حديقة خاصة"
  },
  {
    id: 4,
    title: "مجمع النخيل السكني",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=2605&auto=format&fit=crop",
    location: "الخبر، المملكة العربية السعودية",
    year: "2023",
    client: "شركة النخيل للعقارات",
    featured: true,
    description: "مجمع سكني متكامل يضم 500 وحدة سكنية مع مرافق ترفيهية"
  },
  {
    id: 5,
    title: "برج المستقبل",
    category: "المباني التجارية",
    image: "https://images.unsplash.com/photo-1693314212095-3659d9ca30c9?q=80&w=2574&auto=format&fit=crop",
    location: "مكة، المملكة العربية السعودية",
    year: "2021",
    client: "هيئة تطوير مكة المكرمة",
    description: "برج حديث مع مكاتب إدارية وفضاءات تجارية"
  },
  {
    id: 6,
    title: "مجمع الأندلس",
    category: "المجمعات السكنية",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    location: "المدينة المنورة، المملكة العربية السعودية",
    year: "2022",
    client: "شركة إعمار",
    description: "مجمع سكني بمواصفات عالمية يضم مرافق شاملة"
  }
];

// Project categories
export const PROJECT_CATEGORIES = [
  "جميع المشاريع",
  "المباني السكنية",
  "المباني التجارية",
  "الفلل الخاصة",
  "المجمعات السكنية"
];

// Services data
export const SERVICES: Service[] = [
  {
    icon: "🏗️",
    title: "مقاولات عامة",
    description: "نقدم خدمات شاملة في البناء والتشييد من الأساس حتى التسليم النهائي بأعلى معايير الجودة."
  },
  {
    icon: "🏢",
    title: "تصميم معماري",
    description: "فريق متخصص من المهندسين المعماريين لتصميم مشروعك بالشكل الذي تتخيله."
  },
  {
    icon: "🔨",
    title: "صيانة وترميم",
    description: "خدمات صيانة دورية وترميم للمباني القديمة مع الحفاظ على الطابع الأصلي."
  },
  {
    icon: "📝",
    title: "استشارات هندسية",
    description: "نقدم استشارات هندسية متكاملة لمساعدتك في اتخاذ القرارات المناسبة لمشروعك."
  },
  {
    icon: "🏠",
    title: "تشطيبات داخلية",
    description: "تشطيبات عالية الجودة للمنازل والمكاتب والمحلات التجارية بأحدث التصاميم."
  },
  {
    icon: "🚧",
    title: "إدارة المشاريع",
    description: "إدارة مشروعك من البداية حتى النهاية مع متابعة دقيقة لكل مرحلة من مراحل البناء."
  }
];

// Company achievements
export const ACHIEVEMENTS: Achievement[] = [
  { number: "20+", label: "سنة من الخبرة" },
  { number: "500+", label: "مشروع منجز" },
  { number: "100+", label: "عميل راضي" },
  { number: "3", label: "فروع في دول مختلفة" }
];

// Company values
export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: "الجودة العالية",
    description: "نلتزم بأعلى معايير الجودة في جميع مشاريعنا",
    icon: "🏆"
  },
  {
    title: "الالتزام بالمواعيد",
    description: "نحترم مواعيد التسليم ونلتزم بالجداول الزمنية المحددة",
    icon: "⏰"
  },
  {
    title: "الابتكار المستمر",
    description: "نستخدم أحدث التقنيات والطرق في مجال البناء",
    icon: "💡"
  },
  {
    title: "فريق محترف",
    description: "فريق من المهندسين والخبراء المتخصصين",
    icon: "👥"
  }
];

// Hero stats
export const HERO_STATS: HeroStats[] = [
  { number: "+300", label: "مشروع منجز" },
  { number: "20+", label: "سنوات خبرة" },
  { number: "150+", label: "عميل سعيد" },
  { number: "50+", label: "عامل محترف" }
];

// Quality certifications
export const QUALITY_CERTIFICATIONS = [
  "ISO 9001:2015",
  "شهادة الغرفة التجارية",
  "عضوية جمعية المهندسين",
  "اعتماد وزارة الإسكان"
];
