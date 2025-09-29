import { useState } from 'react';
import { layoutPresets } from './LayoutVariants';

interface LayoutSwitcherProps {
  onLayoutChange: (positions: typeof layoutPresets.current) => void;
}

export default function LayoutSwitcher({ onLayoutChange }: LayoutSwitcherProps) {
  const [currentLayout, setCurrentLayout] = useState<keyof typeof layoutPresets>('current');
  
  const handleLayoutChange = (layout: keyof typeof layoutPresets) => {
    setCurrentLayout(layout);
    onLayoutChange(layoutPresets[layout]);
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'white',
      border: '2px solid #3b5849',
      borderRadius: '8px',
      padding: '12px',
      display: 'flex',
      gap: '8px',
      zIndex: 9998,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <span style={{ 
        fontWeight: 'bold', 
        fontSize: '12px', 
        alignSelf: 'center',
        marginRight: '8px',
        color: '#3b5849'
      }}>
        Layout:
      </span>
      
      {Object.keys(layoutPresets).map((layout) => (
        <button
          key={layout}
          onClick={() => handleLayoutChange(layout as keyof typeof layoutPresets)}
          style={{
            padding: '6px 12px',
            background: currentLayout === layout ? '#3b5849' : '#f0f0f0',
            color: currentLayout === layout ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            textTransform: 'capitalize',
            fontWeight: currentLayout === layout ? 'bold' : 'normal',
            transition: 'all 0.2s'
          }}
        >
          {layout}
        </button>
      ))}
      
      <div style={{
        borderLeft: '1px solid #ddd',
        margin: '0 8px'
      }} />
      
      <button
        onClick={() => {
          const positions = layoutPresets[currentLayout];
          const text = Object.entries(positions)
            .map(([key, value]) => `${key}: ${value}px`)
            .join('\n');
          navigator.clipboard.writeText(text);
        }}
        style={{
          padding: '6px 12px',
          background: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        Copy Values
      </button>
    </div>
  );
}
