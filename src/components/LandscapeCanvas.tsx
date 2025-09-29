import ScaleFrame from "./ScaleFrame";
import CalendlyEmbed from "./CalendlyEmbed";

const sources = {
  avif: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.avif ${w}w`).join(', '),
  webp: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.webp ${w}w`).join(', '),
  jpg:  [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.jpg ${w}w`).join(', '),
};

export default function LandscapeCanvas() {
  return (
    <div className="relative w-full" style={{ backgroundColor: '#FEFEF7' }}>
      <ScaleFrame id="desktop-canvas" testId="desktop-canvas" designWidth={1650} designHeight={1900} minScale={0} maxScale={1} className="mx-auto w-full">
        <div className="relative w-[1650px] h-[1900px]" style={{ backgroundColor: '#FEFEF7' }}>
          {/* Content container with background */}
        {/* Local MM removed in favor of global StickyMM */}
        <div className="absolute text-black font-bold font-['Roboto_Mono'] uppercase leading-9" style={{ left: '784px', top: '71px', width: '763px' }}>
          One Sentence that lets people know what
          <br />
          The good word is.
        </div>
        {/* Body text block */}
        <div className="absolute left-[788px] top-[196px] w-[746px] text-black text-sm font-medium font-['Inter'] lowercase leading-7">
          I am deeply in love with what I do. <br /><br /> It has been a struggle, though, to express in a sentence or two what it really is. I cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort. It is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. My heart feels so full guiding and witnessing the beautiful transformations happening within people. <br /><br /> Recently, I have realized another core reason why I love it so much: since I was little, I have always wanted to connect with people on the truest, deepest level. I have always felt uncomfortable in scenarios where we all tend to follow a “normal,” superficial way of interacting, often not speaking to how we truly feel, what we experience, what is burning or crying inside of us, what is real. But with people who choose to work with me, I get to see so much of their inner world, and the part of me that craves intimacy and truth feels safe. <br /><br /> So, it is not “work.” It is the time when my heart feels so grateful to connect with another in what really matters, to recognize each other’s souls behind the masks, while acknowledging the masks and their purpose, as well as other infinite parts of ourselves. This precious time of heartfelt connection is healing for me, too. <br /><br /> And that is why I can be grateful for my own suffering. It has led me to what I thought I was missing - deeper meaning and purpose. It made me realize what turning pain into a gift means for me. Sitting with it, working with plant medicine, spending days and nights suffocated inside my own misery, studying modalities - all of it so I can relate, guide, listen, understand, and hopefully help more and more people feel seen, whole, loved, and not alone.  Alienation, shame, and keeping our suffering to ourselves only create more suffering. Seeing each other through eyes and hearts of truth and compassion is the only way that will create sustainable change - for the highest good of all.
        </div>
        {/* Portrait */}
        <picture className="absolute left-[122px] top-[71px] block" style={{ width: '581px', height: '775px', borderRadius: 37, overflow: 'hidden' }}>
          <source type="image/avif" srcSet={sources.avif} sizes="(min-width: 1024px) 581px, 90vw" />
          <source type="image/webp" srcSet={sources.webp} sizes="(min-width: 1024px) 581px, 90vw" />
          <img srcSet={sources.jpg} sizes="(min-width: 1024px) 581px, 90vw" src="/images/portrait-1080.jpg" alt="Portrait" width={581} height={775} className="w-full h-full object-cover" decoding="async" fetchPriority="high" />
        </picture>
        {/* Section titles */}
        <div className="absolute left-[159px] top-[1048px] text-black text-3xl font-bold font-['Roboto_Mono'] uppercase leading-7">My Work</div>
        {/* Modalities subtitle - italic text */}
        <div className="absolute left-[159px] top-[1095px] w-[650px] text-black/70 text-xs font-['Inter'] italic leading-5">
          EVERY SESSION IS UNIQUE & GUIDED BY YOUR OVERALL DESIRES.<br/>
          WE WILL NOT BE CONSTRAINED BY A SPECIFIC MODALITY; AND<br/>
          HERE'S SOME INFO BELOW ON WHERE WE MAY GO.
        </div>
        {/* Modalities headings - aligned with My Work start position */}
        <div className="absolute left-[159px] top-[1200px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Movement</div>
        <div className="absolute left-[430px] top-[1200px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Laughter</div>
        <div className="absolute left-[159px] top-[1400px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Parts</div>
        <div className="absolute left-[430px] top-[1400px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Deep Connection</div>
        {/* Sample bullets - Movement */}
        <div className="absolute left-[189px] top-[1242px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[189px] top-[1336px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on who its for<br/>Some text on who its for
        </div>
        
        {/* Sample bullets - Laughter */}
        <div className="absolute left-[460px] top-[1242px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[460px] top-[1336px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on who its for<br/>Some text on who its for
        </div>
        
        {/* Sample bullets - Parts */}
        <div className="absolute left-[189px] top-[1442px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[189px] top-[1536px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on who its for<br/>Some text on who its for
        </div>
        
        {/* Sample bullets - Deep Connection */}
        <div className="absolute left-[460px] top-[1442px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[460px] top-[1536px] w-[220px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on who its for<br/>Some text on who its for
        </div>
          {/* Calendly embed - styled to match site design */}
          <div className="absolute left-[800px] top-[1100px] w-[750px] h-[770px] overflow-visible">
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


