import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Dots from "../components/Dots";
import useSwipe from "../lib/useSwipe";
import { MODALITIES } from "../data/modalities";
import useInView from "../lib/useInView";
const bgUrl = new URL("../assets/Background.jpg", import.meta.url).href;

type Props = {
  navigate: (to: "/" | "/about" | "/modalities") => void;
};

export default function Modalities({ navigate }: Props) {
  const [index, setIndex] = useState(0);

  // Detect entering the slides area (after instructions)
  const [anchorRef, enteredSlides] = useInView<HTMLDivElement>({
    rootMargin: "-5% 0px -85% 0px",
    threshold: 0.2,
  });

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + MODALITIES.length) % MODALITIES.length);
    },
    []
  );

  const swipe = useSwipe({ onSwipeLeft: () => go(1), onSwipeRight: () => go(-1) });

  const cardHeightClass = useMemo(
    () => (enteredSlides ? "min-h-[100svh]" : ""),
    [enteredSlides]
  );

  const collapsedClasses = "-mx-6 w-[calc(100%+3rem)] rounded-[28px] px-6 py-7 border-white/45 shadow-lg";
  const expandedClasses = "mx-0 w-full rounded-none px-6 pt-14 pb-24 border-white/30 shadow-xl";
  const cardBaseClass = "bg-white/88 backdrop-blur transition-all duration-500 border";

  const [peekOffset, setPeekOffset] = useState(140);

  useEffect(() => {
    const updatePeek = () => {
      if (typeof window === "undefined") return;
      const height = window.innerHeight;
      setPeekOffset(Math.round(Math.min(height * 0.35, 260)));
    };
    updatePeek();
    window.addEventListener("resize", updatePeek);
    return () => window.removeEventListener("resize", updatePeek);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevTouch = body.style.touchAction;
    if (enteredSlides) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouch;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouch;
    };
  }, [enteredSlides]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Static background layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${bgUrl})`,
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
        onMenuClick={() => {}}
      />

      {/* Hero */}
      <section className="relative z-20 min-h-screen w-full">
        <div
          className={
            "relative mx-auto flex min-h-screen max-w-[560px] flex-col justify-end gap-8 px-6 pb-24 pt-28 transition-all duration-500 " +
            (enteredSlides ? "translate-y-8 opacity-0 pointer-events-none" : "opacity-100")
          }
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
      <section className="relative z-10 min-h-[140vh] w-full overflow-hidden">
        {/* Sticky viewport to create the immersive full-screen section */}
        <div
          className={
            "transition-all duration-500 ease-out " +
            (enteredSlides
              ? "sticky top-0 h-[100svh] z-30"
              : "absolute inset-x-0 bottom-0 z-20 pointer-events-none")
          }
          style={enteredSlides ? undefined : { bottom: -peekOffset }}
        >
          <div
            {...swipe}
            className="relative mx-auto flex w-full max-w-[560px] items-end px-0 pb-0 transition-transform duration-500 ease-out"
            style={{
              height: enteredSlides ? "100svh" : peekOffset + 260,
              touchAction: enteredSlides ? "pan-x" : "pan-y",
              overscrollBehaviorY: enteredSlides ? "contain" : "auto",
            }}
          >
            {MODALITIES.map((m, i) => (
              <article
                key={m.id}
                className="absolute inset-0 flex h-full w-full flex-col"
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  transition: "transform 300ms ease",
                }}
              >
                <div className="relative flex h-full w-full flex-col">
                  {/* Dim overlay on static background */}
                  <div className="absolute inset-0 bg-black/20" />
                  {/* Pastel color wash overlay */}
                  <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: m.color, opacity: 0.55 }} />
                  {/* Additional soft vignette for readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/35" />

                  {/* Content card */}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-end">
                    <div
                      className={`${cardBaseClass} ${enteredSlides ? expandedClasses : collapsedClasses} ${cardHeightClass}`}
                      style={{
                        transform: enteredSlides ? "scale(1)" : "scale(0.96)",
                        transformOrigin: "center top",
                      }}
                    >
                      <div className="flex h-full flex-col justify-start gap-4">
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

            <Dots count={MODALITIES.length} activeIndex={index} />
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-b from-transparent to-background/40" />
          </div>
        </div>
      </section>
    </div>
  );
}


