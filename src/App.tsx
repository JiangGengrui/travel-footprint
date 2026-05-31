import { ErrorBoundary } from './components/Scene/ErrorBoundary';
import { MapScene } from './components/Scene/MapScene';
import { StatsPanel } from './components/UI/StatsPanel';

function App() {
  return (
    <div className="w-full h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 h-full">
        <ErrorBoundary>
          <MapScene />
        </ErrorBoundary>
        <StatsPanel />
      </div>
    </div>
  );
}

export default App;
