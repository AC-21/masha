type DotsProps = {
  count: number;
  activeIndex: number;
};

export default function Dots({ count, activeIndex }: DotsProps) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={
            "h-2 w-2 rounded-full transition-all " +
            (i === activeIndex ? "bg-foreground/80 w-3" : "bg-foreground/30")
          }
        />
      ))}
    </div>
  );
}


