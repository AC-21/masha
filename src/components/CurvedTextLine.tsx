interface CurvedTextLineProps {
  text?: string;
  pathD?: string;
  strokeWidth?: number;
  dashLength?: number;
  dashGap?: number;
  lineColor?: string;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  textOffset?: number;
  className?: string;
}

export default function CurvedTextLine({
  text = "Schedule time with me here",
  pathD = "M 0 100 Q 150 40, 300 100 Q 450 60, 600 100",
  strokeWidth = 2,
  dashLength = 8,
  dashGap = 8,
  lineColor = "#999999",
  textColor = "#000000",
  fontSize = 16,
  fontFamily = "Inter",
  textOffset = 0,
  className = ""
}: CurvedTextLineProps) {
  // Generate unique ID for this instance to avoid conflicts
  const pathId = `curvePath-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg 
      viewBox="0 0 600 200" 
      className={`w-full h-auto ${className}`}
      preserveAspectRatio="none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <path id={pathId} d={pathD} />
      </defs>
      
      {/* Dashed line */}
      <use
        href={`#${pathId}`}
        fill="none"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${dashGap}`}
        strokeLinecap="round"
      />
      
      {/* Text along path */}
      <text
        fill={textColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        dy={textOffset}
        style={{ pointerEvents: 'none' }}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
