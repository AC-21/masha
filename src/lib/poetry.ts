export type Poem = {
  slug: string;
  title: string;
  date: Date;
  summary?: string;
  tags?: string[];
  body: string;
};

const files = import.meta.glob("/content/poetry/*.md", {
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string): { meta: Record<string, any>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };
  const [, fm, body] = match;
  const meta: Record<string, any> = {};
  fm.split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    const valueRaw = line.slice(i + 1).trim();
    // very small YAML-ish parser for strings, dates, and array of strings
    if (valueRaw.startsWith("[") && valueRaw.endsWith("]")) {
      const parts = valueRaw
        .slice(1, -1)
        .split(",")
        .map((s) => s.replace(/^["']|["']$/g, "").trim())
        .filter(Boolean);
      meta[key] = parts;
    } else if (/^\d{4}-\d{2}-\d{2}/.test(valueRaw)) {
      meta[key] = valueRaw;
    } else {
      meta[key] = valueRaw.replace(/^["']|["']$/g, "");
    }
  });
  return { meta, body: body.trim() };
}

export async function loadPoems(): Promise<Poem[]> {
  const entries = await Promise.all(
    Object.entries(files).map(async ([path, loader]) => {
      const raw = await (loader as () => Promise<string>)();
      const { meta, body } = parseFrontmatter(raw);
      const slug = (meta.slug as string) || path.split("/").pop()!.replace(/\.md$/, "");
      const title = (meta.title as string) || slug;
      const date = new Date((meta.date as string) || Date.now());
      const summary = (meta.summary as string) || "";
      const tags = (meta.tags as string[]) || [];
      return { slug, title, date, summary, tags, body } as Poem;
    })
  );
  // newest first
  return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
}


