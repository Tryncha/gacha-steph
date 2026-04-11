import * as THREE from 'three';
import { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';

export function useGachaEvents(
  scene: THREE.Group<THREE.Object3DEventMap>,
  ref: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) {
  // const [glowing, setGlowing] = useState(false);

  // useEffect(() => {
  //   scene.traverse((child) => {
  //     if (child instanceof THREE.Mesh && child.name === 'Cube011') {
  //       if (glowing) {
  //         child.material.emissive = new THREE.Color('#ff6eb4'); // color del brillo
  //         child.material.emissiveIntensity = 1.5; // intensidad
  //       } else {
  //         child.material.emissive = new THREE.Color('#000000'); // apagado
  //         child.material.emissiveIntensity = 0;
  //       }
  //       child.material.needsUpdate = true;
  //     }
  //   });
  // }, [scene, glowing]);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y = mouse.x * 0.01;
    ref.current.rotation.x = -mouse.y * 0.01;
  });
}
