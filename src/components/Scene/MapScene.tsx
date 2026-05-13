import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { ChinaMap } from '../Map/ChinaMap';
import { ProvinceMap } from '../Map/ProvinceMap';
import { provincesData, getProvinceById } from '../../data/provincesData';

// 省份布局（和 ChinaMap 中一样）
const provincePositions: Record<string, { x: number; y: number }> = {
  'beijing': { x: 3.2, y: 3.8 },
  'tianjin': { x: 3.5, y: 3.6 },
  'hebei': { x: 3, y: 3 },
  'shanxi': { x: 2.2, y: 3 },
  'neimenggu': { x: 2, y: 5 },
  'liaoning': { x: 4, y: 4.5 },
  'jilin': { x: 4.8, y: 5 },
  'heilongjiang': { x: 4.5, y: 6 },
  'shanghai': { x: 3.5, y: 1 },
  'jiangsu': { x: 3.2, y: 1.8 },
  'zhejiang': { x: 3.2, y: 0.8 },
  'anhui': { x: 2.8, y: 1.8 },
  'fujian': { x: 3.5, y: -0.5 },
  'jiangxi': { x: 2.8, y: 0 },
  'shandong': { x: 3.5, y: 2.8 },
  'henan': { x: 2, y: 2 },
  'hubei': { x: 2, y: 1 },
  'hunan': { x: 2, y: -0.2 },
  'guangdong': { x: 2.5, y: -2 },
  'guangxi': { x: 1.5, y: -2 },
  'hainan': { x: 2, y: -3.5 },
  'chongqing': { x: 0.8, y: 1 },
  'sichuan': { x: -0.2, y: 1 },
  'guizhou': { x: 0.5, y: -0.2 },
  'yunnan': { x: -0.2, y: -1.5 },
  'xizang': { x: -2, y: 1 },
  'shaanxi': { x: 1, y: 2.2 },
  'gansu': { x: 0, y: 3.5 },
  'qinghai': { x: -1, y: 2.5 },
  'ningxia': { x: 1.2, y: 2.8 },
  'xinjiang': { x: -3.5, y: 3.5 },
  'taiwan': { x: 5, y: -0.5 },
  'xianggang': { x: 2.8, y: -1.8 },
  'aomen': { x: 2.5, y: -2 },
};

function CameraController() {
  const { camera } = useThree();
  const { currentView, currentProvince } = useStore();
  
  useEffect(() => {
    if (currentView === 'china') {
      camera.position.set(0, 0, 25);
      camera.lookAt(0, 0, 0);
    } else if (currentProvince) {
      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);
    }
  }, [currentView, currentProvince, camera]);
  
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        color="#FFFFFF"
      />
      <pointLight position={[-10, 10, 10]} intensity={0.5} color="#22D3EE" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#F59E0B" />
    </>
  );
}

// 省份信息卡片组件
function ProvinceInfoCard({ province, isVisited, visitedCityCount }: any) {
  if (!province) return null;
  
  return (
    <div className="absolute top-20 left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        📍 {province.name}
        {isVisited && (
          <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">已访问</span>
        )}
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>下辖城市</span>
          <span className="font-mono">{province.cities.length}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>已访问城市</span>
          <span className="font-mono text-cyan-400">{visitedCityCount}</span>
        </div>
        <div className="pt-2 border-t border-slate-700">
          <p className="text-slate-400 text-xs">点击进入添加足迹</p>
        </div>
      </div>
    </div>
  );
}

// 省份名称标签组件
function ProvinceLabels({ hoveredProvince, setHoveredProvince, setCurrentProvince, onHoverProvince }: any) {
  const { hasVisitedProvince, footprints } = useStore();
  
  return (
    <>
      {provincesData.map((province) => {
        const pos = provincePositions[province.id];
        if (!pos) return null;
        
        const scale = 50;
        const isVisited = hasVisitedProvince(province.id);
        const isHovered = hoveredProvince === province.id;
        const visitedCityCount = footprints.filter((f: any) => f.provinceId === province.id).length;
        
        return (
          <div
            key={province.id}
            onClick={() => setCurrentProvince(province.id)}
            onMouseEnter={() => {
              setHoveredProvince(province.id);
              onHoverProvince(province, isVisited, visitedCityCount);
            }}
            onMouseLeave={() => {
              setHoveredProvince(null);
              onHoverProvince(null, false, 0);
            }}
            className="province-label absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `calc(50% + ${pos.x * scale}px)`,
              top: `calc(50% - ${pos.y * scale}px)`,
              zIndex: isHovered ? 50 : 10
            }}
          >
            <div
              className={`text-xs whitespace-nowrap px-2 py-1 rounded transition-all duration-200 ${
                isHovered
                  ? 'bg-cyan-500/90 text-white scale-110 shadow-lg shadow-cyan-500/30'
                  : isVisited
                  ? 'bg-cyan-900/70 text-cyan-200'
                  : 'bg-slate-800/60 text-slate-300'
              }`}
            >
              {province.name}
            </div>
          </div>
        );
      })}
    </>
  );
}

// 城市名称标签组件
function CityLabels({ hoveredCity, setHoveredCity, currentProvince, openModal, removeFootprint, footprints }: any) {
  const province = getProvinceById(currentProvince);
  if (!province) return null;

  const visitedCities = footprints.filter((f: any) => f.provinceId === currentProvince);
  const visitedCityIds = new Set(visitedCities.map((v: any) => v.cityId));

  const citiesCount = province.cities.length;
  const cols = Math.ceil(Math.sqrt(citiesCount));
  const spacing = 2;
  const scale = 45;

  return (
    <>
      {province.cities.map((city, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = (col - (cols - 1) / 2) * spacing;
        const y = -(row - (Math.ceil(citiesCount / cols) - 1) / 2) * spacing;
        const isVisited = visitedCityIds.has(city.id);
        const isHovered = hoveredCity === city.id;
        
        return (
          <div
            key={city.id}
            onClick={() => {
              if (isVisited) {
                const fp = visitedCities.find((v: any) => v.cityId === city.id);
                if (fp) removeFootprint(fp.id);
              } else {
                openModal(city.id);
              }
            }}
            onMouseEnter={() => setHoveredCity(city.id)}
            onMouseLeave={() => setHoveredCity(null)}
            className="city-label absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `calc(50% + ${x * scale}px)`,
              top: `calc(50% - ${y * scale}px)`,
              zIndex: isHovered ? 50 : 10
            }}
          >
            <div
              className={`text-xs whitespace-nowrap px-2 py-1 rounded transition-all duration-200 ${
                isHovered
                  ? 'bg-amber-500/90 text-white scale-110 shadow-lg shadow-amber-500/30'
                  : isVisited
                  ? 'bg-amber-900/70 text-amber-200'
                  : 'bg-slate-800/60 text-slate-300'
              }`}
            >
              {city.name}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function MapScene() {
  const { currentView, setCurrentProvince, currentProvince, openModal, removeFootprint, footprints } = useStore();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredProvinceData, setHoveredProvinceData] = useState<any>(null);
  const [hoveredProvinceVisited, setHoveredProvinceVisited] = useState(false);
  const [hoveredProvinceCityCount, setHoveredProvinceCityCount] = useState(0);
  
  const handleHoverProvince = (province: any, isVisited: boolean, cityCount: number) => {
    setHoveredProvinceData(province);
    setHoveredProvinceVisited(isVisited);
    setHoveredProvinceCityCount(cityCount);
  };
  
  return (
    <div className="w-full h-full relative">
      {/* 3D 地图画布 */}
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <Lights />
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          {currentView === 'china' ? <ChinaMap /> : <ProvinceMap />}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={60}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
          />
        </Suspense>
      </Canvas>
      
      {/* 省份信息卡片 */}
      {currentView === 'china' && hoveredProvinceData && (
        <ProvinceInfoCard
          province={hoveredProvinceData}
          isVisited={hoveredProvinceVisited}
          visitedCityCount={hoveredProvinceCityCount}
        />
      )}
      
      {/* 省份名称标签 */}
      {currentView === 'china' && (
        <ProvinceLabels
          hoveredProvince={hoveredProvince}
          setHoveredProvince={setHoveredProvince}
          setCurrentProvince={setCurrentProvince}
          onHoverProvince={handleHoverProvince}
        />
      )}

      {/* 城市名称标签 */}
      {currentView === 'province' && currentProvince && (
        <CityLabels
          hoveredCity={hoveredCity}
          setHoveredCity={setHoveredCity}
          currentProvince={currentProvince}
          openModal={openModal}
          removeFootprint={removeFootprint}
          footprints={footprints}
        />
      )}
      
      <div className="absolute bottom-4 left-4 text-white/60 text-sm pointer-events-none">
        <p>🖱️ 拖拽旋转 | 滚轮缩放 | 点击区域进入</p>
      </div>
    </div>
  );
}
