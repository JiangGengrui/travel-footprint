import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getProvinceById } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Flag3D } from '../Flag/Flag3D';

export function ProvinceMap() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentProvince, footprints, setCurrentProvince, openModal, removeFootprint } = useStore();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  
  const province = getProvinceById(currentProvince || '');

  const visitedCities = footprints.filter(f => f.provinceId === currentProvince);
  const visitedCityIds = new Set(visitedCities.map(v => v.cityId));

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.01;
    }
  });

  if (!province) {
    return null;
  }

  const citiesCount = province.cities.length;
  const cols = Math.ceil(Math.sqrt(citiesCount));
  const spacing = 2;

  return (
    <group ref={groupRef}>
      {/* 背景板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
        <planeGeometry args={[cols * spacing + 2, (Math.ceil(citiesCount / cols) * spacing + 2)]} />
        <meshBasicMaterial color="#1a1f3a" />
      </mesh>
      
      {/* 城市网格 */}
      {province.cities.map((city, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = (col - (cols - 1) / 2) * spacing;
        const y = -(row - (Math.ceil(citiesCount / cols) - 1) / 2) * spacing;
        const isVisited = visitedCityIds.has(city.id);
        const isHovered = hoveredCity === city.id;
        
        return (
          <group key={city.id}>
            {/* 城市方块 */}
            <mesh
              position={[x, y, 0.1]}
              scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
              onClick={(e) => {
                e.stopPropagation();
                if (isVisited) {
                  const fp = visitedCities.find(v => v.cityId === city.id);
                  if (fp) removeFootprint(fp.id);
                } else {
                  openModal(city.id);
                }
              }}
              onPointerOver={() => setHoveredCity(city.id)}
              onPointerOut={() => setHoveredCity(null)}
            >
              <boxGeometry args={[1.4, 1.4, 0.3]} />
              <meshBasicMaterial
                color={isVisited ? '#F59E0B' : '#475569'} />
            </mesh>

            {/* 城市轮廓 */}
            <mesh
              position={[x, y, 0.3]}
              scale={isHovered ? [1.12, 1.12, 1.12] : [1.02, 1.02, 1.02]}
            >
              <boxGeometry args={[1.45, 1.45, 0.05]} />
              <meshBasicMaterial
                color={isVisited ? '#D97706' : '#334155'} />
            </mesh>
            
            {/* 旗帜（已访问城市）*/}
            {isVisited && (
              <Flag3D
                position={[x, y, 0.6]}
                size={0.5}
                color="#F59E0B"
              />
            )}
          </group>
        );
      })}
    </group>
  );
}
