export default function StickyMM() {
  return (
    <>
      {/* Desktop/Tablet: Fixed to viewport top-right */}
      <div className="hidden md:block fixed top-4 right-8 z-50 pointer-events-none select-none">
        <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">
          MM
        </span>
      </div>
      
      {/* Mobile: Will be positioned inside the mobile container */}
    </>
  );
}


