// src/components/SimulationCanvas.jsx
import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import styles from '../styles/SimulationCanvas.module.css';
import LightRays from './LightRays';

// --- Thrown Object Component ---
function ThrownObject({ id, startTime }) {
  const meshRef = useRef();
  const speed = 8;
  const blackHoleDisappearRadius = 1.5;

  // Define texture paths (Update these filenames if yours are different!)
  const textureUrls = useMemo(() => ({
      fridge: '/textures/fridge_albedo.jpg', // Using the rusty metal texture
      sofa: '/textures/sofa_albedo.jpg',    // Use the sofa texture name
      chair: '/textures/chair_wood.jpg', // Use the chair texture name
      chess: '/textures/chessboard.jpg', // Use the chessboard texture name
      default: '/textures/default_placeholder.png' // Optional default
  }), []);

  const textureUrl = textureUrls[id] || textureUrls.default;

  // Ensure the image file exists at the specified path in your /public/textures/ folder
  const texture = useTexture(textureUrl);
  // Prevent texture blurring at glancing angles (optional, but often looks better)
  texture.anisotropy = 16;


  const geometry = useMemo(() => {
    switch (id) {
      case 'fridge': return new THREE.BoxGeometry(1.5, 2.5, 1.5);
      case 'sofa': return new THREE.BoxGeometry(3.0, 1.5, 1.5);
      case 'chair': return new THREE.BoxGeometry(1.0, 2.0, 1.0);
      case 'chess': return new THREE.BoxGeometry(1.5, 0.25, 1.5);
      default: return new THREE.SphereGeometry(1.0, 16, 16);
    }
  }, [id]);

  // *** THIS WAS THE MISSING BLOCK ***
  const initialPosition = useMemo(() => {
      const r = 25; // Start a bit further out to see them coming
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloatSpread(2 * Math.PI);
      return [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
      ];
  // Ensure dependency array is present for useMemo
  }, []); // No dependencies needed here as r, Math functions are stable


   // Get the base color (less important now texture dominates, but used for emissive)
  const baseColor = useMemo(() => {
      switch(id) {
          case 'fridge': return '#B87333'; // A rusty brownish color
          case 'sofa': return '#8B4513';
          case 'chair': return '#A0522D';
          case 'chess': return '#888888'; // Greyish base
          default: return '#CCCCCC';
      }
  }, [id]);

  useFrame((state, delta) => {
    if (meshRef.current && meshRef.current.visible) {
      const pos = meshRef.current.position;
      const distSq = pos.lengthSq();

      if (distSq > blackHoleDisappearRadius * blackHoleDisappearRadius) {
         const direction = pos.clone().normalize().multiplyScalar(-1);
         const wobble = new THREE.Vector3(
             Math.sin(state.clock.elapsedTime * 2 + startTime) * 0.1,
             Math.cos(state.clock.elapsedTime * 1.5 + startTime) * 0.1,
             Math.sin(state.clock.elapsedTime * 2.5 + startTime) * 0.1
         );
         direction.add(wobble).normalize();

         pos.add(direction.multiplyScalar(speed * delta));
         meshRef.current.rotation.x += delta * 1.5;
         meshRef.current.rotation.y += delta * 1.0;
         meshRef.current.rotation.z += delta * 0.8;
      } else {
         meshRef.current.visible = false;
      }
    }
  });

   if (!startTime) return null;

  return (
    // Using initialPosition here - this was where the error occurred
    <mesh ref={meshRef} position={initialPosition} visible={true}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
          map={texture}
          color={'#ffffff'} // Set to white to show texture's true colors
          roughness={0.8} // Adjust roughness - higher for matte, lower for shiny
          metalness={id === 'fridge' ? 0.3 : 0.1} // Make fridge slightly more metallic maybe?
          emissive={baseColor}
          emissiveIntensity={0.05} // Lowered intensity further
          attach="material"
        />
    </mesh>
  );
}


// --- Scene Component (No changes needed here from previous version) ---
function Scene({ thrownObjects }) {
  const diskRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <hemisphereLight skyColor="#87CEEB" groundColor="#444444" intensity={0.5} />
      <pointLight position={[10, 15, 10]} intensity={0.8} color="#ffffff" castShadow />


      {/* Black Hole Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="black" side={THREE.DoubleSide}/>
      </mesh>

      {/* Accretion Disk */}
      <mesh ref={diskRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
           color="#FFA500"
           emissive="#FF8C00"
           emissiveIntensity={2}
           roughness={0.8}
           metalness={0.2}
         />
      </mesh>

      {/* Light Rays */}
      <LightRays />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Render active thrown objects */}
      {thrownObjects.map(obj => (
        <ThrownObject key={obj.key} id={obj.id} startTime={obj.time / 1000} />
      ))}
    </>
  );
}

// --- SimulationCanvas Component (No changes needed here from previous version) ---
function SimulationCanvas({ thrownItem }) {
  const [activeObjects, setActiveObjects] = useState([]);

  useEffect(() => {
    if (thrownItem) {
      const newObject = { ...thrownItem, key: `${thrownItem.id}-${thrownItem.time}` };
      setActiveObjects(prev => [...prev, newObject]);

      const timeoutId = setTimeout(() => {
          setActiveObjects(prev => prev.filter(obj => obj.key !== newObject.key));
      }, 15000);

      return () => clearTimeout(timeoutId);
    }
  }, [thrownItem]);

  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <Suspense fallback={null}> {/* Suspense is needed for useTexture */}
          <Scene thrownObjects={activeObjects} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default SimulationCanvas;