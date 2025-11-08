type Props = {
  url?: string;
  className?: string;
  children?: React.ReactNode;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

function ensureCalendlyAssets(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const ensureCss = () => {
    if (document.querySelector("link[data-calendly='css']")) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://assets.calendly.com/assets/external/widget.css";
    l.setAttribute("data-calendly", "css");
    document.head.appendChild(l);
  };
  ensureCss();
  if (document.querySelector("script[data-calendly='widget']")) return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.setAttribute("data-calendly", "widget");
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export default function CalendlyButton({ url, className, children }: Props) {
  const bookingUrl = url || (import.meta.env.VITE_CALENDLY_URL as string) || "";

  const open = async () => {
    if (!bookingUrl) {
      window.open("https://calendly.com/", "_blank", "noopener,noreferrer");
      return;
    }
    await ensureCalendlyAssets();
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: bookingUrl });
      // Add escape-to-close and fallback close button
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          try {
            window.Calendly?.closePopupWidget && window.Calendly.closePopupWidget();
          } catch {}
        }
      };
      window.addEventListener("keydown", onKey);
      const interval = window.setInterval(() => {
        const overlay = document.querySelector(".calendly-overlay") as HTMLElement | null;
        if (overlay && !overlay.querySelector("[data-calendly-close-fallback]")) {
          const btn = document.createElement("button");
          btn.setAttribute("data-calendly-close-fallback", "");
          btn.setAttribute("aria-label", "Close scheduler");
          btn.innerHTML = "&times;";
          btn.style.position = "fixed";
          btn.style.top = "10px";
          btn.style.right = "12px";
          btn.style.width = "40px";
          btn.style.height = "40px";
          btn.style.borderRadius = "9999px";
          btn.style.border = "1px solid rgba(0,0,0,0.2)";
          btn.style.background = "rgba(255,255,255,0.9)";
          btn.style.fontSize = "28px";
          btn.style.lineHeight = "36px";
          btn.style.textAlign = "center";
          btn.style.cursor = "pointer";
          btn.style.zIndex = "1000001";
          btn.onclick = () => {
            try {
              window.Calendly?.closePopupWidget && window.Calendly.closePopupWidget();
            } catch {}
          };
          overlay.appendChild(btn);
        }
        if (!overlay) {
          window.clearInterval(interval);
          window.removeEventListener("keydown", onKey);
        }
      }, 250);
    } else {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button onClick={open} className={className} aria-haspopup="dialog">
      {children || "Book a Session"}
    </button>
  );
}


