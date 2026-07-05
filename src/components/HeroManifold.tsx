'use client';

import { useEffect, useRef } from 'react';

// An irregular, flat point field with a few soft density regions and a live
// graph — the blue/gold "transcript-to-cell" look, not a sphere. Points cluster
// unevenly around density blobs; a handful of edges light up; the whole field
// drifts as you scroll. 2D canvas, so the density blobs are cheap radial washes.

type Blob = { x: number; y: number; r: number; color: string; w: number };
type Pt = { x: number; y: number; bx: number; by: number; c: string; s: number; ph: number };

function mulberry(seed: number) {
    return () => {
        seed += 0x6d2b79f5;
        let t = seed;
        t = Math.imul(t ^ (t >>> 15), 1 | t);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hexA(hex: string, a: number) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}

export default function HeroManifold() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const g2d = cv.getContext('2d');
        if (!g2d) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const rand = mulberry(20251015);

        const blueP = '#3f86c6';
        const goldP = '#d9a441';
        const warmPts = ['#d1495b', '#e8823a', '#e6b34a', '#3f9e5a'];

        let W = 1, H = 1;
        let blobs: Blob[] = [];
        let pts: Pt[] = [];
        let edges: [number, number][] = [];

        const build = () => {
            const rect = cv.getBoundingClientRect();
            W = Math.max(1, rect.width);
            H = Math.max(1, rect.height);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            g2d.setTransform(dpr, 0, 0, dpr, 0, 0);

            blobs = [
                { x: W * 0.30, y: H * 0.26, r: Math.min(W, H) * 0.46, color: goldP, w: 0.9 },
                { x: W * 0.66, y: H * 0.55, r: Math.min(W, H) * 0.55, color: blueP, w: 1.0 },
                { x: W * 0.42, y: H * 0.82, r: Math.min(W, H) * 0.40, color: '#e8823a', w: 0.5 },
            ];

            pts = [];
            const N = Math.round(Math.min(260, Math.max(120, (W * H) / 950)));
            for (let i = 0; i < N; i++) {
                let x: number, y: number, c: string;
                const pick = rand();
                if (pick < 0.9) {
                    const b = blobs[Math.floor(rand() * blobs.length)];
                    const g = () => rand() + rand() + rand() - 1.5;
                    x = b.x + g() * b.r * 0.62;
                    y = b.y + g() * b.r * 0.62;
                    c = b.color === blueP ? blueP : b.color === goldP ? goldP : warmPts[1];
                    if (rand() < 0.16) c = warmPts[Math.floor(rand() * warmPts.length)];
                } else {
                    x = rand() * W;
                    y = rand() * H;
                    c = rand() < 0.5 ? blueP : goldP;
                }
                pts.push({ x, y, bx: x, by: y, c, s: 1.1 + rand() * 2.2, ph: rand() * Math.PI * 2 });
            }

            edges = [];
            for (let i = 0; i < pts.length && edges.length < 120; i++) {
                for (let j = i + 1; j < pts.length && edges.length < 120; j++) {
                    const dx = pts[i].bx - pts[j].bx, dy = pts[i].by - pts[j].by;
                    if (dx * dx + dy * dy < 46 * 46 && rand() < 0.5) edges.push([i, j]);
                }
            }
        };

        build();

        let scrollY = window.scrollY || 0;
        const onScroll = () => { scrollY = window.scrollY || 0; };
        const onResize = () => build();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        let raf = 0;
        const start = performance.now();

        const frame = (now: number) => {
            const t = (now - start) / 1000;
            const sOff = scrollY * 0.12;
            g2d.clearRect(0, 0, W, H);

            g2d.globalCompositeOperation = 'multiply';
            blobs.forEach((b, k) => {
                const dx = reduced ? 0 : Math.sin(t * 0.18 + k) * 10;
                const dy = reduced ? 0 : Math.cos(t * 0.15 + k * 1.7) * 10;
                const cx = b.x + dx;
                const cy = b.y + dy - sOff * (0.4 + k * 0.25);
                const g = g2d.createRadialGradient(cx, cy, 0, cx, cy, b.r);
                g.addColorStop(0, hexA(b.color, 0.3 * b.w));
                g.addColorStop(0.5, hexA(b.color, 0.14 * b.w));
                g.addColorStop(1, hexA(b.color, 0));
                g2d.fillStyle = g;
                g2d.beginPath();
                g2d.arc(cx, cy, b.r, 0, Math.PI * 2);
                g2d.fill();
            });
            g2d.globalCompositeOperation = 'source-over';

            for (const p of pts) {
                p.x = p.bx + (reduced ? 0 : Math.sin(t * 0.5 + p.ph) * 2.2);
                p.y = p.by + (reduced ? 0 : Math.cos(t * 0.4 + p.ph) * 2.2) - sOff;
            }

            g2d.lineWidth = 1;
            for (let e = 0; e < edges.length; e++) {
                const a = pts[edges[e][0]], b = pts[edges[e][1]];
                const pulse = reduced ? 0.12 : 0.08 + 0.12 * (0.5 + 0.5 * Math.sin(t * 1.3 + e));
                g2d.strokeStyle = hexA(a.c, pulse);
                g2d.beginPath();
                g2d.moveTo(a.x, a.y);
                g2d.lineTo(b.x, b.y);
                g2d.stroke();
            }

            for (const p of pts) {
                if (p.y < -20 || p.y > H + 20) continue;
                g2d.fillStyle = hexA(p.c, 0.82);
                g2d.beginPath();
                g2d.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                g2d.fill();
            }

            if (!reduced) raf = requestAnimationFrame(frame);
        };

        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
        />
    );
}
