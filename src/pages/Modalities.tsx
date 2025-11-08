import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import MenuSheet from "../components/MenuSheet";
import Dots from "../components/Dots";
import useSwipe from "../lib/useSwipe";
import { loadModalitiesFromSeed, type LoadedModality } from "../lib/modalitiesLoader";
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
  navigate: (to: "/" | "/about" | "/modalities" | "/poetry") => void;
};

export default function Modalities({ navigate }: Props) {
  const [mods, setMods] = useState<LoadedModality[]>([]);
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const [manualExpand, setManualExpand] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [showLong, setShowLong] = useState(false);
  useEffect(() => {
    setMods(loadModalitiesFromSeed());
  }, []);
  useEffect(() => {
    setShowLong(false);
  }, [index]);

  // Detect entering the slides area (after instructions)
  const [anchorRef, enteredSlides] = useInView<HTMLDivElement>({
    // Trigger as soon as the anchor approaches the top of the viewport.
    // This makes the card expand to full-screen earlier and consistently across devices.
    rootMargin: "0px 0px -98% 0px",
    threshold: 0,
  }, false);
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
      setIndex((i) => {
        const len = mods.length || 1;
        return (i + delta + len) % len;
      });
    },
    [mods.length]
  );

  const swipe = useSwipe({ onSwipeLeft: () => go(1), onSwipeRight: () => go(-1) });

  const cardHeightClass = useMemo(
    () => (isExpanded ? "min-h-[100dvh]" : ""),
    [isExpanded]
  );

  const collapsedClasses = "w-full rounded-t-[28px] rounded-b-none px-6 py-7 border-white/45 shadow-lg";
  const expandedClasses = "relative w-full h-full rounded-none px-0 pt-14 pb-24 border-white/30 shadow-xl";
  const transitionDuration = reducedMotion ? "duration-0" : "duration-500";
  const cardBaseClass = "backdrop-blur-md transition-all border";

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

  const collapse = useCallback(() => {
    setManualExpand(false);
    setEnteredByScroll(false);
    try {
      if (typeof window !== "undefined") {
        window.scrollBy({ top: -48, behavior: "auto" });
      }
    } catch {
      // no-op
    }
  }, []);
  const expand = useCallback(() => {
    setManualExpand(true);
  }, []);
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isExpanded && e.deltaY > 6) {
        expand();
      } else if (isExpanded && e.deltaY < -6) {
        collapse();
      }
    },
    [isExpanded, expand, collapse]
  );
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (!isExpanded && dy > 18) {
        expand();
      } else if (isExpanded && dy < -18) {
        collapse();
      }
    },
    [isExpanded, touchStartY, expand, collapse]
  );

  // Ensure long content is hidden when returning to teaser
  useEffect(() => {
    if (!isExpanded) setShowLong(false);
  }, [isExpanded]);

  const handleReadMore = useCallback(() => {
    // If still in teaser state, expand first, then show long content
    if (!isExpanded) {
      expand();
      const delayMs = reducedMotion ? 0 : 520;
      window.setTimeout(() => setShowLong(true), delayMs);
    } else {
      setShowLong((s) => !s);
    }
  }, [isExpanded, expand, reducedMotion]);

  // Deep-link support via hash: e.g., /modalities#ifs
  useEffect(() => {
    if (typeof window === "undefined" || mods.length === 0) return;
    const fromHash = window.location.hash.replace(/^#/, "");
    if (!fromHash) return;
    const i = mods.findIndex((m) => m.id === fromHash);
    if (i >= 0) setIndex(i);
  }, [mods]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = mods[index]?.id;
    if (!id) return;
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(history.state, "", url);
  }, [index, mods]);

  // Keyboard navigation with ArrowLeft / ArrowRight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement | null)?.isContentEditable) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

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

      {/* Hero (locked) */}
      <section className="sticky top-0 z-30 h-[100svh] w-full pointer-events-none">
        <div
          className={
            "relative mx-auto flex h-full max-w-[560px] flex-col justify-end gap-8 px-6 pt-28 transition-opacity " +
            transitionDuration +
            " " +
            (isExpanded ? "opacity-0 pointer-events-none" : "opacity-100")
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
        </div>
      </section>

      {/* Intersection sentinel for scroll-based expansion */}
      <div ref={anchorRef} className="h-[1px] w-full" />

      {/* Full screen carousel (slides into place after hero). */}
      <section
        className="relative z-20 min-h-[160vh] w-full"
        style={{
          marginTop: -collapsedHeight,
          transition: reducedMotion ? undefined : "margin-top 500ms ease",
          overflow: isExpanded ? "hidden" : "visible",
        }}
      >
        {/* Fixed viewport overlay (transparent while collapsed, opaque when expanded) */}
        <div
          className={
            "fixed inset-0 z-40 transition-all " + transitionDuration + " ease-out pointer-events-none"
          }
          style={{
            height: isExpanded ? "100dvh" : "100svh",
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
            role="region"
            aria-label="Modalities carousel"
          >
            {mods.map((m, i) => (
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
                  {/* Background treatments only when expanded (no color tint overlay) */}
                  {isExpanded && (
                    <>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/35" />
                    </>
                  )}

                  {/* Content card */}
                  <div
                    className={`z-40 flex h-full w-full flex-col pointer-events-auto ${
                      isExpanded ? "fixed inset-0 items-stretch" : "relative items-center justify-end"
                    }`}
                    onWheel={handleWheel}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                  >
                    <div
                      className={`${cardBaseClass} ${transitionDuration} ${isExpanded ? expandedClasses : collapsedClasses} ${cardHeightClass}`}
                      style={{
                        backgroundColor: m.color,
                        borderColor: (m.textColor || "#000") + "33",
                        transform: isExpanded
                          ? "translateY(0px)"
                          : `translateY(0px)`,
                        transformOrigin: "center top",
                      }}
                    >
                      <div className={`flex h-full flex-col justify-start gap-4 ${isExpanded ? "px-6" : ""}`}>
                        <h3
                          className="whitespace-pre-line text-[30px] font-[750] leading-tight"
                          style={{
                            fontFamily: "Satoshi, Inter, system-ui, sans-serif",
                            color: m.textColor || "var(--color-foreground)",
                          }}
                        >
                          {m.title}
                        </h3>
                        <div className={showLong ? "overflow-y-auto pr-1" : ""} style={{ maxHeight: showLong ? "46vh" : undefined }}>
                          {(() => {
                            const text = showLong && m.long ? m.excerpt + "\n\n" + (m.long || "") : m.excerpt;
                            const paragraphs = (text || "")
                              .split(/\r?\n\s*\r?\n/g)
                              .map((p) => p.trim())
                              .filter(Boolean);
                            return paragraphs.map((p, idx) => (
                              <p
                                key={idx}
                                className={"text-[16px] leading-[28px] " + (idx > 0 ? "mt-3" : "")}
                                style={{ color: m.textColor ? m.textColor + "CC" : "var(--color-foreground)" }}
                              >
                                {p}
                              </p>
                            ));
                          })()}
                        </div>
                        {m.long ? (
                          <div className="pt-2">
                            <div
                              className="block cursor-pointer select-none text-[13px] font-medium uppercase tracking-[0.16em]"
                               onClick={handleReadMore}
                              style={{ color: (m.textColor || "#000") + "99" }}
                            >
                              {showLong ? "Show Less" : "Read More"}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {isExpanded && (
              <Dots
                count={mods.length}
                activeIndex={index}
                activeColor={(mods[index]?.textColor || "#000") + ""}
                inactiveColor={(mods[index]?.textColor || "rgba(0,0,0)") + "4D"}
              />
            )}
            <div className="sr-only" aria-live="polite">
              {mods[index]?.title}
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


