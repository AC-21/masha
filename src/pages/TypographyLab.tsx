import { useEffect, useMemo, useState } from 'react';

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
  const [spec, setSpec] = useState<Scale>(defaults);
  const [sample, setSample] = useState<string>(
    'i cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort.'
  );

  // Persist in URL for easy sharing
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('ff', spec.fontFamily);
    params.set('fs', String(spec.size));
    params.set('lh', String(spec.lineHeight));
    params.set('fw', String(spec.weight));
    params.set('ls', String(spec.letterSpacing));
    params.set('tt', spec.transform || 'none');
    params.set('t', sample);
    const next = `${location.pathname}?${params.toString()}`;
    history.replaceState(null, '', next);
  }, [spec, sample]);

  // Hydrate from URL if present
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const getNum = (k: string, d: number) => {
      const v = Number(q.get(k));
      return Number.isFinite(v) ? v : d;
    };
    setSpec({
      label: 'Body',
      fontFamily: q.get('ff') || defaults.fontFamily,
      size: getNum('fs', defaults.size),
      lineHeight: getNum('lh', defaults.lineHeight),
      weight: getNum('fw', 400),
      letterSpacing: getNum('ls', 0),
      transform: (q.get('tt') as any) || 'none'
    });
    setSample(q.get('t') || sample);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useMemo(() => ({
    fontFamily: spec.fontFamily,
    fontSize: `${spec.size}px`,
    lineHeight: `${spec.lineHeight}px`,
    fontWeight: spec.weight as any,
    letterSpacing: `${spec.letterSpacing}em`,
    textTransform: spec.transform,
  } as React.CSSProperties), [spec]);

  return (
    <main className="min-h-screen bg-[#fefef7] text-black">
      <div className="mx-auto max-w-screen-md px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[16px]">Typography Lab</h1>
          <a href="/" className="text-[12px] underline">Back to site</a>
        </header>

        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 border border-[#d4cccc] bg-white rounded-[8px] p-4">
            <div className="grid gap-2">
              <label className="text-[12px] uppercase font-['Roboto Mono']">Font Family</label>
              <input className="border border-[#d4cccc] rounded px-2 py-1" value={spec.fontFamily} onChange={(e) => setSpec({ ...spec, fontFamily: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Font Size</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={spec.size} onChange={(e) => setSpec({ ...spec, size: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Line Height</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={spec.lineHeight} onChange={(e) => setSpec({ ...spec, lineHeight: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Weight</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={spec.weight as number} onChange={(e) => setSpec({ ...spec, weight: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Letter Spacing (em)</label>
                <input type="number" step="0.01" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={spec.letterSpacing} onChange={(e) => setSpec({ ...spec, letterSpacing: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Transform</label>
                <select className="w-full border border-[#d4cccc] rounded px-2 py-1" value={spec.transform} onChange={(e) => setSpec({ ...spec, transform: e.target.value as any })}>
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
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">Preview</div>
            <div style={style}>{sample}</div>
            <hr className="my-4 border-[#d4cccc]" />
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">CSS</div>
            <pre className="text-[12px] whitespace-pre-wrap">
{`font-family: ${spec.fontFamily};
font-size: ${spec.size}px;
line-height: ${spec.lineHeight}px;
font-weight: ${spec.weight};
letter-spacing: ${spec.letterSpacing}em;
text-transform: ${spec.transform};`}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}
