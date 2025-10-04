import { useState } from 'react';
import LandscapeCanvas from './LandscapeCanvas';
import FlexibleLandscapeCanvas from './FlexibleLandscapeCanvas';
import DynamicLandscapeCanvas from './DynamicLandscapeCanvas';

export default function LayoutSwitcher() {
  const [activeLayout, setActiveLayout] = useState('original');
  
  const layouts = {
    original: {
      name: 'Original Fixed',
      component: <LandscapeCanvas />
    },
    flexible: {
      name: 'Flexible Strategies',
      component: <FlexibleLandscapeCanvas />
    },
    dynamic: {
      name: 'Dynamic Percentage',
      component: <DynamicLandscapeCanvas />
    }
  };
  
  return (
    <>
      {/* Layout selector - only shown in dev mode */}
      {import.meta.env.DEV && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 10000,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Layout Type:</div>
          {Object.entries(layouts).map(([key, layout]) => (
            <label key={key} style={{ display: 'block', margin: '5px 0', cursor: 'pointer' }}>
              <input
                type="radio"
                name="layout"
                value={key}
                checked={activeLayout === key}
                onChange={(e) => setActiveLayout(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              {layout.name}
            </label>
          ))}
        </div>
      )}
      
      {layouts[activeLayout].component}
    </>
  );
}
