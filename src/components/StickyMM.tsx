export default function StickyMM() {
  // Mobile: align to the right edge of the centered mobile container (max-w 560, px-4)
  const mobileRight = "max(calc((100vw - 560px) / 2 + 16px), 16px)";
  return (
    <>
      {/* Desktop & tablet */}
      <div className="hidden md:block fixed top-4 right-4 z-50 pointer-events-none select-none">
        <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">MM</span>
      </div>
      {/* Mobile */}
      <div className="block md:hidden fixed top-4 z-50 pointer-events-none select-none" style={{ right: mobileRight }}>
        <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">MM</span>
      </div>
    </>
  );
}


