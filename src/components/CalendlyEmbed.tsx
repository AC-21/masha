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
    height = 750, // Calendly's recommended height
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
      u.searchParams.set("background_color", "FEFEF7"); // Try to set background to match site
      return u.toString();
    } catch {
      return "";
    }
  }, [url, hideGDPR, hideDetails, primaryColor, textColor]);

  const ref = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  useEffect(() => {
    console.log('Calendly Component Mounted');
    console.log('Final URL:', finalUrl);
    console.log('Has URL:', !!finalUrl);
  }, [finalUrl]);

  useEffect(() => {
    // Load Calendly script immediately
    if (!document.querySelector('script[data-calendly]')) {
      console.log('Loading Calendly script...');
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.setAttribute('data-calendly', 'true');
      s.onload = () => {
        console.log('Calendly script loaded successfully');
        setScriptLoaded(true);
      };
      s.onerror = () => {
        console.error('Failed to load Calendly script');
      };
      document.body.appendChild(s);
    } else {
      console.log('Calendly script already exists');
      setScriptLoaded(true);
    }
  }, []);


  // Show placeholder if no URL configured
  if (!finalUrl) {
    return (
      <div
        className={className}
        style={{ 
          borderRadius: rounded, 
          overflow: "hidden",
          height,
          background: "#FEFEF7",
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
        height: height,
        width: "100%",
        position: "relative"
      }}
    >
      <div
        className="calendly-inline-widget"
        data-url={finalUrl}
        style={{ 
          minWidth: "320px", 
          height: "750px",
          width: "100%"
        }}
      />
      {!scriptLoaded && (
        <div className="grid place-items-center" style={{ minHeight: height, background: "#FEFEF7" }}>
          <span className="font-['Roboto_Mono'] text-black text-sm uppercase">Loading scheduler…</span>
        </div>
      )}
    </div>
  );
}


