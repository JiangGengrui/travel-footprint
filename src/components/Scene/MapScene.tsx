import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ChinaEChartsMap } from '../Map/ChinaEChartsMap';
import { provincesData } from '../../data/provincesData';

export function MapScene() {
  const { footprints, getProvincesVisited } = useStore();

  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const provincesVisited = getProvincesVisited();

  const hoveredProvinceData = hoveredProvince 
    ? provincesData.find(p => p.id === hoveredProvince) 
    : null;
  
  const hoveredVisitedCities = hoveredProvince 
    ? footprints.filter(f => f.provinceId === hoveredProvince).length 
    : 0;

  return (
    <div className="w-full h-full relative">
      <ChinaEChartsMap />
      
      {hoveredProvinceData && (
        <div className="absolute top-20 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-300 shadow-xl animate-fade-in z-20">
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            📍 {hoveredProvinceData.name}
            {provincesVisited.includes(hoveredProvince) && (
              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">已访问</span>
            )}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>下辖城市</span>
              <span className="font-mono">{hoveredProvinceData.cities.length}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>已访问城市</span>
              <span className="font-mono text-teal-600">{hoveredVisitedCities}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <p className="text-slate-500 text-xs">点击进入添加足迹</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-slate-600 text-sm pointer-events-none z-10">
        <p>🖱️ 拖拽平移 | 滚轮缩放 | 点击进入省份</p>
      </div>
    </div>
  );
}
