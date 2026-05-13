import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { provincesData } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Flag3D } from '../Flag/Flag3D';

// 优化后的省份布局，更符合真实地理
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

export function ChinaMap() {
  const groupRef = useRef<THREE.Group>(null);
  const { footprints, setCurrentProvince, hasVisitedProvince } = useStore();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.03;
    }
  });

  const handleProvinceClick = (provinceId: string) => {
    setCurrentProvince(provinceId);
  };

  return (
    <group ref={groupRef}>
      {/* 渲染省份 */}
      {provincesData.map((province) => {
        const pos = provincePositions[province.id] || { x: 0, y: 0 };
        const isVisited = hasVisitedProvince(province.id);
        const isHovered = hoveredProvince === province.id;
        
        return (
          <group key={province.id}>
            <mesh
              position={[pos.x, pos.y, 0.2]}
              scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
              onClick={(e) => {
                e.stopPropagation();
                handleProvinceClick(province.id);
              }}
              onPointerOver={() => setHoveredProvince(province.id)}
              onPointerOut={() => setHoveredProvince(null)}
            >
              <boxGeometry args={[1.3, 1.3, 0.35]} />
              <meshBasicMaterial
                color={isVisited ? '#22d3ee' : '#475569'}
              />
            </mesh>

            {/* 省份轮廓装饰 */}
            <mesh
              position={[pos.x, pos.y, 0.38]}
              scale={isHovered ? [1.12, 1.12, 1.12] : [1.02, 1.02, 1.02]}
            >
              <boxGeometry args={[1.35, 1.35, 0.05]} />
              <meshBasicMaterial
                color={isVisited ? '#0891b2' : '#334155'}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* 旗帜 */}
      {footprints.map((footprint) => {
        const pos = provincePositions[footprint.provinceId] || { x: 0, y: 0 };
        return (
          <Flag3D
            key={footprint.id}
            position={[pos.x, pos.y, 0.8]}
            size={0.65}
          />
        );
      })}
    </group>
  );
}
