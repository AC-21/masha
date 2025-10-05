const ensurePreconnect = (href: string) => {
  if (document.querySelector(`link[data-preconnect='${href}']`)) return;
  const l = document.createElement('link');
  l.rel = 'preconnect';
  l.href = href;
  l.setAttribute('data-preconnect', href);
  document.head.appendChild(l);
};

const addCss = (url: string) => {
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
  const base = (name || '').trim();
  if (!base) return [];
  const hyphen = base.toLowerCase().replace(/\s+/g, '-');
  const tight = base.toLowerCase().replace(/\s+/g, '');
  switch (base) {
    case 'General Sans':
      return [fsUrl('general-sans'), fsUrl('generalsans')];
    case 'Cabinet Grotesk':
      return [fsUrl('cabinet-grotesk'), fsUrl('cabinetgrotesk')];
    case 'Satoshi':
      return [fsUrl('satoshi')];
    case 'Epilogue':
      return [gUrl('Epilogue')];
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

export function loadFontsFromTokens(fonts: Record<string, string | string[]>) {
  const families = new Set<string>();
  Object.values(fonts || {}).forEach((stack) => {
    if (!stack) return;
    const primary = (Array.isArray(stack) ? stack.join(',') : stack).split(',')[0]?.replace(/["']/g, '').trim();
    if (primary) families.add(primary);
  });
  families.forEach((name) => candidatesFor(name).forEach(addCss));
}
