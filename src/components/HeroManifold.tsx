'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useSyncExternalStore } from 'react';
import * as THREE from 'three';

// A slowly rotating point-sphere with a live graph: edges light up between nearby
// nodes and fade, like message passing over a manifold. Blue nodes with a few gold,
// blue edges. Transparent canvas so it sits in the rail.

const N = 900;

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

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(N * 3);
        const colors = new Float32Array(N * 3);
        const blue = new THREE.Color('#3f86c6');
        const gold = new THREE.Color('#c99a3f');
        for (let i = 0; i < N; i++) {
            const t = i / N;
            const phi = Math.acos(1 - 2 * t);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 2 + Math.sin(theta * 3 + phi * 2) * 0.1;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.cos(phi);
            positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            const c = (i % 5 === 0) ? gold : blue;
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (typeof document !== 'undefined' && document.hidden) return;
        if (!group.current || !lineRef.current) return;
        if (reducedMotion) return;

        group.current.rotation.y += 0.0022;
        group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.12;

        const time = state.clock.getElapsedTime();
        sparks.current = sparks.current.filter((s) => time < s.start + s.duration);
        if (sparks.current.length < 6 && Math.random() < 0.16) {
            const a = Math.floor(Math.random() * N);
            const edges: [number, number][] = [];
            const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
            for (let attempt = 0; attempt < 50 && edges.length < 6; attempt++) {
                const b = Math.floor(Math.random() * N);
                if (b === a) continue;
                const dx = ax - positions[b * 3], dy = ay - positions[b * 3 + 1], dz = az - positions[b * 3 + 2];
                if (dx * dx + dy * dy + dz * dz < 0.95) edges.push([a, b]);
            }
            if (edges.length >= 2) sparks.current.push({ edges, start: time, duration: 1.1 + Math.random() * 1.5 });
        }

        const pos = new Float32Array(sparks.current.length * 12 * 3);
        let k = 0;
        sparks.current.forEach((s) => s.edges.forEach(([a, b]) => {
            pos[k++] = positions[a * 3]; pos[k++] = positions[a * 3 + 1]; pos[k++] = positions[a * 3 + 2];
            pos[k++] = positions[b * 3]; pos[k++] = positions[b * 3 + 1]; pos[k++] = positions[b * 3 + 2];
        }));
        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={group}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" count={N} array={colors} itemSize={3} args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.055} vertexColors transparent opacity={0.8} sizeAttenuation />
            </points>
            <lineSegments ref={lineRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#296b9f" transparent opacity={0.5} />
            </lineSegments>
        </group>
    );
}

export default function HeroManifold() {
    const reducedMotion = useReducedMotion();
    return (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
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
