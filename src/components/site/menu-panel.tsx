import { useEffect, useState } from "react";

import { groups, products, steps } from "@/menu-data";
import { siteInfo } from "@/site-info";

export const OPEN_MENU_EVENT = "open-menu";

export function openMenu() {
  window.dispatchEvent(new CustomEvent(OPEN_MENU_EVENT));
}

export function MenuPanel() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [group, setGroup] = useState(groups[0]);

  useEffect(() => {
    const onOpen = () => {
      setSeen(true);
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_MENU_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_MENU_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const phoneHref = siteInfo.phone ? `tel:${siteInfo.phone}` : "";
  const whatsappHref = siteInfo.whatsapp ? `https://wa.me/${siteInfo.whatsapp}` : "";
  const shown = group === groups[0] ? products : products.filter((p) => p.group === group);
  const tab = open ? 0 : -1;

  return (
    <div
      aria-hidden={!open}
      aria-label="القائمة"
      aria-modal="true"
      className="menu-panel"
      data-open={open}
      role="dialog"
    >
      <button
        aria-label="إغلاق القائمة"
        className="menu-panel__scrim"
        onClick={() => setOpen(false)}
        tabIndex={tab}
        type="button"
      />
      <div className="menu-panel__sheet">
        <div className="menu-panel__head">
          <div>
            <h2>قائمة الهنيني</h2>
            <p>كل صنف يُحضَّر عند الطلب، بوصفة العائلة.</p>
          </div>
          <button className="menu-panel__close" onClick={() => setOpen(false)} tabIndex={tab} type="button">
            إغلاق
          </button>
        </div>

        <div className="menu-panel__tabs" role="tablist">
          {groups.map((name) => (
            <button
              aria-selected={group === name}
              key={name}
              onClick={() => setGroup(name)}
              role="tab"
              tabIndex={tab}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="menu-panel__body">
          <ul className="menu-grid">
            {shown.map((item) => (
              <li className="menu-card" key={item.name}>
                <div className="menu-card__photo">
                  {seen ? (
                    <img alt={item.alt} decoding="async" height={880} loading="lazy" src={item.image} width={1168} />
                  ) : null}
                  {item.badge ? <em>{item.badge}</em> : null}
                </div>
                <strong>{item.name}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <ol className="menu-steps">
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="menu-panel__order">
          <p>{siteInfo.address ? siteInfo.address : "ننتظرك في المطعم، ونوصّل إلى بابك ساخناً."}</p>
          <div>
            {phoneHref ? (
              <a className="cta-order" href={phoneHref}>اتصل بنا</a>
            ) : null}
            {whatsappHref ? (
              <a className="cta-order cta-order--alt" href={whatsappHref}>واتساب</a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
