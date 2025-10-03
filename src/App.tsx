import LandscapeCanvas from "./components/LandscapeCanvas";
import MobileCanvas from "./components/MobileCanvas";
import StickyMM from "./components/StickyMM";
import LayoutPositioner from "./components/LayoutPositioner";
import LayoutSwitcher from "./components/LayoutSwitcher";
import CurvedLineEditor from "./components/CurvedLineEditor";

export default function App() {
  // Show layout positioner only in development or with a URL parameter
  const showPositioner = import.meta.env.DEV || window.location.search.includes('?position=true');
  
  // Use layout switcher in dev, regular canvas in production
  const useLayoutSwitcher = import.meta.env.DEV;
  
  // Show curve editor only in development mode
  const showCurveEditor = import.meta.env.DEV;
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#FEFEF7', ['--container-max' as any]: '560px', ['--container-pad' as any]: '16px' }}>
      {showCurveEditor && <CurvedLineEditor />}
      <StickyMM />
      <div className="hidden xl:block" style={{ ['--container-max' as any]: '100vw', ['--container-pad' as any]: '16px', ['--image-width' as any]: '0px' }}>
        {useLayoutSwitcher ? <LayoutSwitcher /> : <LandscapeCanvas />}
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
      {showPositioner && <LayoutPositioner />}
    </div>
  );
}