type Props = {
  open: boolean;
  onClose: () => void;
  navigate: (to: "/" | "/about" | "/modalities" | "/poetry") => void;
};

export default function MenuSheet({ open, onClose, navigate }: Props) {
  const CALENDLY_URL =
    "https://calendly.com/mashamaria/returning-clients-clone?hide_event_type_details=1&hide_gdpr_banner=1";
  return (
    <div
      className={
        "fixed inset-0 z-[60]" +
        (open ? " pointer-events-auto" : " pointer-events-none")
      }
    >
      <div
        className={
          "absolute inset-0 bg-black/40 transition-opacity duration-150 " +
          (open ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
      />
      <div
        className={
          "absolute left-0 right-0 mx-auto max-w-[540px] rounded-[18px] border border-white/60 bg-white/92 backdrop-blur transition-all duration-150 ease-out shadow-[0_16px_36px_rgba(15,23,42,0.18)] " +
          (open ? "top-[52px] translate-y-0 opacity-100" : "top-[52px] -translate-y-1 opacity-0")
        }
      >
        <div className="w-full px-4 pb-5 pt-3 sm:px-5">
          <div className="grid w-full grid-cols-[.75fr_1fr] gap-1.5">
            <div className="row-span-3">
              <div
                role="button"
                tabIndex={0}
                className="from-white to-white/80 bg-linear-to-b h-full rounded-[14px] border border-black/10 p-6 outline-none transition-all hover:shadow-md focus:shadow-md cursor-pointer select-none flex flex-col justify-end items-start"
                onClick={() => {
                  onClose();
                  const start = () => {
                    const Calendly = (window as any).Calendly;
                    if (Calendly && typeof Calendly.initPopupWidget === "function") {
                      Calendly.initPopupWidget({ url: CALENDLY_URL });
                    } else {
                      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
                    }
                  };
                  if (!document.querySelector("link[data-calendly='css']")) {
                    const l = document.createElement("link");
                    l.rel = "stylesheet";
                    l.href = "https://assets.calendly.com/assets/external/widget.css";
                    l.setAttribute("data-calendly", "css");
                    document.head.appendChild(l);
                  }
                  const existing = document.querySelector("script[data-calendly='widget']");
                  if (!existing) {
                    const s = document.createElement("script");
                    s.src = "https://assets.calendly.com/assets/external/widget.js";
                    s.async = true;
                    s.setAttribute("data-calendly", "widget");
                    s.onload = start;
                    document.head.appendChild(s);
                  } else {
                    start();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    (e.currentTarget as HTMLElement).click();
                  }
                }}
              >
                <div className="text-[26px] font-[600] leading-tight">Book a Session</div>
              </div>
            </div>
            <button
              className="rounded-[10px] bg-transparent p-2 text-left transition-colors hover:bg-black/5"
              onClick={() => { onClose(); navigate("/about"); }}
            >
              <div className="text-[13px] font-medium leading-none">About</div>
              <p className="text-black/60 line-clamp-2 text-[12px] leading-[1.5]">
                Learn more about Masha and the work.
              </p>
            </button>
            <button
              className="rounded-[10px] bg-transparent p-2 text-left transition-colors hover:bg-black/5"
              onClick={() => { onClose(); navigate("/modalities"); }}
            >
              <div className="text-[13px] font-medium leading-none">Modalities</div>
              <p className="text-black/60 line-clamp-2 text-[12px] leading-[1.5]">
                Explore the methods we can use together.
              </p>
            </button>
            <button
              className="rounded-[10px] bg-transparent p-2 text-left transition-colors hover:bg-black/5"
              onClick={() => { onClose(); navigate("/poetry"); }}
            >
              <div className="text-[13px] font-medium leading-none">Poetry</div>
              <p className="text-black/60 line-clamp-2 text-[12px] leading-[1.5]">
                Writing and reflections for the heart.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


