'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

function Model({ onButtonPress }: { onButtonPress: () => void }) {
  const { scene } = useGLTF('/gachapon.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Animation state
  const anim = useRef({
    active: false,
    t: 0
  });

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Idle float
    if (!anim.current.active) {
      groupRef.current.position.y = Math.sin(Date.now() * 0.001 * 0.8) * 0.05;
      return;
    }

    // Dispense animation: shake + bounce
    anim.current.t += delta * 3;
    const t = anim.current.t;

    if (t < Math.PI * 2) {
      // Shake horizontally
      groupRef.current.position.x = Math.sin(t * 6) * 0.06 * Math.max(0, 1 - t / (Math.PI * 2));
      // Bounce down then up
      groupRef.current.position.y = -0.5 + Math.abs(Math.sin(t * 2)) * 0.15 * Math.max(0, 1 - t / (Math.PI * 2));
      // Slight tilt
      groupRef.current.rotation.z = Math.sin(t * 5) * 0.04 * Math.max(0, 1 - t / (Math.PI * 2));
    } else {
      // Reset
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.z = 0;
      anim.current.active = false;
      anim.current.t = 0;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const clickedName = e.object?.name;

    if (clickedName === 'Cube011') {
      console.log('🎰 Cube.011 presionado — dispensando gachapon...');
      console.log('🕐 Timestamp:', new Date().toISOString());
      console.log('📦 Objeto clickeado:', e.object);

      // Trigger animation
      if (!anim.current.active) {
        anim.current.active = true;
        anim.current.t = 0;
        onButtonPress();
      }
    }
  };

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        if (e.object?.name === 'Cube.011') {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    />
  );
}

function Loader() {
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
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', margin: 0, opacity: 0.7 }}>LOADING MODEL...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

export default function Home() {
  const [autoRotate, setAutoRotate] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleButtonPress = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 600);
    setAutoRotate(false);
  };

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
          opacity: showFlash ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}
      />

      {/* Background */}
      {/* <div
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
      /> */}

      <Canvas
        camera={{ position: [360, 40, 96], fov: 45 }}
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
          <Model onButtonPress={handleButtonPress} />
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
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={96}
          maxPolarAngle={Math.PI / 1.8}
          onStart={() => setAutoRotate(false)}
        />
      </Canvas>

      {/* Bottom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '10px'
        }}
      >
        <button
          onClick={() => setAutoRotate((v) => !v)}
          style={{
            background: 'rgba(255,110,180,0.1)',
            border: '0.5px solid rgba(255,110,180,0.3)',
            borderRadius: '999px',
            color: autoRotate ? '#ff6eb4' : 'rgba(255,255,255,0.3)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '8px 20px',
            cursor: 'pointer'
          }}
        >
          {autoRotate ? '◉ AUTO-ROTAR ON' : '○ AUTO-ROTAR OFF'}
        </button>
      </div>
    </main>
  );
}
