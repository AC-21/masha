import { useState, useEffect, useRef } from 'react';

export default function LayoutPositioner() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [positions, setPositions] = useState({
    headline: 71,
    bodytext: 196,
    portrait: 71,
    mywork: 949,
    modsubtitle: 1023,
    modrow1: 1133,
    modrow2: 1320,
    calendly: 1036
  });

  const draggedElement = useRef<string | null>(null);
  const dragOffset = useRef(0);

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    draggedElement.current = elementId;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    dragOffset.current = e.clientY - rect.top;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedElement.current) {
        const canvas = document.querySelector('#desktop-canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const scale = canvasRect.width / 1650; // Account for ScaleFrame scaling
        
        const newTop = (e.clientY - canvasRect.top - dragOffset.current) / scale;
        
        setPositions(prev => ({
          ...prev,
          [draggedElement.current!]: Math.max(0, Math.round(newTop))
        }));
      }
    };

    const handleMouseUp = () => {
      draggedElement.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handlePositionChange = (element: string, value: number) => {
    setPositions(prev => ({
      ...prev,
      [element]: value
    }));
  };

  const copyPositions = () => {
    const text = `Portrait Image: ${positions.portrait}px
Headline: ${positions.headline}px
Body Text: ${positions.bodytext}px
My Work Title: ${positions.mywork}px
Modalities Subtitle: ${positions.modsubtitle}px
Modalities Row 1: ${positions.modrow1}px
Modalities Row 2: ${positions.modrow2}px
Calendly Widget: ${positions.calendly}px`;
    
    navigator.clipboard.writeText(text);
  };

  // Get the scale of the desktop canvas
  const [canvasScale, setCanvasScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const canvas = document.querySelector('#desktop-canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setCanvasScale(rect.width / 1650);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'fixed',
          top: '20px',
          right: isCollapsed ? '20px' : '340px',
          zIndex: 10001,
          background: '#3b5849',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          transition: 'right 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {isCollapsed ? '📐 Position Tool' : '✕'}
      </button>

      {/* Overlay Placeholder Boxes */}
      {showOverlay && !isCollapsed && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
          {/* Get the desktop canvas bounds */}
          <div id="overlay-container" style={{ position: 'relative' }}>
            {/* Portrait Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'portrait')}
              style={{
                position: 'absolute',
                left: `${122 * canvasScale}px`,
                top: `${positions.portrait * canvasScale}px`,
                width: `${581 * canvasScale}px`,
                height: `${775 * canvasScale}px`,
                background: 'rgba(103, 126, 234, 0.3)',
                border: '2px dashed #667eea',
                borderRadius: '37px',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#667eea',
                fontWeight: 'bold',
                fontSize: `${20 * canvasScale}px`
              }}
            >
              PORTRAIT
            </div>

            {/* Headline Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'headline')}
              style={{
                position: 'absolute',
                left: `${784 * canvasScale}px`,
                top: `${positions.headline * canvasScale}px`,
                width: `${763 * canvasScale}px`,
                height: `${80 * canvasScale}px`,
                background: 'rgba(59, 88, 73, 0.2)',
                border: '2px dashed #3b5849',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b5849',
                fontWeight: 'bold',
                fontSize: `${14 * canvasScale}px`
              }}
            >
              HEADLINE
            </div>

            {/* Body Text Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'bodytext')}
              style={{
                position: 'absolute',
                left: `${788 * canvasScale}px`,
                top: `${positions.bodytext * canvasScale}px`,
                width: `${746 * canvasScale}px`,
                height: `${650 * canvasScale}px`,
                background: 'rgba(59, 88, 73, 0.1)',
                border: '2px dashed #3b5849',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '20px',
                color: '#3b5849',
                fontWeight: 'bold',
                fontSize: `${14 * canvasScale}px`
              }}
            >
              BODY TEXT
            </div>

            {/* My Work Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'mywork')}
              style={{
                position: 'absolute',
                left: `${159 * canvasScale}px`,
                top: `${positions.mywork * canvasScale}px`,
                width: `${200 * canvasScale}px`,
                height: `${40 * canvasScale}px`,
                background: 'rgba(255, 87, 34, 0.2)',
                border: '2px dashed #ff5722',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff5722',
                fontWeight: 'bold',
                fontSize: `${14 * canvasScale}px`
              }}
            >
              MY WORK
            </div>

            {/* Modalities Subtitle Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'modsubtitle')}
              style={{
                position: 'absolute',
                left: `${159 * canvasScale}px`,
                top: `${positions.modsubtitle * canvasScale}px`,
                width: `${650 * canvasScale}px`,
                height: `${60 * canvasScale}px`,
                background: 'rgba(255, 87, 34, 0.1)',
                border: '2px dashed #ff5722',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff5722',
                fontWeight: 'bold',
                fontSize: `${12 * canvasScale}px`
              }}
            >
              SUBTITLE
            </div>

            {/* Modalities Row 1 Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'modrow1')}
              style={{
                position: 'absolute',
                left: `${159 * canvasScale}px`,
                top: `${positions.modrow1 * canvasScale}px`,
                width: `${550 * canvasScale}px`,
                height: `${150 * canvasScale}px`,
                background: 'rgba(33, 150, 243, 0.15)',
                border: '2px dashed #2196f3',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2196f3',
                fontWeight: 'bold',
                fontSize: `${14 * canvasScale}px`
              }}
            >
              MODALITIES ROW 1
            </div>

            {/* Modalities Row 2 Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'modrow2')}
              style={{
                position: 'absolute',
                left: `${159 * canvasScale}px`,
                top: `${positions.modrow2 * canvasScale}px`,
                width: `${550 * canvasScale}px`,
                height: `${150 * canvasScale}px`,
                background: 'rgba(33, 150, 243, 0.15)',
                border: '2px dashed #2196f3',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2196f3',
                fontWeight: 'bold',
                fontSize: `${14 * canvasScale}px`
              }}
            >
              MODALITIES ROW 2
            </div>

            {/* Calendly Placeholder */}
            <div
              onMouseDown={(e) => handleMouseDown(e, 'calendly')}
              style={{
                position: 'absolute',
                left: `${800 * canvasScale}px`,
                top: `${positions.calendly * canvasScale}px`,
                width: `${750 * canvasScale}px`,
                height: `${770 * canvasScale}px`,
                background: 'rgba(156, 39, 176, 0.15)',
                border: '2px dashed #9c27b0',
                cursor: 'move',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9c27b0',
                fontWeight: 'bold',
                fontSize: `${16 * canvasScale}px`
              }}
            >
              CALENDLY
            </div>
          </div>
        </div>
      )}

      {/* Modal Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isCollapsed ? '-320px' : 0,
          width: '320px',
          height: '100vh',
          background: 'white',
          borderLeft: '2px solid #3b5849',
          zIndex: 10000,
          transition: 'right 0.3s ease',
          overflowY: 'auto',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ padding: '60px 20px 20px' }}>
          <h3 style={{ marginBottom: '20px', color: '#3b5849', fontSize: '18px' }}>
            Layout Positioner
          </h3>
          
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
            Drag the overlay boxes or use sliders below
          </p>

          {/* Toggle Overlay */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={showOverlay}
                onChange={(e) => setShowOverlay(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Show Overlay Boxes
            </label>
          </div>

          {/* Hero Section */}
          <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ fontSize: '13px', color: '#3b5849', marginBottom: '12px', textTransform: 'uppercase' }}>
              Hero Section
            </h4>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Headline:</span>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={positions.headline}
                  onChange={(e) => handlePositionChange('headline', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.headline}
                  onChange={(e) => handlePositionChange('headline', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Body Text:</span>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={positions.bodytext}
                  onChange={(e) => handlePositionChange('bodytext', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.bodytext}
                  onChange={(e) => handlePositionChange('bodytext', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Portrait:</span>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={positions.portrait}
                  onChange={(e) => handlePositionChange('portrait', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.portrait}
                  onChange={(e) => handlePositionChange('portrait', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
          </div>

          {/* My Work Section */}
          <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ fontSize: '13px', color: '#3b5849', marginBottom: '12px', textTransform: 'uppercase' }}>
              My Work Section
            </h4>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Title:</span>
                <input
                  type="range"
                  min="900"
                  max="1200"
                  value={positions.mywork}
                  onChange={(e) => handlePositionChange('mywork', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.mywork}
                  onChange={(e) => handlePositionChange('mywork', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Subtitle:</span>
                <input
                  type="range"
                  min="1000"
                  max="1300"
                  value={positions.modsubtitle}
                  onChange={(e) => handlePositionChange('modsubtitle', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.modsubtitle}
                  onChange={(e) => handlePositionChange('modsubtitle', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
          </div>

          {/* Modalities */}
          <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ fontSize: '13px', color: '#3b5849', marginBottom: '12px', textTransform: 'uppercase' }}>
              Modalities
            </h4>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Row 1:</span>
                <input
                  type="range"
                  min="1100"
                  max="1400"
                  value={positions.modrow1}
                  onChange={(e) => handlePositionChange('modrow1', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.modrow1}
                  onChange={(e) => handlePositionChange('modrow1', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Row 2:</span>
                <input
                  type="range"
                  min="1300"
                  max="1600"
                  value={positions.modrow2}
                  onChange={(e) => handlePositionChange('modrow2', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.modrow2}
                  onChange={(e) => handlePositionChange('modrow2', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
          </div>

          {/* Calendly */}
          <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ fontSize: '13px', color: '#3b5849', marginBottom: '12px', textTransform: 'uppercase' }}>
              Calendly Widget
            </h4>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ width: '80px', color: '#666' }}>Position:</span>
                <input
                  type="range"
                  min="1000"
                  max="1300"
                  value={positions.calendly}
                  onChange={(e) => handlePositionChange('calendly', Number(e.target.value))}
                  style={{ flex: 1, marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={positions.calendly}
                  onChange={(e) => handlePositionChange('calendly', Number(e.target.value))}
                  style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={copyPositions}
            style={{
              width: '100%',
              padding: '12px',
              background: '#3b5849',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '10px'
            }}
          >
            Copy All Positions
          </button>

          {/* Current Values Display */}
          <div style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '11px',
            lineHeight: '1.6',
            color: '#666'
          }}>
            <strong>Current Values:</strong><br />
            Portrait: {positions.portrait}px<br />
            Headline: {positions.headline}px<br />
            Body: {positions.bodytext}px<br />
            My Work: {positions.mywork}px<br />
            Subtitle: {positions.modsubtitle}px<br />
            Mod Row 1: {positions.modrow1}px<br />
            Mod Row 2: {positions.modrow2}px<br />
            Calendly: {positions.calendly}px
          </div>
        </div>
      </div>
    </>
  );
}