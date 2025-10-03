import ScaleFrame from "./ScaleFrame";
import CalendlyEmbed from "./CalendlyEmbed";

type Content = {
  tagline: string;
  about: string[];
  images: { portrait: string };
  modalities: { title: string; short: string; long: string }[];
};

const sources = {
  avif: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.avif ${w}w`).join(', '),
  webp: [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.webp ${w}w`).join(', '),
  jpg:  [480, 768, 1080, 1440].map(w => `/images/portrait-${w}.jpg ${w}w`).join(', '),
};

export default function LandscapeCanvas({ content }: { content: Content }) {
  const sanitizeTitle = (t: string) => t.replace(/\*+/g, '').replace(/_/g, '').trim();
  return (
    <div className="relative w-full" style={{ backgroundColor: '#FEFEF7' }}>
      {/* Legacy pixel-perfect reference (not rendered in production UI). */}
      <ScaleFrame id="desktop-canvas" testId="desktop-canvas" designWidth={1650} designHeight={1900} minScale={0} maxScale={1} className="mx-auto w-full">
        <div className="relative w-[1650px] h-[1900px]" style={{ backgroundColor: '#FEFEF7' }}>
          {/* Content container with background */}
        {/* Tagline is rendered by ResponsiveLanding header; do not duplicate here */}
        {/* Section heading */}
        <div className="absolute text-black font-bold font-['Roboto Mono'] uppercase leading-9" style={{ left: '788px', top: '152px', width: '746px', fontSize: 40 }}>
          More About my Practice
        </div>
        {/* Body text block (right column) */}
        <div className="absolute left-[788px] top-[206px] w-[746px] text-black text-sm font-medium font-['Inter'] lowercase leading-7">
          {content.about.map((p, i) => (
            <p key={i} className="mb-4">{p}</p>
          ))}
        </div>
        {/* Portrait */}
        <picture className="absolute left-[122px] top-[96px] block" style={{ width: '581px', height: '775px', borderRadius: 37, overflow: 'hidden' }}>
          <source type="image/avif" srcSet={sources.avif} sizes="(min-width: 1024px) 581px, 90vw" />
          <source type="image/webp" srcSet={sources.webp} sizes="(min-width: 1024px) 581px, 90vw" />
          <img srcSet={sources.jpg} sizes="(min-width: 1024px) 581px, 90vw" src="/images/portrait-1080.jpg" alt="Portrait" width={581} height={775} className="w-full h-full object-cover" decoding="async" fetchPriority="high" />
        </picture>
        {/* Section titles */}
        <div className="absolute left-[159px] top-[959px] text-black text-3xl font-bold font-['Roboto Mono'] uppercase leading-7">My Work</div>
        
        {/* Wavy vector with curved CTA text (replaces straight dashed divider and static CTA header) */}
        <div className="absolute left-[100px] top-[1050px] w-[800px] h-[100px]" style={{ pointerEvents: 'none', zIndex: 10 }}>
          <svg viewBox="-50 50 850 150" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
            <defs>
              <path id="curvePath" d="M -21.42857142857143 143.5993501541726 C 8.999999999999996 136.31683299625345, 40.350649350649334 128.8136335002155, 70.77922077922076 121.53111634229634 C 100.38961038961037 106.76237525280992, 103.24675324675324 69.58588906203376, 126.62337662337663 69.7556447067405 C 150 69.92540035144724, 157.53246753246754 104.72530751632904, 187.66233766233768 122.37989456583006 C 217.79220779220782 140.03448161533106, 246.88311688311686 153.44517754716358, 277.27272727272725 158.02857995424557 C 307.6623376623376 162.61198236132756, 310.5194805194805 143.25983886475913, 339.61038961038963 145.29690660124 C 368.70129870129875 147.3339743377209, 390.7792207792208 167.19538476840953, 422.72727272727275 168.21391863664996 C 454.6753246753247 169.2324525048904, 471.81818181818176 152.7661549683366, 499.3506493506493 150.38957594244224 C 526.8831168831168 148.01299691654788, 538.3116883116884 155.48224528364443, 560.3896103896104 156.33102350717814 C 582.4675324675325 157.17980173071186, 588.961038961039 151.40810981068267, 609.7402597402597 154.63346706011075 C 630.5194805194805 157.85882430953882, 640.2337662337662 173.38450316634064, 664.2857142857143 172.45780975431848 C 688.3376623376624 171.53111634229631, 710.7792207792207 144.73757501409105, 730 150 C 749.2207792207793 155.26242498590895, 750.361038961039 182.67585623818837, 760.3896103896104 198.76993468386326" />
            </defs>
            
            {/* Wavy line */}
            <use
              href="#curvePath"
              fill="none"
              stroke="#7a7474"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Text along path */}
            <text
              fill="#4c4848"
              fontSize="26"
              fontFamily="Roboto Mono"
              dy="4"
            >
              <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                {content.cta?.label || 'Schedule an intro with me'}
              </textPath>
            </text>
          </svg>
        </div>
        {/* Modalities subtitle - italic text */}
        <div className="absolute left-[159px] top-[1033px] w-[650px] text-black/70 text-xs font-['Inter'] italic leading-5">
          EVERY SESSION IS UNIQUE & GUIDED BY YOUR OVERALL DESIRES.<br/>
          WE WILL NOT BE CONSTRAINED BY A SPECIFIC MODALITY; AND<br/>
          HERE'S SOME INFO BELOW ON WHERE WE MAY GO.
        </div>
        {/* Modalities headings - aligned with My Work start position */}
        {(() => {
          const mods = (content.modalities || []).slice(0, 4);
          const positions = [
            { hLeft: 159, hTop: 1143, tLeft: 189, tTop: 1185 }, // col 1, row 1
            { hLeft: 430, hTop: 1143, tLeft: 460, tTop: 1185 }, // col 2, row 1
            { hLeft: 159, hTop: 1330, tLeft: 189, tTop: 1372 }, // col 1, row 2
            { hLeft: 430, hTop: 1330, tLeft: 460, tTop: 1372 }, // col 2, row 2
          ];
          return mods.map((m, i) => (
            <div key={i}>
              <div className="absolute text-black text-2xl font-bold font-['Roboto Mono'] uppercase leading-7" style={{ left: positions[i].hLeft, top: positions[i].hTop }}>
                {sanitizeTitle(m.title)}
              </div>
              <div className="absolute text-black text-xs font-['Inter'] lowercase leading-5" style={{ left: positions[i].tLeft, top: positions[i].tTop, width: 220 }}>
                {m.short}
              </div>
            </div>
          ));
        })()}
          {/* Calendly embed - styled to match site design */}
          <div className="absolute left-[800px] top-[1046px] w-[750px] h-[770px] overflow-visible">
            <div className="absolute w-full text-center font-['Roboto Mono'] font-bold uppercase text-[18px] leading-7" style={{ top: -38 }}>
              {content.cta?.label || 'Schedule an intro to learn more'}
            </div>
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


