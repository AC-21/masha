import { useContent } from "../lib/useContent";
import { useState, useEffect, useRef } from "react";
import LandscapeCanvas from "./LandscapeCanvas";

export default function ResponsiveLanding() {
  const { content } = useContent();
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#fefef7] text-black">
      {/* Tagline intentionally omitted on all breakpoints */}

      {/* Mobile hero: portrait + about (scrollable) */}
      <MobileHero content={content as any} />

      {/* Divider hidden on mobile */}
      <div className="hidden lg:hidden" />

      {/* Desktop parity: use LandscapeCanvas with live content */}
      <section className="hidden lg:block">
        <LandscapeCanvas content={content as any} />
      </section>

      {/* Mobile: My Work V2 — sticky header, modalities scroll under, glass CTA at bottom */}
      <MobileModalities content={content as any} />
    </main>
  );
}

function Expandable({ textShort, textLong }: { textShort: string; textLong: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="font-['Inter'] text-[12px] leading-6 lowercase max-w-prose">
      <p className="mb-1">{textShort}</p>
      {open && <p className="mt-1">{textLong}</p>}
      <button
        className="mt-1 text-[12px] underline"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}

function MobileHero({ content }: { content: any }) {
  return (
    <section className="block lg:hidden px-4 pt-4">
      {/* Portrait */}
      <img
        src={content.images?.portrait}
        alt="Portrait"
        className="w-full h-auto rounded-[28px] object-cover"
      />
      {/* About */}
      <h2 className="mt-6 font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[20px]">
        Here for your liberation
      </h2>
      <div
        className="mt-2 font-['Inter'] lowercase text-[14px] leading-[24px] max-h-[320px] overflow-y-auto pr-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {content.about?.map((p: string, i: number) => (
          <p key={i} className="mb-4">{p}</p>
        ))}
      </div>
    </section>
  );
}

function MobileModalities({ content }: { content: any }) {
  const listRef = useRef<HTMLDivElement>(null);
  // Glass CTA shows only when the My Work section is reached
  const [ctaVisible, setCtaVisible] = useState(false);
  const calUrl = (import.meta as any).env?.VITE_CALENDLY_URL || content?.cta?.href || 'https://calendly.com/';
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Observe the section container entering viewport
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      setCtaVisible(e.isIntersecting);
    }, { root: null, threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="block lg:hidden px-4 pb-28" ref={listRef}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#fefef7] py-3">
        <h3 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px]">My Work</h3>
        {/* Blur veil */}
        <div className="relative h-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(254,254,247,1), rgba(254,254,247,0))',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              backdropFilter: 'blur(6px)'
            }}
          />
        </div>
      </div>

      {/* Modalities list */}
      <div className="pt-2 space-y-8">
        {content.modalities.map((m: any, i: number) => (
          <div key={i}>
            <h4 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px] mb-1">
              {m.title.replace(/\*+/g, '').trim()}
            </h4>
            <Expandable textShort={m.short} textLong={m.long} />
          </div>
        ))}
      </div>

      {/* Glass CTA sticky at bottom when in modalities */}
      <div
        className={`fixed left-0 right-0 bottom-3 z-30 px-4 transition-opacity ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={() => {
            const el = document.getElementById('calendly');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.open(calUrl, '_blank');
            }
          }}
          className="w-full backdrop-blur-md bg-white/30 border border-white/50 shadow-lg rounded-full text-center py-3 font-['Roboto Mono'] uppercase text-[12px]"
        >
          Interested in a session
        </button>
      </div>
    </section>
  );
}


