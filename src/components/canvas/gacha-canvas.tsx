'use client';

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useGachaAnimation } from '../../hooks/use-model-animation';
import { useGacha } from '../../context/gacha-context';
import { WISH_BUTTON_ID, WISH_STAR_COST } from '../../lib/constants';
import Loader from '../loader';

const GachaModel = () => {
  const { scene } = useGLTF('/renders/gacha-render.glb');
  const gachaRef = useRef<THREE.Group>(null);

  const { stars, spendStars, activeBoxes, wish } = useGacha();

  useGachaAnimation(activeBoxes, scene, gachaRef);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClick(e: any) {
    // For checking objects names
    console.log(e.object.name);

    if (e.object.name === WISH_BUTTON_ID) {
      if (stars >= WISH_STAR_COST) {
        spendStars(WISH_STAR_COST);
        wish();
      } else {
        console.log('Not enough stars :c');
      }
    }
  }

  return (
    <primitive
      ref={gachaRef}
      object={scene}
      onClick={handleClick}
      position={[1, -2.4, 52]}
      scale={1}
    />
  );
};

const GachaCanvas = (props: CanvasProps) => {
  return (
    <Canvas
      camera={props.camera}
      style={props.style}
    >
      <Suspense fallback={<Loader loadingText="CARGANDO GACHA..." />}>
        <GachaModel />
        <Environment files="/lighting/docklands_01_4k.exr" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={34}
      />
    </Canvas>
  );
};

export default GachaCanvas;
