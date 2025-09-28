export default function StickyMM() {
  // Align to the right edge of the active content container using CSS vars
  // Vars provided by the wrapper: --container-max, --container-pad
  const right = "max(calc((100vw - var(--container-max, 560px)) / 2 + var(--container-pad, 16px)), 16px)";
  return (
    <div className="fixed top-4 z-50 pointer-events-none select-none" style={{ right }}>
      <span className="font-['Caveat'] font-bold uppercase text-[39px] leading-[28px] text-black">MM</span>
    </div>
  );
}


