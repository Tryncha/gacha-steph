import * as THREE from 'three';
import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Loader from '../components/loader';
import { useGachaEvents } from '../hooks/use-gacha-events';
import { useStars } from '../context/stars-context';
import { BIG_BOX_ID, BOXES_IDS, GACHA_LOOPS, PRIZES_IDS, WISH_BUTTON_ID } from '../lib/constants';
import { addDelay, calcRandomInt } from '../lib/utils';

const GachaModel = () => {
  const { scene } = useGLTF('/renders/dios.glb');
  const gachaRef = useRef<THREE.Group>(null);

  const { stars, spendStars } = useStars();
  const [activeBoxes, setActiveBoxes] = useState<string[]>([]);

  useGachaEvents(scene, gachaRef);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Function creation for each box
        for (let i = 0; i < BOXES_IDS.length; i++) {
          if (child.name === BOXES_IDS[i]) {
            if (activeBoxes.includes(child.name)) {
              child.material.emissive = new THREE.Color('#ff6eb4');
              child.material.emissiveIntensity = 1.5;
            } else {
              child.material.emissive = new THREE.Color('#000000');
              child.material.emissiveIntensity = 0;
            }
            child.material.needsUpdate = true;
          }
        }
        if (child.name === BIG_BOX_ID) {
          if (activeBoxes.includes(child.name)) {
            child.material.emissive = new THREE.Color('#ff6eb4');
            child.material.emissiveIntensity = 1.5;
          } else {
            child.material.emissive = new THREE.Color('#000000');
            child.material.emissiveIntensity = 0;
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, activeBoxes]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleClick(e: any) {
    // For checking objects names
    console.log(e.object.name);

    // Function creation for each box
    // for (let i = 0; i < BOXES_IDS.length; i++) {
    //   if (e.object.name === BOXES_IDS[i]) {
    //     if (!activeBoxes.includes(BOXES_IDS[i])) {
    //       setActiveBoxes(activeBoxes.concat(BOXES_IDS[i]));
    //     } else {
    //       setActiveBoxes(activeBoxes.filter((boxId) => boxId !== BOXES_IDS[i]));
    //     }
    //   }
    // }

    // if (e.object.name === BIG_BOX_ID) {
    //   if (!activeBoxes.includes(BIG_BOX_ID)) {
    //     setActiveBoxes(activeBoxes.concat(BIG_BOX_ID));
    //   } else {
    //     setActiveBoxes(activeBoxes.filter((boxId) => boxId !== BIG_BOX_ID));
    //   }
    // }

    async function wish() {
      setActiveBoxes([]);

      let winnerIndex: number = 0;

      for (let i = 0; i < GACHA_LOOPS; i++) {
        const randomIndex = calcRandomInt(0, BOXES_IDS.length);

        console.log(`Loop #${i + 1}: randomIndex = ${randomIndex}`);

        setActiveBoxes([]);
        await addDelay(200);

        setActiveBoxes(activeBoxes.concat(BOXES_IDS[randomIndex]));
        await addDelay(200);

        if (i === GACHA_LOOPS - 1) {
          winnerIndex = randomIndex;
        }
      }

      console.log(`You won: ${PRIZES_IDS[winnerIndex]}!!`);
    }

    if (e.object.name === WISH_BUTTON_ID) {
      if (stars >= 70) {
        spendStars(70);
        await wish();
      } else {
        console.log('Not enough stars :c');
      }
    }

    // Code for multiple wishes
    // Pending for check

    // if (e.object.name === 'Cube011') {
    //   if (stars >= 70) {
    //     spendStars(70);

    //     for (let i = 0; i < GACHA_LOOPS; i++) {
    //       const randomIndexes = [
    //         calcRandomInt(0, BOXES_IDS.length),
    //         calcRandomInt(0, BOXES_IDS.length),
    //         calcRandomInt(0, BOXES_IDS.length)
    //       ];

    //       console.log(
    //         `Loop #${i + 1}: randomIndexes = [${randomIndexes[0]}, ${randomIndexes[1]}, ${randomIndexes[2]}]`
    //       );

    //       setActiveBoxes(
    //         activeBoxes.concat([BOXES_IDS[randomIndexes[0]], BOXES_IDS[randomIndexes[1]], BOXES_IDS[randomIndexes[2]]])
    //       );
    //       await addDelay(200);

    //       setActiveBoxes([]);
    //       await addDelay(200);
    //     }
    //   } else {
    //     console.log('Not enough stars :c');
    //   }
    // }
  }

  return (
    <primitive
      ref={gachaRef}
      object={scene}
      scale={1}
      position={[1, -2.4, -5]}
      onClick={handleClick}
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
      {/* <ambientLight intensity={0.4} />
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
      /> */}

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
        {/* <Environment preset="city" /> */}
        <Environment files="/lighting/docklands_01_4k.exr" />
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={34}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default GachaCanvas;
