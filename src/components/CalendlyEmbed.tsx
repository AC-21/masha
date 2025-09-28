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
    url = import.meta.env.VITE_CALENDLY_URL || "",
    height = 700,
    primaryColor = "3b5849", // Keep the green accent
    textColor = "000000", // Black text to match site
    hideGDPR = true,
    hideDetails = false, // Show details for better user experience
    className,
    rounded = 40,
  } = props;

  const finalUrl = useMemo(() => {
    if (!url) return "";
    try {
      const u = new URL(url);
      if (hideGDPR) u.searchParams.set("hide_gdpr_banner", "1");
      if (hideDetails) {
        u.searchParams.set("hide_event_type_details", "1");
        u.searchParams.set("hide_landing_page_details", "1");
      }
      u.searchParams.set("primary_color", primaryColor);
      u.searchParams.set("text_color", textColor);
      u.searchParams.set("background_color", "fafaf9"); // Try to set background to match site
      return u.toString();
    } catch {
      return "";
    }
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

  // Inject custom styles to try to influence Calendly's appearance
  useEffect(() => {
    if (scriptLoaded && !document.querySelector('#calendly-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'calendly-custom-styles';
      style.innerHTML = `
        /* Try to style Calendly iframe content */
        .calendly-inline-widget iframe {
          font-family: 'Roboto Mono', 'Inter', monospace !important;
        }
        /* Style the container background */
        .calendly-inline-widget {
          background: #fafaf9 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [scriptLoaded]);

  // Show placeholder if no URL configured
  if (!finalUrl) {
    return (
      <div
        className={className}
        style={{ 
          borderRadius: rounded, 
          overflow: "hidden",
          height,
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center"
        }}
      >
        <div style={{ color: "#666", fontSize: "1.1rem", marginBottom: "1rem" }}>
          📅 Scheduling Widget
        </div>
        <div style={{ color: "#999", fontSize: "0.9rem", maxWidth: "300px" }}>
          To enable scheduling, add your Calendly URL to the .env file:
          <br />
          <code style={{ 
            display: "block", 
            marginTop: "0.5rem", 
            padding: "0.5rem", 
            background: "#e5e5e5", 
            borderRadius: "4px",
            fontSize: "0.8rem"
          }}>
            VITE_CALENDLY_URL=your-url
          </code>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ 
        borderRadius: rounded, 
        overflow: "auto", // Allow scrolling if needed
        background: "#fafaf9", // Match site's stone-50 background
        border: "1px solid rgba(0, 0, 0, 0.05)", // Subtle border
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)", // Softer shadow to match site aesthetic
        fontFamily: "'Roboto Mono', monospace" // Try to influence font (though Calendly may override)
      }}
    >
      <div
        className="calendly-inline-widget"
        data-url={finalUrl}
        style={{ 
          minWidth: 320, 
          height: "100%", // Use full height of container
          minHeight: height 
        }}
      />
      {!scriptLoaded && (
        <div className="grid place-items-center" style={{ minHeight: height, background: "#fafaf9" }}>
          <span className="font-['Roboto_Mono'] text-black text-sm uppercase">Loading scheduler…</span>
        </div>
      )}
    </div>
  );
}


