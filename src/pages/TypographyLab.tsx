import { useEffect, useMemo, useState } from 'react';
import { useContent } from '../lib/useContent';

type Scale = {
  label: string;
  fontFamily: string;
  size: number; // px
  lineHeight: number; // px
  weight: number | string;
  letterSpacing: number; // em
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
};

const defaults: Scale = {
  label: 'Body',
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  size: 14,
  lineHeight: 24,
  weight: 400,
  letterSpacing: 0,
  transform: 'none'
};

export default function TypographyLab() {
  const { content } = useContent();
  type Keys = 'body' | 'h2' | 'h3' | 'small';
  const [active, setActive] = useState<Keys>('body');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [specs, setSpecs] = useState<Record<Keys, Scale>>({
    body: { ...defaults },
    h2: {
      label: 'H2',
      fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
      size: 20,
      lineHeight: 24,
      weight: 700,
      letterSpacing: 0.06,
      transform: 'uppercase'
    },
    h3: {
      label: 'H3',
      fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
      size: 16,
      lineHeight: 20,
      weight: 700,
      letterSpacing: 0.06,
      transform: 'uppercase'
    },
    small: {
      label: 'Small',
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      size: 12,
      lineHeight: 18,
      weight: 400,
      letterSpacing: 0,
      transform: 'none'
    }
  });
  const [sample, setSample] = useState<string>(content?.about?.[0] || '');

  // Quick font lists (from your shortlist; Fontshare families)
  const fontShare: Record<string, string> = {
    'Satoshi': 'Satoshi, Inter, system-ui, sans-serif',
    'Epilogue': 'Epilogue, Inter, system-ui, sans-serif',
    'Gambarino': 'Gambarino, serif',
    'Clash Grotesk': 'Clash Grotesk, Inter, system-ui, sans-serif',
    'Cabinet Grotesk': 'Cabinet Grotesk, Inter, system-ui, sans-serif',
    'Chillax': 'Chillax, Inter, system-ui, sans-serif',
    'Tanker': 'Tanker, Inter, system-ui, sans-serif',
    'Alpino': 'Alpino, Inter, system-ui, sans-serif',
    'General Sans': 'General Sans, Inter, system-ui, sans-serif',
    'Red Hat Display': 'Red Hat Display, Inter, system-ui, sans-serif',
    'Outfit': 'Outfit, Inter, system-ui, sans-serif',
    'Public Sans': 'Public Sans, Inter, system-ui, sans-serif',
    'RX100': 'RX100, Inter, system-ui, sans-serif',
    'Erode': 'Erode, Inter, system-ui, sans-serif',
    'Supreme': 'Supreme, Inter, system-ui, sans-serif',
    'Sentient': 'Sentient, Inter, system-ui, sans-serif',
  };

  // Persist in URL for easy sharing
  useEffect(() => {
    const params = new URLSearchParams();
    const write = (key: Keys, s: Scale) => {
      const p = key[0]; // b, h, h, s — keys must be unique
      params.set(`${p}ff`, s.fontFamily);
      params.set(`${p}fs`, String(s.size));
      params.set(`${p}lh`, String(s.lineHeight));
      params.set(`${p}fw`, String(s.weight));
      params.set(`${p}ls`, String(s.letterSpacing));
      params.set(`${p}tt`, s.transform || 'none');
    };
    write('body', specs.body);
    params.set('H2', '1'); write('h2', specs.h2);
    params.set('H3', '1'); write('h3', specs.h3);
    params.set('S', '1'); write('small', specs.small);
    params.set('vp', viewport);
    params.set('t', sample);
    const next = `${location.pathname}?${params.toString()}`;
    history.replaceState(null, '', next);
  }, [specs, sample, viewport]);

  // Hydrate from URL if present
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const getNum = (k: string, d: number) => {
      const v = Number(q.get(k));
      return Number.isFinite(v) ? v : d;
    };
    const read = (p: string, d: Scale): Scale => ({
      label: d.label,
      fontFamily: q.get(`${p}ff`) || d.fontFamily,
      size: getNum(`${p}fs`, d.size),
      lineHeight: getNum(`${p}lh`, d.lineHeight),
      weight: getNum(`${p}fw`, Number(d.weight)) || d.weight,
      letterSpacing: getNum(`${p}ls`, d.letterSpacing),
      transform: (q.get(`${p}tt`) as any) || d.transform || 'none'
    });
    setSpecs({
      body: read('b', specs.body),
      h2: read('h', specs.h2),
      h3: read('j', specs.h3), // use j to avoid collision with h2
      small: read('s', specs.small)
    });
    const vp = q.get('vp') as any;
    if (vp === 'mobile' || vp === 'tablet' || vp === 'desktop') setViewport(vp);
    setSample(q.get('t') || content?.about?.[0] || sample);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleOf = (s: Scale) => ({
    fontFamily: s.fontFamily,
    fontSize: `${s.size}px`,
    lineHeight: `${s.lineHeight}px`,
    fontWeight: s.weight as any,
    letterSpacing: `${s.letterSpacing}em`,
    textTransform: s.transform,
  } as React.CSSProperties);

  const style = useMemo(() => styleOf(specs.body), [specs.body]);

  const width = viewport === 'mobile' ? 390 : viewport === 'tablet' ? 768 : 1100;

  return (
    <main className="min-h-screen bg-[#fefef7] text-black">
      <div className="mx-auto max-w-screen-md px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px]">Typography Lab</h1>
          <div className="flex items-center gap-3">
            <div className="text-[12px]">Viewport:</div>
            <div className="flex gap-2 text-[12px]">
              {(['mobile','tablet','desktop'] as const).map(v => (
                <button key={v} onClick={() => setViewport(v)} className={`px-2 py-1 rounded border ${viewport===v?'bg-black text-white':'bg-white'}`}>{v}</button>
              ))}
            </div>
            <a href="/" className="text-[12px] underline">Back to site</a>
          </div>
        </header>

        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4 border border-[#d4cccc] bg-white rounded-[8px] p-4">
            {/* Style selectors */}
            <div className="flex gap-2 text-[12px]">
              {(['body','h2','h3','small'] as const).map(k => (
                <button key={k} onClick={() => setActive(k)} className={`px-2 py-1 rounded border ${active===k?'bg-black text-white':'bg-[#FEFEF7]'}`}>{k.toUpperCase()}</button>
              ))}
            </div>
            {/* Active editor */}
            <div className="grid gap-2">
              <label className="text-[12px] uppercase font-['Roboto Mono']">Font Family</label>
              <input className="border border-[#d4cccc] rounded px-2 py-1" value={specs[active].fontFamily} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], fontFamily: e.target.value } })} />
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(fontShare).map(([name, stack]) => (
                  <button
                    key={name}
                    onClick={() => setSpecs({ ...specs, [active]: { ...specs[active], fontFamily: stack } })}
                    className="px-2 py-1 border rounded text-[12px] bg-[#FEFEF7] hover:bg-black hover:text-white"
                    title={stack}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Font Size</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].size} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], size: Number(e.target.value) } })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Line Height</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].lineHeight} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], lineHeight: Number(e.target.value) } })} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Weight</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].weight as number} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], weight: Number(e.target.value) } })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Letter Spacing (em)</label>
                <input type="number" step="0.01" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].letterSpacing} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], letterSpacing: Number(e.target.value) } })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Transform</label>
                <select className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].transform} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], transform: e.target.value as any } })}>
                  <option value="none">none</option>
                  <option value="uppercase">uppercase</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">capitalize</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-[12px] uppercase font-['Roboto Mono']">Sample Text</label>
              <textarea className="border border-[#d4cccc] rounded px-2 py-1" rows={5} value={sample} onChange={(e) => setSample(e.target.value)} />
            </div>
          </div>

          <div className="border border-[#d4cccc] bg-white rounded-[8px] p-4">
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">Preview (Before / After)</div>
            <div className="grid gap-4" style={{ width }}>
              {/* About block */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">Before</div>
                  <h2 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[20px] mb-2">Here for your liberation</h2>
                  <p className="font-['Inter'] lowercase text-[14px] leading-[24px]">{content?.about?.[0] || sample}</p>
                </div>
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">After</div>
                  <h2 style={styleOf(specs.h2)} className="mb-2">Here for your liberation</h2>
                  <p style={styleOf(specs.body)}>{content?.about?.[0] || sample}</p>
                </div>
              </div>

              <hr className="border-[#d4cccc]" />

              {/* Modality block */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">Before</div>
                  <h3 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px] mb-1">{content?.modalities?.[0]?.title?.replace(/\*+/g,'') || 'Modality Title'}</h3>
                  <p className="font-['Inter'] lowercase text-[12px] leading-6">{content?.modalities?.[0]?.short || ''}</p>
                </div>
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">After</div>
                  <h3 style={styleOf(specs.h3)} className="mb-1">{content?.modalities?.[0]?.title?.replace(/\*+/g,'') || 'Modality Title'}</h3>
                  <p style={styleOf(specs.small)}>{content?.modalities?.[0]?.short || ''}</p>
                </div>
              </div>
            </div>

            <hr className="my-4 border-[#d4cccc]" />
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">Export tokens</div>
            <pre className="text-[12px] whitespace-pre-wrap">{JSON.stringify({
              fontSize: {
                h2: [specs.h2.size + 'px', { lineHeight: specs.h2.lineHeight + 'px', letterSpacing: specs.h2.letterSpacing + 'em' }],
                h3: [specs.h3.size + 'px', { lineHeight: specs.h3.lineHeight + 'px', letterSpacing: specs.h3.letterSpacing + 'em' }],
                body: [specs.body.size + 'px', { lineHeight: specs.body.lineHeight + 'px' }],
                small: [specs.small.size + 'px', { lineHeight: specs.small.lineHeight + 'px' }]
              },
              fonts: {
                body: specs.body.fontFamily,
                mono: specs.h2.fontFamily
              }
            }, null, 2)}</pre>
            <div className="mt-2 text-[12px] text-[#4c4848]">Copy/paste into tokens-clean.js or send me this page URL.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
