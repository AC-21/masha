import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="hidden xl:block">
        <LandscapeCanvas />
      </div>
      <div className="block xl:hidden">
        <MobileCanvas />
      </div>
    </div>
  );
}