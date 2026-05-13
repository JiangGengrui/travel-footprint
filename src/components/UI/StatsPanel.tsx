import { useStore } from '../../store/useStore';
import { provincesData } from '../../data/provincesData';

export function StatsPanel() {
  const { footprints, currentView, currentProvince } = useStore();
  
  const provincesVisited = new Set(footprints.map(f => f.provinceId));
  const totalProvinces = provincesData.length;
  const totalCities = footprints.length;
  
  const currentProvinceData = currentProvince 
    ? provincesData.find(p => p.id === currentProvince)
    : null;
  
  const currentProvinceCities = currentProvinceData 
    ? footprints.filter(f => f.provinceId === currentProvince).length
    : 0;

  return (
    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 shadow-xl">
      <h3 className="text-amber-400 font-serif text-lg mb-3">
        {currentView === 'china' ? '📍 足迹统计' : `📍 ${currentProvinceData?.name || ''}`}
      </h3>
      
      {currentView === 'china' ? (
        <div className="space-y-2 text-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-sm">已访问省份</span>
            <span className="text-cyan-400 font-bold">{provincesVisited.size}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">已访问城市</span>
            <span className="text-amber-400 font-bold">{totalCities}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="text-xs text-slate-400">
              覆盖率: {((provincesVisited.size / totalProvinces) * 100).toFixed(1)}%
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(provincesVisited.size / totalProvinces) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 text-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-sm">已访问地点</span>
            <span className="text-amber-400 font-bold">{currentProvinceCities} / {currentProvinceData?.cities.length || 0}</span>
          </div>
          {currentProvinceData && (
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="text-xs text-slate-400 mb-2">已访问:</div>
              {footprints
                .filter(f => f.provinceId === currentProvince)
                .map(fp => (
                  <div key={fp.id} className="text-sm text-cyan-300 flex items-center gap-1">
                    <span>🏔️</span> {fp.cityName}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
