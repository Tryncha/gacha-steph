'use client';

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import Loader from '../loader';

const FursonaModel = () => {
  const { scene } = useGLTF('/renders/fursona-render.glb');
  const fursonaRef = useRef<THREE.Group>(null);

  return (
    <primitive
      ref={fursonaRef}
      object={scene}
      position={[0, 1, 0]}
      scale={1}
    />
  );
};

const FursonaCanvas = (props: CanvasProps) => {
  return (
    <Canvas
      camera={props.camera}
      style={props.style}
    >
      <Suspense fallback={<Loader loadingText="CARGANDO MODELO..." />}>
        <FursonaModel />
        <Environment files="/lighting/docklands_01_4k.exr" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={2.5}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={32}
      />
    </Canvas>
  );
};

export default FursonaCanvas;
