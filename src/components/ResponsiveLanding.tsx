import CalendlyEmbed from "./CalendlyEmbed";
import { useContent } from "../lib/useContent";
import { useState } from "react";
import MobileCanvas from "./MobileCanvas";
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

      {/* Hero: image + story intro (hidden on lg+, where LandscapeCanvas handles the layout) */}
      <section className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-16 lg:hidden">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <h2 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[22px] sm:text-[28px] lg:text-[40px] leading-[1.15] mb-4 lg:mb-6">
              More about my practice
            </h2>
            <div className="space-y-4 sm:space-y-5 lg:space-y-7 text-[14px] leading-[28px] lowercase font-['Inter'] max-w-prose">
              {content.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={content.images.portrait}
              alt="Portrait"
              className="w-full h-auto rounded-[24px] sm:rounded-[28px] lg:rounded-[37px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Divider (hidden on lg+ because LandscapeCanvas owns layout there) */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 py-8 lg:py-12 lg:hidden">
        <div className="border-t border-dashed border-[#d4cccc]" />
      </div>

      {/* Desktop parity: use LandscapeCanvas with live content */}
      <section className="hidden lg:block">
        <LandscapeCanvas content={content as any} />
      </section>

      {/* Mobile: strict parity frame — use reference MobileCanvas with live content */}
      <section className="block lg:hidden">
        <MobileCanvas content={content as any} />
      </section>
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


