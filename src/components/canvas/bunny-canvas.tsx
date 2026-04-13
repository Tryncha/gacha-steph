'use client';

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import Loader from '../loader';
import { useBunnyAnimation } from '@/src/hooks/use-model-animation';
import { useGacha } from '@/src/context/gacha-context';

const BunnyModel = () => {
  const { winner } = useGacha();

  const { scene } = useGLTF(`/renders/bunnies/${winner}.glb`);
  const bunnyRef = useRef<THREE.Group>(null);

  useBunnyAnimation(bunnyRef);

  if (!winner) return;
  return (
    <primitive
      ref={bunnyRef}
      object={scene}
      position={[0, 1, 0]}
      scale={2.4}
    />
  );
};

const BunnyCanvas = (props: CanvasProps) => {
  return (
    <Canvas
      camera={props.camera}
      style={props.style}
    >
      <Suspense fallback={<Loader loadingText="CARGANDO BUNNY..." />}>
        <BunnyModel />
        <Environment files="/lighting/docklands_01_4k.exr" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={32}
      />
    </Canvas>
  );
};

export default BunnyCanvas;
