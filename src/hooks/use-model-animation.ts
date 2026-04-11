import * as THREE from 'three';
import { RefObject, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { BIG_BOX_ID, BUNNY_OSCILLATION, PRIZES_DATA } from '../lib/constants';

export function useGachaAnimation(
  activeBoxes: string[],
  scene: THREE.Group<THREE.Object3DEventMap>,
  ref: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) {
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = pointer.x * 0.01;
    ref.current.rotation.x = -pointer.y * 0.01;
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        for (let i = 0; i < PRIZES_DATA.length; i++) {
          if (child.name === PRIZES_DATA[i].BOX_ID) {
            if (activeBoxes.includes(child.name)) {
              child.material.emissive = new THREE.Color('#ffffff');
              child.material.emissiveIntensity = 0.18;
            } else {
              child.material.emissive = new THREE.Color('#000000');
              child.material.emissiveIntensity = 0;
            }
            child.material.needsUpdate = true;
          }
        }
        if (child.name === BIG_BOX_ID) {
          if (activeBoxes.includes(child.name)) {
            child.material.emissive = new THREE.Color('#ffffff');
            child.material.emissiveIntensity = 0.18;
          } else {
            child.material.emissive = new THREE.Color('#000000');
            child.material.emissiveIntensity = 0;
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, activeBoxes]);
}

export function useBunnyAnimation(bunnyRef: RefObject<THREE.Group<THREE.Object3DEventMap> | null>) {
  useFrame(({ clock }) => {
    if (!bunnyRef.current) return;
    bunnyRef.current.rotation.x =
      Math.sin(clock.elapsedTime * BUNNY_OSCILLATION.X.SPEED) * BUNNY_OSCILLATION.X.INTENSITY;
    bunnyRef.current.rotation.y =
      Math.sin(clock.elapsedTime * BUNNY_OSCILLATION.Y.SPEED) * BUNNY_OSCILLATION.Y.INTENSITY;
    bunnyRef.current.rotation.z =
      Math.sin(clock.elapsedTime * BUNNY_OSCILLATION.Z.SPEED) * BUNNY_OSCILLATION.Z.INTENSITY;
  });
}
