import { useState, useEffect } from 'react';

export default function LayoutPositioner() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [positions, setPositions] = useState({
    headline: 82,
    bodytext: 185,
    portrait: 86,
    mywork: 1048,
    modsubtitle: 1095,
    modrow1: 1200,
    modrow2: 1400,
    calendly: 1100
  });

  // Apply positions in real-time to actual elements
  useEffect(() => {
    const applyPositions = () => {
      // Get the desktop canvas container
      const canvas = document.querySelector('#desktop-canvas');
      if (!canvas) return;
      
      // Find elements by their style attributes and classes
      const allElements = canvas.querySelectorAll('[style*="top:"], .absolute');
      
      allElements.forEach((elem) => {
        const style = elem.getAttribute('style') || '';
        const classes = elem.className || '';
        
        // Headline (left: 784px)
        if (style.includes("left: '784px'") || style.includes('left: 784px')) {
          (elem as HTMLElement).style.top = `${positions.headline}px`;
        }
        // Body text (left: 788px)
        else if (style.includes("left: '788px'") || style.includes('left: 788px')) {
          (elem as HTMLElement).style.top = `${positions.bodytext}px`;
        }
        // Portrait (picture element)
        else if (elem.tagName === 'PICTURE' && classes.includes('absolute')) {
          (elem as HTMLElement).style.top = `${positions.portrait}px`;
        }
        // My Work title (text-3xl)
        else if (classes.includes('text-3xl') && classes.includes('left-[159px]')) {
          (elem as HTMLElement).style.top = `${positions.mywork}px`;
        }
        // Modalities subtitle (w-[650px])
        else if (classes.includes('w-[650px]') && classes.includes('left-[159px]')) {
          (elem as HTMLElement).style.top = `${positions.modsubtitle}px`;
        }
        // Movement/Laughter row (top-[1200px])
        else if (classes.includes('left-[159px]') && classes.includes('top-[1200px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1}px`;
        }
        else if (classes.includes('left-[430px]') && classes.includes('top-[1200px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1}px`;
        }
        // Parts/Deep Connection row (top-[1400px])
        else if (classes.includes('left-[159px]') && classes.includes('top-[1400px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2}px`;
        }
        else if (classes.includes('left-[430px]') && classes.includes('top-[1400px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2}px`;
        }
        // Calendly container (left-[800px])
        else if (classes.includes('left-[800px]')) {
          (elem as HTMLElement).style.top = `${positions.calendly}px`;
        }
        
        // Also update bullet points relative to their headings
        if (classes.includes('left-[189px]') && classes.includes('top-[1242px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1 + 42}px`;
        }
        else if (classes.includes('left-[189px]') && classes.includes('top-[1336px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1 + 136}px`;
        }
        else if (classes.includes('left-[460px]') && classes.includes('top-[1242px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1 + 42}px`;
        }
        else if (classes.includes('left-[460px]') && classes.includes('top-[1336px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow1 + 136}px`;
        }
        else if (classes.includes('left-[189px]') && classes.includes('top-[1442px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2 + 42}px`;
        }
        else if (classes.includes('left-[189px]') && classes.includes('top-[1536px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2 + 136}px`;
        }
        else if (classes.includes('left-[460px]') && classes.includes('top-[1442px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2 + 42}px`;
        }
        else if (classes.includes('left-[460px]') && classes.includes('top-[1536px]')) {
          (elem as HTMLElement).style.top = `${positions.modrow2 + 136}px`;
        }
      });
    };

    // Wait a bit for the DOM to be ready
    setTimeout(applyPositions, 100);
  }, [positions]);

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
          
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
            Adjust values to see real-time positioning changes
          </p>

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
