import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export function BackButton() {
  const { currentView, setCurrentView, setCurrentProvince } = useStore();
  const navigate = useNavigate();

  if (currentView !== 'province') {
    return null;
  }

  const handleBack = () => {
    setCurrentView('china');
    setCurrentProvince(null);
    navigate('/map');
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-4 left-4 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl border border-slate-300 shadow-lg transition-all duration-300 flex items-center gap-2"
    >
      <span>←</span>
      <span>返回全国</span>
    </button>
  );
}
