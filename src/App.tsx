import ResponsiveLanding from "./components/ResponsiveLanding";
import StickyMM from "./components/StickyMM";
import LayoutPositioner from "./components/LayoutPositioner";
import Edit from "./pages/Edit";

export default function App() {
  // Show layout positioner only in development or with a URL parameter
  const showPositioner = import.meta.env.DEV || window.location.search.includes('?position=true');
  const isEdit = typeof window !== 'undefined' && window.location.pathname === '/edit';
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#FEFEF7', ['--container-max' as any]: '560px', ['--container-pad' as any]: '16px' }}>
      <StickyMM />
      {isEdit ? <Edit /> : <ResponsiveLanding />}
      {showPositioner && <LayoutPositioner />}
    </div>
  );
}