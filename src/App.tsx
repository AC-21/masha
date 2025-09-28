import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";
import StickyMM from "./components/StickyMM";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <StickyMM />
      <div className="hidden xl:block">
        <LandscapeCanvas />
      </div>
      {/* Tablet layout: 768–1279px */}
      <div className="hidden md:block xl:hidden">
        <div className="mx-auto max-w-[960px] px-6">
          {/* Reuse mobile layout as centered stack with larger max-width */}
          <MobileCanvas />
        </div>
      </div>
      <div className="block md:hidden">
        <div className="mx-auto max-w-[560px] px-4">
          <MobileCanvas />
        </div>
      </div>
    </div>
  );
}