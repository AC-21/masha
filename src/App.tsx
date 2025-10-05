import ResponsiveLanding from "./components/ResponsiveLanding";
import StickyMM from "./components/StickyMM";
import LayoutPositioner from "./components/LayoutPositioner";
import Edit from "./pages/Edit";
import TypographyLab from "./pages/TypographyLab";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  // Show layout positioner only in development or with a URL parameter
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const showPositioner = params.get('position') === 'true' || params.get('position') === '1';
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '';
  const isEdit = typeof window !== 'undefined' && (path === '/edit' || path.startsWith('/edit'));
  const isType = typeof window !== 'undefined' && (path === '/type' || path.startsWith('/type'));
  
  return (
    <ErrorBoundary fallbackTitle="App crashed">
      <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#FEFEF7', ['--container-max' as any]: '560px', ['--container-pad' as any]: '16px' }}>
        <StickyMM />
        <ErrorBoundary fallbackTitle="Page crashed">
          {isEdit ? <Edit /> : isType ? <TypographyLab /> : <ResponsiveLanding />}
        </ErrorBoundary>
        {showPositioner && <LayoutPositioner />}
      </div>
    </ErrorBoundary>
  );
}