import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Loader from '../components/loader';

const DollModel = () => {
  const { scene } = useGLTF('/doll.glb');
  const dollRef = useRef<THREE.Group>(null);

  return (
    <primitive
      ref={dollRef}
      object={scene}
      scale={16}
      position={[0, 0, 0]}
    />
  );
};

const DollCanvas = () => {
  return (
    <Canvas
      camera={{ position: [600, 100, 0], fov: 45 }}
      style={{ position: 'absolute', right: 600, zIndex: 10 }}
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
        <DollModel />
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
        autoRotate
        autoRotateSpeed={2.5}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default DollCanvas;
