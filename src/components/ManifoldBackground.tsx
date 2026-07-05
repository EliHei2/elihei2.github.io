'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useSyncExternalStore } from 'react';
import * as THREE from 'three';

interface Spark {
    edges: [number, number][];
    nodeIndices: number[];
    startTime: number;
    duration: number;
}

const COUNT = 3000;

// Decorative scatter — generated once at module load (pure from React's view).
const MANIFOLD = (() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    // Pale-mid blue so the surface itself reads as a graph, not near-white noise.
    const color1 = new THREE.Color('#6ea8d4');
    const color2 = new THREE.Color('#93c1e2');

    for (let i = 0; i < COUNT; i++) {
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        const y = Math.sin(x / 2) + Math.cos(z / 2);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixedColor = color1.clone().lerp(color2, (y + 2) / 4);
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
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

function LocalGraphs({ pointsRef }: { pointsRef: React.RefObject<THREE.Points | null> }) {
    const lineRef = useRef<THREE.LineSegments>(null);
    const sparkPointsRef = useRef<THREE.Points>(null);
    const sparks = useRef<Spark[]>([]);

    useFrame((state) => {
        if (typeof document !== 'undefined' && document.hidden) return;
        if (!lineRef.current || !sparkPointsRef.current || !pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        const livePositions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Cleanup expired sparks
        sparks.current = sparks.current.filter((s) => time < s.startTime + s.duration);

        // Spawn new connected subgraphs — kept sparse and slow (honest atmosphere)
        const targetDensity = 3;
        if (sparks.current.length < targetDensity && Math.random() < 0.05) {
            const startNode = Math.floor(Math.random() * COUNT);
            const targetSize = 10 + Math.floor(Math.random() * 6);
            const connectedNodes: number[] = [startNode];
            const edges: [number, number][] = [];
            const maxRadius = 1.8;

            let searchIdx = 0;
            while (connectedNodes.length < targetSize && searchIdx < connectedNodes.length) {
                const source = connectedNodes[searchIdx++];
                const sourceX = livePositions[source * 3];
                const sourceY = livePositions[source * 3 + 1];
                const sourceZ = livePositions[source * 3 + 2];

                for (let attempt = 0; attempt < 50 && connectedNodes.length < targetSize; attempt++) {
                    const target = Math.floor(Math.random() * COUNT);
                    if (connectedNodes.includes(target)) continue;

                    const dx = sourceX - livePositions[target * 3];
                    const dy = sourceY - livePositions[target * 3 + 1];
                    const dz = sourceZ - livePositions[target * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < maxRadius * maxRadius) {
                        connectedNodes.push(target);
                        edges.push([source, target]);
                    }
                }
            }

            if (connectedNodes.length >= 8) {
                sparks.current.push({
                    edges,
                    nodeIndices: connectedNodes,
                    startTime: time,
                    duration: 0.8 + Math.random() * 1.7,
                });
            }
        }

        // Edge geometry
        const linePositions = new Float32Array(sparks.current.length * 40 * 3);
        let lIdx = 0;
        sparks.current.forEach((spark) => {
            spark.edges.forEach(([a, b]) => {
                linePositions[lIdx++] = livePositions[a * 3];
                linePositions[lIdx++] = livePositions[a * 3 + 1];
                linePositions[lIdx++] = livePositions[a * 3 + 2];
                linePositions[lIdx++] = livePositions[b * 3];
                linePositions[lIdx++] = livePositions[b * 3 + 1];
                linePositions[lIdx++] = livePositions[b * 3 + 2];
            });
        });
        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineRef.current.geometry.attributes.position.needsUpdate = true;

        // Node highlight geometry
        const nodePositions = new Float32Array(sparks.current.length * 15 * 3);
        let nIdx = 0;
        sparks.current.forEach((spark) => {
            spark.nodeIndices.forEach((idx) => {
                nodePositions[nIdx++] = livePositions[idx * 3];
                nodePositions[nIdx++] = livePositions[idx * 3 + 1];
                nodePositions[nIdx++] = livePositions[idx * 3 + 2];
            });
        });
        sparkPointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        sparkPointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            <lineSegments ref={lineRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#296b9f" transparent opacity={0.32} />
            </lineSegments>
            <points ref={sparkPointsRef}>
                <bufferGeometry />
                <pointsMaterial size={0.14} color="#296b9f" transparent opacity={0.42} sizeAttenuation />
            </points>
        </group>
    );
}

function ManifoldPoints({ reducedMotion }: { reducedMotion: boolean }) {
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);
    const points = MANIFOLD;

    useFrame((state) => {
        if (reducedMotion) return;
        if (typeof document !== 'undefined' && document.hidden) return;
        if (!pointsRef.current || !groupRef.current) return;

        groupRef.current.rotation.y += 0.0006;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
            const x = positions[i * 3];
            const z = positions[i * 3 + 2];
            const baseY = Math.sin(x / 2) + Math.cos(z / 2);
            positions[i * 3 + 1] = baseY + Math.sin(time * 0.5 + x) * 0.2;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.positions.length / 3}
                        array={points.positions}
                        itemSize={3}
                        args={[points.positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={points.colors.length / 3}
                        array={points.colors}
                        itemSize={3}
                        args={[points.colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.13} vertexColors transparent opacity={0.5} sizeAttenuation />
            </points>
            {!reducedMotion && <LocalGraphs pointsRef={pointsRef} />}
        </group>
    );
}

export default function ManifoldBackground() {
    const reducedMotion = useReducedMotion();

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, #ffffff 0%, #eef5fc 100%)',
            }}
        >
            <Canvas
                camera={{ position: [0, 5, 10], fov: 45 }}
                dpr={[1, 1.5]}
                frameloop={reducedMotion ? 'demand' : 'always'}
            >
                <ManifoldPoints reducedMotion={reducedMotion} />
                <fog attach="fog" args={['#eef5fc', 16, 40]} />
            </Canvas>
        </div>
    );
}
