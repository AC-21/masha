import React from 'react';
import { tokens } from '../styles/tokens-clean.js';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'glass';
};

const getVar = (name: string) =>
  typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() : '';

export default function TokenButton({ variant, style, className, children, ...rest }: Props) {
  const vars = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : ({} as any);
  const fallback = (key: string, def: string) => (vars?.getPropertyValue?.(key) || '').trim() || def;

  const v: 'solid' | 'outline' | 'glass' = (variant || (getVar('--btn-variant') as any) || (tokens as any)?.button?.variant || 'solid') as any;

  const radius = fallback('--btn-radius', (tokens as any)?.button?.radius || '9999px');
  const px = parseInt(fallback('--btn-px', ((tokens as any)?.button?.px ?? 16) + 'px'), 10);
  const py = parseInt(fallback('--btn-py', ((tokens as any)?.button?.py ?? 12) + 'px'), 10);
  const weight = parseInt(fallback('--btn-weight', String((tokens as any)?.button?.weight ?? 700)), 10);
  const transform = fallback('--btn-transform', (tokens as any)?.button?.transform || 'uppercase');
  const ls = fallback('--btn-ls', (tokens as any)?.button?.letterSpacing || '0.06em');
  const bw = fallback('--btn-bw', (tokens as any)?.button?.borderWidth || '1px');
  const bc = fallback('--btn-bc', (tokens as any)?.colors?.brand || '#3b5849');

  const base = (tokens as any)?.colors?.base || '#FEFEF7';
  const text = (tokens as any)?.colors?.text || '#000000';
  const brand = (tokens as any)?.colors?.brand || '#3b5849';

  const shared: React.CSSProperties = {
    padding: `${py}px ${px}px`,
    borderRadius: radius,
    fontWeight: weight,
    textTransform: transform as any,
    letterSpacing: ls as any,
    fontFamily: `Roboto Mono, ui-monospace, monospace`,
    fontSize: 12,
  };

  let variantStyle: React.CSSProperties = {};
  let classes = '';

  if (v === 'solid') {
    variantStyle = { backgroundColor: brand, color: base };
  } else if (v === 'outline') {
    variantStyle = { backgroundColor: 'transparent', color: text, borderColor: bc, borderWidth: bw as any, borderStyle: 'solid' };
    classes = 'border';
  } else {
    // glass
    variantStyle = {
      backgroundColor: 'rgba(255,255,255,0.30)',
      color: text,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      border: '1px solid rgba(255,255,255,0.55)'
    };
  }

  return (
    <button
      {...rest}
      className={`${className || ''} ${classes}`}
      style={{ ...shared, ...variantStyle, ...style }}
    >
      {children}
    </button>
  );
}
