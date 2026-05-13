import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CityMarkerProps {
  coordinates: [number, number];
  isVisited: boolean;
  onClick: () => void;
}

export function CityMarker({ coordinates, isVisited, onClick }: CityMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      if (isVisited) {
        meshRef.current.position.y = 0.5 + Math.sin(time * 3) * 0.1;
      } else {
        meshRef.current.position.y = 0.3 + Math.sin(time * 2) * 0.05;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[coordinates[0], coordinates[1], 0.3]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <sphereGeometry args={[isVisited ? 0.12 : 0.08, 16, 16]} />
      <meshStandardMaterial
        color={isVisited ? '#F59E0B' : '#64748B'}
        emissive={isVisited ? '#D97706' : '#475569'}
        emissiveIntensity={isVisited ? 0.5 : 0.2}
      />
    </mesh>
  );
}
