import { useEffect, useMemo, useState } from 'react';
import { tokens as savedTokens } from '../styles/tokens-clean.js';
import { useContent } from '../lib/useContent';

type Scale = {
  label: string;
  fontFamily: string;
  size: number; // px
  lineHeight: number; // px
  weight: number | string;
  letterSpacing: number; // em
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  // Spacing controls
  marginTop?: number;
  marginBottom?: number;
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
  type Keys = 'body' | 'h1' | 'h2' | 'h3' | 'small';
  const [active, setActive] = useState<Keys>('body');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [specs, setSpecs] = useState<Record<Keys, Scale>>({
    body: { ...defaults },
    h1: {
      label: 'H1',
      fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
      size: 22,
      lineHeight: 26,
      weight: 700,
      letterSpacing: 0.06,
      transform: 'uppercase',
      marginTop: 0,
      marginBottom: 8
    },
    h2: {
      label: 'H2',
      fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
      size: 20,
      lineHeight: 24,
      weight: 700,
      letterSpacing: 0.06,
      transform: 'uppercase',
      marginTop: 0,
      marginBottom: 8
    },
    h3: {
      label: 'H3',
      fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
      size: 16,
      lineHeight: 20,
      weight: 700,
      letterSpacing: 0.06,
      transform: 'uppercase',
      marginTop: 12,
      marginBottom: 6
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
  const [paragraphSpacing, setParagraphSpacing] = useState<number>(16);
  const [fontStatus, setFontStatus] = useState<Record<string, 'checking' | 'loaded' | 'missing'>>({});
  const [colors, setColors] = useState(() => ({
    base: savedTokens?.colors?.base || '#FEFEF7',
    text: savedTokens?.colors?.text || '#000000',
    muted: savedTokens?.colors?.muted || '#4c4848',
    brand: savedTokens?.colors?.brand || '#3b5849',
    line: savedTokens?.colors?.line || '#d4cccc'
  }));

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

  // Fontshare CSS loader helpers
  const ensurePreconnect = (href: string) => {
    if (document.querySelector(`link[data-preconnect='${href}']`)) return;
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = href;
    l.setAttribute('data-preconnect', href);
    document.head.appendChild(l);
  };
  const loadFontCss = (url: string) => {
    if (!url) return;
    if (document.querySelector(`link[data-fontshare='${url}']`)) return;
    if (url.includes('api.fontshare.com')) {
      ensurePreconnect('https://api.fontshare.com');
      ensurePreconnect('https://cdn.fontshare.com');
    }
    if (url.includes('fonts.googleapis.com')) {
      ensurePreconnect('https://fonts.googleapis.com');
      ensurePreconnect('https://fonts.gstatic.com');
    }
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = url;
    l.setAttribute('data-fontshare', url);
    document.head.appendChild(l);
  };
  const fsUrl = (slug: string) => `https://api.fontshare.com/v2/css?f[]=${slug}@400,500,700&display=swap`;
  const gUrl = (family: string) => `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;700&display=swap`;
  const candidatesFor = (name: string): string[] => {
    const base = name.trim();
    const hyphen = base.toLowerCase().replace(/\s+/g, '-');
    const tight = base.toLowerCase().replace(/\s+/g, '');
    switch (base) {
      case 'General Sans':
        return [fsUrl('general-sans'), fsUrl('generalsans')];
      case 'Cabinet Grotesk':
        return [fsUrl('cabinet-grotesk'), fsUrl('cabinetgrotesk')];
      case 'Clash Grotesk':
        return [fsUrl('clash-grotesk'), fsUrl('clashgrotesk')];
      case 'Red Hat Display':
        return [gUrl('Red+Hat+Display')];
      case 'Public Sans':
        return [gUrl('Public+Sans')];
      case 'RX100':
      case 'RX 100':
        return [fsUrl('rx-100'), fsUrl('rx100')];
      default:
        return [fsUrl(hyphen), fsUrl(tight)];
    }
  };

  const primaryNameOf = (stack: string) => (stack || '').split(',')[0]?.replace(/["']/g, '').trim();
  const checkFont = async (family: string) => {
    if (!family) return false;
    const name = primaryNameOf(family);
    if (!name) return false;
    try {
      setFontStatus((s) => ({ ...s, [name]: 'checking' }));
      // Wait for any pending font loads
      // @ts-ignore
      await (document.fonts?.ready || Promise.resolve());
      // Check normal and quoted
      const ok = document.fonts?.check?.(`16px "${name}"`) || document.fonts?.check?.(`16px ${name}`) || false;
      setFontStatus((s) => ({ ...s, [name]: ok ? 'loaded' : 'missing' }));
      return ok;
    } catch {
      setFontStatus((s) => ({ ...s, [name]: 'missing' }));
      return false;
    }
  };

  const checkAllShortlist = async () => {
    for (const name of Object.keys(fontShare)) {
      await checkFont(name);
    }
  };

  // Persist in URL for easy sharing
  useEffect(() => {
    const params = new URLSearchParams();
    const pref = (k: Keys) => (k === 'body' ? 'b_' : k + '_');
    const write = (key: Keys, s: Scale) => {
      const p = pref(key);
      params.set(`${p}ff`, s.fontFamily);
      params.set(`${p}fs`, String(s.size));
      params.set(`${p}lh`, String(s.lineHeight));
      params.set(`${p}fw`, String(s.weight));
      params.set(`${p}ls`, String(s.letterSpacing));
      params.set(`${p}tt`, s.transform || 'none');
      if (typeof s.marginTop === 'number') params.set(`${p}mt`, String(s.marginTop));
      if (typeof s.marginBottom === 'number') params.set(`${p}mb`, String(s.marginBottom));
    };
    write('body', specs.body);
    write('h1', specs.h1);
    write('h2', specs.h2);
    write('h3', specs.h3);
    write('small', specs.small);
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
      transform: (q.get(`${p}tt`) as any) || d.transform || 'none',
      marginTop: getNum(`${p}mt`, d.marginTop || 0),
      marginBottom: getNum(`${p}mb`, d.marginBottom || 0),
    });
    setSpecs({
      body: read('b_', specs.body),
      h1: read('h1_', specs.h1),
      h2: read('h2_', specs.h2),
      h3: read('h3_', specs.h3),
      small: read('small_', specs.small) // allow both s_ and small_
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
      <div className="w-screen max-w-none px-4 md:px-6 lg:px-10 py-6">
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

        <section className="grid grid-cols-12 gap-4 items-start max-w-[1700px] mx-auto">
          <div className="col-span-12 lg:col-span-3 xl:col-span-4 2xl:col-span-3 space-y-4 border border-[#d4cccc] bg-white rounded-[8px] p-4 sticky top-4 self-start">
            {/* Style selectors */}
            <div className="flex gap-2 text-[12px]">
              {(['body','h1','h2','h3','small'] as const).map(k => (
                <button key={k} onClick={() => setActive(k)} className={`px-2 py-1 rounded border ${active===k?'bg-black text-white':'bg-[#FEFEF7]'}`}>{k.toUpperCase()}</button>
              ))}
            </div>
            {/* Color accents */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="col-span-2 text-[12px] uppercase font-['Roboto Mono']">Color accents</div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Accent</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" value={colors.brand}
                  onChange={(e)=>{ const v=e.target.value; setColors(c=>({...c, brand:v})); document.documentElement.style.setProperty('--color-brand', v); }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Text</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" value={colors.text}
                  onChange={(e)=>{ const v=e.target.value; setColors(c=>({...c, text:v})); document.documentElement.style.setProperty('--color-text', v); }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Base</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" value={colors.base}
                  onChange={(e)=>{ const v=e.target.value; setColors(c=>({...c, base:v})); document.documentElement.style.setProperty('--color-base', v); }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Muted</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" value={colors.muted}
                  onChange={(e)=>{ const v=e.target.value; setColors(c=>({...c, muted:v})); document.documentElement.style.setProperty('--color-muted', v); }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Line</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" value={colors.line}
                  onChange={(e)=>{ const v=e.target.value; setColors(c=>({...c, line:v})); document.documentElement.style.setProperty('--color-line', v); }} />
              </div>
            </div>
            {/* Current selection + status */}
            <div className="text-[12px] text-[#4c4848] mt-1">
              <span className="uppercase font-['Roboto Mono']">Current:</span>
              <span className="ml-2">{specs[active].fontFamily}</span>
              {(() => {
                const primary = primaryNameOf(specs[active].fontFamily);
                const st = fontStatus[primary];
                return (
                  <span className="ml-2">
                    {primary && (<>
                      <span className="uppercase font-['Roboto Mono']">Primary:</span>
                      <span className="ml-1">{primary}</span>
                      <span className="ml-2">{st === 'loaded' ? '✓ loaded' : st === 'missing' ? '⚠ not loaded' : st === 'checking' ? '… checking' : ''}</span>
                    </>)}
                  </span>
                );
              })()}
            </div>
            {/* Active editor */}
            <div className="grid gap-2">
              <label className="text-[12px] uppercase font-['Roboto Mono']">Font Family</label>
              <input className="border border-[#d4cccc] rounded px-2 py-1" value={specs[active].fontFamily} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], fontFamily: e.target.value } })} />
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(fontShare).map(([name, stack]) => (
                  <button
                    key={name}
                    onClick={() => {
                      setSpecs({ ...specs, [active]: { ...specs[active], fontFamily: stack } });
                      const urls = candidatesFor(name);
                      urls.forEach((u) => loadFontCss(u));
                      // re-check status shortly after CSS is requested
                      setTimeout(() => checkFont(name), 200);
                    }}
                    className={`px-2 py-1 border rounded text-[12px] ${fontStatus[name]==='loaded' ? 'bg-black text-white' : 'bg-[#FEFEF7] hover:bg-black hover:text-white'}`}
                    title={stack}
                  >
                    {name}{fontStatus[name]==='loaded' ? ' ✓' : ''}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-2 mt-2 items-center">
                <label className="text-[12px] uppercase font-['Roboto Mono'] col-span-2">Fontshare CSS URL</label>
                <input id="cssUrl" className="col-span-3 border border-[#d4cccc] rounded px-2 py-1" placeholder="https://api.fontshare.com/v2/css?f[]=family@400.." />
                <button
                  className="px-2 py-1 border rounded text-[12px]"
                  onClick={() => {
                    const el = document.getElementById('cssUrl') as HTMLInputElement | null;
                    if (el && el.value) { loadFontCss(el.value); setTimeout(() => {
                      // Try to parse family out of URL: f[]=family
                      const m = el.value.match(/f\[]=(.*?)(?:@|&|$)/);
                      const fam = m ? decodeURIComponent(m[1]).replace(/\+/g,' ') : '';
                      checkFont(fam);
                    }, 200); }
                  }}
                >Load CSS</button>
                <button className="px-2 py-1 border rounded text-[12px]" onClick={checkAllShortlist}>Check fonts</button>
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
            {/* Rhythm controls */}
            {active === 'body' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] uppercase font-['Roboto Mono']">Paragraph Spacing (px)</label>
                  <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={paragraphSpacing} onChange={(e) => setParagraphSpacing(Number(e.target.value))} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] uppercase font-['Roboto Mono']">Heading Margin Top (px)</label>
                  <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].marginTop || 0} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], marginTop: Number(e.target.value) } })} />
                </div>
                <div>
                  <label className="text-[12px] uppercase font-['Roboto Mono']">Heading Margin Bottom (px)</label>
                  <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" value={specs[active].marginBottom || 0} onChange={(e) => setSpecs({ ...specs, [active]: { ...specs[active], marginBottom: Number(e.target.value) } })} />
                </div>
              </div>
            )}

            {/* Button design controls */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Variant</label>
                <select className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={'solid'} onChange={(e)=>{
                  const v=e.target.value; (window as any).__styleTokens={...(window as any).__styleTokens, button:{...(window as any).__styleTokens?.button, variant:v}}; document.documentElement.style.setProperty('--btn-variant', v);
                }}>
                  <option value="solid">solid</option>
                  <option value="outline">outline</option>
                  <option value="glass">glass</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Radius (px)</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={9999} onChange={(e) => {
                  const v = Number(e.target.value);
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, radius: `${v}px` } };
                  document.documentElement.style.setProperty('--btn-radius', `${v}px`);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Padding Y (px)</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={12} onChange={(e) => {
                  const v = Number(e.target.value);
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, py: v } };
                  document.documentElement.style.setProperty('--btn-py', `${v}px`);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Padding X (px)</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={16} onChange={(e) => {
                  const v = Number(e.target.value);
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, px: v } };
                  document.documentElement.style.setProperty('--btn-px', `${v}px`);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Border Width (px)</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={1} onChange={(e)=>{
                  const v=Number(e.target.value); (window as any).__styleTokens={...(window as any).__styleTokens, button:{...(window as any).__styleTokens?.button, borderWidth: `${v}px`}}; document.documentElement.style.setProperty('--btn-bw', `${v}px`);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Border Color</label>
                <input type="color" className="w-full h-8 border border-[#d4cccc] rounded" defaultValue={colors.brand} onChange={(e)=>{
                  const v=e.target.value; (window as any).__styleTokens={...(window as any).__styleTokens, button:{...(window as any).__styleTokens?.button, borderColor:v}}; document.documentElement.style.setProperty('--btn-bc', v);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Weight</label>
                <input type="number" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={700} onChange={(e) => {
                  const v = Number(e.target.value);
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, weight: v } };
                  document.documentElement.style.setProperty('--btn-weight', `${v}`);
                }} />
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button Transform</label>
                <select className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue="uppercase" onChange={(e) => {
                  const v = e.target.value;
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, transform: v } };
                  document.documentElement.style.setProperty('--btn-transform', v);
                }}>
                  <option value="none">none</option>
                  <option value="uppercase">uppercase</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">capitalize</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] uppercase font-['Roboto Mono']">Button LetterSpacing (em)</label>
                <input type="number" step="0.01" className="w-full border border-[#d4cccc] rounded px-2 py-1" defaultValue={0.06} onChange={(e) => {
                  const v = Number(e.target.value);
                  (window as any).__styleTokens = { ...(window as any).__styleTokens, button: { ...(window as any).__styleTokens?.button, letterSpacing: `${v}em` } };
                  document.documentElement.style.setProperty('--btn-ls', `${v}em`);
                }} />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-[12px] uppercase font-['Roboto Mono']">Sample Text</label>
              <textarea className="border border-[#d4cccc] rounded px-2 py-1" rows={5} value={sample} onChange={(e) => setSample(e.target.value)} />
            </div>
            {/* Save as tokens */}
            <div className="pt-2">
              <SaveTokensButton specs={specs} paragraphSpacing={paragraphSpacing} colors={colors} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 xl:col-span-8 2xl:col-span-9 border border-[#d4cccc] bg-white rounded-[8px] p-4 overflow-auto">
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">Preview (Before / After)</div>
            <div className="w-full">
              <div className="mx-auto" style={{ width }}>
                <div className="grid gap-4">
              {/* H1 block (e.g., My Work) */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">Before</div>
                  <h1 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[22px]">My Work</h1>
                </div>
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">After</div>
                  <h1 style={{ ...styleOf(specs.h1), marginTop: specs.h1.marginTop || 0, marginBottom: specs.h1.marginBottom || 0 }}>My Work</h1>
                </div>
              </div>

              <hr className="border-[#d4cccc]" />

              {/* About block (H2 + Body) */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">Before</div>
                  <h2 className="font-['Roboto Mono'] font-bold uppercase tracking-[0.06em] text-[20px] mb-2">Here for your liberation</h2>
                  <p className="font-['Inter'] lowercase text-[14px] leading-[24px]">{content?.about?.[0] || sample}</p>
                </div>
                <div>
                  <div className="text-[12px] uppercase font-['Roboto Mono'] mb-1">After</div>
                  <h2 style={{ ...styleOf(specs.h2), marginTop: specs.h2.marginTop || 0, marginBottom: specs.h2.marginBottom || 0 }}>Here for your liberation</h2>
                  <p style={{ ...styleOf(specs.body), marginBottom: paragraphSpacing }}>{content?.about?.[0] || sample}</p>
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
                  <h3 style={{ ...styleOf(specs.h3), marginTop: specs.h3.marginTop || 0, marginBottom: specs.h3.marginBottom || 0 }}>{content?.modalities?.[0]?.title?.replace(/\*+/g,'') || 'Modality Title'}</h3>
                  <p style={styleOf(specs.small)}>{content?.modalities?.[0]?.short || ''}</p>
                </div>
              </div>
                </div>
              </div>
            </div>

            <hr className="my-4 border-[#d4cccc]" />
            <div className="text-[12px] uppercase font-['Roboto Mono'] mb-2">Export tokens</div>
            <pre className="text-[12px] whitespace-pre-wrap">{JSON.stringify({
              fontSize: {
                h1: [specs.h1.size + 'px', { lineHeight: specs.h1.lineHeight + 'px', letterSpacing: specs.h1.letterSpacing + 'em' }],
                h2: [specs.h2.size + 'px', { lineHeight: specs.h2.lineHeight + 'px', letterSpacing: specs.h2.letterSpacing + 'em' }],
                h3: [specs.h3.size + 'px', { lineHeight: specs.h3.lineHeight + 'px', letterSpacing: specs.h3.letterSpacing + 'em' }],
                body: [specs.body.size + 'px', { lineHeight: specs.body.lineHeight + 'px' }],
                small: [specs.small.size + 'px', { lineHeight: specs.small.lineHeight + 'px' }]
              },
              colors,
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

function SaveTokensButton({ specs, paragraphSpacing, colors }: { specs: any; paragraphSpacing: number; colors: any }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const payload = {
    fontSize: {
      h1: [specs.h1.size + 'px', { lineHeight: specs.h1.lineHeight + 'px', letterSpacing: specs.h1.letterSpacing + 'em' }],
      h2: [specs.h2.size + 'px', { lineHeight: specs.h2.lineHeight + 'px', letterSpacing: specs.h2.letterSpacing + 'em' }],
      h3: [specs.h3.size + 'px', { lineHeight: specs.h3.lineHeight + 'px', letterSpacing: specs.h3.letterSpacing + 'em' }],
      body: [specs.body.size + 'px', { lineHeight: specs.body.lineHeight + 'px' }],
      small: [specs.small.size + 'px', { lineHeight: specs.small.lineHeight + 'px' }]
    },
    fonts: {
      body: specs.body.fontFamily,
      mono: specs.h2.fontFamily
    },
    colors,
    spacing: {
      paragraph: paragraphSpacing,
      h1: { mt: specs.h1.marginTop || 0, mb: specs.h1.marginBottom || 0 },
      h2: { mt: specs.h2.marginTop || 0, mb: specs.h2.marginBottom || 0 },
      h3: { mt: specs.h3.marginTop || 0, mb: specs.h3.marginBottom || 0 }
    },
    button: {
      radius: getComputedStyle(document.documentElement).getPropertyValue('--btn-radius') || '9999px',
      px: Number((getComputedStyle(document.documentElement).getPropertyValue('--btn-px') || '16px').replace('px','')),
      py: Number((getComputedStyle(document.documentElement).getPropertyValue('--btn-py') || '12px').replace('px','')),
      weight: Number((getComputedStyle(document.documentElement).getPropertyValue('--btn-weight') || '700').trim()),
      transform: (getComputedStyle(document.documentElement).getPropertyValue('--btn-transform') || 'uppercase').trim() as any,
      letterSpacing: (getComputedStyle(document.documentElement).getPropertyValue('--btn-ls') || '0.06em').trim(),
      borderWidth: '1px'
    }
  };

  const save = async () => {
    setSaving(true); setMessage(null);
    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: payload }, null, 2)
      });
      if (!res.ok) throw new Error('Failed');
      setMessage('Saved to tokens-clean.js. You may need to refresh to see updated tokens.');
    } catch (e) {
      setMessage('Save failed. I can copy these tokens manually.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={save} disabled={saving} className="px-3 py-2 rounded bg-black text-white text-[12px]">
        {saving ? 'Saving…' : 'Save as tokens'}
      </button>
      {message && <span className="text-[12px] text-[#4c4848]">{message}</span>}
    </div>
  );
}
