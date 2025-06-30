import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating 3D element component
function FloatingElement({ position, color, shape, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {shape === 'sphere' && (
        <Sphere ref={meshRef} position={position} radius={0.5}>
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </Sphere>
      )}
      {shape === 'box' && (
        <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </Box>
      )}
      {shape === 'octahedron' && (
        <Octahedron ref={meshRef} position={position} radius={0.5}>
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </Octahedron>
      )}
    </Float>
  );
}

// Animated background particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.5 + 0.5
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Main 3D background component
const FloatingElements3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
        
        {/* Background particles */}
        <BackgroundParticles />
        
        {/* Floating elements */}
        <FloatingElement position={[-3, 2, 0]} color="#059669" shape="sphere" speed={1.2} />
        <FloatingElement position={[3, -1, -2]} color="#0d9488" shape="box" speed={0.8} />
        <FloatingElement position={[0, 3, -1]} color="#10b981" shape="octahedron" speed={1.5} />
        <FloatingElement position={[-2, -2, 1]} color="#34d399" shape="sphere" speed={0.9} />
        <FloatingElement position={[4, 1, -3]} color="#6ee7b7" shape="box" speed={1.1} />
        
        {/* Performance optimizations */}
        <fog attach="fog" args={['#059669', 5, 15]} />
      </Canvas>
    </div>
  );
};

export default FloatingElements3D;