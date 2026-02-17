'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function BiologicalSystem() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate multi-scale particles
    const particles = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const color1 = new THREE.Color('#748454'); // Olive
        const color2 = new THREE.Color('#F4F4E4'); // Cream
        const color3 = new THREE.Color('#4a5d23'); // Darker Olive

        for (let i = 0; i < count; i++) {
            // Distribution: spread out wide but concentrated in a "stream"
            const x = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 6;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Assign scale/type based on index
            // 0-10%: Macro structures (large, rare)
            // 10-60%: Functional units (medium, common)
            // 60-100%: Background medium (small, dense)
            const type = Math.random();
            let size, baseColor;

            if (type < 0.1) {
                size = Math.random() * 0.15 + 0.1; // Large
                baseColor = color2;
            } else if (type < 0.6) {
                size = Math.random() * 0.05 + 0.02; // Medium
                baseColor = color1;
            } else {
                size = Math.random() * 0.02 + 0.005; // Small
                baseColor = color3;
            }

            sizes[i] = size;

            // Add slight variation to color
            const c = baseColor.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Organic movement
        pointsRef.current.rotation.y = time * 0.02; // Slow global rotation

        for (let i = 0; i < 4000; i++) {
            const x = positions[i * 3];
            const z = positions[i * 3 + 2];

            // Create a "breathing" or "pulsing" motion based on position
            // Combining sine waves of different frequencies
            const yNoise = Math.sin(x * 0.5 + time * 0.3) * Math.cos(z * 0.3 + time * 0.2);
            const flow = Math.sin(time * 0.1 + x * 0.2) * 0.5;

            // We only modify Y slightly to keep the cloud shape but give it life
            // To do this properly without resetting to original Y, we add small delta? 
            // Actually, for a visual effect, recalculating a "flow" field is better.
            // We'll treat the initial random Y as a base and oscillate around it.
            // But we lost initial Y. Let's just create a nice wave field.

            // Complex organic wave surface
            positions[i * 3 + 1] =
                Math.sin(x * 0.3 + time * 0.2) * 2 +
                Math.cos(z * 0.2 + time * 0.1) * 2 +
                Math.sin(x * 0.5 + z * 0.5 + time * 0.5) * 0.5;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                    args={[particles.colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particles.sizes.length}
                    array={particles.sizes}
                    itemSize={1}
                    args={[particles.sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ManifoldBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, #050505 0%, #0a0a0a 100%)' // Even deeper black
        }}>
            <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
                <BiologicalSystem />
                <fog attach="fog" args={['#050505', 5, 25]} />
            </Canvas>
        </div>
    );
}
