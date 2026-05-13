import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Flag3DProps {
  position: [number, number, number];
  color?: string;
  size?: number;
}

export function Flag3D({ position, color = '#E53935', size = 0.3 }: Flag3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);
  const poleRef = useRef<THREE.Mesh>(null);
  
  const poleGeometry = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, size * 2, 8), [size]);
  const flagGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(size * 1.5, size * 0.2);
    shape.lineTo(size * 1.5, size * 0.8);
    shape.lineTo(0, size);
    shape.lineTo(0, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, [size]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 2) * 0.1;
      groupRef.current.position.z = position[2] + Math.sin(time * 1.5) * 0.05;
    }
    if (flagRef.current) {
      const time = state.clock.getElapsedTime();
      flagRef.current.rotation.y = Math.sin(time * 3) * 0.15;
      flagRef.current.rotation.z = Math.sin(time * 4) * 0.1;
    }
    if (poleRef.current) {
      const time = state.clock.getElapsedTime();
      poleRef.current.rotation.z = Math.sin(time * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 旗杆 */}
      <mesh ref={poleRef} geometry={poleGeometry} position={[0, size, 0]}>
        <meshBasicMaterial color="#8B7355" />
      </mesh>
      
      {/* 旗帜 */}
      <mesh
        ref={flagRef}
        geometry={flagGeometry}
        position={[0, size * 1.1, 0]}
      >
        <meshBasicMaterial
          color={color}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 旗座 */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshBasicMaterial color="#4A5568" />
      </mesh>
      
      {/* 旗帜高光装饰 */}
      <mesh position={[size * 0.3, size * 1.4, 0.01]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#FFF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
