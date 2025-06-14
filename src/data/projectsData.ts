
export interface ProjectMetadata {
  id: number;
  name: string;
  teaser: string;
  image: string;
  caption: string;
  intro: string;
  challenge: string;
  outcome: string;
  quote: string;
  quoteAuthor: string;
  category: string;
  client: string;
  location: string;
  year: string;
  link: string;
  model3dUrl?: string;
}

export const projectsData: ProjectMetadata[] = [
  {
    id: 1,
    name: "حدائق الندى السكنية",
    teaser: "واحة عصرية تجمع الراحة والهدوء وسط الطبيعة الخضراء.",
    image: require('@/assets/projects/gallery-1.jpg'),
    caption: "مساحات خضراء تتناغم مع خطوط التصميم الحديث.",
    intro: "مشروع حدائق الندى السكنية هو تجسيد للرقي والأمان وسط بيئة طبيعية خصبة خُصصت لعائلة تبحث عن الهدوء والتميز.",
    challenge: "كان التحدي يكمن في المزج بين المساحات الخضراء المفتوحة والتخطيط العمراني الذكي لتحقيق الخصوصية دون إقصاء الإضاءة أو الإطلالات.",
    outcome: "نجحنا في خلق بيئة معيشية تنبض بالحياة، حيث اعتبر السكان بيوتهم امتدادًا للطبيعة، مما عزز شعورهم بالرضا والإلهام كل يوم.",
    quote: "كل صباح هنا يحمل بداية جديدة بين عبق الأشجار وصفاء التصميم.",
    quoteAuthor: "م. نهى صالح – مالكة فيلا",
    category: "سكني – تصميم وتنفيذ",
    client: "عائلة الصالح",
    location: "القاهرة الجديدة",
    year: "2023",
    link: "#",
    model3dUrl: "https://3d.magicplan.app/#embed/?key=..."
  },
  // ... كرر البيانات لـ 21 مشروعاً (مع تغيير القيم فقط كما في الخطوة الثانية)
  // للتبسيط سنستعرض نموذجين فقط هنا (قم بتوسعة الـ 21 لاحقًا بنفس الصيغة)
  {
    id: 2,
    name: "فيلا الغروب الذهبي",
    teaser: "تصميم أنيق يحتفي بألوان الغروب ومساحات مفتوحة للسكينة.",
    image: require('@/assets/projects/gallery-2.jpg'),
    caption: "سيمفونية الألوان تلتقي مع العمارة المعاصرة.",
    intro: "فيلا الغروب الذهبي صممت خصيصًا لعائلة تقدّر الدفء والرفاهية والتكامل مع الطبيعة.",
    challenge: "دمجنا بين العناصر الطبيعية والانسيابية، مع استخدام تدرجات لون الغروب لإضفاء لمسة فنية مميزة على الواجهات والفراغات الداخلية.",
    outcome: "غدت الفيلا تحفة معمارية تدعو للاسترخاء، حيث بات الغروب موعدًا للجمال اليومي والشعور بالاحتواء.",
    quote: "لم أتوقع أن أشعر بالسكينة في كل زاوية كما أعيشها هنا.",
    quoteAuthor: "أ. جلال السالم – مالك",
    category: "فيلا خاصة – تصميم وتنفيذ",
    client: "عائلة السالم",
    location: "الرياض",
    year: "2024",
    link: "#",
    model3dUrl: "https://3d.magicplan.app/#embed/?key=..."
  }
];
