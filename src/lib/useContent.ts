import { useEffect, useState } from 'react';
import fallback from '../content/site.json';

export type Modality = {
  title: string;
  short: string;
  long: string;
};

export type SiteContent = {
  tagline: string;
  about: string[];
  images: { portrait: string };
  cta: { label: string };
  modalities: Modality[];
};

export function useContent() {
  const [data, setData] = useState<SiteContent>(fallback as SiteContent);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/content/site.json', { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('failed')))
      .then((json) => {
        if (!cancelled && json) {
          setData(json);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // fall back silently
          setLoaded(true);
          setError('fetch_failed');
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { content: data, loaded, error };
}
