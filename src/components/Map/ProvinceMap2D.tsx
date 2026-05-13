
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { getProvinceById } from '../data/provincesData';

interface ProvinceMap2DProps {
  provinceId: string;
  onBack: () => void;
}

export function ProvinceMap2D({ provinceId, onBack }: ProvinceMap2DProps) {
  const { footprints, openModal, removeFootprint } = useStore();
  const province = getProvinceById(provinceId);
  
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  if (!province) return null;

  const cities = province.cities;
  const visitedCityIds = new Set(
    footprints.filter(f => f.provinceId === provinceId).map(f => f.cityId)
  );
  
  const cols = Math.ceil(Math.sqrt(cities.length));
  const gridWidth = 800;
  const gridHeight = 600;
  const cellWidth = gridWidth / cols;
  const cellHeight = gridHeight / Math.ceil(cities.length / cols);

  return (
    <div className="relative w-full h-full">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center gap-2"
      >
        ← 返回全国
      </button>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${gridWidth} ${gridHeight}`}
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <defs>
          <linearGradient id="cityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="cityVisitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* 标题 */}
        <text
          x={gridWidth / 2}
          y={50}
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="32"
          fontWeight="bold"
        >
          {province.name}
        </text>

        {/* 城市网格 */}
        {cities.map((city, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const x = col * cellWidth + cellWidth / 2;
          const y = row * cellHeight + cellHeight / 2 + 60;
          const isVisited = visitedCityIds.has(city.id);
          const isHovered = hoveredCity === city.id;
          const size = Math.min(cellWidth, cellHeight) * 0.4;

          return (
            <g key={city.id}>
              <rect
                x={x - size}
                y={y - size}
                width={size * 2}
                height={size * 2}
                rx={size * 0.3}
                ry={size * 0.3}
                fill={isVisited ? 'url(#cityVisitedGradient)' : 'url(#cityGradient)'}
                stroke={isHovered ? '#fbbf24' : isVisited ? '#d97706' : '#475569'}
                strokeWidth={isHovered ? 3 : 1.5}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isVisited) {
                    const fp = footprints.find(f => f.provinceId === provinceId && f.cityId === city.id);
                    if (fp) removeFootprint(fp.id);
                  } else {
                    openModal(city.id);
                  }
                }}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transformOrigin: `${x}px ${y}px`,
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              {/* 城市名称 */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isVisited ? '#fef3c7' : '#e2e8f0'}
                fontSize={14}
                fontWeight={isHovered ? 'bold' : 'normal'}
                pointerEvents="none"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                {city.name}
              </text>

              {/* 旗帜（已访问） */}
              {isVisited && (
                <g>
                  <line
                    x1={x - size * 0.5}
                    y1={y - size * 0.6}
                    x2={x - size * 0.5}
                    y2={y + size * 0.2}
                    stroke="#8b7355"
                    strokeWidth="2"
                  />
                  <polygon
                    points={`${x - size * 0.5},${y - size * 0.6} ${x + size * 0.2},${y - size * 0.4} ${x - size * 0.5},${y - size * 0.2}`}
                    fill="#f59e0b"
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

