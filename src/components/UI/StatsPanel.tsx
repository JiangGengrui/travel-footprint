import { useStore } from '../../store/useStore';
import { provincesData } from '../../data/provincesData';
import { useState } from 'react';

export function StatsPanel() {
  const { footprints, achievements, currentView, currentProvince } = useStore();
  const [showAchievements, setShowAchievements] = useState(false);
  
  const provincesVisited = new Set(footprints.map(f => f.provinceId));
  const totalProvinces = provincesData.length;
  const totalCities = footprints.length;
  const unlockedAchievements = achievements.filter(a => a.unlockedAt).length;
  
  const currentProvinceData = currentProvince 
    ? provincesData.find(p => p.id === currentProvince)
    : null;
  
  const currentProvinceCities = currentProvinceData 
    ? footprints.filter(f => f.provinceId === currentProvince).length
    : 0;

  return (
    <>
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
            <div className="flex justify-between items-center">
              <span className="text-sm">成就解锁</span>
              <span className="text-purple-400 font-bold">{unlockedAchievements}</span>
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
            {unlockedAchievements > 0 && (
              <button
                onClick={() => setShowAchievements(true)}
                className="w-full mt-3 py-2 px-3 bg-purple-600/50 hover:bg-purple-600/70 text-white rounded-lg text-sm transition-colors"
              >
                🏆 查看成就
              </button>
            )}
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

      {/* 成就弹窗 */}
      {showAchievements && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-purple-500/30 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-purple-400 font-serif">🏆 成就列表</h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    achievement.unlockedAt
                      ? 'bg-purple-900/30 border-purple-500/50'
                      : 'bg-slate-800/30 border-slate-700/50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl ${achievement.unlockedAt ? 'animate-scale-pulse' : 'grayscale'}`}>
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className={`font-bold ${achievement.unlockedAt ? 'text-purple-300' : 'text-slate-400'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-slate-400">{achievement.description}</p>
                    </div>
                    {achievement.unlockedAt && (
                      <span className="text-green-400 text-xs">✓ 已解锁</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
