export default function StickyMM() {
  return (
    <>
      {/* Desktop: Fixed to viewport top-right - only at xl breakpoint (1280px+) */}
      <div className="hidden xl:block fixed top-4 right-8 z-50 pointer-events-none select-none">
        <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">
          MM
        </span>
      </div>
      
      {/* Mobile/Tablet: Will be positioned inside the mobile container */}
    </>
  );
}


