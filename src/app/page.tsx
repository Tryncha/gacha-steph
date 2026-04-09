'use client';

import * as THREE from 'three';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/miau.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = mouse.x * 0.01;
    groupRef.current.rotation.x = -mouse.y * 0.01;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1}
      position={[0, -4, -1.8]}
    />
  );
};

const Loader = () => {
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: '#ff6eb4',
          fontFamily: 'monospace'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,110,180,0.2)',
            borderTop: '3px solid #ff6eb4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', margin: 0, opacity: 0.7 }}>CARGANDO...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
};

const Home = () => {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0e0a14',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'monospace',
        userSelect: 'none'
      }}
    >
      {/* Flash overlay on button press */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          background: 'rgba(255,110,180,0.12)',
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease-out'
        }}
      />

      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,110,180,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,110,180,0.07)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(120,80,255,0.08)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      <Canvas
        camera={{ position: [600, 100, 0], fov: 45 }}
        style={{ position: 'absolute', inset: 0 }}
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
          <Model />
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
          enableRotate={false} // Controls camera rotation
          enableZoom={false} // Controls camera zoom
          enablePan={false} // Controls camera movement
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={30}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </main>
  );
};

export default Home;
