'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Spark {
    edges: [number, number][];
    nodeIndices: number[];
    startTime: number;
    duration: number;
}

function LocalGraphs({ pointsRef }: { pointsRef: React.RefObject<THREE.Points | null> }) {
    const lineRef = useRef<THREE.LineSegments>(null);
    const sparkPointsRef = useRef<THREE.Points>(null);
    const sparks = useRef<Spark[]>([]);
    const count = 3000;

    useFrame((state) => {
        if (!lineRef.current || !sparkPointsRef.current || !pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        const livePositions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // 1. Cleanup old sparks
        sparks.current = sparks.current.filter(s => time < s.startTime + s.duration);

        // 2. Spawn new connected subgraphs (kNN-style local clustering)
        const targetDensity = 150;
        if (sparks.current.length < targetDensity) {
            // Spawn up to 5 subgraphs per frame for "constant" social network activity feel
            const burstCount = Math.floor(Math.random() * 5) + 1;
            for (let b = 0; b < burstCount; b++) {
                if (sparks.current.length >= targetDensity) break;

                const startNode = Math.floor(Math.random() * count);
                const targetSize = 10 + Math.floor(Math.random() * 6); // 10 to 15 nodes
                const connectedNodes: number[] = [startNode];
                const edges: [number, number][] = [];
                const maxRadius = 1.2; // Very tight for proximity focus (kNN feel)

                let searchIdx = 0;
                while (connectedNodes.length < targetSize && searchIdx < connectedNodes.length) {
                    const source = connectedNodes[searchIdx++];
                    const sourceX = livePositions[source * 3];
                    const sourceY = livePositions[source * 3 + 1];
                    const sourceZ = livePositions[source * 3 + 2];

                    for (let attempt = 0; attempt < 15 && connectedNodes.length < targetSize; attempt++) {
                        const target = Math.floor(Math.random() * count);
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
                        duration: 0.25 + Math.random() * 0.7, // Rapid pulse
                    });
                }
            }
        }

        // 3. Update Edge Geometry
        const linePositions = new Float32Array(sparks.current.length * 40 * 3); // Sufficient for 15-node subgraphs
        let lIdx = 0;
        sparks.current.forEach(spark => {
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

        // 4. Update Node Highlighting Geometry
        const nodePositions = new Float32Array(sparks.current.length * 15 * 3);
        let nIdx = 0;
        sparks.current.forEach(spark => {
            spark.nodeIndices.forEach(idx => {
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
                <lineBasicMaterial color="#E0F58F" transparent opacity={0.6} linewidth={2} />
            </lineSegments>
            <points ref={sparkPointsRef}>
                <bufferGeometry />
                <pointsMaterial size={0.12} color="#E0F58F" transparent opacity={0.8} sizeAttenuation />
            </points>
        </group>
    );
}

function ManifoldPoints() {
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Generate points for a simple surface (e.g., a wave or saddle)
    const points = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color1 = new THREE.Color('#748454'); // Olive
        const color2 = new THREE.Color('#F4F4E4'); // Cream

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            // A simple wave function: y = sin(x) + cos(z)
            const y = Math.sin(x / 2) + Math.cos(z / 2);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color gradient based on height
            const mixedColor = color1.clone().lerp(color2, (y + 2) / 4);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !groupRef.current) return;
        // Rotate the entire group so points and lines stay synced
        groupRef.current.rotation.y += 0.001;

        // Gentle undulating wave effect
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < 3000; i++) {
            const x = positions[i * 3];
            const z = positions[i * 3 + 2];
            // Initial Y plus a time-based wave
            const BaseY = Math.sin(x / 2) + Math.cos(z / 2);
            positions[i * 3 + 1] = BaseY + Math.sin(time * 0.5 + x) * 0.2;
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
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.6}
                    sizeAttenuation={true}
                />
            </points>
            <LocalGraphs pointsRef={pointsRef} />
        </group>
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
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
                <ManifoldPoints />
                <fog attach="fog" args={['#080808', 5, 20]} />
            </Canvas>
        </div>
    );
}
