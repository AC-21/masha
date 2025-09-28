import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <div className="hidden lg:block">
        <LandscapeCanvas />
      </div>
      <div className="block lg:hidden flex items-center justify-center">
        <MobileCanvas />
      </div>
    </div>
  );
}