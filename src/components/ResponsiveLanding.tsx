import { useContent } from "../lib/useContent";
import { useState, useEffect, useRef } from "react";
import LandscapeCanvas from "./LandscapeCanvas";

export default function ResponsiveLanding() {
  const { content } = useContent();
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#fefef7] text-black">
      {/* Header / Tagline */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        <div className="relative flex items-start justify-between gap-6">
          <h1 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.08em] text-[1.125rem] sm:text-[1.375rem] lg:text-[32px] leading-[1.2] max-w-[46ch]">
            {content.tagline}
          </h1>
          {/* Mobile/Tablet MM logo — anchored to the right edge of image when possible */}
          <span className="xl:hidden absolute right-[48px] top-[0px] font-['Caveat'] font-bold uppercase text-[28px] sm:text-[34px] lg:text-[39px] leading-[28px] text-black select-none">MM</span>
        </div>
      </div>

      {/* Hero removed on mobile to avoid duplication; desktop handled by LandscapeCanvas */}
      <section className="hidden lg:pt-16 lg:hidden" />

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

function MobileModalities({ content }: { content: any }) {
  const listRef = useRef<HTMLDivElement>(null);
  // Glass CTA visibility when user reaches modalities
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setCtaVisible(e.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="block lg:hidden px-4 pb-24">
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
      <div ref={listRef} className="pt-2 space-y-8">
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
        <a
          href="#calendly"
          className="block backdrop-blur-md bg-white/30 border border-white/50 shadow-lg rounded-full text-center py-3 font-['Roboto Mono'] uppercase text-[12px]"
        >
          Interested in a session
        </a>
      </div>
    </section>
  );
}


