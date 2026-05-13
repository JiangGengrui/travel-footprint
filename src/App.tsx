import { ErrorBoundary } from './components/Scene/ErrorBoundary';
import { MapScene } from './components/Scene/MapScene';
import { StatsPanel } from './components/UI/StatsPanel';
import { BackButton } from './components/UI/BackButton';
import { AddFootprintModal } from './components/UI/AddFootprintModal';
import { useStore } from './store/useStore';

function App() {
  const { currentView, setCurrentProvince, openModal } = useStore();

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 h-full">
        <ErrorBoundary>
          <MapScene />
        </ErrorBoundary>
        <StatsPanel />
        <BackButton />
        
        {currentView === 'province' && (
          <button
            onClick={() => openModal()}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <span className="text-xl">+</span>
            <span>添加足迹</span>
          </button>
        )}
      </div>
      
      <AddFootprintModal />
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
    </div>
  );
}

export default App;
