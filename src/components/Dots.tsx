type DotsProps = {
  count: number;
  activeIndex: number;
  activeColor?: string;
  inactiveColor?: string;
};

export default function Dots({ count, activeIndex, activeColor, inactiveColor }: DotsProps) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={"h-2 w-2 rounded-full transition-all " + (i === activeIndex ? "w-3" : "")}
          style={{
            backgroundColor:
              i === activeIndex
                ? activeColor || "rgba(0,0,0,0.8)"
                : inactiveColor || "rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  );
}


