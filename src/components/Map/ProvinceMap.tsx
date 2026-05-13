import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getProvinceById } from '../../data/provincesData';
import { useStore } from '../../store/useStore';
import { Flag3D } from '../Flag/Flag3D';
import { CityMarker } from './CityMarker';

export function ProvinceMap() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentProvince, footprints, setCurrentProvince, openModal, removeFootprint } = useStore();
  
  const province = useMemo(() => {
    return getProvinceById(currentProvince || '');
  }, [currentProvince]);

  const visitedCities = useMemo(() => {
    return footprints.filter(f => f.provinceId === currentProvince);
  }, [footprints, currentProvince]);

  const visitedCityIds = useMemo(() => {
    return new Set(visitedCities.map(v => v.cityId));
  }, [visitedCities]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.01;
    }
  });

  if (!province) {
    return null;
  }

  const handleBack = () => {
    setCurrentProvince(null);
  };

  const handleAddCity = (cityId: string) => {
    openModal(cityId);
  };

  const handleRemoveCity = (footprintId: string) => {
    removeFootprint(footprintId);
  };

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      
      {province.cities.map((city, index) => (
        <CityMarker
          key={city.id}
          coordinates={[
            (city.coordinates[0] - province.center[0]) * 0.8,
            (city.coordinates[1] - province.center[1]) * 0.8
          ]}
          isVisited={visitedCityIds.has(city.id)}
          onClick={() => {
            if (visitedCityIds.has(city.id)) {
              const fp = visitedCities.find(v => v.cityId === city.id);
              if (fp) handleRemoveCity(fp.id);
            } else {
              handleAddCity(city.id);
            }
          }}
        />
      ))}
      
      {visitedCities.map((footprint, idx) => {
        const city = province.cities.find(c => c.id === footprint.cityId);
        if (!city) return null;
        return (
          <Flag3D
            key={footprint.id}
            position={[
              (city.coordinates[0] - province.center[0]) * 0.8,
              (city.coordinates[1] - province.center[1]) * 0.8,
              0.5
            ]}
            size={0.25}
          />
        );
      })}
    </group>
  );
}
