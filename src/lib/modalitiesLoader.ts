import raw from "/modalities-to-seed.md?raw";
import { MODALITY_COLORS, slugify } from "../data/modalityColors";

export type LoadedModality = {
  id: string;
  title: string;
  excerpt: string;
  long?: string;
  color: string;
  textColor: string;
};

export function parseModalities(md: string): Omit<LoadedModality, "color" | "textColor">[] {
  const lines = md.split(/\r?\n/);
  const items: { id: string; title: string; excerpt: string; long?: string }[] = [];
  let title: string | null = null;
  let short: string | null = null;
  let longParts: string[] = [];
  const flush = () => {
    if (!title) return;
    const id = slugify(title);
    items.push({ id, title, excerpt: (short || "").replace(/^!+\s*/, "").trim(), long: longParts.join("\n").trim() || undefined });
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("#")) {
      if (title) {
        flush();
        short = null;
        longParts = [];
      }
      title = line.replace(/^#+\s*/, "").trim();
      continue;
    }
    if (line.startsWith("!") && short == null) {
      short = line;
      continue;
    }
    longParts.push(rawLine);
  }
  if (title) flush();
  return items;
}

export function loadModalitiesFromSeed(): LoadedModality[] {
  const parsed = parseModalities(raw);
  return parsed.map((m) => {
    const colors = MODALITY_COLORS[m.id] || { color: "#F0F0F0", textColor: "#1f2937" };
    return { ...m, ...colors };
  });
}


