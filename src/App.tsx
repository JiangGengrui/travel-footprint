import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from './components/Scene/ErrorBoundary';
import { MapScene } from './components/Scene/MapScene';
import { StatsPanel } from './components/UI/StatsPanel';
import Landing from './pages/Landing';
import ProvinceDetail from './pages/ProvinceDetail';

function MapPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      <div className="relative z-10 h-full">
        <ErrorBoundary>
          <MapScene />
        </ErrorBoundary>
        <StatsPanel />
      </div>
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/province/:id" element={<ProvinceDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
