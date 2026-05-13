import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { chinaGeoJSON } from '../../data/chinaGeoJSON';
import { provincesData } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Province } from './Province';
import { Flag3D } from '../Flag/Flag3D';

export function ChinaMap() {
  const groupRef = useRef<THREE.Group>(null);
  const { footprints, setCurrentProvince, hasVisitedProvince } = useStore();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.02;
    }
  });

  const handleProvinceClick = (provinceId: string) => {
    setCurrentProvince(provinceId);
  };

  const getFlagPosition = (provinceId: string) => {
    const province = provincesData.find(p => p.id === provinceId);
    if (province) {
      return province.center;
    }
    return [110, 35] as [number, number];
  };

  return (
    <group ref={groupRef}>
      {chinaGeoJSON.features.map((feature, index) => (
        <Province
          key={feature.id}
          feature={feature}
          isVisited={hasVisitedProvince(feature.id as string)}
          onClick={() => handleProvinceClick(feature.id as string)}
          index={index}
        />
      ))}
      
      {footprints.map((footprint) => {
        const position = getFlagPosition(footprint.provinceId);
        return (
          <Flag3D
            key={footprint.id}
            position={[position[0], position[1], 0.8]}
            size={0.2}
          />
        );
      })}
    </group>
  );
}
