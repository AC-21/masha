import CalendlyEmbed from "./CalendlyEmbed";

const PORTRAIT = "/placeholder-portrait.jpg";

export default function ResponsiveLanding() {
  return (
    <main className="min-h-screen w-full bg-[#fefef7] text-black">
      {/* Header / Tagline */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        <div className="flex items-start justify-between">
          <h1 className="font-['Roboto Mono'] font-bold uppercase text-[1.25rem] sm:text-2xl lg:text-[32px] leading-[1.2] max-w-[46ch]">
            One Sentence that lets people know what
            <br />
            The good word is.
          </h1>
          <div className="ml-6 shrink-0 text-right">
            <span className="font-['Caveat'] font-bold text-[28px] sm:text-[34px] lg:text-[39px]">MM</span>
          </div>
        </div>
      </div>

      {/* Hero: image + story intro */}
      <section className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <h2 className="font-['Roboto Mono'] font-bold uppercase text-2xl sm:text-3xl lg:text-[40px] tracking-tight mb-4 lg:mb-6">
              More about my practice
            </h2>
            <div className="space-y-4 sm:space-y-5 lg:space-y-7 text-[14px] leading-7 lowercase font-['Inter']">
              <p>i am deeply in love with what i do.</p>
              <p>it has been a struggle, though, to express in a sentence or two what it really is.</p>
              <p>
                i cultivate an environment where a person can come exactly as they are, feeling accepted and loved in their pain, inner battles, fears, desires, brightness, uniqueness, comfort, and discomfort.
              </p>
              <p>
                it is the most beautiful thing each time to witness someone opening up and beginning to love and accept themselves. my heart feels so full guiding and witnessing the beautiful transformations happening within people.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={PORTRAIT}
              alt="Portrait"
              className="w-full h-auto rounded-[24px] sm:rounded-[28px] lg:rounded-[37px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        <div className="h-px w-full bg-[#d4cccc]" />
      </div>

      {/* Modalities + Calendly */}
      <section className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Modalities */}
          <div className="lg:col-span-7">
            <h3 className="font-['Roboto Mono'] font-bold uppercase text-xl sm:text-2xl mb-3">Modalities</h3>
            <p className="uppercase text-[12px] text-[#525050] mb-6 font-['Roboto Mono']">
              every session is unique & guided by your overall desires.
              <br /> we will not be constrained by a specific modality; and here's some info on where we may go.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                { title: "Movement" },
                { title: "Laughter" },
                { title: "Parts" },
                { title: "Deep Connection" },
              ].map(({ title }) => (
                <div key={title}>
                  <h4 className="font-['Roboto Mono'] font-bold uppercase text-[18px] mb-2">{title}</h4>
                  <div className="font-['Roboto Mono'] uppercase text-[12px] space-y-1">
                    <p>Some text on what it is</p>
                    <p>Some text on what it is</p>
                    <p>Some text on what it is</p>
                  </div>
                  <div className="font-['Roboto Mono'] uppercase text-[12px] mt-2 space-y-1">
                    <p>Some text on who its for</p>
                    <p>Some text on who its for</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendly */}
          <div className="lg:col-span-5">
            <h3 className="font-['Roboto Mono'] font-bold uppercase text-lg sm:text-xl mb-4">
              Schedule an intro to learn more
            </h3>
            <CalendlyEmbed
              className="w-full"
              rounded={40}
              height={570}
              primaryColor="3b5849"
              textColor="ffffff"
              url={import.meta.env.VITE_CALENDLY_URL}
            />
          </div>
        </div>
      </section>
    </main>
  );
}


