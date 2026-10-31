export interface Product {
  name: string;
  text: string;
  group: string;
  image: string;
  alt: string;
  badge?: string;
}

export const groups = ["الكل", "اللفّات", "البرجر", "الصحون", "جانبيات ومشروبات"];

export const products: Product[] = [
  {
    name: "شاورما دجاج",
    text: "شرائح دجاج متبّلة مع الثوم والمخلل في خبز محمّص.",
    group: "اللفّات",
    image: "/assets/food/sandwich.jpg",
    alt: "ساندويش شاورما دجاج مع الثوم والمخلل والبطاطس",
    badge: "الأكثر طلباً",
  },
  {
    name: "شاورما لحم",
    text: "لحم طري مع الطحينة والبصل والبقدونس في خبز ساخن.",
    group: "اللفّات",
    image: "/assets/food/beef-wrap.jpg",
    alt: "لفّة شاورما لحم مع الطحينة والبصل",
  },
  {
    name: "برجر لحم",
    text: "قرص لحم مضغوط على الصاج مع المخلل والصوص الخاص.",
    group: "البرجر",
    image: "/assets/food/smash-burger.jpg",
    alt: "برجر لحم مضغوط على الصاج مع المخلل",
    badge: "من الصاج",
  },
  {
    name: "برجر جبنة",
    text: "قرصان من اللحم تغطيهما جبنة ذائبة في خبز محمّص.",
    group: "البرجر",
    image: "/assets/food/cheese-burger.jpg",
    alt: "برجر جبنة مزدوج بجبنة ذائبة",
  },
  {
    name: "صحن شاورما",
    text: "شاورما فوق الأرز مع الحمص والتبولة والمخلل والخبز.",
    group: "الصحون",
    image: "/assets/food/platter.jpg",
    alt: "صحن شاورما لحم مع الحمص والتبولة والمخلل",
  },
  {
    name: "وجبة العائلة",
    text: "لفّات وبرجر وبطاطس ومقبلات تكفي الطاولة كلها.",
    group: "الصحون",
    image: "/assets/food/family.jpg",
    alt: "وجبة عائلية من اللفّات والبرجر والبطاطس والمقبلات",
    badge: "تكفي الجميع",
  },
  {
    name: "بطاطس ومقبلات",
    text: "بطاطس مقرمشة مع الحمص والتبولة والمخلل.",
    group: "جانبيات ومشروبات",
    image: "/assets/food/fries-mezze.jpg",
    alt: "بطاطس مقرمشة مع الحمص والتبولة والمخلل",
  },
  {
    name: "مشروبات منعشة",
    text: "ليموناضة بالنعناع وعيران بارد يكملان الوجبة.",
    group: "جانبيات ومشروبات",
    image: "/assets/food/drinks.jpg",
    alt: "ليموناضة بالنعناع وعيران بارد",
  },
];

export const steps = [
  { title: "اختر صنفك", text: "من اللفّات أو البرجر أو الصحون." },
  { title: "اطلبه كما تحب", text: "من المطعم مباشرة أو عبر التوصيل." },
  { title: "استلمه ساخناً", text: "نحضّره عند الطلب ليصلك طازجاً." },
];
