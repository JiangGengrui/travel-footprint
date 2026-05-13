import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { provincesData } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Flag3D } from '../Flag/Flag3D';

// 简单的省份布局
const provincePositions: Record<string, [number, number]> = {
  'beijing': [2, 3],
  'tianjin': [2.5, 2.8],
  'hebei': [2, 2],
  'shanxi': [1, 2],
  'neimenggu': [1, 4],
  'liaoning': [3.5, 3.5],
  'jilin': [4, 4],
  'heilongjiang': [4, 5],
  'shanghai': [3, 0],
  'jiangsu': [2.5, 0.5],
  'zhejiang': [2.5, -0.5],
  'anhui': [2, 0.5],
  'fujian': [3, -1.5],
  'jiangxi': [2, -1],
  'shandong': [2, 1.5],
  'henan': [1, 0.5],
  'hubei': [1, 0],
  'hunan': [1, -1],
  'guangdong': [1.5, -2.5],
  'guangxi': [0.5, -2.5],
  'hainan': [1, -3.5],
  'chongqing': [-0.5, 0],
  'sichuan': [-1.5, 0],
  'guizhou': [-1, -1],
  'yunnan': [-1.5, -2],
  'xizang': [-3, 0],
  'shaanxi': [0, 1],
  'gansu': [-1, 2],
  'qinghai': [-2.5, 1],
  'ningxia': [0, 1.5],
  'xinjiang': [-4, 2],
  'taiwan': [4, -1.5],
  'xianggang': [2, -2.3],
  'aomen': [1.5, -2.4],
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

  return (
    <group ref={groupRef}>
      {/* 渲染省份 */}
      {provincesData.map((province) => {
        const pos = provincePositions[province.id] || [0, 0];
        const isVisited = hasVisitedProvince(province.id);
        
        return (
          <mesh
            key={province.id}
            position={[pos[0] * 1.8, pos[1] * 1.8, 0.2]}
            onClick={(e) => {
              e.stopPropagation();
              handleProvinceClick(province.id);
            }}
          >
            <boxGeometry args={[1.5, 1.5, 0.4]} />
            <meshBasicMaterial
              color={isVisited ? '#22d3ee' : '#475569'}
            />
          </mesh>
        );
      })}
      
      {/* 旗帜 */}
      {footprints.map((footprint) => {
        const pos = provincePositions[footprint.provinceId] || [0, 0];
        return (
          <Flag3D
            key={footprint.id}
            position={[pos[0] * 1.8, pos[1] * 1.8, 0.8]}
            size={0.6}
          />
        );
      })}
    </group>
  );
}
