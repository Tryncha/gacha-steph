import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Loader from '../components/loader';

const GachaModel = () => {
  const { scene } = useGLTF('/miau.glb');
  const gachaRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!gachaRef.current) return;

    gachaRef.current.rotation.y = mouse.x * 0.01;
    gachaRef.current.rotation.x = -mouse.y * 0.01;
  });

  return (
    <primitive
      ref={gachaRef}
      object={scene}
      scale={1}
      position={[0, -3.75, -6]}
    />
  );
};

const GachaCanvas = () => {
  return (
    <Canvas
      camera={{ position: [600, 100, -60], fov: 45 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      shadows
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight
        position={[-3, 2, -3]}
        intensity={0.8}
        color="#ff6eb4"
      />
      <pointLight
        position={[3, 1, 3]}
        intensity={0.5}
        color="#7850ff"
      />

      <Suspense fallback={<Loader />}>
        <GachaModel />
        <ContactShadows
          position={[0, -0.55, 0]}
          opacity={0.5}
          scale={4}
          blur={2}
          far={1}
          color="#ff6eb4"
        />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        // autoRotate
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minDistance={2}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default GachaCanvas;
