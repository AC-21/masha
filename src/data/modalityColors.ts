export type ModalityColors = {
  color: string;
  textColor: string;
};

// Map by slug id
export const MODALITY_COLORS = {
  "somatic-internal-family-systems": {
    "color": "#efefef",
    "textColor": "#1f2937"
  },
  "inner-child-work": {
    "color": "#ffdab9",
    "textColor": "#5f4b3a"
  },
  "movement-therapy": {
    "color": "#58a4b0",
    "textColor": "#edf6f8"
  },
  "energy-clearing": {
    "color": "#bfd1e5",
    "textColor": "#434c56"
  },
  "emotional-release": {
    "color": "#bfe8d8",
    "textColor": "#0d4e36"
  },
  "conversation-and-deep-listening": {
    "color": "#f4e8c1",
    "textColor": "#535046"
  },
  "prayer": {
    "color": "#ede6f2",
    "textColor": "#3f3545"
  },
  "writing": {
    "color": "#f4f4e9",
    "textColor": "#3e3c27"
  },
  "art-therapy": {
    "color": "#e0afa0",
    "textColor": "#31081f"
  },
  "shadow-work": {
    "color": "#f9c8d4",
    "textColor": "#471f29"
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


