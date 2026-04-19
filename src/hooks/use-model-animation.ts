import * as THREE from 'three';
import { RefObject, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BUNNY_OSCILLATION, INITIAL_POSITION, prizes } from '../lib/constants';

export function useGachaAnimation(
  activeBox: string,
  usedBoxes: string[],
  isError: boolean,
  scene: THREE.Group<THREE.Object3DEventMap>,
  ref: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) {
  const shakeStart = useRef<number | null>(null);
  const SHAKE_DURATION = 0.5;

  useFrame(({ pointer, clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = pointer.x * 0.01;
    ref.current.rotation.x = -pointer.y * 0.01;

    if (isError) shakeStart.current = clock.elapsedTime;
    if (shakeStart.current !== null) {
      const elapsedTime = clock.elapsedTime - shakeStart.current;
      if (elapsedTime < SHAKE_DURATION) {
        const intensity = 0.1 * (1 - elapsedTime / SHAKE_DURATION);
        ref.current.position.x = INITIAL_POSITION.X + Math.sin(clock.elapsedTime * 40) * intensity;
      } else {
        ref.current.position.x = INITIAL_POSITION.X;
        shakeStart.current = null;
      }
    }
  });

  useEffect(() => {
    const gameOver = usedBoxes.length >= prizes.length;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        for (let i = 0; i < prizes.length; i++) {
          if (child.name === prizes[i].boxId) {
            if (activeBox === child.name) {
              child.material.emissive = new THREE.Color('#ffffff');
              child.material.emissiveIntensity = 0.18;
            } else if (usedBoxes.includes(child.name) || gameOver) {
              child.material.emissive = new THREE.Color('#c9e880');
              child.material.emissiveIntensity = 0.18;
            } else {
              child.material.emissive = new THREE.Color('#000000');
              child.material.emissiveIntensity = 0;
            }

            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, activeBox, usedBoxes]);
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
