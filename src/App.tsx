import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";
import StickyMM from "./components/StickyMM";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-stone-50 overflow-x-hidden" style={{ ['--container-max' as any]: '560px', ['--container-pad' as any]: '16px' }}>
      <StickyMM />
      <div className="hidden xl:block" style={{ ['--container-max' as any]: '100vw', ['--container-pad' as any]: '16px', ['--image-width' as any]: '0px' }}>
        <LandscapeCanvas />
      </div>
      {/* Tablet layout: 768–1279px */}
      <div className="hidden md:block xl:hidden" style={{ ['--container-max' as any]: '960px', ['--container-pad' as any]: '24px', ['--image-width' as any]: '18rem' }}>
        <div className="mx-auto max-w-[960px] px-6">
          {/* Reuse mobile layout as centered stack with larger max-width */}
          <MobileCanvas />
        </div>
      </div>
      <div className="block md:hidden" style={{ ['--container-max' as any]: '560px', ['--container-pad' as any]: '16px', ['--image-width' as any]: '18rem' }}>
        <div className="mx-auto max-w-[560px] px-4">
          <MobileCanvas />
        </div>
      </div>
    </div>
  );
}