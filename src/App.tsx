import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";
import StickyMM from "./components/StickyMM";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <StickyMM />
      <div className="hidden lg:block">
        <LandscapeCanvas />
      </div>
      <div className="block lg:hidden">
        <div className="mx-auto max-w-[560px] px-4">
          <MobileCanvas />
        </div>
      </div>
    </div>
  );
}