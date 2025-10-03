import { useEffect, useMemo, useState } from 'react';

type Modality = {
  title: string;
  short: string;
  long: string;
};

type SiteContent = {
  tagline: string;
  about: string[];
  images: { portrait: string };
  cta: { label: string };
  modalities: Modality[];
};

export default function Edit() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shortTarget = { min: 280, max: 360 };

  useEffect(() => {
    fetch('/content/site.json')
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch((e) => setError(e?.message || 'Failed to load content'));
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content, null, 2),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const counters = useMemo(() => {
    if (!content) return [] as Array<{ i: number; len: number; ok: boolean }>;
    return content.modalities.map((m, i) => {
      const len = (m.short || '').trim().length;
      const ok = len >= shortTarget.min && len <= shortTarget.max;
      return { i, len, ok };
    });
  }, [content]);

  if (!content) {
    return (
      <main className="min-h-screen bg-[#fefef7] text-black grid place-items-center">
        <div>Loading editor… {error && <span className="text-red-600">{error}</span>}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fefef7] text-black">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[18px]">Site Editor</h1>
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded bg-[#3b5849] text-white font-['Roboto Mono'] uppercase text-[12px]"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </header>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <section className="mb-8">
          <h2 className="font-['Roboto Mono'] font-bold uppercase text-[14px] mb-2">Tagline</h2>
          <input
            className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white"
            value={content.tagline}
            onChange={(e) => setContent({ ...content, tagline: e.target.value })}
          />
        </section>

        <section className="mb-8">
          <h2 className="font-['Roboto Mono'] font-bold uppercase text-[14px] mb-2">About (paragraphs)</h2>
          {content.about.map((p, i) => (
            <textarea
              key={i}
              className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white mb-2"
              rows={3}
              value={p}
              onChange={(e) => {
                const next = [...content.about];
                next[i] = e.target.value;
                setContent({ ...content, about: next });
              }}
            />
          ))}
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-black text-white text-[12px]"
              onClick={() => setContent({ ...content, about: [...content.about, ''] })}
            >
              Add paragraph
            </button>
            <button
              className="px-3 py-1 rounded bg-[#d4cccc] text-black text-[12px]"
              onClick={() => setContent({ ...content, about: content.about.slice(0, -1) })}
            >
              Remove last
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-['Roboto Mono'] font-bold uppercase text-[14px] mb-2">CTA</h2>
          <input
            className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white"
            value={content.cta.label}
            onChange={(e) => setContent({ ...content, cta: { label: e.target.value } })}
          />
        </section>

        <section className="mb-8">
          <h2 className="font-['Roboto Mono'] font-bold uppercase text-[14px] mb-2">Modalities</h2>
          <div className="space-y-6">
            {content.modalities.map((m, i) => (
              <div key={i} className="border border-[#d4cccc] rounded-[5px] p-3 bg-white">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white mr-3"
                    value={m.title}
                    onChange={(e) => {
                      const next = [...content.modalities];
                      next[i] = { ...m, title: e.target.value };
                      setContent({ ...content, modalities: next });
                    }}
                    placeholder="Title"
                  />
                  <span className={`text-[12px] ${counters[i]?.ok ? 'text-[#3b5849]' : 'text-red-600'}`}>
                    {counters[i]?.len ?? 0} chars ({shortTarget.min}-{shortTarget.max})
                  </span>
                </div>
                <textarea
                  className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white mb-2"
                  rows={3}
                  value={m.short}
                  onChange={(e) => {
                    const next = [...content.modalities];
                    next[i] = { ...m, short: e.target.value };
                    setContent({ ...content, modalities: next });
                  }}
                  placeholder="Short intro (1–3 sentences)"
                />
                <textarea
                  className="w-full border border-[#d4cccc] rounded-[5px] px-3 py-2 bg-white"
                  rows={5}
                  value={m.long}
                  onChange={(e) => {
                    const next = [...content.modalities];
                    next[i] = { ...m, long: e.target.value };
                    setContent({ ...content, modalities: next });
                  }}
                  placeholder="Long body (expands on read more)"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-[#d4cccc] text-black text-[12px]"
                    onClick={() => {
                      const next = content.modalities.filter((_, idx) => idx !== i);
                      setContent({ ...content, modalities: next });
                    }}
                  >
                    Remove
                  </button>
                  {i > 0 && (
                    <button
                      className="px-3 py-1 rounded bg-black text-white text-[12px]"
                      onClick={() => {
                        const next = [...content.modalities];
                        const [item] = next.splice(i, 1);
                        next.splice(i - 1, 0, item);
                        setContent({ ...content, modalities: next });
                      }}
                    >
                      Move up
                    </button>
                  )}
                  {i < content.modalities.length - 1 && (
                    <button
                      className="px-3 py-1 rounded bg-black text-white text-[12px]"
                      onClick={() => {
                        const next = [...content.modalities];
                        const [item] = next.splice(i, 1);
                        next.splice(i + 1, 0, item);
                        setContent({ ...content, modalities: next });
                      }}
                    >
                      Move down
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-4 px-3 py-2 rounded bg-[#3b5849] text-white text-[12px]"
            onClick={() => setContent({ ...content, modalities: [...content.modalities, { title: '', short: '', long: '' }] })}
          >
            Add modality
          </button>
        </section>
      </div>
    </main>
  );
}
