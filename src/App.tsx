import { ErrorBoundary } from './components/Scene/ErrorBoundary';
import { MapScene } from './components/Scene/MapScene';
import { StatsPanel } from './components/UI/StatsPanel';
import { AddFootprintModal } from './components/UI/AddFootprintModal';
import { useStore } from './store/useStore';

function App() {
  const { currentView, openModal } = useStore();

  return (
    <div className="w-full h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 h-full">
        <ErrorBoundary>
          <MapScene />
        </ErrorBoundary>
        <StatsPanel />
        
        {currentView === 'province' && (
          <button
            onClick={() => openModal()}
            className="absolute bottom-24 right-4 bg-gradient-to-r from-cyan-500 to-amber-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <span className="text-xl">+</span>
            <span>添加足迹</span>
          </button>
        )}
      </div>
      
      <AddFootprintModal />
    </div>
  );
}

export default App;
