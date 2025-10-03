import CalendlyEmbed from "./CalendlyEmbed";
import { useContent } from "../lib/useContent";
import { useState } from "react";
import MobileParity from "./MobileParity";

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

      {/* Hero: image + story intro */}
      <section className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-16">
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

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        <div className="border-t border-dashed border-[#d4cccc]" />
      </div>

      {/* Modalities + Calendly (Desktop / Tablet) */}
      <section className="hidden lg:block mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Modalities */}
          <div className="lg:col-span-7">
            <h3 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[18px] sm:text-[22px] mb-3">Modalities</h3>
            <p className="uppercase text-[12px] text-[#525050] mb-6 font-['Roboto Mono'] leading-[18px]">
              every session is unique & guided by your overall intentions. You will be received where you are,
              <br /> and we will get to where we need to go. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {content.modalities.slice(0, 4).map((m) => (
                <div key={m.title}>
                  <h4 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.04em] text-[18px] mb-2">{m.title}</h4>
                  <p className="font-['Inter'] text-[12px] leading-[20px] lowercase max-w-prose">
                    {m.short}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Calendly */}
          <div className="lg:col-span-5">
            <h3 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px] sm:text-[18px] mb-4">
              {content.cta.label}
            </h3>
            <CalendlyEmbed
              className="w-full"
              rounded={40}
              height={570}
              offsetY={-20}
              primaryColor="3b5849"
              textColor="ffffff"
              url={import.meta.env.VITE_CALENDLY_URL}
            />
          </div>
        </div>
      </section>

      {/* Mobile: strict parity frame with content slotted into reference layout */}
      <section className="block lg:hidden">
        <MobileParity content={content as any} />
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


