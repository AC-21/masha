export type ModalityColors = {
  color: string;
  textColor: string;
};

// Map by slug id
export const MODALITY_COLORS: Record<string, ModalityColors> = {
  "somatic-internal-family-systems": { color: "#F7E8EE", textColor: "#4b2b36" },
  "inner-child-work": { color: "#F8EFE4", textColor: "#4b3425" },
  "movement-therapy": { color: "#EAF4F1", textColor: "#23423B" },
  "energy-clearing": { color: "#F1F6E9", textColor: "#334222" },
  "emotional-release": { color: "#F9E9EC", textColor: "#4b2932" },
  "conversation-deep-listening": { color: "#ECEFF7", textColor: "#233045" },
  prayer: { color: "#EEE9F7", textColor: "#2f2a44" },
  writing: { color: "#F4F4E9", textColor: "#3e3c27" },
  "art-therapy": { color: "#EDEFFC", textColor: "#2a2f5b" },
  "shadow-work": { color: "#EDEEEE", textColor: "#2a2a2a" },
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


