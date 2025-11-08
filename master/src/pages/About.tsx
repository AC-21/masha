import Header from "../components/Header";
import backdropUrl from "../assets/Background.jpg";
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
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})`, filter: "grayscale(100%)" }}
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#f4f1ec]/65 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          title={<span className="opacity-70">About</span>}
          onLogoClick={() => navigate("/")}
          onMenuClick={() => {}}
        />

        <main className="mx-auto flex w-full max-w-[580px] flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
          <section className="relative w-full overflow-hidden rounded-[36px] bg-transparent backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-[-160px] -top-48 h-[260px] rounded-[999px] bg-white/35 blur-3xl" />
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
