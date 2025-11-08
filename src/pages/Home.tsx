import { useMemo, useState } from "react";
import useSwipe from "../lib/useSwipe";
import CalendlyButton from "../components/CalendlyButton";
import bgJpg from "../assets/Background.jpg";
import bgAvif from "../assets/Background.avif";
import bgWebp from "../assets/Background.webp";

type Props = {
  navigate: (to: "/" | "/about" | "/modalities" | "/poetry") => void;
};

export default function Home({ navigate }: Props) {
  const [showHint, setShowHint] = useState(true);
  const CALENDLY_URL =
    "https://calendly.com/mashamaria/returning-clients-clone?hide_event_type_details=1&hide_gdpr_banner=1";
  const swipe = useSwipe(
    useMemo(
      () => ({
        onSwipeLeft: () => {
          setShowHint(false);
          navigate("/about");
        },
        onSwipeRight: () => {
          setShowHint(false);
          navigate("/modalities");
        },
      }),
      [navigate]
    )
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `image-set(url(${bgAvif}) type(\"image/avif\"), url(${bgWebp}) type(\"image/webp\"), url(${bgJpg}) type(\"image/jpeg\"))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-background/45" />
      </div>
      {/* Dashed border frame */}
      <div className="pointer-events-none fixed inset-3 z-20 overflow-hidden rounded-[20px]">
        <div
          className="absolute inset-x-0 top-0 h-[6px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.95) 0 14px, rgba(255,255,255,0) 14px 28px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[6px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.95) 0 14px, rgba(255,255,255,0) 14px 28px)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[6px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.95) 0 14px, rgba(255,255,255,0) 14px 28px)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[6px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.95) 0 14px, rgba(255,255,255,0) 14px 28px)",
          }}
        />
      </div>

      <div
        {...swipe}
        onTouchStart={(e) => {
          setShowHint(false);
          // @ts-ignore - forward to swipe handler if present
          swipe.onTouchStart && swipe.onTouchStart(e);
        }}
        className="relative z-10 mx-auto flex min-h-screen max-w-[560px] flex-col items-center px-6 py-16"
      >
        <h1
          className="mt-2 text-center text-[36px] leading-tight tracking-[0.02em]"
          style={{ fontFamily: "'Agu Display', 'Author', system-ui, sans-serif", fontWeight: 400 }}
        >
          Masha Maria
        </h1>
        {/* Gesture hint */}
        <div
          className={
            "mt-2 text-[12px] uppercase tracking-[0.18em] text-white/85 transition-all duration-300 " +
            (showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1")
          }
        >
          Swipe left for About · right for Modalities
        </div>

        <nav className="mt-14 w-full max-w-[320px] text-center">
          <ul className="flex flex-col gap-6 text-[20px]">
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/about")}>
                About
              </button>
            </li>
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/modalities")}>
                Modalities
              </button>
            </li>
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/poetry")}>
                Poetry
              </button>
            </li>
            <li>
              <CalendlyButton className="underline-offset-2 hover:underline" url={CALENDLY_URL}>
                Book a Session
              </CalendlyButton>
            </li>
          </ul>
        </nav>
        

        <div className="mt-auto w-full pb-12">
          <blockquote className="mx-auto max-w-[460px] text-center text-[16px] italic opacity-80">
            A quote you’d like for people to see — or a rotation of a few.
          </blockquote>
        </div>
      </div>
    </div>
  );
}


