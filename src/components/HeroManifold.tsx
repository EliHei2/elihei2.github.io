'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useSyncExternalStore } from 'react';
import * as THREE from 'three';

// A small graph on a sphere you can grab: drag to spin it, and the nodes scatter
// and spring back onto the sphere while edges re-fire. Blue nodes with a few gold.

const N = 900;

const BASE = new Float32Array(N * 3);
const COLORS = new Float32Array(N * 3);
const OFF = new Float32Array(N * 3); // per-node scatter direction
(() => {
    const blue = new THREE.Color('#3f86c6');
    const gold = new THREE.Color('#c99a3f');
    for (let i = 0; i < N; i++) {
        const t = i / N;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 2 + Math.sin(theta * 3 + phi * 2) * 0.1;
        BASE[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        BASE[i * 3 + 1] = r * Math.cos(phi);
        BASE[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        const c = i % 5 === 0 ? gold : blue;
        COLORS[i * 3] = c.r; COLORS[i * 3 + 1] = c.g; COLORS[i * 3 + 2] = c.b;
        // random scatter direction * magnitude
        const a = Math.random() * Math.PI * 2, z = Math.random() * 2 - 1, s = Math.sqrt(1 - z * z);
        const mag = 0.5 + Math.random() * 0.8;
        OFF[i * 3] = Math.cos(a) * s * mag;
        OFF[i * 3 + 1] = Math.sin(a) * s * mag;
        OFF[i * 3 + 2] = z * mag;
    }
})();

type Drag = { rotX: number; rotY: number; velX: number; velY: number; disturb: number; dragging: boolean; lastX: number; lastY: number };
interface Spark { edges: [number, number][]; start: number; duration: number; }

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

function Graph({ dragRef, reduced }: { dragRef: React.RefObject<Drag>; reduced: boolean }) {
    const group = useRef<THREE.Group>(null);
    const ptsRef = useRef<THREE.Points>(null);
    const lineRef = useRef<THREE.LineSegments>(null);
    const sparks = useRef<Spark[]>([]);
    const pos = useRef<Float32Array>(new Float32Array(BASE));

    useFrame((state) => {
        if (reduced) return;
        if (typeof document !== 'undefined' && document.hidden) return;
        const d = dragRef.current;
        if (!group.current || !ptsRef.current || !lineRef.current || !d) return;
        const t = state.clock.getElapsedTime();

        if (!d.dragging) {
            d.rotY += d.velY + 0.0035;   // fling momentum + gentle idle spin it settles back into
            d.velY *= 0.93;              // friction → it slows and stops
            d.rotX += d.velX;
            d.velX *= 0.9;
            d.rotX *= 0.96;              // ease the tilt back to level
        }
        d.rotX = Math.max(-1.1, Math.min(1.1, d.rotX));
        group.current.rotation.y = d.rotY;
        group.current.rotation.x = d.rotX;

        d.disturb *= 0.94; // spring back → reform

        const p = pos.current;
        for (let i = 0; i < N; i++) {
            const k = i * 3;
            const breathe = Math.sin(t * 0.6 + i * 0.7) * 0.012;
            p[k] = BASE[k] * (1 + breathe) + OFF[k] * d.disturb;
            p[k + 1] = BASE[k + 1] * (1 + breathe) + OFF[k + 1] * d.disturb;
            p[k + 2] = BASE[k + 2] * (1 + breathe) + OFF[k + 2] * d.disturb;
        }
        ptsRef.current.geometry.attributes.position.needsUpdate = true;

        sparks.current = sparks.current.filter((s) => t < s.start + s.duration);
        const rate = 0.12 + d.disturb * 0.6 + (d.dragging ? 0.3 : 0);
        if (sparks.current.length < 9 && Math.random() < rate) {
            const a = Math.floor(Math.random() * N);
            const edges: [number, number][] = [];
            const ax = p[a * 3], ay = p[a * 3 + 1], az = p[a * 3 + 2];
            for (let attempt = 0; attempt < 50 && edges.length < 6; attempt++) {
                const b = Math.floor(Math.random() * N);
                if (b === a) continue;
                const dx = ax - p[b * 3], dy = ay - p[b * 3 + 1], dz = az - p[b * 3 + 2];
                if (dx * dx + dy * dy + dz * dz < 1.1) edges.push([a, b]);
            }
            if (edges.length >= 2) sparks.current.push({ edges, start: t, duration: 1.1 + Math.random() * 1.4 });
        }

        const lp = new Float32Array(sparks.current.length * 12 * 3);
        let k = 0;
        sparks.current.forEach((s) => s.edges.forEach(([a, b]) => {
            lp[k++] = p[a * 3]; lp[k++] = p[a * 3 + 1]; lp[k++] = p[a * 3 + 2];
            lp[k++] = p[b * 3]; lp[k++] = p[b * 3 + 1]; lp[k++] = p[b * 3 + 2];
        }));
        lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(lp, 3));
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={group}>
            <points ref={ptsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={N} array={pos.current} itemSize={3} args={[pos.current, 3]} />
                    <bufferAttribute attach="attributes-color" count={N} array={COLORS} itemSize={3} args={[COLORS, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.055} vertexColors transparent opacity={0.82} sizeAttenuation />
            </points>
            <lineSegments ref={lineRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#296b9f" transparent opacity={0.5} />
            </lineSegments>
        </group>
    );
}

export default function HeroManifold() {
    const reduced = useReducedMotion();
    const drag = useRef<Drag>({ rotX: 0, rotY: 0, velX: 0, velY: 0, disturb: 0, dragging: false, lastX: 0, lastY: 0 });

    const onDown = (e: React.PointerEvent) => {
        if (reduced) return;
        drag.current.dragging = true;
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d.dragging) return;
        const dx = e.clientX - d.lastX, dy = e.clientY - d.lastY;
        d.rotY += dx * 0.009;
        d.rotX += dy * 0.009;
        d.velY = dx * 0.012;   // fling velocity → fast drags roll faster, either direction
        d.velX = dy * 0.010;
        d.disturb = Math.min(1, d.disturb + (Math.abs(dx) + Math.abs(dy)) * 0.006);
        d.lastX = e.clientX;
        d.lastY = e.clientY;
    };
    const onUp = () => { drag.current.dragging = false; };

    return (
        <div
            role="img"
            aria-label="an interactive graph on a sphere — drag to spin it"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                cursor: reduced ? 'default' : 'grab', touchAction: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
                frameloop={reduced ? 'demand' : 'always'}
            >
                <Graph dragRef={drag} reduced={reduced} />
            </Canvas>
        </div>
    );
}
