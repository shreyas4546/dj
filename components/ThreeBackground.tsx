import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);
  
  const sphere = useMemo(() => {
    const particles = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 20; // Radius between 10 and 30
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      particles[i * 3] = x;
      particles[i * 3 + 1] = y;
      particles[i * 3 + 2] = z;
    }
    return particles;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const group = useMemo(() => new THREE.Group(), []);

  return (
    // @ts-ignore
    <primitive object={group} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#bc13fe"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    {/* @ts-ignore */}
    </primitive>
  );
}

const ThreeBackground: React.FC = () => {
  const fog = useMemo(() => new THREE.Fog('#030014', 10, 35), []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        {/* @ts-ignore */}
        <primitive object={fog} attach="fog" />
        <StarField />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;