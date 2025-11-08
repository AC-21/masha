import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import MenuSheet from "../components/MenuSheet";
import Dots from "../components/Dots";
import useSwipe from "../lib/useSwipe";
import { MODALITIES } from "../data/modalities";
import useInView from "../lib/useInView";
import usePrefersReducedMotion from "../lib/usePrefersReducedMotion";
import bgJpg from "../assets/Background.jpg";
import bgAvif from "../assets/Background.avif";
import bgWebp from "../assets/Background.webp";

type LayoutMetrics = {
  collapsedHeight: number;
  peekLift: number;
};

const DEFAULT_LAYOUT: LayoutMetrics = { collapsedHeight: 300, peekLift: 0 };

const computeLayout = (viewportHeight: number): LayoutMetrics => {
  const collapsedHeight = Math.round(Math.max(240, viewportHeight * 0.33));
  const peekLift = 0; // we want a stable 33% teaser sitting at the bottom
  return { collapsedHeight, peekLift };
};

type Props = {
  navigate: (to: "/" | "/about" | "/modalities") => void;
};

export default function Modalities({ navigate }: Props) {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const [manualExpand, setManualExpand] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Detect entering the slides area (after instructions)
  const [anchorRef, enteredSlides] = useInView<HTMLDivElement>({
    // Trigger as soon as the anchor approaches the top of the viewport.
    // This makes the card expand to full-screen earlier and consistently across devices.
    rootMargin: "0px 0px -98% 0px",
    threshold: 0,
  });
  const [enteredByScroll, setEnteredByScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const node = (anchorRef as any)?.current as HTMLElement | null;
      if (!node) return;
      const top = node.getBoundingClientRect().top;
      setEnteredByScroll(top <= 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [anchorRef]);
  const isExpanded = manualExpand || enteredSlides || enteredByScroll;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + MODALITIES.length) % MODALITIES.length);
    },
    []
  );

  const swipe = useSwipe({ onSwipeLeft: () => go(1), onSwipeRight: () => go(-1) });

  const cardHeightClass = useMemo(
    () => (isExpanded ? "min-h-[100dvh]" : ""),
    [isExpanded]
  );

  const collapsedClasses = "w-full rounded-[28px] px-6 py-7 border-white/45 shadow-lg";
  const expandedClasses = "relative w-full h-full rounded-none px-0 pt-14 pb-24 border-white/30 shadow-xl";
  const transitionDuration = reducedMotion ? "duration-0" : "duration-500";
  const cardBaseClass = "bg-white/88 backdrop-blur transition-all border";

  const [layout, setLayout] = useState<LayoutMetrics>(() => {
    if (typeof window === "undefined") return DEFAULT_LAYOUT;
    return computeLayout(window.innerHeight);
  });
  const { collapsedHeight, peekLift } = layout;
  const peekRaise = 0;
  const heroPaddingBottom = isExpanded ? 96 : collapsedHeight + 96;

  useEffect(() => {
    const updateLayout = () => {
      if (typeof window === "undefined") return;
      setLayout(computeLayout(window.innerHeight));
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Lock vertical scroll ONLY when expanded
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    const prevOverflowBody = body.style.overflow;
    const prevTouchBody = body.style.touchAction;
    const prevOverflowHtml = html.style.overflow;
    if (isExpanded) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = prevOverflowBody;
      body.style.touchAction = prevTouchBody;
      html.style.overflow = prevOverflowHtml;
    }
    return () => {
      body.style.overflow = prevOverflowBody;
      body.style.touchAction = prevTouchBody;
      html.style.overflow = prevOverflowHtml;
    };
  }, [isExpanded]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isExpanded && e.deltaY > 6) {
        setManualExpand(true);
      }
    },
    [isExpanded]
  );
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isExpanded && touchStartY !== null) {
        const dy = touchStartY - e.touches[0].clientY;
        if (dy > 18) setManualExpand(true);
      }
    },
    [isExpanded, touchStartY]
  );

  // Deep-link support via hash: e.g., /modalities#ifs
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromHash = window.location.hash.replace(/^#/, "");
    if (!fromHash) return;
    const i = MODALITIES.findIndex((m) => m.id === fromHash);
    if (i >= 0) setIndex(i);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = MODALITIES[index]?.id;
    if (!id) return;
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(history.state, "", url);
  }, [index]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Static background layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `image-set(url(${bgAvif}) type("image/avif"), url(${bgWebp}) type("image/webp"), url(${bgJpg}) type("image/jpeg"))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-background/45" />
      </div>
      <Header
        title={
          <span
            className="opacity-70 font-[750]"
            style={{ fontFamily: "Satoshi, Inter, system-ui, sans-serif" }}
          >
            Modalities
          </span>
        }
        onLogoClick={() => navigate("/")}
        onMenuClick={() => setMenuOpen(true)}
      />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      {/* Hero */}
      <section className="relative z-20 min-h-[100svh] w-full">
        <div
          className={
            "relative mx-auto flex min-h-screen max-w-[560px] flex-col justify-end gap-8 px-6 pb-8 pt-28 transition-all " +
            transitionDuration +
            " " +
            (isExpanded ? "translate-y-8 opacity-0 pointer-events-none" : "opacity-100")
          }
          style={{ paddingBottom: `${heroPaddingBottom}px` }}
        >
          <div className="space-y-4 text-[16px] leading-[28px] text-foreground/85">
            <p>this is a quick sentence describing how sessions are unique.</p>
            <p>followed by a swipe down to explore the modalities i work with.</p>
          </div>

          <div className="flex justify-center text-[12px] uppercase tracking-[0.22em] text-foreground/55">
            <span>Scroll</span>
          </div>

          <div ref={anchorRef} className="h-[1px] w-full" />
        </div>
      </section>

      {/* Full screen carousel (slides into place after hero). */}
      <section
        className="relative z-20 min-h-[160vh] w-full"
        style={{
          marginTop: -collapsedHeight,
          transition: reducedMotion ? undefined : "margin-top 500ms ease",
          overflow: "hidden",
        }}
      >
        {/* Sticky (collapsed) → Fixed (expanded) viewport to create the immersive full-screen section */}
        <div
          className={
            "transition-all " + transitionDuration + " ease-out " +
            (isExpanded
              ? "fixed inset-0 z-40"
              : "sticky top-0 z-40")
          }
          style={{
            height: isExpanded ? undefined : "100svh",
          }}
        >
          <div
            {...swipe}
            className={"relative flex w-full items-end px-0 pb-0 transition-transform " + transitionDuration + " ease-out"}
            style={{
              height: isExpanded ? "100dvh" : "100svh",
              touchAction: isExpanded ? "pan-x" : "pan-y",
              overscrollBehaviorY: isExpanded ? "contain" : "auto",
              overflow: "hidden",
            }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            role="region"
            aria-label="Modalities carousel"
          >
            {MODALITIES.map((m, i) => (
              <article
                key={m.id}
                className="absolute inset-0 flex h-full w-full flex-col"
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  transition: reducedMotion ? "none" : "transform 300ms ease",
                }}
                aria-hidden={i !== index}
              >
                <div className="relative flex h-full w-full flex-col">
                  {/* Background treatments only when expanded */}
                  {isExpanded && (
                    <>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: m.color, opacity: 0.55 }} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/35" />
                    </>
                  )}

                  {/* Content card */}
                  <div className={`z-40 flex h-full w-full flex-col ${isExpanded ? "fixed inset-0 items-stretch" : "relative items-center justify-end"}`}>
                    <div
                      className={`${cardBaseClass} ${transitionDuration} ${isExpanded ? expandedClasses : collapsedClasses} ${cardHeightClass}`}
                      style={{
                        transform: isExpanded
                          ? "translateY(0px)"
                          : `translateY(0px)`,
                        transformOrigin: "center top",
                      }}
                    >
                      <div className={`flex h-full flex-col justify-start gap-4 ${isExpanded ? "px-6" : ""}`}>
                        <h3
                          className="whitespace-pre-line text-[30px] font-[750] leading-tight text-foreground"
                          style={{ fontFamily: "Satoshi, Inter, system-ui, sans-serif" }}
                        >
                          {m.title}
                        </h3>
                        <p className="text-[16px] leading-[28px] text-foreground/88">{m.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {isExpanded && <Dots count={MODALITIES.length} activeIndex={index} />}
            <div className="sr-only" aria-live="polite">
              {MODALITIES[index]?.title}
            </div>
            {isExpanded && (
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-b from-transparent to-background/40" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


