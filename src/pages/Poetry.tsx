import { useEffect, useState } from "react";
import Header from "../components/Header";
import MenuSheet from "../components/MenuSheet";
import bgJpg from "../assets/Background.jpg";
import bgAvif from "../assets/Background.avif";
import bgWebp from "../assets/Background.webp";
import { loadPoems, type Poem } from "../lib/poetry";

type Props = {
  navigate: (to: "/" | "/about" | "/modalities" | "/poetry") => void;
};

export default function Poetry({ navigate }: Props) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadPoems().then((list) => {
      if (mounted) setPoems(list);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background consistent with other pages */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `image-set(url(${bgAvif}) type("image/avif"), url(${bgWebp}) type("image/webp"), url(${bgJpg}) type("image/jpeg"))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-background/45" />
      </div>

      <Header
        title={<span className="opacity-70">Poetry</span>}
        onLogoClick={() => navigate("/")}
        onMenuClick={() => setMenuOpen(true)}
      />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      {/* Mobile-first stream; desktop → two-column with center rule */}
      <main className="relative z-10 mx-auto w-full max-w-[1040px] px-6 pb-28 pt-28">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/30 md:block" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {poems.map((p, idx) => (
              <article
                key={p.slug}
                className="rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] uppercase tracking-[0.22em] text-black/55">
                    {idx + 1}
                  </span>
                  <time className="text-[12px] text-black/55">
                    {p.date.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </time>
                </div>
                <h3
                  className="mt-2 text-[22px] leading-tight"
                  style={{ fontFamily: "'Agu Display', 'Author', system-ui, sans-serif", fontWeight: 400 }}
                >
                  {p.title}
                </h3>
                {p.summary ? (
                  <p className="mt-2 text-[14px] leading-6 text-black/70">{p.summary}</p>
                ) : null}
                <div className="mt-5 whitespace-pre-wrap text-[15px] leading-[1.9] tracking-[0.01em] text-black/85">
                  {p.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


