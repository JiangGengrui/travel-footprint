import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { ChinaMap } from '../Map/ChinaMap';
import { ProvinceMap } from '../Map/ProvinceMap';

function CameraController() {
  const { camera } = useThree();
  const { currentView, currentProvince } = useStore();
  
  useEffect(() => {
    if (currentView === 'china') {
      camera.position.set(105, 45, 50);
      camera.lookAt(105, 38, 0);
    } else if (currentProvince) {
      camera.position.set(0, 0, 20);
      camera.lookAt(0, 0, 0);
    }
  }, [currentView, currentProvince, camera]);
  
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 30, 20]}
        intensity={1.2}
        color="#FFF5E6"
      />
      <pointLight position={[-30, 20, 10]} intensity={0.5} color="#22D3EE" />
      <pointLight position={[30, -20, 10]} intensity={0.3} color="#F59E0B" />
    </>
  );
}

export function MapScene() {
  const { currentView } = useStore();
  
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [105, 45, 50], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <Lights />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          {currentView === 'china' ? <ChinaMap /> : <ProvinceMap />}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={20}
            maxDistance={100}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/60 text-sm pointer-events-none">
        <p>🖱️ 拖拽旋转 | 滚轮缩放 | 点击省份进入</p>
      </div>
    </div>
  );
}
