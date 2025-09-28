import { useEffect, useMemo, useRef, useState } from "react";

type CalendlyEmbedProps = {
  url?: string;
  height?: number | string;
  primaryColor?: string; // hex without '#'
  textColor?: string;    // hex without '#'
  hideGDPR?: boolean;
  hideDetails?: boolean;
  className?: string;
  rounded?: number; // px radius for container
};

export default function CalendlyEmbed(props: CalendlyEmbedProps) {
  const {
    url = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/mashamaria/returning-clients-clone",
    height = 700,
    primaryColor = "3b5849",
    textColor = "ffffff",
    hideGDPR = true,
    hideDetails = true,
    className,
    rounded = 40,
  } = props;

  const finalUrl = useMemo(() => {
    const u = new URL(url);
    if (hideGDPR) u.searchParams.set("hide_gdpr_banner", "1");
    if (hideDetails) {
      u.searchParams.set("hide_event_type_details", "1");
      u.searchParams.set("hide_landing_page_details", "1");
    }
    u.searchParams.set("primary_color", primaryColor);
    u.searchParams.set("text_color", textColor);
    return u.toString();
  }, [url, hideGDPR, hideDetails, primaryColor, textColor]);

  const ref = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load Calendly script lazily once visible
            if (!document.querySelector('script[data-calendly]')) {
              const s = document.createElement("script");
              s.src = "https://assets.calendly.com/assets/external/widget.js";
              s.async = true;
              s.setAttribute('data-calendly', 'true');
              s.onload = () => setScriptLoaded(true);
              document.body.appendChild(s);
            } else {
              setScriptLoaded(true);
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ borderRadius: rounded, overflow: "hidden" }}
    >
      <div
        className="calendly-inline-widget"
        data-url={finalUrl}
        style={{ minWidth: 320, height }}
      />
      {!scriptLoaded && (
        <div className="grid place-items-center" style={{ height }}>
          <span className="text-muted-foreground text-sm">Loading scheduler…</span>
        </div>
      )}
    </div>
  );
}


