import type { CSSProperties } from 'react';
import { tokens } from './tokens-clean.js';

type Key = 'h1' | 'h2' | 'h3' | 'body' | 'small';

const asFamily = (f: string | string[]) => Array.isArray(f) ? f.join(', ') : f;

const fontMeta = (k: Key) => {
  const tuple = (tokens as any).fontSize?.[k] as [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: number | string; textTransform?: string }];
  const [size, meta] = tuple || ['14px', { lineHeight: '24px' }];
  return { size, lineHeight: meta?.lineHeight || '24px', letterSpacing: meta?.letterSpacing, fontWeight: meta?.fontWeight, textTransform: meta?.textTransform };
};

export const styleFor = (k: Key): CSSProperties => {
  const { size, lineHeight, letterSpacing, fontWeight, textTransform } = fontMeta(k);
  const heading = k === 'h1' || k === 'h2' || k === 'h3';
  return {
    fontFamily: asFamily((tokens as any).fonts?.[k] || (heading ? (tokens as any).fonts?.mono : (tokens as any).fonts?.body) || (heading ? 'Roboto Mono, ui-monospace, monospace' : 'Inter, ui-sans-serif, system-ui, sans-serif')),
    fontSize: size,
    lineHeight,
    letterSpacing,
    textTransform: textTransform || (heading ? 'uppercase' : undefined),
    fontWeight: fontWeight || (heading ? 700 : 400),
  };
};

export const marginsFor = (k: 'h1' | 'h2' | 'h3') => {
  const sp = (tokens as any).spacing?.[k] || { mt: 0, mb: 8 };
  return { marginTop: `${sp.mt || 0}px`, marginBottom: `${sp.mb || 0}px` } as CSSProperties;
};

export const paragraphSpacing = () => {
  const val = (tokens as any).spacing?.paragraph;
  return typeof val === 'number' ? `${val}px` : '16px';
};
