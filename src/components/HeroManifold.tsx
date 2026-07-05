'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useSyncExternalStore } from 'react';
import * as THREE from 'three';

const N = 900;

// A small rotating graph-manifold: points on a gently perturbed sphere, with a few
// live edges lighting up between neighbours. Transparent canvas so it sits over the page.
const DATA = (() => {
    const positions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
        // Fibonacci sphere for even coverage
        const t = i / N;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 2 + Math.sin(theta * 3 + phi * 2) * 0.12;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi);
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
})();

function useReducedMotion(): boolean {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            mq.addEventListener('change', cb);
            return () => mq.removeEventListener('change', cb);
        },
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        () => false,
    );
}

interface Spark { edges: [number, number][]; start: number; duration: number; }

function Graph({ reducedMotion }: { reducedMotion: boolean }) {
    const group = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.LineSegments>(null);
    const sparks = useRef<Spark[]>([]);

    useFrame((state) => {
        if (typeof document !== 'undefined' && document.hidden) return;
        if (!group.current || !lineRef.current) return;
        if (reducedMotion) return;

        group.current.rotation.y += 0.0022;
        group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.12;

        const time = state.clock.getElapsedTime();
        sparks.current = sparks.current.filter((s) => time < s.start + s.duration);
        if (sparks.current.length < 5 && Math.random() < 0.14) {
            const a = Math.floor(Math.random() * N);
            const edges: [number, number][] = [];
            const ax = DATA[a * 3], ay = DATA[a * 3 + 1], az = DATA[a * 3 + 2];
            for (let attempt = 0; attempt < 40 && edges.length < 5; attempt++) {
                const b = Math.floor(Math.random() * N);
                if (b === a) continue;
                const dx = ax - DATA[b * 3], dy = ay - DATA[b * 3 + 1], dz = az - DATA[b * 3 + 2];
                if (dx * dx + dy * dy + dz * dz < 0.9) edges.push([a, b]);
            }
            if (edges.length >= 2) sparks.current.push({ edges, start: time, duration: 1.1 + Math.random() * 1.4 });
        }

        const pos = new Float32Array(sparks.current.length * 12 * 3);
        let k = 0;
        sparks.current.forEach((s) => s.edges.forEach(([a, b]) => {
            pos[k++] = DATA[a * 3]; pos[k++] = DATA[a * 3 + 1]; pos[k++] = DATA[a * 3 + 2];
            pos[k++] = DATA[b * 3]; pos[k++] = DATA[b * 3 + 1]; pos[k++] = DATA[b * 3 + 2];
        }));
        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={group}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={N} array={DATA} itemSize={3} args={[DATA, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#3f7fb0" transparent opacity={0.75} sizeAttenuation />
            </points>
            <lineSegments ref={lineRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#0071e3" transparent opacity={0.55} />
            </lineSegments>
        </group>
    );
}

export default function HeroManifold() {
    const reducedMotion = useReducedMotion();
    return (
        <div aria-hidden="true" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
                frameloop={reducedMotion ? 'demand' : 'always'}
            >
                <Graph reducedMotion={reducedMotion} />
            </Canvas>
        </div>
    );
}
