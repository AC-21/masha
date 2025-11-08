import { useState } from "react";
import useSwipe from "../lib/useSwipe";
import CalendlyButton from "../components/CalendlyButton";
import Header from "../components/Header";
import MenuSheet from "../components/MenuSheet";
import bgJpg from "../assets/Background.jpg";
import bgAvif from "../assets/Background.avif";
import bgWebp from "../assets/Background.webp";

type Props = {
  navigate: (to: "/" | "/about" | "/modalities" | "/poetry") => void;
};

export default function Home({ navigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const CALENDLY_URL =
    "https://calendly.com/mashamaria/returning-clients-clone?hide_event_type_details=1&hide_gdpr_banner=1";
  const swipe = useSwipe({
    onSwipeLeft: () => navigate("/about"),
    onSwipeRight: () => navigate("/modalities"),
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `image-set(url(${bgAvif}) type(\"image/avif\"), url(${bgWebp}) type(\"image/webp\"), url(${bgJpg}) type(\"image/jpeg\"))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-background/45" />
      </div>
      <Header onLogoClick={() => navigate("/")} onMenuClick={() => setMenuOpen(true)} />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      <div
        {...swipe}
        className="relative z-10 mx-auto flex min-h-screen max-w-[560px] flex-col items-center px-6 py-16"
      >
        <h1
          className="mt-2 text-center text-[36px] leading-tight tracking-[0.02em]"
          style={{ fontFamily: "'Agu Display', 'Author', system-ui, sans-serif", fontWeight: 400 }}
        >
          Masha Maria
        </h1>

        <nav className="mt-14 w-full max-w-[320px] text-center">
          <ul className="flex flex-col gap-6 text-[20px]">
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/about")}>
                About
              </button>
            </li>
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/modalities")}>
                Modalities
              </button>
            </li>
            <li>
              <button className="underline-offset-2 hover:underline" onClick={() => navigate("/poetry")}>
                Poetry
              </button>
            </li>
            <li>
              <CalendlyButton className="underline-offset-2 hover:underline" url={CALENDLY_URL}>
                Book a Session
              </CalendlyButton>
            </li>
          </ul>
        </nav>
        

        <div className="mt-auto w-full pb-12">
          <blockquote className="mx-auto max-w-[460px] text-center text-[16px] italic opacity-80">
            A quote you’d like for people to see — or a rotation of a few.
          </blockquote>
        </div>
      </div>
    </div>
  );
}


