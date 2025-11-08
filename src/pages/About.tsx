import { useState } from "react";
import Header from "../components/Header";
import MenuSheet from "../components/MenuSheet";
import bgJpg from "../assets/Background.jpg";
import bgAvif from "../assets/Background.avif";
import bgWebp from "../assets/Background.webp";
import portraitUrl from "../assets/Masha Background.jpg";
import aboutMeRaw from "../../about-me.md?raw";

type Props = {
  navigate: (to: "/" | "/about" | "/modalities") => void;
};

const aboutParagraphs = aboutMeRaw
  .split(/\r?\n\s*\r?\n/g)
  .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
  .filter(Boolean);

const paragraphBase = "text-[15px] leading-[1.9] tracking-[0.01em] text-black/80 md:text-[16px]";
const firstParagraph = "text-[18px] text-black/90 md:text-[20px] text-center";

export default function About({ navigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `image-set(url(${bgAvif}) type("image/avif"), url(${bgWebp}) type("image/webp"), url(${bgJpg}) type("image/jpeg"))`,
            filter: "grayscale(100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#f4f1ec]/65 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          title={<span className="opacity-70">About</span>}
          onLogoClick={() => navigate("/")}
          onMenuClick={() => setMenuOpen(true)}
        />
        <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

        <main className="mx-auto flex w-full max-w-[580px] flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
          <section className="relative w-full overflow-hidden rounded-[36px] bg-[#fdf9f3]/95 shadow-[0_30px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95)_0%,rgba(253,248,242,0.88)_55%,rgba(250,243,236,0.94)_100%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNmZmYiLz48ZyBmaWx0ZXI9InVybCgjZmlsdGVyMCkiIGZpbGwtb3BhY2l0eT0iMC44Ij48Y2lyY2xlIGN4PSI1LjEiIGN5PSIyMS40IiByPSIxLjEiIGZpbGw9IiNmMWYwZWUiLz48Y2lyY2xlIGN4PSI0MS42IiBjeT0iNy44IiByPSIwLjkiIGZpbGw9IiNmYmY5ZTYiLz48Y2lyY2xlIGN4PSI4Ni43IiBjeT0iMzIuNiIgcj0iMS4zIiBmaWxsPSIjZjNmMmYyIi8+PGNpcmNsZSBjeD0iMjYuNSIgY3k9Ijc1LjQiIHI9IjAuOSIgc3Ryb2tlPSIjZmVmZWZlIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxjaXJjbGUgY3g9IjEwNC44IiBjeT0iOTkuNiIgcj0iMS4xIiBmaWxsPSIjZjRlZmVkIi8+PGNpcmNsZSBjeD0iNjcuMyIgY3k9IjEyLjQiIHI9IjAuNyIgc3Ryb2tlPSIjZmVmZWZlIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxyZWN0IHg9Ijg4LjciIHk9IjYxLjIiIHdpZHRoPSIwLjkiIGhlaWdodD0iMC45IiBmaWxsPSIjZmVmZWZlIi8+PC9nPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiPjxmZUdhdXNzaWFuQmx1ciByZXM9IjEuNSIgLz48L2ZpbHRlcj48L2RlZnM+PC9zdmc+")',
                backgroundSize: "180px",
              }}
            />
            <div className="pointer-events-none absolute inset-x-[-160px] -top-48 h-[260px] rounded-[999px] bg-white/45 blur-3xl" />
            <div className="relative flex flex-col gap-10 px-6 pb-14 pt-6 sm:px-10">
              <div className="overflow-hidden rounded-[30px]">
                <img
                  src={portraitUrl}
                  alt="Portrait of Masha"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6">
                {aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`${paragraphBase}${index === 0 ? ` ${firstParagraph}` : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
