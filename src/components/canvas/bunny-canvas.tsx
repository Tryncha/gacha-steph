'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useBunnyAnimation } from '@/src/hooks/use-model-animation';
import { useGacha } from '@/src/context/gacha-context';
import { prizes } from '@/src/lib/constants';

// Preloading of all models - just to evade a loader
prizes.forEach((p) => useGLTF.preload(`/renders/bunnies/${p.prizeId}.glb`));

const BunnyModel = ({ prizeId }: { prizeId: string }) => {
  const { scene } = useGLTF(`/renders/bunnies/${prizeId}.glb`);
  const bunnyRef = useRef<THREE.Group>(null);

  useBunnyAnimation(bunnyRef);

  return (
    <primitive
      ref={bunnyRef}
      object={scene}
      position={[0, 0, 0]}
      scale={prizeId === 'especial' ? 1.1 : 2.4}
    />
  );
};

const BunnyCanvas = (props: CanvasProps) => {
  const { winner } = useGacha();

  return (
    <Canvas
      camera={props.camera}
      style={props.style}
    >
      {/* No need for <Suspense> given that all models are preloaded */}
      {winner && <BunnyModel prizeId={winner} />}
      <Environment files="/lighting/docklands_01_4k.exr" />
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
