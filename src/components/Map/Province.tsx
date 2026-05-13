import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { chinaGeoJSON } from '../../data/chinaGeoJSON';
import { useStore } from '../../store/useStore';

interface ProvinceProps {
  feature: (typeof chinaGeoJSON.features)[number];
  isVisited: boolean;
  onClick: () => void;
  index: number;
}

export function Province({ feature, isVisited, onClick, index }: ProvinceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const coordinates = feature.geometry.coordinates[0] as [number, number][];
  
  const centerX = (Math.min(...coordinates.map(c => c[0])) + Math.max(...coordinates.map(c => c[0]))) / 2;
  const centerY = (Math.min(...coordinates.map(c => c[1])) + Math.max(...coordinates.map(c => c[1]))) / 2;
  
  const width = Math.max(...coordinates.map(c => c[0])) - Math.min(...coordinates.map(c => c[0]));
  const height = Math.max(...coordinates.map(c => c[1])) - Math.min(...coordinates.map(c => c[1]));

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.03, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
      
      if (clicked) {
        const scale = 1 + Math.sin(time * 10) * 0.02;
        meshRef.current.scale.setScalar(scale);
        setTimeout(() => setClicked(false), 200);
      }
    }
  });

  const shape = new THREE.Shape();
  const normalizedCoords = coordinates.map(([x, y]) => [
    (x - centerX) * 0.5,
    (y - centerY) * 0.5
  ] as [number, number]);
  
  shape.moveTo(normalizedCoords[0][0], normalizedCoords[0][1]);
  for (let i = 1; i < normalizedCoords.length; i++) {
    shape.lineTo(normalizedCoords[i][0], normalizedCoords[i][1]);
  }
  shape.lineTo(normalizedCoords[0][0], normalizedCoords[0][1]);

  const geometry = new THREE.ShapeGeometry(shape);

  const baseColor = isVisited ? '#22D3EE' : '#334155';
  const hoverColor = hovered ? '#64748B' : baseColor;
  const emissiveColor = isVisited ? '#0891B2' : (hovered ? '#475569' : '#1E293B');

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[centerX, centerY, 0.1 + index * 0.01]}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <meshStandardMaterial
        color={hoverColor}
        emissive={emissiveColor}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
