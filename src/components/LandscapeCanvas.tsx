import ScaleFrame from "./ScaleFrame";
import CalendlyEmbed from "./CalendlyEmbed";

const PORTRAIT = "/placeholder-portrait.jpg";

export default function LandscapeCanvas() {
  return (
    <ScaleFrame designWidth={1650} designHeight={1827} className="mx-auto max-w-[1650px]">
      <div className="relative w-[1650px] h-[1827px]">
        <div className="absolute left-0 top-0 w-[1650px] h-[1827px] bg-stone-50 rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border border-black/0" />
        <div className="absolute left-[1547px] top-[50px] text-black text-4xl font-bold font-['Caveat'] uppercase leading-7">MM</div>
        <div className="absolute left-[784px] top-[132px] w-[763px] text-black text-3xl font-bold font-['Roboto_Mono'] uppercase leading-9">
          One Sentence that lets people know what
          <br />
          The good word is.
        </div>
        {/* Body text block */}
        <div className="absolute left-[788px] top-[235px] w-[746px] text-black text-sm font-medium font-['Inter'] lowercase leading-7">
          I am deeply in love with what I do. <br /><br /> It has been a struggle, though, to express in a sentence or two what it really is. I cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort. It is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. My heart feels so full guiding and witnessing the beautiful transformations happening within people. <br /><br /> Recently, I have realized another core reason why I love it so much: since I was little, I have always wanted to connect with people on the truest, deepest level. I have always felt uncomfortable in scenarios where we all tend to follow a “normal,” superficial way of interacting, often not speaking to how we truly feel, what we experience, what is burning or crying inside of us, what is real. But with people who choose to work with me, I get to see so much of their inner world, and the part of me that craves intimacy and truth feels safe. <br /><br /> So, it is not “work.” It is the time when my heart feels so grateful to connect with another in what really matters, to recognize each other’s souls behind the masks, while acknowledging the masks and their purpose, as well as other infinite parts of ourselves. This precious time of heartfelt connection is healing for me, too. <br /><br /> And that is why I can be grateful for my own suffering. It has led me to what I thought I was missing - deeper meaning and purpose. It made me realize what turning pain into a gift means for me. Sitting with it, working with plant medicine, spending days and nights suffocated inside my own misery, studying modalities - all of it so I can relate, guide, listen, understand, and hopefully help more and more people feel seen, whole, loved, and not alone.  Alienation, shame, and keeping our suffering to ourselves only create more suffering. Seeing each other through eyes and hearts of truth and compassion is the only way that will create sustainable change - for the highest good of all.
        </div>
        {/* Portrait */}
        <img src={PORTRAIT} alt="Portrait" className="absolute left-[122px] top-[136px] w-[581px] h-[775px] rounded-[37px] object-cover" />
        {/* Divider */}
        <div className="absolute left-[341px] top-[1045px] w-[711px] text-stone-300 text-base font-bold font-['Roboto_Mono'] uppercase leading-7">--------------------------------------------------------------------------------</div>
        {/* Section titles */}
        <div className="absolute left-[159px] top-[1043px] text-black text-3xl font-bold font-['Roboto_Mono'] uppercase leading-7">My Work</div>
        <div className="absolute left-[1069px] top-[1043px] w-[490px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Schedule an intro to learn more</div>
        {/* Modalities headings */}
        <div className="absolute left-[188px] top-[1239px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Movement</div>
        <div className="absolute left-[498px] top-[1239px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Laughter</div>
        <div className="absolute left-[185px] top-[1483px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Parts</div>
        <div className="absolute left-[498px] top-[1483px] text-black text-2xl font-bold font-['Roboto_Mono'] uppercase leading-7">Deep Connection</div>
        {/* Sample bullets */}
        <div className="absolute left-[207px] top-[1281px] w-[192px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        <div className="absolute left-[501px] top-[1282px] w-[196px] text-black text-sm font-bold font-['Roboto_Mono'] uppercase leading-7">
          Some text on what it is<br/>Some text on what it is<br/>Some text on what it is
        </div>
        {/* Calendly embed placed in screenshot area */}
        <div className="absolute left-[828px] top-[1156px] w-[725px] h-[546px] rounded-[40px] overflow-hidden">
          <CalendlyEmbed height={546} rounded={40} primaryColor="3b5849" textColor="ffffff" url={import.meta.env.VITE_CALENDLY_URL} />
        </div>
      </div>
    </ScaleFrame>
  );
}


