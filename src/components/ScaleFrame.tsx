import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react";

type ScaleFrameProps = PropsWithChildren<{
  designWidth: number;
  designHeight: number;
  className?: string;
}>;

/**
 * Scales an absolutely-positioned Figma frame to fit the container width
 * while preserving the original pixel layout and aspect ratio.
 */
export default function ScaleFrame({ designWidth, designHeight, className, children }: ScaleFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const next = width / designWidth;
      setScale(next > 0 ? next : 1);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  const height = Math.round(designHeight * scale);

  return (
    <div ref={containerRef} className={className ? className : ""} style={{ position: "relative", width: "100%", height }}>
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


