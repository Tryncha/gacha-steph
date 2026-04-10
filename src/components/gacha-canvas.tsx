import * as THREE from 'three';
import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, useTexture } from '@react-three/drei';
import Loader from '../components/loader';

const GachaModel = () => {
  const { scene } = useGLTF('/renders/GACHAFINAL.glb');
  const gachaRef = useRef<THREE.Group>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const texturesData = [
    { childName: 'cajas_del_gacha01', texture: useTexture('/prizes/alas.png') },
    { childName: 'cajas_del_gacha002', texture: useTexture('/prizes/blusa.png') },
    { childName: 'cajas_del_gacha003', texture: useTexture('/prizes/botas.png') },
    { childName: 'cajas_del_gacha004', texture: useTexture('/prizes/collar.png') },
    { childName: 'cajas_del_gacha005', texture: useTexture('/prizes/correa.png') },
    { childName: 'cajas_del_gacha006', texture: useTexture('/prizes/falda.png') },
    { childName: 'cajas_del_gacha007', texture: useTexture('/prizes/fursona.png') },
    { childName: 'cajas_del_gacha008', texture: useTexture('/prizes/medias.png') },
    { childName: 'cajas_del_gacha009', texture: useTexture('/prizes/paticas.png') }
  ];

  const fursonaTexture = useTexture('/holi.png');

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        for (const data of texturesData) {
          if (child.name === data.childName) {
            if (data.childName === 'cajas_del_gacha003') {
              data.texture.repeat.set(0.667, 1);
              data.texture.offset.set(0.167, 0);
            } else {
              // Ratio del objeto: 1:1 (cuadrado)
              // Ratio de la imagen: 2528/1684 ≈ 1.5 (más ancha que alta)
              // Entonces en Y la imagen ocupa solo 1/1.5 ≈ 0.667 del espacio
              data.texture.repeat.set(1, 0.667);
              data.texture.offset.set(0, 0.167);
            }

            child.material = new THREE.MeshStandardMaterial({ map: data.texture });
            child.material.needsUpdate = true;
          }
        }

        if (child.name === 'foto_fursona') {
          child.material = new THREE.MeshStandardMaterial({ map: fursonaTexture });
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, texturesData, fursonaTexture]);

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
      position={[1.5, -2.8, -6]}
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
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minDistance={2}
        maxDistance={34}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default GachaCanvas;
