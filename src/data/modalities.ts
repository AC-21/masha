export type Modality = {
  id: string;
  title: string;
  excerpt: string;
  color: string; // pastel overlay color
  textColor?: string; // preferred text color for this modality
};

export const MODALITIES: Modality[] = [
  {
    id: "ifs",
    title: "Somatic Internal\nFamily Systems",
    excerpt:
      "One of my favorite modalities — views the human being as a constellation of distinct parts, each carrying its own expression, frequency, story, feelings, and emotions.",
    color: "#F7E8EE", // soft rose
    textColor: "#4b2b36", // plum
  },
  {
    id: "movement",
    title: "Movement\nTherapy",
    excerpt:
      "Gentle, attuned movement to reconnect with your natural rhythms and restore a sense of safety and aliveness.",
    color: "#EAF4F1", // mint
    textColor: "#23423B", // deep teal
  },
  {
    id: "breath",
    title: "Breathwork",
    excerpt:
      "Resourcing through breath — creating space in the body and clarity in the mind.",
    color: "#EAF3FA", // sky
    textColor: "#1f2d42", // slate blue
  },
];


