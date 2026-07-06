'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useSyncExternalStore } from 'react';
import * as THREE from 'three';

// A small graph on a sphere you can play with. Grab a spot and that region follows
// your cursor and stretches out (elastic, Gaussian falloff), then springs back when
// you let go. A quick flick spins the whole thing, with momentum easing back to a
// gentle idle turn. Blue nodes, a few gold.

const N = 900;
const BASE = new Float32Array(N * 3);
const COLORS = new Float32Array(N * 3);
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
    }
})();

type Drag = {
    rotX: number; rotY: number; velX: number; velY: number;
    dragging: boolean; lastX: number; lastY: number;
    grab: number; justDown: boolean; ndcX: number; ndcY: number;
};
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
    const disp = useRef<Float32Array>(new Float32Array(N * 3));
    const vel = useRef<Float32Array>(new Float32Array(N * 3));
    const pinned = useRef<Uint8Array>(new Uint8Array(N));
    const tmp = useRef({ v: new THREE.Vector3(), v2: new THREE.Vector3(), target: new THREE.Vector3() });

    useFrame((state) => {
        if (reduced) return;
        if (typeof document !== 'undefined' && document.hidden) return;
        const d = dragRef.current;
        if (!group.current || !ptsRef.current || !lineRef.current || !d) return;
        const t = state.clock.getElapsedTime();
        const cam = state.camera;

        // rotation: frozen while dragging; otherwise fling momentum + friction + gentle idle spin
        if (!d.dragging) {
            d.rotY += d.velY + 0.0035; d.velY *= 0.93;
            d.rotX += d.velX; d.velX *= 0.9; d.rotX *= 0.96;
        }
        d.rotX = Math.max(-1.1, Math.min(1.1, d.rotX));
        group.current.rotation.set(d.rotX, d.rotY, 0);
        group.current.updateMatrixWorld();

        // pick the grabbed node on press
        if (d.justDown) {
            let best = -1, bestD = Infinity;
            for (let i = 0; i < N; i++) {
                tmp.current.v.set(BASE[i * 3], BASE[i * 3 + 1], BASE[i * 3 + 2]).applyMatrix4(group.current.matrixWorld).project(cam);
                if (tmp.current.v.z > 1) continue;
                const dd = (tmp.current.v.x - d.ndcX) ** 2 + (tmp.current.v.y - d.ndcY) ** 2;
                if (dd < bestD) { bestD = dd; best = i; }
            }
            d.grab = best;
            d.justDown = false;
        }

        pinned.current.fill(0);

        // grabbed region follows the cursor (elastic pull, Gaussian falloff)
        if (d.dragging && d.grab >= 0) {
            const g = d.grab;
            const gWorld = tmp.current.v.set(BASE[g * 3], BASE[g * 3 + 1], BASE[g * 3 + 2]).applyMatrix4(group.current.matrixWorld);
            const depth = tmp.current.v2.copy(gWorld).project(cam).z;
            const target = tmp.current.target.set(d.ndcX, d.ndcY, depth).unproject(cam);
            group.current.worldToLocal(target);
            const ox = target.x - BASE[g * 3], oy = target.y - BASE[g * 3 + 1], oz = target.z - BASE[g * 3 + 2];
            const sig2 = 0.8;
            const ds = disp.current, vl = vel.current;
            for (let i = 0; i < N; i++) {
                const w = Math.exp(-(((BASE[i * 3] - BASE[g * 3]) ** 2) + ((BASE[i * 3 + 1] - BASE[g * 3 + 1]) ** 2) + ((BASE[i * 3 + 2] - BASE[g * 3 + 2]) ** 2)) / (2 * sig2));
                if (w < 0.03) continue;
                ds[i * 3] = ox * w; ds[i * 3 + 1] = oy * w; ds[i * 3 + 2] = oz * w;
                vl[i * 3] = 0; vl[i * 3 + 1] = 0; vl[i * 3 + 2] = 0;
                pinned.current[i] = 1;
            }
        }

        // spring-damper back to the sphere for everything not being held
        const K = 0.05, C = 0.16;
        const ds = disp.current, vl = vel.current, p = pos.current;
        for (let i = 0; i < N; i++) {
            if (!pinned.current[i]) {
                for (let c = 0; c < 3; c++) {
                    const k = i * 3 + c;
                    vl[k] += -K * ds[k] - C * vl[k];
                    ds[k] += vl[k];
                }
            }
            const breathe = Math.sin(t * 0.6 + i * 0.7) * 0.012;
            p[i * 3] = BASE[i * 3] * (1 + breathe) + ds[i * 3];
            p[i * 3 + 1] = BASE[i * 3 + 1] * (1 + breathe) + ds[i * 3 + 1];
            p[i * 3 + 2] = BASE[i * 3 + 2] * (1 + breathe) + ds[i * 3 + 2];
        }
        ptsRef.current.geometry.attributes.position.needsUpdate = true;

        // edges light up between nearby nodes
        sparks.current = sparks.current.filter((s) => t < s.start + s.duration);
        if (sparks.current.length < 9 && Math.random() < 0.12 + (d.dragging ? 0.35 : 0)) {
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
        let kk = 0;
        sparks.current.forEach((s) => s.edges.forEach(([a, b]) => {
            lp[kk++] = p[a * 3]; lp[kk++] = p[a * 3 + 1]; lp[kk++] = p[a * 3 + 2];
            lp[kk++] = p[b * 3]; lp[kk++] = p[b * 3 + 1]; lp[kk++] = p[b * 3 + 2];
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
    const drag = useRef<Drag>({ rotX: 0, rotY: 0, velX: 0, velY: 0, dragging: false, lastX: 0, lastY: 0, grab: -1, justDown: false, ndcX: 0, ndcY: 0 });

    const setNdc = (e: React.PointerEvent) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        drag.current.ndcX = ((e.clientX - r.left) / r.width) * 2 - 1;
        drag.current.ndcY = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const onDown = (e: React.PointerEvent) => {
        if (reduced) return;
        const d = drag.current;
        d.dragging = true; d.justDown = true; d.grab = -1;
        d.lastX = e.clientX; d.lastY = e.clientY; d.velX = 0; d.velY = 0;
        setNdc(e);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d.dragging) return;
        // don't rotate while dragging — just track the cursor and remember the flick velocity
        d.velY = (e.clientX - d.lastX) * 0.012;
        d.velX = (e.clientY - d.lastY) * 0.010;
        d.lastX = e.clientX; d.lastY = e.clientY;
        setNdc(e);
    };
    const onUp = () => { drag.current.dragging = false; drag.current.grab = -1; };

    return (
        <div
            role="img"
            aria-label="an interactive graph on a sphere — grab a spot to stretch it, or flick to spin it"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: reduced ? 'default' : 'grab', touchAction: 'none' }}
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
