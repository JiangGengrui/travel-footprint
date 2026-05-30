import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { getProvinceById, getCityById } from '../../data/provincesData';

export function AddFootprintModal() {
  const { isModalOpen, currentProvince, modalCityId, closeModal, addFootprint, footprints } = useStore();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const province = getProvinceById(currentProvince || '');
  const visitedCityIds = new Set(footprints.filter(f => f.provinceId === currentProvince).map(f => f.cityId));

  useEffect(() => {
    if (modalCityId) {
      setSelectedCity(modalCityId);
    }
  }, [modalCityId]);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedCity(null);
    }
  }, [isModalOpen]);

  if (!isModalOpen || !province) {
    return null;
  }

  const handleConfirm = () => {
    if (selectedCity && currentProvince) {
      const city = province.cities.find(c => c.id === selectedCity);
      if (city) {
        addFootprint({
          provinceId: currentProvince,
          cityId: city.id,
          cityName: city.name,
        });
      }
    }
  };

  const handleClose = () => {
    closeModal();
    setSelectedCity(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-serif text-amber-600">
            🗺️ 在 {province.name} 添加足迹
          </h2>
          <p className="text-slate-600 text-sm mt-2">选择你访问过的地点</p>
        </div>
        
        <div className="p-6 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {province.cities.map((city) => {
              const isVisited = visitedCityIds.has(city.id);
              const isSelected = selectedCity === city.id;
              
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  disabled={isVisited}
                  className={`
                    p-3 rounded-xl border transition-all duration-300 text-left
                    ${isSelected 
                      ? 'bg-cyan-50 border-cyan-500 text-cyan-700' 
                      : isVisited
                        ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="font-medium">{city.name}</div>
                  {isVisited && <div className="text-xs text-amber-600 mt-1">✓ 已添加</div>}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedCity}
            className={`
              flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300
              ${selectedCity
                ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            确认添加 🏔️
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
