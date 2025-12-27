import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

const AICore = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Animate Core
    if (sphereRef.current) {
        sphereRef.current.rotation.y = t * 0.1;
        // Pulse scale
        const scale = 2.2 + Math.sin(t * 2) * 0.1;
        sphereRef.current.scale.set(scale, scale, scale);
    }

    // Animate Rings
    if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.2;
        ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
        ring2Ref.current.rotation.x = t * 0.15 + Math.PI / 2;
        ring2Ref.current.rotation.y = t * 0.25;
    }
  });

  return (
    // @ts-ignore
    <group>
      {/* Inner Glowing Core */}
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#00f3ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
          emissive="#0044ff"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Outer Wireframe Shield */}
      <Sphere args={[1.2, 32, 32]} scale={2.5}>
         {/* @ts-ignore */}
         <meshStandardMaterial
            color="#bc13fe"
            wireframe
            transparent
            opacity={0.1}
         />
      </Sphere>

      {/* Rotating Rings */}
      <Torus ref={ring1Ref} args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        {/* @ts-ignore */}
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} emissive="#ffffff" emissiveIntensity={0.5} />
      </Torus>
      
      <Torus ref={ring2Ref} args={[4.2, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
        {/* @ts-ignore */}
        <meshStandardMaterial color="#00f3ff" transparent opacity={0.2} emissive="#00f3ff" emissiveIntensity={0.5} />
      </Torus>

      {/* Floating Particles/Stars near the core */}
       {/* @ts-ignore */}
       <points>
        {/* @ts-ignore */}
        <sphereGeometry args={[6, 32, 32]} />
        {/* @ts-ignore */}
        <pointsMaterial color="#bc13fe" size={0.03} transparent opacity={0.4} sizeAttenuation />
      {/* @ts-ignore */}
      </points>
    {/* @ts-ignore */}
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-[3]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        {/* @ts-ignore */}
        <ambientLight intensity={0.2} />
        {/* @ts-ignore */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        {/* @ts-ignore */}
        <pointLight position={[-10, -5, -5]} intensity={2} color="#bc13fe" />
        {/* @ts-ignore */}
        <pointLight position={[5, 5, 5]} intensity={1} color="#00f3ff" />
        
        <AICore />
        
        <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.8}
            minDistance={5}
            maxDistance={15}
            enableDamping
            dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;