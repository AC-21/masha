import ScaleFrame from "./ScaleFrame";

export default function MobileCanvas() {
  return (
    <ScaleFrame designWidth={384} designHeight={1433} minScale={0.9} maxScale={1} className="mx-auto max-w-[560px]">
      <div className="relative w-96 h-[1433px] bg-stone-50 overflow-hidden mx-auto" style={{ ['--image-offset' as any]: 'calc((var(--container-max, 560px) - 18rem) / 2)' }}>
        {/* Mobile MM Logo - right edge aligned with image right edge */}
        <div className="md:hidden absolute right-[48px] top-[20px] z-50 pointer-events-none select-none">
          <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">
            MM
          </span>
        </div>
        {/* Tagline */}
        <div className="absolute left-[44px] top-[20px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-tight">
          One Sentence that lets people<br/>know what The good word is.
        </div>
        {/* Portrait */}
        <img src="/images/portrait-480.jpg" alt="Portrait" width="279" height="372" className="hero-image absolute left-1/2 -translate-x-1/2 top-[84px] w-72 h-96 rounded-xl object-cover" decoding="async" />
        {/* Section title */}
        <div className="absolute left-[46px] top-[508px] text-black text-xl font-bold font-['Roboto_Mono'] uppercase leading-7">More About my Practice</div>
        {/* Body paragraph */}
        <div className="absolute left-[46px] top-[543px] w-72 h-[388px] text-black text-xs font-medium font-['Inter'] lowercase leading-7 overflow-hidden">
          I have been falling more deeply in love with what I do. It has been a struggle, though, to express in a sentence or two what it really is. I cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort. It is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. My heart feels so full guiding and witnessing the beautiful transformations happening within people.
        </div>
        {/* Modalities heading and divider */}
        <div className="absolute left-[42px] top-[941px] text-black text-xl font-bold font-['Roboto_Mono'] uppercase leading-7">Modalities</div>
        <div className="absolute left-[184px] top-[941px] text-stone-300 text-base font-bold font-['Roboto_Mono'] uppercase leading-7">-----------------</div>
        {/* Example modality */}
        <div className="absolute left-[63px] top-[989px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">Modalitiy</div>
        <div className="absolute left-[93px] top-[1023px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[93px] top-[1133px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-7">Some text on who its for</div>
        <div className="absolute left-[93px] top-[1161px] text-black text-xs font-bold font-['Roboto_Mono'] uppercase leading-7">Some text on who its for</div>
        {/* Safari bottom mock removed */}
      </div>
    </ScaleFrame>
  );
}


