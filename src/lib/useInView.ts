import { RefObject, useEffect, useRef, useState } from "react";

export default function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  once = true
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, options);

    obs.observe(node);
    return () => obs.disconnect();
  }, [options, once]);

  return [ref, inView];
}


