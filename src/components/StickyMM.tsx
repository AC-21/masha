export default function StickyMM() {
  // Align to viewport right on desktop; align to right edge of mobile container on small screens
  // Mobile container max width is 560px with 16px side padding
  const mobileRight = "max(calc((100vw - 560px) / 2 + 16px), 16px)";
  return (
    <div className="fixed top-4 z-50 pointer-events-none select-none" style={{ right: mobileRight }}>
      <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black md:hidden">MM</span>
      <span className="hidden md:inline font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black" style={{ right: 16 }}>
        MM
      </span>
    </div>
  );
}


