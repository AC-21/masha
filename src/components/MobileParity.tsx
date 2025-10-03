import ScaleFrame from "./ScaleFrame";
import type { FC } from "react";

type Content = {
  tagline: string;
  about: string[];
  images: { portrait: string };
  modalities: { title: string; short: string; long: string }[];
};

const MobileParity: FC<{ content: Content }> = ({ content }) => {
  const firstModality = content.modalities?.[0];
  return (
    <ScaleFrame designWidth={384} designHeight={1433} minScale={0.9} maxScale={1} className="mx-auto max-w-[560px]">
      <div className="relative w-96 h-[1433px] overflow-hidden mx-auto" style={{ backgroundColor: '#FEFEF7' as const }}>
        {/* MM logo */}
        <div className="xl:hidden absolute right-[48px] top-[20px] z-50 pointer-events-none select-none">
          <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">MM</span>
        </div>

        {/* Tagline */}
        <div className="absolute left-[44px] top-[20px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-tight">
          {content.tagline}
        </div>

        {/* Portrait */}
        <img
          src={content.images.portrait || "/images/portrait-480.jpg"}
          alt="Portrait"
          width={279}
          height={372}
          className="absolute left-1/2 -translate-x-1/2 top-[84px] w-72 h-96 rounded-xl object-cover"
          decoding="async"
        />

        {/* Section title */}
        <div className="absolute left-[46px] top-[508px] text-black text-xl font-bold font-['Roboto_Mono'] uppercase leading-7">
          More About my Practice
        </div>

        {/* About body (clipped to reference box) */}
        <div className="absolute left-[46px] top-[543px] w-72 h-[388px] text-black text-xs font-medium font-['Inter'] lowercase leading-7 overflow-hidden">
          {content.about.map((p, i) => (
            <p key={i} className="mb-4">{p}</p>
          ))}
        </div>

        {/* Modalities heading and divider */}
        <div className="absolute left-[42px] top-[941px] text-black text-xl font-bold font-['Roboto_Mono'] uppercase leading-7">Modalities</div>
        <div className="absolute left-[184px] top-[941px] text-stone-300 text-base font-bold font-['Roboto_Mono'] uppercase leading-7">-----------------</div>

        {/* Modalities subtitle - italic */}
        <div className="absolute left-[42px] top-[971px] w-[300px] text-black/70 text-[10px] font-['Inter'] italic leading-4">
          EVERY SESSION IS UNIQUE & GUIDED BY YOUR OVERALL DESIRES. WE WILL NOT BE CONSTRAINED BY A SPECIFIC MODALITY; AND HERE'S SOME INFO BELOW ON WHERE WE MAY GO.
        </div>

        {/* Example modality slot (uses first modality from content) */}
        {firstModality && (
          <>
            <div className="absolute left-[63px] top-[1030px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
              {firstModality.title}
            </div>
            <div className="absolute left-[93px] top-[1064px] w-[220px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-7">
              {firstModality.short}
            </div>
          </>
        )}
      </div>
    </ScaleFrame>
  );
};

export default MobileParity;
