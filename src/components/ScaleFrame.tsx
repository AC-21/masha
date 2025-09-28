import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react";

type ScaleFrameProps = PropsWithChildren<{
  designWidth: number;
  designHeight: number;
  className?: string;
  /** Minimum scale so typography doesn't shrink excessively on tablet */
  minScale?: number; // e.g. 0.85
}>;

/**
 * Scales an absolutely-positioned Figma frame to fit the container width
 * while preserving the original pixel layout and aspect ratio.
 */
export default function ScaleFrame({ designWidth, designHeight, className, minScale = 0.85, children }: ScaleFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [viewportH, setViewportH] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const next = width / designWidth;
      const clamped = Math.max(next, minScale);
      setScale(clamped > 0 ? clamped : 1);
      setViewportH(window.innerHeight);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  const height = Math.round(designHeight * scale);

  return (
    <div
      ref={containerRef}
      className={className ? className : ""}
      style={{ position: "relative", width: "100%", height, maxHeight: viewportH ?? undefined, overflow: "auto" }}
    >
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}


