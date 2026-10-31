import { MenuPanel, openMenu } from "@/components/site/menu-panel";
import { MouseFx } from "@/components/site/mouse-fx";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

// The whole site is one fixed stage: scrolling swaps the film and its copy
// (spit, fire and wrap, griddle burger). Menu and ordering live in a panel.
export default function DesktopSite() {
  return (
    <>
      <header className="site-nav">
        <a aria-label="شاورما الهنيني" className="site-nav__brand" href="#top">
          <img alt="" height={44} src="/assets/brand/logo.png" width={44} />
          <span>الهنيني</span>
        </a>
        <button className="cta-nav" onClick={openMenu} type="button">القائمة</button>
      </header>

      <main id="top">
        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />
      </main>

      <MouseFx />
      <MenuPanel />
      <small className="site-foot">© 2026 شاورما الهنيني</small>
    </>
  );
}
