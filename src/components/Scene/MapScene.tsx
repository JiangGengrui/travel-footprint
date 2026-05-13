
import { Suspense, useState } from 'react';
import { useStore } from '../store/useStore';
import { ChinaMap2D } from './Map/ChinaMap2D';
import { ProvinceMap2D } from './Map/ProvinceMap2D';
import { provincesData, getProvinceById } from '../data/provincesData';

export function MapScene() {
  const { 
    currentView, 
    setCurrentProvince, 
    currentProvince, 
    footprints, 
    getProvincesVisited 
  } = useStore();
  
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const provincesVisited = getProvincesVisited();

  // 悬停省份的详细信息
  const hoveredProvinceData = hoveredProvince 
    ? provincesData.find(p => p.id === hoveredProvince) 
    : null;
  
  const hoveredVisitedCities = hoveredProvince 
    ? footprints.filter(f => f.provinceId === hoveredProvince).length 
    : 0;

  const handleBackToChina = () => {
    setCurrentProvince(null);
  };

  return (
    <div className="w-full h-full relative">
      {/* 2D地图渲染 */}
      {currentView === 'china' ? (
        <ChinaMap2D
          onProvinceClick={setCurrentProvince}
          onHover={setHoveredProvince}
          hoveredProvince={hoveredProvince}
        />
      ) : currentProvince ? (
        <ProvinceMap2D
          provinceId={currentProvince}
          onBack={handleBackToChina}
        />
      ) : null}
      
      {/* 省份信息卡片 */}
      {currentView === 'china' && hoveredProvinceData && (
        <div className="absolute top-20 left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 shadow-xl animate-fade-in z-20">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            📍 {hoveredProvinceData.name}
            {provincesVisited.includes(hoveredProvince) && (
              <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">已访问</span>
            )}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>下辖城市</span>
              <span className="font-mono">{hoveredProvinceData.cities.length}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>已访问城市</span>
              <span className="font-mono text-cyan-400">{hoveredVisitedCities}</span>
            </div>
            <div className="pt-2 border-t border-slate-700">
              <p className="text-slate-400 text-xs">点击进入添加足迹</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-white/60 text-sm pointer-events-none z-10">
        <p>🖱️ 拖拽平移 | 滚轮缩放 | 点击进入省份</p>
      </div>
    </div>
  );
}

