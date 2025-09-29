import ScaleFrame from "./ScaleFrame";
import CalendlyEmbed from "./CalendlyEmbed";

const sources = {
  avif: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.avif ${w}w`).join(', '),
  webp: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.webp ${w}w`).join(', '),
  jpg:  [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.jpg ${w}w`).join(', '),
};

// Dynamic positioning based on viewport height percentages
// This maintains ratios across different screen sizes
const getPosition = (percentage: number) => {
  const baseHeight = 1900; // Our design height
  return Math.round(baseHeight * (percentage / 100));
};

export default function DynamicLandscapeCanvas() {
  // Define positions as percentages of the total canvas height
  const positions = {
    headline: getPosition(4.26),     // 81px / 1900px = 4.26%
    bodyText: getPosition(10.84),    // 206px / 1900px = 10.84%
    portrait: getPosition(5.05),     // 96px / 1900px = 5.05%
    myWork: getPosition(50.47),      // 959px / 1900px = 50.47%
    modSubtitle: getPosition(54.37), // 1033px / 1900px = 54.37%
    modRow1: getPosition(60.16),     // 1143px / 1900px = 60.16%
    modRow2: getPosition(70.00),     // 1330px / 1900px = 70.00%
    calendly: getPosition(55.05),    // 1046px / 1900px = 55.05%
  };

  // You can also make these responsive to viewport height
  // const vh = window.innerHeight;
  // const scaleFactor = vh / 900; // Assuming 900px is our target viewport height
  
  return (
    <div className="relative w-full" style={{ backgroundColor: '#FEFEF7' }}>
      <ScaleFrame id="desktop-canvas" testId="desktop-canvas" designWidth={1650} designHeight={1900} minScale={0} maxScale={1} className="mx-auto w-full">
        <div className="relative w-[1650px] h-[1900px]" style={{ backgroundColor: '#FEFEF7' }}>
          {/* Content container with background */}
          
          {/* Headline - dynamically positioned */}
          <div className="absolute text-black font-bold font-['Roboto_Mono'] uppercase leading-9" 
               style={{ left: '784px', top: `${positions.headline}px`, width: '763px' }}>
            One Sentence that lets people know what
            <br />
            The good word is.
          </div>
          
          {/* Body text block - dynamically positioned */}
          <div className="absolute left-[788px] w-[746px] text-black text-sm font-medium font-['Inter'] lowercase leading-7"
               style={{ top: `${positions.bodyText}px` }}>
            I am deeply in love with what I do. <br /><br /> 
            It has been a struggle, though, to express in a sentence or two what it really is. I cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort. It is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. My heart feels so full guiding and witnessing the beautiful transformations happening within people. <br /><br /> 
            Recently, I have realized another core reason why I love it so much: since I was little, I have always wanted to connect with people on the truest, deepest level. I have always felt uncomfortable in scenarios where we all tend to follow a "normal," superficial way of interacting, often not speaking to how we truly feel, what we experience, what is burning or crying inside of us, what is real. But with people who choose to work with me, I get to see so much of their inner world, and the part of me that craves intimacy and truth feels safe. <br /><br /> 
            So, it is not "work." It is the time when my heart feels so grateful to connect with another in what really matters, to recognize each other's souls behind the masks, while acknowledging the masks and their purpose, as well as other infinite parts of ourselves. This precious time of heartfelt connection is healing for me, too. <br /><br /> 
            And that is why I can be grateful for my own suffering. It has led me to what I thought I was missing - deeper meaning and purpose. It made me realize what turning pain into a gift means for me. Sitting with it, working with plant medicine, spending days and nights suffocated inside my own misery, studying modalities - all of it so I can relate, guide, listen, understand, and hopefully help more and more people feel seen, whole, loved, and not alone. Alienation, shame, and keeping our suffering to ourselves only create more suffering. Seeing each other through eyes and hearts of truth and compassion is the only way that will create sustainable change - for the highest good of all.
          </div>
          
          {/* Portrait - dynamically positioned */}
          <picture className="absolute left-[122px] block" 
                   style={{ top: `${positions.portrait}px`, width: '581px', height: '775px', borderRadius: 37, overflow: 'hidden' }}>
            <source type="image/avif" srcSet={sources.avif} sizes="(min-width: 1024px) 581px, 90vw" />
            <source type="image/webp" srcSet={sources.webp} sizes="(min-width: 1024px) 581px, 90vw" />
            <img srcSet={sources.jpg} sizes="(min-width: 1024px) 581px, 90vw" src="/images/portrait-1080.jpg" alt="Portrait" width={581} height={775} className="w-full h-full object-cover" decoding="async" fetchPriority="high" />
          </picture>
          
          {/* My Work Section - dynamically positioned */}
          <div className="absolute left-[159px] text-black text-3xl font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.myWork}px` }}>
            My Work
          </div>
          
          {/* Modalities subtitle - dynamically positioned */}
          <div className="absolute left-[159px] w-[650px] text-black/70 text-xs font-['Inter'] italic leading-5"
               style={{ top: `${positions.modSubtitle}px` }}>
            EVERY SESSION IS UNIQUE & GUIDED BY YOUR OVERALL DESIRES.<br/>
            WE WILL NOT BE CONSTRAINED BY A SPECIFIC MODALITY; AND<br/>
            HERE'S SOME INFO BELOW ON WHERE WE MAY GO.
          </div>
          
          {/* Modalities Row 1 - dynamically positioned */}
          <div className="absolute left-[159px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1}px` }}>Movement</div>
          <div className="absolute left-[430px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1}px` }}>Laughter</div>
          
          {/* Sample bullets for Row 1 */}
          <div className="absolute left-[189px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1 + 42}px` }}>
            Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
          </div>
          <div className="absolute left-[189px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1 + 136}px` }}>
            Some text on who its for<br/>Some text on who its for
          </div>
          
          <div className="absolute left-[460px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1 + 42}px` }}>
            Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
          </div>
          <div className="absolute left-[460px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow1 + 136}px` }}>
            Some text on who its for<br/>Some text on who its for
          </div>
          
          {/* Modalities Row 2 - dynamically positioned */}
          <div className="absolute left-[159px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2}px` }}>Parts</div>
          <div className="absolute left-[430px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2}px` }}>Deep Connection</div>
          
          {/* Sample bullets for Row 2 */}
          <div className="absolute left-[189px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2 + 42}px` }}>
            Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
          </div>
          <div className="absolute left-[189px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2 + 136}px` }}>
            Some text on who its for<br/>Some text on who its for
          </div>
          
          <div className="absolute left-[460px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2 + 42}px` }}>
            Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
          </div>
          <div className="absolute left-[460px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7"
               style={{ top: `${positions.modRow2 + 136}px` }}>
            Some text on who its for<br/>Some text on who its for
          </div>
          
          {/* Calendly embed - dynamically positioned */}
          <div className="absolute left-[800px] w-[750px] h-[770px] overflow-visible"
               style={{ top: `${positions.calendly}px` }}>
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
  );
}
