import { useStore } from '../../store/useStore';

export function BackButton() {
  const { setCurrentProvince, currentView } = useStore();
  
  if (currentView !== 'province') {
    return null;
  }
  
  return (
    <button
      onClick={() => setCurrentProvince(null)}
      className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/90 text-white px-4 py-2 rounded-xl border border-slate-700/50 shadow-xl transition-all duration-300 flex items-center gap-2 group"
    >
      <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
      <span>返回全国地图</span>
    </button>
  );
}
