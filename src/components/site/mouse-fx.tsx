import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  base: number;
  life: number;
}

// Cursor-reactive layer: a warm glow that follows the pointer, a slight
// parallax on the film (via --mx/--my) and embers that scatter from the cursor.
export function MouseFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    const spawn = (init: boolean): Ember => {
      const base = -(Math.random() * 0.6 + 0.25);
      return {
        x: Math.random() * w,
        y: init ? Math.random() * h : h + 10,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: base,
        base,
        life: Math.random(),
      };
    };

    let embers: Ember[] = [];
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers = Array.from({ length: w < 860 ? 26 : 64 }, () => spawn(true));
    };
    resize();

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      root.style.setProperty("--mx", String(event.clientX / w - 0.5));
      root.style.setProperty("--my", String(event.clientY / h - 0.5));
      root.style.setProperty("--px", `${event.clientX}px`);
      root.style.setProperty("--py", `${event.clientY}px`);
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const e of embers) {
        const dx = e.x - mouse.x;
        const dy = e.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16900) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d2 / 16900) * 0.45;
          e.vx += (dx / d) * f;
          e.vy += (dy / d) * f;
        }
        e.vx *= 0.97;
        e.vy += (e.base - e.vy) * 0.03;
        e.x += e.vx + Math.sin((e.y + e.x) * 0.01) * 0.2;
        e.y += e.vy;
        if (e.y < -10 || e.x < -10 || e.x > w + 10) Object.assign(e, spawn(false));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,${150 + Math.floor(e.life * 80)},60,${0.3 + e.life * 0.5})`;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="mouse-glow" />
      <canvas aria-hidden="true" className="mouse-embers" ref={canvasRef} />
    </>
  );
}
