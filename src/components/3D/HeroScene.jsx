import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Globe() {
  const groupRef = useRef();

  // Auto-rotate the globe slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  // High-performance wireframe for mobile
  const sphereGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(2.5, 20, 14);
    return new THREE.EdgesGeometry(geo);
  }, []);

  // Golden particles
  const particlesGeo = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + Math.random() * 0.4;
      pos[i] = r * Math.sin(phi) * Math.cos(theta);
      pos[i+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i+2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geom;
  }, []);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={sphereGeo} >
        <lineBasicMaterial color="#C26A4B" transparent opacity={0.6} />
      </lineSegments>
      <points geometry={particlesGeo} >
        <pointsMaterial color="#E4B47C" size={0.08} transparent />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1, 5.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Globe />
      </Canvas>
    </div>
  );
}
