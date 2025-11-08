import { useEffect, useMemo, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Modalities from "./pages/Modalities";
import Poetry from "./pages/Poetry";

type RoutePath = "/" | "/about" | "/modalities" | "/poetry";

function normalizePathname(pathname: string): RoutePath {
  const cleaned = pathname.replace(/\/+$/, "") || "/";
  if (cleaned === "/about") return "/about";
  if (cleaned === "/modalities") return "/modalities";
  if (cleaned === "/poetry") return "/poetry";
  return "/";
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() =>
    typeof window !== "undefined" ? normalizePathname(window.location.pathname) : "/"
  );

  useEffect(() => {
    const handler = () => setRoute(normalizePathname(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = useMemo(
    () =>
      (to: RoutePath) => {
        if (typeof window === "undefined") return;
        if (normalizePathname(window.location.pathname) === to) return;
        window.history.pushState({}, "", to);
        setRoute(to);
      },
    []
  );

  if (route === "/about") {
    return <About navigate={navigate} />;
  }
  if (route === "/modalities") {
    return <Modalities navigate={navigate} />;
  }
  if (route === "/poetry") {
    return <Poetry navigate={navigate} />;
  }
  return <Home navigate={navigate} />;
}


