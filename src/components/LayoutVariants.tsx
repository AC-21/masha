// Different layout presets for testing
export const layoutPresets = {
  // Current layout
  current: {
    headline: 81,
    bodyText: 206, 
    portrait: 96,
    myWork: 959,
    modSubtitle: 1033,
    modRow1: 1143,
    modRow2: 1330,
    calendly: 1046
  },
  
  // More compact - everything tighter
  compact: {
    headline: 60,
    bodyText: 160,
    portrait: 70,
    myWork: 880,
    modSubtitle: 950,
    modRow1: 1050,
    modRow2: 1220,
    calendly: 960
  },
  
  // More breathing room
  spacious: {
    headline: 100,
    bodyText: 230,
    portrait: 110,
    myWork: 1000,
    modSubtitle: 1080,
    modRow1: 1190,
    modRow2: 1380,
    calendly: 1090
  },
  
  // Golden ratio based (1.618)
  golden: {
    headline: 75,
    bodyText: 200,
    portrait: 90,
    myWork: 950,
    modSubtitle: 1020,
    modRow1: 1130,
    modRow2: 1310,
    calendly: 1035
  },
  
  // Centered in viewport (assuming ~900px viewport)
  centered: {
    headline: 85,
    bodyText: 210,
    portrait: 100,
    myWork: 920,
    modSubtitle: 990,
    modRow1: 1100,
    modRow2: 1280,
    calendly: 1000
  }
};

// Convert to percentages for responsive scaling
export const getResponsivePositions = (preset: keyof typeof layoutPresets) => {
  const positions = layoutPresets[preset];
  const baseHeight = 1900;
  
  return Object.entries(positions).reduce((acc, [key, value]) => {
    acc[key] = {
      px: value,
      percent: (value / baseHeight * 100).toFixed(2)
    };
    return acc;
  }, {} as Record<string, { px: number, percent: string }>);
};
