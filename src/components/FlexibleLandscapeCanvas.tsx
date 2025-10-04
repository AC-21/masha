import { useState, useEffect } from 'react';
import ScaleFrame from "./ScaleFrame";
import CalendlyEmbed from "./CalendlyEmbed";

const sources = {
  avif: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.avif ${w}w`).join(', '),
  webp: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.webp ${w}w`).join(', '),
  jpg:  [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.jpg ${w}w`).join(', '),
};

interface LayoutStrategy {
  name: string;
  description: string;
  getPositions: (vh: number, vw: number) => any;
}

export default function FlexibleLandscapeCanvas() {
  const [strategy, setStrategy] = useState('fixed');
  const [windowSize, setWindowSize] = useState({ vh: 900, vw: 1440 });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ vh: window.innerHeight, vw: window.innerWidth });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Different positioning strategies
  const strategies: Record<string, LayoutStrategy> = {
    fixed: {
      name: 'Fixed Pixels',
      description: 'Current static positioning',
      getPositions: () => ({
        headline: 81,
        bodyText: 206,
        portrait: 96,
        myWork: 959,
        modSubtitle: 1033,
        modRow1: 1143,
        modRow2: 1330,
        calendly: 1046
      })
    },
    
    percentBased: {
      name: 'Percentage Based',
      description: 'Positions as % of canvas height',
      getPositions: () => {
        const baseHeight = 1900;
        return {
          headline: Math.round(baseHeight * 0.0426),     // 4.26%
          bodyText: Math.round(baseHeight * 0.1084),     // 10.84%
          portrait: Math.round(baseHeight * 0.0505),     // 5.05%
          myWork: Math.round(baseHeight * 0.5047),       // 50.47%
          modSubtitle: Math.round(baseHeight * 0.5437),  // 54.37%
          modRow1: Math.round(baseHeight * 0.6016),      // 60.16%
          modRow2: Math.round(baseHeight * 0.7000),      // 70.00%
          calendly: Math.round(baseHeight * 0.5505)      // 55.05%
        };
      }
    },
    
    viewportRatio: {
      name: 'Viewport Ratio',
      description: 'Adjusts based on viewport height ratio',
      getPositions: (vh) => {
        // Target viewport height is 900px, scale from there
        const ratio = vh / 900;
        const basePositions = {
          headline: 81,
          bodyText: 206,
          portrait: 96,
          myWork: 959,
          modSubtitle: 1033,
          modRow1: 1143,
          modRow2: 1330,
          calendly: 1046
        };
        
        // Scale positions based on viewport ratio
        return Object.fromEntries(
          Object.entries(basePositions).map(([key, value]) => [
            key, 
            Math.round(value * Math.min(Math.max(ratio, 0.8), 1.2)) // Limit scaling between 0.8x and 1.2x
          ])
        );
      }
    },
    
    goldenRatio: {
      name: 'Golden Ratio',
      description: 'Hero at 1/3, content at golden ratio point',
      getPositions: () => {
        const baseHeight = 1900;
        const goldenRatio = 0.618;
        
        return {
          headline: Math.round(baseHeight * 0.04),        // 4% from top
          bodyText: Math.round(baseHeight * 0.11),        // 11% from top
          portrait: Math.round(baseHeight * 0.06),        // 6% from top (lower than text)
          myWork: Math.round(baseHeight * (1 - goldenRatio)), // At golden ratio point
          modSubtitle: Math.round(baseHeight * (1 - goldenRatio) + 74),
          modRow1: Math.round(baseHeight * (1 - goldenRatio) + 184),
          modRow2: Math.round(baseHeight * (1 - goldenRatio) + 371),
          calendly: Math.round(baseHeight * (1 - goldenRatio) + 87)
        };
      }
    },
    
    compactCenter: {
      name: 'Compact Center',
      description: 'Everything pulled toward center',
      getPositions: () => ({
        headline: 120,
        bodyText: 245,
        portrait: 135,
        myWork: 880,
        modSubtitle: 954,
        modRow1: 1064,
        modRow2: 1251,
        calendly: 967
      })
    }
  };

  const positions = strategies[strategy].getPositions(windowSize.vh, windowSize.vw);

  return (
    <>
      {/* Strategy Selector */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Layout:</label>
        <select 
          value={strategy} 
          onChange={(e) => setStrategy(e.target.value)}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
        >
          {Object.entries(strategies).map(([key, strat]) => (
            <option key={key} value={key}>{strat.name}</option>
          ))}
        </select>
        <span style={{ fontSize: '11px', color: '#666', marginLeft: '10px' }}>
          {strategies[strategy].description}
        </span>
        <span style={{ fontSize: '10px', color: '#999', marginLeft: 'auto' }}>
          Viewport: {windowSize.vw}×{windowSize.vh}px
        </span>
      </div>

      <div className="relative w-full" style={{ backgroundColor: '#FEFEF7' }}>
        <ScaleFrame id="desktop-canvas" testId="desktop-canvas" designWidth={1650} designHeight={1900} minScale={0} maxScale={1} className="mx-auto w-full">
          <div className="relative w-[1650px] h-[1900px]" style={{ backgroundColor: '#FEFEF7' }}>
            
            {/* Headline */}
            <div className="absolute text-black font-bold font-['Roboto_Mono'] uppercase leading-9" 
                 style={{ left: '784px', top: `${positions.headline}px`, width: '763px' }}>
              One Sentence that lets people know what
              <br />
              The good word is.
            </div>
            
            {/* Body text */}
            <div className="absolute text-black text-sm font-medium font-['Inter'] lowercase leading-7"
                 style={{ left: '788px', top: `${positions.bodyText}px`, width: '746px' }}>
              I am deeply in love with what I do. <br /><br /> 
              It has been a struggle, though, to express in a sentence or two what it really is. I cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort. It is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. My heart feels so full guiding and witnessing the beautiful transformations happening within people. <br /><br /> 
              Recently, I have realized another core reason why I love it so much: since I was little, I have always wanted to connect with people on the truest, deepest level. I have always felt uncomfortable in scenarios where we all tend to follow a "normal," superficial way of interacting, often not speaking to how we truly feel, what we experience, what is burning or crying inside of us, what is real. But with people who choose to work with me, I get to see so much of their inner world, and the part of me that craves intimacy and truth feels safe. <br /><br /> 
              So, it is not "work." It is the time when my heart feels so grateful to connect with another in what really matters, to recognize each other's souls behind the masks, while acknowledging the masks and their purpose, as well as other infinite parts of ourselves. This precious time of heartfelt connection is healing for me, too. <br /><br /> 
              And that is why I can be grateful for my own suffering. It has led me to what I thought I was missing - deeper meaning and purpose. It made me realize what turning pain into a gift means for me. Sitting with it, working with plant medicine, spending days and nights suffocated inside my own misery, studying modalities - all of it so I can relate, guide, listen, understand, and hopefully help more and more people feel seen, whole, loved, and not alone. Alienation, shame, and keeping our suffering to ourselves only create more suffering. Seeing each other through eyes and hearts of truth and compassion is the only way that will create sustainable change - for the highest good of all.
            </div>
            
            {/* Portrait */}
            <picture className="absolute block" 
                     style={{ left: '122px', top: `${positions.portrait}px`, width: '581px', height: '775px', borderRadius: 37, overflow: 'hidden' }}>
              <source type="image/avif" srcSet={sources.avif} sizes="(min-width: 1024px) 581px, 90vw" />
              <source type="image/webp" srcSet={sources.webp} sizes="(min-width: 1024px) 581px, 90vw" />
              <img srcSet={sources.jpg} sizes="(min-width: 1024px) 581px, 90vw" src="/images/portrait-1080.jpg" alt="Portrait" width={581} height={775} className="w-full h-full object-cover" decoding="async" fetchPriority="high" />
            </picture>
            
            {/* My Work */}
            <div className="absolute text-black text-3xl font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '159px', top: `${positions.myWork}px` }}>
              My Work
            </div>
            
            {/* Modalities subtitle */}
            <div className="absolute text-black/70 text-xs font-['Inter'] italic leading-5"
                 style={{ left: '159px', top: `${positions.modSubtitle}px`, width: '650px' }}>
              EVERY SESSION IS UNIQUE & GUIDED BY YOUR OVERALL DESIRES.<br/>
              WE WILL NOT BE CONSTRAINED BY A SPECIFIC MODALITY; AND<br/>
              HERE'S SOME INFO BELOW ON WHERE WE MAY GO.
            </div>
            
            {/* Modalities Row 1 */}
            <div className="absolute text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '159px', top: `${positions.modRow1}px` }}>Movement</div>
            <div className="absolute text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '430px', top: `${positions.modRow1}px` }}>Laughter</div>
            
            {/* Bullets for Row 1 */}
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '189px', top: `${positions.modRow1 + 42}px`, width: '220px' }}>
              Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
            </div>
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '189px', top: `${positions.modRow1 + 136}px`, width: '220px' }}>
              Some text on who its for<br/>Some text on who its for
            </div>
            
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '460px', top: `${positions.modRow1 + 42}px`, width: '220px' }}>
              Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
            </div>
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '460px', top: `${positions.modRow1 + 136}px`, width: '220px' }}>
              Some text on who its for<br/>Some text on who its for
            </div>
            
            {/* Modalities Row 2 */}
            <div className="absolute text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '159px', top: `${positions.modRow2}px` }}>Parts</div>
            <div className="absolute text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '430px', top: `${positions.modRow2}px` }}>Deep Connection</div>
            
            {/* Bullets for Row 2 */}
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '189px', top: `${positions.modRow2 + 42}px`, width: '220px' }}>
              Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
            </div>
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '189px', top: `${positions.modRow2 + 136}px`, width: '220px' }}>
              Some text on who its for<br/>Some text on who its for
            </div>
            
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '460px', top: `${positions.modRow2 + 42}px`, width: '220px' }}>
              Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
            </div>
            <div className="absolute text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
                 style={{ left: '460px', top: `${positions.modRow2 + 136}px`, width: '220px' }}>
              Some text on who its for<br/>Some text on who its for
            </div>
            
            {/* Calendly */}
            <div className="absolute overflow-visible"
                 style={{ left: '800px', top: `${positions.calendly}px`, width: '750px', height: '770px' }}>
              <CalendlyEmbed 
                height={770} 
                rounded={0} 
                primaryColor="3b5849" 
                textColor="000000" 
                url={import.meta.env.VITE_CALENDLY_URL} 
              />
            </div>
          </div>
        </ScaleFrame>
      </div>
    </>
  );
}
