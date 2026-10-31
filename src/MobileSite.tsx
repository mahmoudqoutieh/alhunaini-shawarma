import { useEffect, useRef, useState, type CSSProperties } from "react";

import { groups, products, steps } from "@/menu-data";
import { scrollScrubScenes } from "@/scroll-scrub-scenes";
import { siteInfo } from "@/site-info";

const sceneMedia: Record<string, { cta: string; chap: string; kind: string }> = {
  journey: { cta: "شاهد القائمة", chap: "#f2b632", kind: "slash" },
  fire: { cta: "اطلب لفّتك", chap: "#ff8a4c", kind: "flame" },
  griddle: { cta: "اطلب الآن", chap: "#ffd36b", kind: "gold" },
};

// Each clip starts at the moment its poster shows, so the poster hands over to
// the video without a visible jump (the loop then wraps to the dark opening).
const startAt: Record<string, number> = { shawarma: 6, fire: 3, griddle: 5 };

const dotTargets = [...scrollScrubScenes.map((scene) => scene.id), "m-menu", "m-order"];
const dotLabels = [...scrollScrubScenes.map((scene) => scene.label), "القائمة", "الطلب"];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function goTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

// Loads its clip only when the section is near the viewport and plays it only
// while the section is on screen, so a phone decodes one small video at a time.
function SceneVideo({ id }: { id: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const reduce = prefersReducedMotion();
    let loaded = false;
    let visible = false;

    let positioned = false;

    const tryPlay = () => {
      if (!positioned) {
        positioned = true;
        video.currentTime = startAt[id] ?? 0;
      }
      if (visible && loaded && !reduce) video.play().catch(() => {});
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded && !reduce) {
          loaded = true;
          video.src = `/assets/mobile/${id}.mp4`;
          video.load();
        }
      },
      { rootMargin: "-5% 0px" },
    );
    const onScreen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: 0.5 },
    );
    video.addEventListener("loadeddata", tryPlay);
    near.observe(video);
    onScreen.observe(video);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.pause();
    };
  }, [id]);

  return (
    <video
      aria-hidden="true"
      loop
      muted
      playsInline
      poster={`/assets/mobile/${id}-poster.jpg`}
      preload="none"
      ref={ref}
    />
  );
}

export default function MobileSite() {
  const [active, setActive] = useState(0);
  const [group, setGroup] = useState(groups[0]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-mobile");
    return () => root.classList.remove("is-mobile");
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-snap]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.snap));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const shown = group === groups[0] ? products : products.filter((item) => item.group === group);
  const phoneHref = siteInfo.phone ? `tel:${siteInfo.phone}` : "";
  const whatsappHref = siteInfo.whatsapp ? `https://wa.me/${siteInfo.whatsapp}` : "";

  return (
    <>
      <header className={`m-bar${active >= 3 ? " is-solid" : ""}`}>
        <a aria-label="شاورما الهنيني" className="m-bar__brand" href="#top">
          <img alt="" height={34} src="/assets/brand/logo.png" width={34} />
          <span>الهنيني</span>
        </a>
        <button className="m-bar__menu" onClick={() => goTo("m-menu")} type="button">
          القائمة
        </button>
      </header>

      <nav aria-label="الأقسام" className={`m-dots${active >= 3 ? " is-hidden" : ""}`}>
        {dotTargets.map((target, index) => (
          <button
            aria-current={active === index}
            aria-label={dotLabels[index]}
            key={target}
            onClick={() => goTo(target)}
            type="button"
          />
        ))}
      </nav>

      <main id="top">
        {scrollScrubScenes.map((scene, index) => {
          const meta = sceneMedia[scene.id];
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <section
              className={`m-scene${active === index ? " is-active" : ""}`}
              data-kind={meta.kind}
              data-snap={index}
              id={scene.id}
              key={scene.id}
              style={{ "--chap": meta.chap } as CSSProperties}
            >
              <SceneVideo id={scene.id === "journey" ? "shawarma" : scene.id} />
              <div className="m-copy">
                <p className="m-kicker">{scene.kicker}</p>
                <Heading className="m-title">{scene.title}</Heading>
                <p className="m-body">{scene.body}</p>
                <ul className="m-tags">
                  {scene.tags?.slice(0, 3).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <button className="m-cta" onClick={() => goTo("m-menu")} type="button">
                  {meta.cta}
                </button>
              </div>
            </section>
          );
        })}

        <section className="m-menu" data-snap={3} id="m-menu">
          <h2>قائمة الهنيني</h2>
          <p className="m-menu__lead">كل صنف يُحضَّر عند الطلب، بوصفة العائلة.</p>
          <div className="m-chips" role="tablist">
            {groups.map((name) => (
              <button
                aria-selected={group === name}
                key={name}
                onClick={() => setGroup(name)}
                role="tab"
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
          <ul className="m-list">
            {shown.map((item) => (
              <li className="m-item" key={item.name}>
                <img
                  alt={item.alt}
                  decoding="async"
                  height={92}
                  loading="lazy"
                  src={item.image.replace(/\.jpg$/, "-sm.jpg")}
                  width={92}
                />
                <div>
                  <strong>
                    {item.name}
                    {item.badge ? <em>{item.badge}</em> : null}
                  </strong>
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
          <ol className="m-steps">
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="m-order" data-snap={4} id="m-order">
          <h2>جوعان؟ اطلب الآن.</h2>
          <p>{siteInfo.address ? siteInfo.address : "ننتظرك في المطعم، ونوصّل إلى بابك ساخناً."}</p>
          <div className="m-order__actions">
            {phoneHref ? <a href={phoneHref}>اتصل بنا</a> : null}
            {whatsappHref ? <a href={whatsappHref}>واتساب</a> : null}
          </div>
          <small>© 2026 شاورما الهنيني</small>
        </section>
      </main>
    </>
  );
}
