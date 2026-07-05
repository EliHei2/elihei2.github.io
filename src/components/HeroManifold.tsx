'use client';

import { useEffect, useRef } from 'react';

// A multi-scale field that builds the way tissue does: RNA/protein points cluster
// into cells (a hub node each), cells gather into niches (the soft density regions),
// and the whole thing is one tissue. Transcript→cell edges are Segger's
// "transcript-to-cell" link, made literal. Blue = RNA, gold = protein. 2D canvas;
// irregular; drifts with scroll.

type Niche = { x: number; y: number; r: number; color: string; w: number };
type Node = { x: number; y: number; bx: number; by: number; c: string; s: number; cell: boolean; ph: number };

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
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}

const BLUE = '#3f86c6';   // RNA
const GOLD = '#c99a3f';   // protein
const CELLINK = '#2c6699';

export default function HeroManifold() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const g2d = cv.getContext('2d');
        if (!g2d) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const rand = mulberry(20251015);

        let W = 1, H = 1;
        let niches: Niche[] = [];
        let nodes: Node[] = [];
        let txEdges: [number, number][] = [];   // transcript → cell
        let cellEdges: [number, number][] = []; // cell ↔ cell (niche graph)

        const build = () => {
            const rect = cv.getBoundingClientRect();
            W = Math.max(1, rect.width);
            H = Math.max(1, rect.height);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            g2d.setTransform(dpr, 0, 0, dpr, 0, 0);
            const m = Math.min(W, H);

            // niches — irregular density regions (blue/gold only)
            niches = [
                { x: W * 0.30, y: H * 0.22, r: m * 0.40, color: GOLD, w: 0.8 },
                { x: W * 0.68, y: H * 0.44, r: m * 0.52, color: BLUE, w: 1.0 },
                { x: W * 0.40, y: H * 0.72, r: m * 0.34, color: BLUE, w: 0.7 },
                { x: W * 0.76, y: H * 0.82, r: m * 0.24, color: GOLD, w: 0.5 },
            ];

            nodes = [];
            txEdges = [];
            cellEdges = [];
            const cellIdx: number[] = [];

            // place cells, biased into niches, then grow each cell out of transcripts
            const nCells = Math.round(Math.min(52, Math.max(24, (W * H) / 6200)));
            for (let i = 0; i < nCells; i++) {
                let cx: number, cy: number, col: string;
                if (rand() < 0.85) {
                    const b = niches[Math.floor(rand() * niches.length)];
                    const g = () => rand() + rand() + rand() - 1.5;
                    const spread = (0.35 + rand() * 0.5) * b.r;
                    cx = b.x + g() * spread;
                    cy = b.y + g() * spread;
                    col = b.color;
                } else {
                    cx = rand() * W; cy = rand() * H; col = rand() < 0.5 ? BLUE : GOLD;
                }
                const ci = nodes.length;
                nodes.push({ x: cx, y: cy, bx: cx, by: cy, c: CELLINK, s: 3 + rand() * 1.8, cell: true, ph: rand() * Math.PI * 2 });
                cellIdx.push(ci);

                // transcripts / proteins around the cell (irregular counts + radius)
                const k = 4 + Math.floor(rand() * 9);
                const cellR = 8 + rand() * 10;
                for (let j = 0; j < k; j++) {
                    const a = rand() * Math.PI * 2;
                    const rr = (0.3 + rand() * 0.75) * cellR;
                    const x = cx + Math.cos(a) * rr;
                    const y = cy + Math.sin(a) * rr;
                    // mostly the niche's flavour, some of the other (RNA vs protein)
                    const c = rand() < 0.72 ? col : (col === BLUE ? GOLD : BLUE);
                    const ti = nodes.length;
                    nodes.push({ x, y, bx: x, by: y, c, s: 0.8 + rand() * 1.1, cell: false, ph: rand() * Math.PI * 2 });
                    txEdges.push([ti, ci]);
                }
            }

            // cell ↔ cell edges between near neighbours (niche-level graph)
            const R2 = 62 * 62;
            for (let a = 0; a < cellIdx.length; a++) {
                for (let b = a + 1; b < cellIdx.length; b++) {
                    const na = nodes[cellIdx[a]], nb = nodes[cellIdx[b]];
                    const d = (na.bx - nb.bx) ** 2 + (na.by - nb.by) ** 2;
                    if (d < R2 && rand() < 0.5) cellEdges.push([cellIdx[a], cellIdx[b]]);
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

            // niche washes
            g2d.globalCompositeOperation = 'multiply';
            niches.forEach((b, k) => {
                const dx = reduced ? 0 : Math.sin(t * 0.16 + k) * 9;
                const dy = reduced ? 0 : Math.cos(t * 0.14 + k * 1.7) * 9;
                const cx = b.x + dx;
                const cy = b.y + dy - sOff * (0.4 + k * 0.2);
                const g = g2d.createRadialGradient(cx, cy, 0, cx, cy, b.r);
                g.addColorStop(0, hexA(b.color, 0.26 * b.w));
                g.addColorStop(0.5, hexA(b.color, 0.11 * b.w));
                g.addColorStop(1, hexA(b.color, 0));
                g2d.fillStyle = g;
                g2d.beginPath();
                g2d.arc(cx, cy, b.r, 0, Math.PI * 2);
                g2d.fill();
            });
            g2d.globalCompositeOperation = 'source-over';

            // animate node positions
            for (const p of nodes) {
                const amp = p.cell ? 1.6 : 1.0;
                p.x = p.bx + (reduced ? 0 : Math.sin(t * 0.5 + p.ph) * amp);
                p.y = p.by + (reduced ? 0 : Math.cos(t * 0.4 + p.ph) * amp) - sOff;
            }

            // transcript → cell edges (faint, many)
            g2d.lineWidth = 0.6;
            for (let e = 0; e < txEdges.length; e++) {
                const a = nodes[txEdges[e][0]], b = nodes[txEdges[e][1]];
                g2d.strokeStyle = hexA(a.c, 0.14);
                g2d.beginPath();
                g2d.moveTo(a.x, a.y);
                g2d.lineTo(b.x, b.y);
                g2d.stroke();
            }

            // cell ↔ cell edges (the niche graph, pulsing)
            for (let e = 0; e < cellEdges.length; e++) {
                const a = nodes[cellEdges[e][0]], b = nodes[cellEdges[e][1]];
                const pulse = reduced ? 0.2 : 0.12 + 0.14 * (0.5 + 0.5 * Math.sin(t * 1.2 + e));
                g2d.strokeStyle = hexA(CELLINK, pulse);
                g2d.lineWidth = 1.1;
                g2d.beginPath();
                g2d.moveTo(a.x, a.y);
                g2d.lineTo(b.x, b.y);
                g2d.stroke();
            }

            // transcripts / proteins (tiny), then cell hubs (bigger, ringed)
            for (const p of nodes) {
                if (p.cell || p.y < -20 || p.y > H + 20) continue;
                g2d.fillStyle = hexA(p.c, 0.78);
                g2d.beginPath();
                g2d.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                g2d.fill();
            }
            for (const p of nodes) {
                if (!p.cell || p.y < -20 || p.y > H + 20) continue;
                g2d.fillStyle = hexA(p.c, 0.95);
                g2d.beginPath();
                g2d.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                g2d.fill();
                g2d.strokeStyle = hexA(p.c, 0.28);
                g2d.lineWidth = 1;
                g2d.beginPath();
                g2d.arc(p.x, p.y, p.s + 3, 0, Math.PI * 2);
                g2d.stroke();
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
