// const Model = ({ onButtonPress }: { onButtonPress: () => void }) => {
//   const { scene } = useGLTF('/gachapon.glb');
//   const groupRef = useRef<THREE.Group>(null);

//   // Animation state
//   const anim = useRef({
//     active: false,
//     t: 0
//   });

//   useFrame((_, delta) => {
//     if (!groupRef.current) return;

//     // Idle float
//     if (!anim.current.active) {
//       groupRef.current.position.y = Math.sin(Date.now() * 0.001 * 0.8) * 0.05;
//       return;
//     }

//     // Dispense animation: shake + bounce
//     anim.current.t += delta * 3;
//     const t = anim.current.t;

//     if (t < Math.PI * 2) {
//       // Shake horizontally
//       groupRef.current.position.x = Math.sin(t * 6) * 0.06 * Math.max(0, 1 - t / (Math.PI * 2));
//       // Bounce down then up
//       groupRef.current.position.y = -0.5 + Math.abs(Math.sin(t * 2)) * 0.15 * Math.max(0, 1 - t / (Math.PI * 2));
//       // Slight tilt
//       groupRef.current.rotation.z = Math.sin(t * 5) * 0.04 * Math.max(0, 1 - t / (Math.PI * 2));
//     } else {
//       // Reset
//       groupRef.current.position.set(0, 0, 0);
//       groupRef.current.rotation.z = 0;
//       anim.current.active = false;
//       anim.current.t = 0;
//     }
//   });

//   const handleClick = (e: any) => {
//     e.stopPropagation();
//     const clickedName = e.object?.name;

//     if (clickedName === 'Cube011') {
//       console.log('🎰 Cube.011 presionado — dispensando gachapon...');
//       console.log('🕐 Timestamp:', new Date().toISOString());
//       console.log('📦 Objeto clickeado:', e.object);

//       // Trigger animation
//       if (!anim.current.active) {
//         anim.current.active = true;
//         anim.current.t = 0;
//         onButtonPress();
//       }
//     }
//   };

//   return (
//     <primitive
//       ref={groupRef}
//       object={scene}
//       scale={1}
//       position={[0, 0, 0]}
//       onClick={handleClick}
//       onPointerOver={(e: any) => {
//         e.stopPropagation();
//         if (e.object?.name === 'Cube.011') {
//           document.body.style.cursor = 'pointer';
//         }
//       }}
//       onPointerOut={() => {
//         document.body.style.cursor = 'auto';
//       }}
//     />
//   );
// };

// export default Model;
