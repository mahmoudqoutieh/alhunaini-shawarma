import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";
import { openMenu } from "@/components/site/menu-panel";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#F2B632",
  background: "#0B2530",
  ink: "#F6EFE2",
  muted: "#B7C8CC",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    align: "left",
    body: "نتبّل اللحم والدجاج بوصفة العائلة، ونشويهما على السيخ حتى يصبحا ذهبيين، ونقطعهما أمامك طازجين.",
    clip: "/assets/world/shawarma.mp4",
    id: "journey",
    kicker: "شاورما الهنيني",
    label: "السيخ",
    mobileClip: "/assets/world/shawarma-mobile.mp4",
    mobilePoster: "/assets/world/shawarma-mobile-poster.jpg",
    poster: "/assets/world/shawarma-poster.jpg",
    scroll: 9,
    tags: ["تتبيلة العائلة", "تقطيع طازج", "خبز ساخن"],
    title: "شاورما تستحق الانتظار",
    actions: (
      <button className="cta-slash" onClick={openMenu} type="button">
        <span>شاهد القائمة</span>
      </button>
    ),
  },
  {
    align: "right",
    body: "نحمّص الخبز فوق لهب حامٍ، ثم نضيف الشاورما والثوم والمخلل والبطاطس، ونلفّها لك بإحكام.",
    clip: "/assets/world/fire.mp4",
    id: "fire",
    kicker: "من النار إلى يدك",
    label: "النار",
    mobileClip: "/assets/world/fire-mobile.mp4",
    mobilePoster: "/assets/world/fire-mobile-poster.jpg",
    poster: "/assets/world/fire-poster.jpg",
    scroll: 9,
    tags: ["خبز محمّص على اللهب", "ثوم ومخلل وبطاطس", "لفّة مقرمشة"],
    title: "لفّة تُحضَّر على النار",
    actions: (
      <button className="cta-flame" onClick={openMenu} type="button">
        <span>اطلب لفّتك</span>
      </button>
    ),
  },
  {
    align: "left",
    body: "نضغط قرص اللحم على صاج ساخن ونقلبه في لحظته، فيخرج طرياً بقشرة مقرمشة وجبنة ذائبة.",
    clip: "/assets/world/griddle.mp4",
    id: "griddle",
    kicker: "على الصاج",
    label: "الصاج",
    mobileClip: "/assets/world/griddle-mobile.mp4",
    mobilePoster: "/assets/world/griddle-mobile-poster.jpg",
    poster: "/assets/world/griddle-poster.jpg",
    scroll: 9,
    tags: ["صاج ساخن", "جبنة ذائبة", "خبز محمّص"],
    title: "برجر يُقلَّب على الصاج",
    actions: (
      <button className="cta-order cta-order--gold" onClick={openMenu} type="button">
        اطلب الآن
      </button>
    ),
  },
];
