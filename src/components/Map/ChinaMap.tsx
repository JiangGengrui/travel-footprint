import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { chinaGeoJSON } from '../../data/chinaGeoJSON';
import { provincesData } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Province } from './Province';
import { Flag3D } from '../Flag/Flag3D';

// 归一化坐标到 -8 到 8 的范围
const normalizeCoord = (lon: number, lat: number): [number, number] => {
  // 中国大致范围: lon 73-135, lat 18-53
  const x = ((lon - 104) / 31) * 8;
  const y = ((lat - 35.5) / 17.5) * 8;
  return [x, y];
};

export function ChinaMap() {
  const groupRef = useRef<THREE.Group>(null);
  const { footprints, setCurrentProvince, hasVisitedProvince } = useStore();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  const handleProvinceClick = (provinceId: string) => {
    setCurrentProvince(provinceId);
  };

  const getFlagPosition = (provinceId: string) => {
    const province = provincesData.find(p => p.id === provinceId);
    if (province) {
      return normalizeCoord(province.center[0], province.center[1]);
    }
    return [0, 0] as [number, number];
  };

  return (
    <group ref={groupRef}>
      {/* 简单的省份方块网格 */}
      {chinaGeoJSON.features.map((feature, index) => {
        const coords = feature.geometry.coordinates[0];
        let centerX = 0, centerY = 0;
        coords.forEach(([lon, lat]) => {
          centerX += lon;
          centerY += lat;
        });
        centerX /= coords.length;
        centerY /= coords.length;
        
        const [nx, ny] = normalizeCoord(centerX, centerY);
        const isVisited = hasVisitedProvince(feature.id as string);
        
        return (
          <mesh
            key={feature.id}
            position={[nx, ny, 0.1]}
            onClick={(e) => {
              e.stopPropagation();
              handleProvinceClick(feature.id as string);
            }}
          >
            <boxGeometry args={[1.2, 1.2, 0.3]} />
            <meshStandardMaterial
              color={isVisited ? '#22d3ee' : '#334155'}
              emissive={isVisited ? '#0891b2' : '#1e293b'}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* 旗帜 */}
      {footprints.map((footprint) => {
        const position = getFlagPosition(footprint.provinceId);
        return (
          <Flag3D
            key={footprint.id}
            position={[position[0], position[1], 0.8]}
            size={0.6}
          />
        );
      })}
    </group>
  );
}
