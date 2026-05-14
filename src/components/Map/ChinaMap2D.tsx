
import { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { PROVINCE_GEOMETRIES, MAP_CONFIG, geoToSvg } from '../../data/chinaMap';

interface ChinaMap2DProps {
  onProvinceClick: (provinceId: string) => void;
  onHover: (provinceId: string | null) => void;
  hoveredProvince: string | null;
}

export function ChinaMap2D({ onProvinceClick, onHover, hoveredProvince }: ChinaMap2DProps) {
  const { footprints, hasVisitedProvince } = useStore();
  
  const [view, setView] = useState({
    centerLng: MAP_CONFIG.initialCenter[0],
    centerLat: MAP_CONFIG.initialCenter[1],
    zoom: MAP_CONFIG.initialZoom
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewStart, setViewStart] = useState({ centerLng: 0, centerLat: 0 });
  
  const svgWidth = 800;
  const svgHeight = 600;

  // 鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(MAP_CONFIG.minZoom, Math.min(MAP_CONFIG.maxZoom, view.zoom + delta));
    setView(v => ({ ...v, zoom: newZoom }));
  };

  // 拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setViewStart({ centerLng: view.centerLng, centerLat: view.centerLat });
  };

  // 拖拽中
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const scale = 5 * view.zoom;
    
    setView(v => ({
      ...v,
      centerLng: viewStart.centerLng - dx / scale,
      centerLat: viewStart.centerLat + dy / scale
    }));
  };

  // 拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 重置视图
  const resetView = () => {
    setView({
      centerLng: MAP_CONFIG.initialCenter[0],
      centerLat: MAP_CONFIG.initialCenter[1],
      zoom: MAP_CONFIG.initialZoom
    });
  };

  // 转换坐标
  const project = (lng: number, lat: number): [number, number] => {
    return geoToSvg(lng, lat, view.centerLng, view.centerLat, view.zoom, svgWidth, svgHeight);
  };

  // 生成多边形路径
  const generatePolygonPoints = (province: typeof PROVINCE_GEOMETRIES[0]) => {
    return province.coordinates.map(coord => {
      const [x, y] = project(coord[0], coord[1]);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="relative w-full h-full">
      {/* 缩放控制按钮 */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setView(v => ({ ...v, zoom: Math.min(MAP_CONFIG.maxZoom, v.zoom + 0.3) }))}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center justify-center text-xl"
        >
          +
        </button>
        <button
          onClick={() => setView(v => ({ ...v, zoom: Math.max(MAP_CONFIG.minZoom, v.zoom - 0.3) }))}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center justify-center text-xl"
        >
          −
        </button>
        <button
          onClick={resetView}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center justify-center text-sm"
        >
          ⟲
        </button>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`cursor-${isDragging ? 'grabbing' : 'grab'}`}
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}
      >
        {/* 渐变和阴影定义 */}
        <defs>
          <linearGradient id="provinceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="visitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="provinceShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* 绘制省份（使用真实多边形形状） */}
        {PROVINCE_GEOMETRIES.map((province) => {
          const isVisited = hasVisitedProvince(province.id);
          const isHovered = hoveredProvince === province.id;
          const [cx, cy] = project(province.center[0], province.center[1]);
          
          return (
            <g key={province.id}>
              {/* 省份多边形 */}
              <polygon
                points={generatePolygonPoints(province)}
                fill={isVisited ? 'url(#visitedGradient)' : 'url(#provinceGradient)'}
                stroke={isHovered ? '#22d3ee' : isVisited ? '#0891b2' : '#475569'}
                strokeWidth={isHovered ? 3 : 1.5}
                onClick={(e) => {
                  e.stopPropagation();
                  onProvinceClick(province.id);
                }}
                onMouseEnter={() => onHover(province.id)}
                onMouseLeave={() => onHover(null)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                filter={isHovered ? 'url(#provinceShadow)' : ''}
              />
              
              {/* 省份名称（绑定在地图中心） */}
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isVisited ? '#a5f3fc' : '#e2e8f0'}
                fontSize={Math.max(10, 12 / view.zoom)}
                fontWeight={isHovered ? 'bold' : 'normal'}
                pointerEvents="none"
                style={{ 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {province.name.length > 3 ? province.name.slice(0, 3) + '..' : province.name}
              </text>
              
              {/* 旗帜（已访问省份） */}
              {isVisited && (
                <g>
                  {/* 旗杆 */}
                  <line
                    x1={cx - 15 / view.zoom}
                    y1={cy - 25 / view.zoom}
                    x2={cx - 15 / view.zoom}
                    y2={cy + 10 / view.zoom}
                    stroke="#8b7355"
                    strokeWidth={Math.max(1, 3 / view.zoom)}
                  />
                  {/* 旗帜 */}
                  <polygon
                    points={`
                      ${cx - 15 / view.zoom},${cy - 25 / view.zoom} 
                      ${cx + 15 / view.zoom},${cy - 18 / view.zoom} 
                      ${cx - 15 / view.zoom},${cy - 10 / view.zoom}
                    `}
                    fill="#ef4444"
                    style={{
                      transformOrigin: `${cx - 15 / view.zoom}px ${cy - 25 / view.zoom}px`,
                      animation: 'flagWave 1s ease-in-out infinite'
                    }}
                  />
                </g>
              )}
            </g>
          );
        })}
        
        {/* 动画定义 */}
        <style>
          {`
            @keyframes flagWave {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
          `}
        </style>
      </svg>
    </div>
  );
}

