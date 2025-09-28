import { useEffect, useState } from "react";

export default function StickyMM() {
  const [rightPx, setRightPx] = useState(16);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 768) {
        // Desktop/tablet: fixed to viewport right
        setRightPx(16);
      } else {
        // Mobile: align right edge to image's right edge
        const el = document.querySelector<HTMLElement>(".hero-image");
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = Math.max(16, Math.round(window.innerWidth - rect.right));
          setRightPx(offset);
        } else {
          // Fallback to container alignment via CSS vars
          const containerMax = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--container-max")) || 560;
          const containerPad = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--container-pad")) || 16;
          const imageOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--image-offset")) || 0;
          const offset = Math.max(16, Math.round((window.innerWidth - containerMax) / 2 + containerPad + imageOffset));
          setRightPx(offset);
        }
      }
    };
    update();
    const ro = new ResizeObserver(() => update());
    const target = document.querySelector<HTMLElement>(".hero-image") || document.body;
    ro.observe(target);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="fixed top-4 z-50 pointer-events-none select-none" style={{ right: rightPx }}>
      <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">MM</span>
    </div>
  );
}


