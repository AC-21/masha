export type Modality = {
  id: string;
  title: string;
  excerpt: string;
  color: string; // pastel overlay color
};

export const MODALITIES: Modality[] = [
  {
    id: "ifs",
    title: "Somatic Internal\nFamily Systems",
    excerpt:
      "One of my favorite modalities — views the human being as a constellation of distinct parts, each carrying its own expression, frequency, story, feelings, and emotions.",
    color: "#F7E8EE", // soft rose
  },
  {
    id: "movement",
    title: "Movement\nTherapy",
    excerpt:
      "Gentle, attuned movement to reconnect with your natural rhythms and restore a sense of safety and aliveness.",
    color: "#EAF4F1", // mint
  },
  {
    id: "breath",
    title: "Breathwork",
    excerpt:
      "Resourcing through breath — creating space in the body and clarity in the mind.",
    color: "#EAF3FA", // sky
  },
];


