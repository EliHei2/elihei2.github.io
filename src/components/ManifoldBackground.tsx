'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Spark {
    edges: [number, number][];
    startTime: number;
    duration: number;
}

function LocalGraphs({ pointsArr }: { pointsArr: Float32Array }) {
    const lineRef = useRef<THREE.LineSegments>(null);
    const sparks = useRef<Spark[]>([]);
    const count = 3000;

    useFrame((state) => {
        if (!lineRef.current) return;
        const time = state.clock.getElapsedTime();

        // 1. Cleanup old sparks
        sparks.current = sparks.current.filter(s => time < s.startTime + s.duration);

        // 2. Spawn new connected subgraph
        if (sparks.current.length < 4 && Math.random() < 0.03) {
            const startNode = Math.floor(Math.random() * count);
            const targetSize = 4 + Math.floor(Math.random() * 7); // 4 to 10 nodes
            const connectedNodes: number[] = [startNode];
            const edges: [number, number][] = [];
            const maxRadius = 2.5;

            // Simple BFS-style crawl to find neighbors
            let searchIdx = 0;
            while (connectedNodes.length < targetSize && searchIdx < connectedNodes.length) {
                const source = connectedNodes[searchIdx++];
                const sourceX = pointsArr[source * 3];
                const sourceY = pointsArr[source * 3 + 1];
                const sourceZ = pointsArr[source * 3 + 2];

                // Find a few random close neighbors
                for (let attempt = 0; attempt < 15 && connectedNodes.length < targetSize; attempt++) {
                    const target = Math.floor(Math.random() * count);
                    if (connectedNodes.includes(target)) continue;

                    const dx = sourceX - pointsArr[target * 3];
                    const dy = sourceY - pointsArr[target * 3 + 1];
                    const dz = sourceZ - pointsArr[target * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < maxRadius * maxRadius) {
                        connectedNodes.push(target);
                        edges.push([source, target]);
                    }
                }
            }

            if (connectedNodes.length >= 4) {
                sparks.current.push({
                    edges,
                    startTime: time,
                    duration: 2 + Math.random() * 4,
                });
            }
        }

        // 3. Update Geometry
        const linePositions = new Float32Array(sparks.current.length * 20 * 3); // Over-allocate
        let idx = 0;
        sparks.current.forEach(spark => {
            const age = time - spark.startTime;
            const life = age / spark.duration;
            const opacity = Math.sin(life * Math.PI); // Not used directly on attribute, but logic helper

            spark.edges.forEach(([a, b]) => {
                linePositions[idx++] = pointsArr[a * 3];
                linePositions[idx++] = pointsArr[a * 3 + 1];
                linePositions[idx++] = pointsArr[a * 3 + 2];

                linePositions[idx++] = pointsArr[b * 3];
                linePositions[idx++] = pointsArr[b * 3 + 1];
                linePositions[idx++] = pointsArr[b * 3 + 2];
            });
        });

        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry />
            <lineBasicMaterial color="#E0F58F" transparent opacity={0.25} linewidth={1} />
        </lineSegments>
    );
}

function ManifoldPoints() {
    const pointsRef = useRef<THREE.Points>(null);

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
        if (!pointsRef.current) return;
        // Slowly rotate the entire manifold
        pointsRef.current.rotation.y += 0.001;

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
        <group>
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
            <LocalGraphs pointsArr={points.positions} />
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
