import { useState, useRef, useEffect } from 'react';

interface ControlPoint {
  x: number;
  y: number;
}

export default function CurvedLineEditor() {
  const [isOpen, setIsOpen] = useState(true);
  // Start with 13 evenly distributed points - scaled for larger safe area (800x300)
  const [controlPoints, setControlPoints] = useState<ControlPoint[]>([
    { x: 0, y: 150 },
    { x: 65, y: 120 },
    { x: 130, y: 90 },
    { x: 200, y: 120 },
    { x: 265, y: 150 },
    { x: 330, y: 180 },
    { x: 400, y: 150 },
    { x: 470, y: 120 },
    { x: 535, y: 90 },
    { x: 600, y: 120 },
    { x: 665, y: 150 },
    { x: 730, y: 150 },
    { x: 800, y: 150 }
  ]);
  
  const [curveType, setCurveType] = useState<'quadratic' | 'cubic'>('cubic');
  const [symmetryEnabled, setSymmetryEnabled] = useState(false); // Start with symmetry off for manual control
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0.5);
  const [curveTension, setCurveTension] = useState(0.3); // Control curve smoothness
  
  const [lineSettings, setLineSettings] = useState({
    strokeWidth: 2,
    dashLength: 8,
    dashGap: 8,
    color: '#999999',
    fontSize: 16,
    fontFamily: 'Inter',
    textColor: '#000000',
    text: 'Schedule time with me here',
    textOffset: 0 // Distance from line
  });
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Generate smooth curve path using cubic or quadratic bezier curves
  const generatePath = (points: ControlPoint[]): string => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    if (curveType === 'cubic') {
      // Cubic bezier with improved smoothness using Catmull-Rom style control points
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1];
        const prevPrev = points[i - 2];
        
        // Calculate tangent vectors for smooth curves
        let cp1x, cp1y, cp2x, cp2y;
        
        if (i === 1) {
          // First segment
          cp1x = prev.x + (curr.x - prev.x) * 0.33;
          cp1y = prev.y + (curr.y - prev.y) * 0.33;
          cp2x = curr.x - (curr.x - prev.x) * 0.33;
          cp2y = curr.y - (curr.y - prev.y) * 0.33;
        } else {
          // Middle segments - use previous point to calculate tangent
          // Use adjustable tension from state
          cp1x = prev.x + (curr.x - prevPrev.x) * curveTension;
          cp1y = prev.y + (curr.y - prevPrev.y) * curveTension;
          
          if (next) {
            cp2x = curr.x - (next.x - prev.x) * curveTension;
            cp2y = curr.y - (next.y - prev.y) * curveTension;
          } else {
            // Last segment
            cp2x = curr.x - (curr.x - prev.x) * 0.33;
            cp2y = curr.y - (curr.y - prev.y) * 0.33;
          }
        }
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    } else {
      // Quadratic bezier (original)
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const controlX = prev.x + (curr.x - prev.x) / 2;
        path += ` Q ${controlX} ${curr.y}, ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };
  
  // Load preset curve patterns (scaled for 800x300 safe area)
  const loadPreset = (preset: string) => {
    const presets: Record<string, ControlPoint[]> = {
      gentle: [
        { x: 0, y: 150 },
        { x: 265, y: 100 },
        { x: 535, y: 150 },
        { x: 800, y: 100 }
      ],
      wave: [
        { x: 0, y: 150 },
        { x: 200, y: 80 },
        { x: 400, y: 150 },
        { x: 600, y: 80 },
        { x: 800, y: 150 }
      ],
      symmetric: [
        { x: 0, y: 150 },
        { x: 160, y: 90 },
        { x: 400, y: 120 },
        { x: 640, y: 90 },
        { x: 800, y: 150 }
      ],
      steep: [
        { x: 0, y: 220 },
        { x: 200, y: 60 },
        { x: 400, y: 180 },
        { x: 600, y: 60 },
        { x: 800, y: 220 }
      ]
    };
    
    if (presets[preset]) {
      setControlPoints(presets[preset]);
    }
  };
  
  // Handle image upload for tracing
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const pathD = generatePath(controlPoints);
  
  const handleMouseDown = (index: number) => {
    setDraggingIndex(index);
  };
  
  // Disabled click-to-add since we start with 12 points
  // const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
  //   if (draggingIndex !== null) return;
  //   if ((e.target as SVGElement).tagName === 'circle') return;
  //   ...
  // };
  
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingIndex === null || !svgRef.current) return;
    
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    
    // Account for the viewBox offset (-100, -100) and full viewBox size (1000, 600)
    const viewBoxWidth = 1000;
    const viewBoxHeight = 600;
    const scaleX = viewBoxWidth / rect.width;
    const scaleY = viewBoxHeight / rect.height;
    
    // Calculate position relative to viewBox coordinates
    const x = ((e.clientX - rect.left) * scaleX) - 100; // Subtract viewBox x offset
    const y = ((e.clientY - rect.top) * scaleY) - 100;  // Subtract viewBox y offset
    
    const newPoints = [...controlPoints];
    newPoints[draggingIndex] = {
      x: Math.max(-50, Math.min(850, x)),
      y: Math.max(-50, Math.min(450, y))
    };
    
    // Apply symmetry if enabled and not dragging endpoints
    if (symmetryEnabled && draggingIndex > 0 && draggingIndex < controlPoints.length - 1) {
      const centerIndex = Math.floor(controlPoints.length / 2);
      const distanceFromCenter = draggingIndex - centerIndex;
      const mirrorIndex = centerIndex - distanceFromCenter;
      
      if (mirrorIndex >= 0 && mirrorIndex < controlPoints.length && mirrorIndex !== draggingIndex) {
        // Mirror the y position
        newPoints[mirrorIndex] = {
          ...newPoints[mirrorIndex],
          y: newPoints[draggingIndex].y
        };
      }
    }
    
    setControlPoints(newPoints);
  };
  
  const handleMouseUp = () => {
    setDraggingIndex(null);
  };
  
  const addPoint = () => {
    const lastPoint = controlPoints[controlPoints.length - 1];
    // Add new point with smart positioning
    const newX = Math.min(lastPoint.x + 100, 600); // Keep within safe area
    const newY = 100; // Default middle position
    
    setControlPoints([
      ...controlPoints,
      { x: newX, y: newY }
    ]);
  };
  
  const removePoint = (index: number) => {
    if (controlPoints.length <= 2) return; // Keep minimum 2 points
    setControlPoints(controlPoints.filter((_, i) => i !== index));
  };
  
  const copyToClipboard = () => {
    const code = `
<svg viewBox="0 0 600 200" className="w-full h-auto" preserveAspectRatio="none">
  <defs>
    <path id="curvePath" d="${pathD}" />
  </defs>
  
  {/* Dashed line */}
  <use
    href="#curvePath"
    fill="none"
    stroke="${lineSettings.color}"
    strokeWidth="${lineSettings.strokeWidth}"
    strokeDasharray="${lineSettings.dashLength} ${lineSettings.dashGap}"
    strokeLinecap="round"
  />
  
  {/* Text along path */}
  <text
    fill="${lineSettings.textColor}"
    fontSize="${lineSettings.fontSize}"
    fontFamily="${lineSettings.fontFamily}"
    dy="${lineSettings.textOffset}"
  >
    <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
      ${lineSettings.text}
    </textPath>
  </text>
</svg>`;
    
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };
  
  const exportSettings = () => {
    const settings = {
      controlPoints,
      lineSettings,
      pathD
    };
    console.log('Curve Settings:', settings);
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
    alert('Settings copied to clipboard!');
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: isOpen ? '20px' : '-95vh',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95vw',
      maxWidth: '1400px',
      height: isOpen ? '90vh' : '40px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      zIndex: 10001,
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '2px solid #e5e5e5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
          🎨 Curved Line & Text Editor
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {isOpen ? '▼ Collapse' : '▲ Expand'}
        </button>
      </div>
      
      {isOpen && (
        <div style={{
          flex: 1,
          display: 'flex',
          gap: '20px',
          padding: '20px',
          overflow: 'hidden',
          height: '100%'
        }}>
          {/* Left Panel - Preview */}
          <div style={{ flex: 3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{
              flex: 1,
              border: '2px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0
            }}>
              <h3 style={{ marginTop: 0, fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Preview & Edit (Drag any of the 13 points to shape your curve)
              </h3>
              
              <svg
                ref={svgRef}
                viewBox="-100 -100 1000 600"
                style={{
                  flex: 1,
                  width: '100%',
                  minHeight: 0,
                  border: '1px dashed #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: draggingIndex !== null ? 'grabbing' : 'default'
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <defs>
                  <path id="curvePath" d={pathD} />
                </defs>
                
                {/* Background reference image */}
                {backgroundImage && (
                  <image
                    href={backgroundImage}
                    x="0"
                    y="0"
                    width="800"
                    height="300"
                    opacity={imageOpacity}
                    preserveAspectRatio="none"
                  />
                )}
                
                {/* Safe area indicator - larger now */}
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="300"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="10 5"
                  opacity="0.3"
                />
                <text x="8" y="20" fontSize="12" fill="#3b82f6" opacity="0.6" fontWeight="bold">Safe Area (800×300)</text>
                
                {/* Grid for reference */}
                <g opacity="0.08">
                  {[-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
                    <line key={`v${x}`} x1={x} y1="-100" x2={x} y2="600" stroke="#999" strokeWidth="1" />
                  ))}
                  {[-100, 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map(y => (
                    <line key={`h${y}`} x1="-100" y1={y} x2="900" y2={y} stroke="#999" strokeWidth="1" />
                  ))}
                </g>
                
                {/* The curved dashed line */}
                <use
                  href="#curvePath"
                  fill="none"
                  stroke={lineSettings.color}
                  strokeWidth={lineSettings.strokeWidth}
                  strokeDasharray={`${lineSettings.dashLength} ${lineSettings.dashGap}`}
                  strokeLinecap="round"
                />
                
                {/* Text along path */}
                <text
                  fill={lineSettings.textColor}
                  fontSize={lineSettings.fontSize}
                  fontFamily={lineSettings.fontFamily}
                  dy={lineSettings.textOffset}
                  style={{ 
                    userSelect: 'none',
                    pointerEvents: 'none',
                    fontWeight: lineSettings.fontFamily === 'Roboto Mono' ? 'bold' : 'normal'
                  }}
                >
                  <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                    {lineSettings.text}
                  </textPath>
                </text>
                
                {/* Control points - larger and more interactive */}
                {controlPoints.map((point, index) => (
                  <g key={index}>
                    {/* Larger hit area for easier clicking */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="15"
                      fill="transparent"
                      style={{ cursor: 'grab' }}
                      onMouseDown={() => handleMouseDown(index)}
                    />
                    {/* Visible point */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill={draggingIndex === index ? '#10b981' : '#3b82f6'}
                      stroke="white"
                      strokeWidth="2"
                      style={{ cursor: 'grab', pointerEvents: 'none' }}
                    />
                    <text
                      x={point.x}
                      y={point.y - 14}
                      fontSize="10"
                      fill="#333"
                      textAnchor="middle"
                      fontWeight="bold"
                      style={{ pointerEvents: 'none' }}
                    >
                      {index + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            
          </div>
          
          {/* Right Panel - Controls */}
          <div style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            overflowY: 'auto',
            padding: '5px',
            minHeight: 0
          }}>
            {/* Curve Presets */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '13px', marginBottom: '10px' }}>📐 Curve Presets</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <button onClick={() => loadPreset('gentle')} style={{ padding: '5px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Gentle</button>
                <button onClick={() => loadPreset('wave')} style={{ padding: '5px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Wave</button>
                <button onClick={() => loadPreset('symmetric')} style={{ padding: '5px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Symmetric</button>
                <button onClick={() => loadPreset('steep')} style={{ padding: '5px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Steep</button>
              </div>
            </div>

            {/* Curve Settings */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '13px', marginBottom: '10px' }}>⚙️ Curve Settings</h4>
              
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '11px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={symmetryEnabled}
                  onChange={(e) => setSymmetryEnabled(e.target.checked)}
                  style={{ marginRight: '6px' }}
                />
                Enable Symmetry
              </label>
              
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '8px' }}>
                Curve Type
                <select
                  value={curveType}
                  onChange={(e) => setCurveType(e.target.value as 'quadratic' | 'cubic')}
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '11px'
                  }}
                >
                  <option value="cubic">Cubic (Smoother)</option>
                  <option value="quadratic">Quadratic</option>
                </select>
              </label>
              
              <label style={{ display: 'block', fontSize: '11px' }}>
                Smoothness: {curveTension.toFixed(2)}
                <input
                  type="range"
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  value={curveTension}
                  onChange={(e) => setCurveTension(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#666', marginTop: '2px' }}>
                  <span>Tight</span>
                  <span>Smooth</span>
                </div>
              </label>
            </div>
            
            {/* Line Settings */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '13px' }}>Line Settings</h4>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Stroke Width: {lineSettings.strokeWidth}px
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={lineSettings.strokeWidth}
                  onChange={(e) => setLineSettings({ ...lineSettings, strokeWidth: Number(e.target.value) })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Dash Length: {lineSettings.dashLength}px
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={lineSettings.dashLength}
                  onChange={(e) => setLineSettings({ ...lineSettings, dashLength: Number(e.target.value) })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Dash Gap: {lineSettings.dashGap}px
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={lineSettings.dashGap}
                  onChange={(e) => setLineSettings({ ...lineSettings, dashGap: Number(e.target.value) })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Line Color
                <input
                  type="color"
                  value={lineSettings.color}
                  onChange={(e) => setLineSettings({ ...lineSettings, color: e.target.value })}
                  style={{ width: '100%', marginTop: '4px', height: '32px', borderRadius: '4px' }}
                />
              </label>
            </div>
            
            {/* Text Settings */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '14px' }}>Text Settings</h4>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Text Content
                <input
                  type="text"
                  value={lineSettings.text}
                  onChange={(e) => setLineSettings({ ...lineSettings, text: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    padding: '6px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '12px'
                  }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Font Size: {lineSettings.fontSize}px
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={lineSettings.fontSize}
                  onChange={(e) => setLineSettings({ ...lineSettings, fontSize: Number(e.target.value) })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Font Family
                <select
                  value={lineSettings.fontFamily}
                  onChange={(e) => setLineSettings({ ...lineSettings, fontFamily: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    padding: '6px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '12px'
                  }}
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto Mono">Roboto Mono</option>
                  <option value="Caveat">Caveat</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Text Offset: {lineSettings.textOffset}px
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={lineSettings.textOffset}
                  onChange={(e) => setLineSettings({ ...lineSettings, textOffset: Number(e.target.value) })}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                Text Color
                <input
                  type="color"
                  value={lineSettings.textColor}
                  onChange={(e) => setLineSettings({ ...lineSettings, textColor: e.target.value })}
                  style={{ width: '100%', marginTop: '4px', height: '32px', borderRadius: '4px' }}
                />
              </label>
            </div>
            
            {/* Control Points - Editable X/Y Inputs */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '13px', marginBottom: '8px' }}>📍 Control Points (X, Y)</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {controlPoints.map((point, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '20px 1fr 1fr 24px',
                    gap: '4px',
                    alignItems: 'center',
                    padding: '4px',
                    marginBottom: '4px',
                    backgroundColor: 'white',
                    borderRadius: '3px',
                    fontSize: '10px'
                  }}>
                    <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>#{index + 1}</span>
                    <input
                      type="number"
                      value={Math.round(point.x)}
                      onChange={(e) => {
                        const newPoints = [...controlPoints];
                        newPoints[index].x = Number(e.target.value);
                        setControlPoints(newPoints);
                      }}
                      style={{
                        padding: '3px 4px',
                        fontSize: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        width: '100%'
                      }}
                      placeholder="X"
                    />
                    <input
                      type="number"
                      value={Math.round(point.y)}
                      onChange={(e) => {
                        const newPoints = [...controlPoints];
                        newPoints[index].y = Number(e.target.value);
                        setControlPoints(newPoints);
                      }}
                      style={{
                        padding: '3px 4px',
                        fontSize: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        width: '100%'
                      }}
                      placeholder="Y"
                    />
                    <button
                      onClick={() => removePoint(index)}
                      disabled={controlPoints.length <= 2}
                      style={{
                        padding: '2px 4px',
                        borderRadius: '3px',
                        border: '1px solid #ef4444',
                        background: controlPoints.length <= 2 ? '#ccc' : '#ef4444',
                        color: 'white',
                        cursor: controlPoints.length <= 2 ? 'not-allowed' : 'pointer',
                        fontSize: '9px',
                        lineHeight: 1
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reference Image Upload */}
            <div style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, fontSize: '13px', marginBottom: '8px' }}>🖼️ Reference Image</h4>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ fontSize: '10px', marginBottom: '8px', width: '100%' }}
              />
              
              {backgroundImage && (
                <>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px' }}>
                    Opacity: {Math.round(imageOpacity * 100)}%
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={imageOpacity}
                      onChange={(e) => setImageOpacity(Number(e.target.value))}
                      style={{ width: '100%', marginTop: '4px' }}
                    />
                  </label>
                  <button
                    onClick={() => setBackgroundImage(null)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ef4444',
                      background: '#ef4444',
                      color: 'white',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    Remove Image
                  </button>
                </>
              )}
            </div>
            
            {/* Actions */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px',
              marginTop: '10px'
            }}>
              <button
                onClick={addPoint}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #3b82f6',
                  background: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                ➕ Add Point
              </button>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #10b981',
                  background: '#10b981',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                📋 Copy Code
              </button>
              <button
                onClick={exportSettings}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #8b5cf6',
                  background: '#8b5cf6',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  gridColumn: 'span 2'
                }}
              >
                💾 Export Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
