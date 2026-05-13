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
      camera.position.set(0, 0, 25);
      camera.lookAt(0, 0, 0);
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
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        color="#FFFFFF"
      />
      <pointLight position={[-10, 10, 10]} intensity={0.5} color="#22D3EE" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#F59E0B" />
    </>
  );
}

export function MapScene() {
  const { currentView } = useStore();
  
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <Lights />
          <Stars
            radius={100}
            depth={50}
            count={2000}
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
            minDistance={10}
            maxDistance={60}
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
