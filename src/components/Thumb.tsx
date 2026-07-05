import * as React from 'react';

// A small, distinct figure per publication/project — abstract diagrams in the
// item's accent colour. Deterministic (seeded), so they are stable across builds.
export type ThumbVariant = 'grid' | 'graph' | 'scatter' | 'layers' | 'bars' | 'network';

function rng(seed: string) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    return () => {
        h += 0x6d2b79f5;
        let t = Math.imul(h ^ (h >>> 15), 1 | h);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const W = 120;
const H = 88;

function draw(variant: ThumbVariant, accent: string, seed: string): React.ReactNode {
    const r = rng(seed + variant);
    const soft = accent;
    switch (variant) {
        case 'grid': {
            // segmentation: cells (rounded rects) + transcript dots
            const cells: React.ReactNode[] = [];
            let idx = 0;
            for (let x = 0; x < 4; x++)
                for (let y = 0; y < 3; y++) {
                    const jx = (r() - 0.5) * 6;
                    const jy = (r() - 0.5) * 6;
                    cells.push(
                        <rect key={`c${idx}`} x={14 + x * 24 + jx} y={12 + y * 22 + jy} width={18} height={16} rx={5}
                            fill="none" stroke={soft} strokeOpacity={0.5} strokeWidth={1.2} />,
                    );
                    idx++;
                }
            const dots: React.ReactNode[] = [];
            for (let i = 0; i < 34; i++) {
                dots.push(<circle key={`d${i}`} cx={12 + r() * 96} cy={10 + r() * 68} r={1.4}
                    fill={soft} fillOpacity={0.55 + r() * 0.35} />);
            }
            return <>{cells}{dots}</>;
        }
        case 'graph': {
            const pts = Array.from({ length: 9 }, () => [14 + r() * 92, 12 + r() * 64]);
            const edges: React.ReactNode[] = [];
            for (let i = 0; i < pts.length; i++)
                for (let j = i + 1; j < pts.length; j++)
                    if (r() < 0.28)
                        edges.push(<line key={`e${i}-${j}`} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]}
                            stroke={soft} strokeOpacity={0.35} strokeWidth={1} />);
            return <>{edges}{pts.map((p, i) => <circle key={`n${i}`} cx={p[0]} cy={p[1]} r={i % 3 === 0 ? 3.4 : 2.4} fill={soft} fillOpacity={0.85} />)}</>;
        }
        case 'scatter': {
            // spatial clusters
            const clusters = [[34, 30], [82, 34], [56, 62]];
            const out: React.ReactNode[] = [];
            clusters.forEach((c, ci) => {
                for (let i = 0; i < 16; i++) {
                    const a = r() * Math.PI * 2, rad = r() * 14;
                    out.push(<circle key={`s${ci}-${i}`} cx={c[0] + Math.cos(a) * rad} cy={c[1] + Math.sin(a) * rad}
                        r={1.7} fill={soft} fillOpacity={ci === 1 ? 0.4 : 0.7} />);
                }
            });
            return <>{out}</>;
        }
        case 'layers': {
            return (
                <>
                    {[0, 1, 2].map((i) => (
                        <g key={i} opacity={0.4 + i * 0.2}>
                            <path d={`M ${20 + i * 6},${58 - i * 16} l 60,0 l 20,-14 l -60,0 z`} fill={soft} fillOpacity={0.22} stroke={soft} strokeOpacity={0.5} strokeWidth={1} />
                        </g>
                    ))}
                </>
            );
        }
        case 'bars': {
            const hs = [22, 40, 30, 52, 36, 46];
            return (
                <>
                    {hs.map((bh, i) => (
                        <rect key={i} x={16 + i * 16} y={70 - bh} width={9} height={bh} rx={1.5}
                            fill={soft} fillOpacity={i === 3 ? 0.85 : 0.4} />
                    ))}
                </>
            );
        }
        case 'network': {
            const center = [60, 40];
            const outer = Array.from({ length: 7 }, (_, i) => {
                const a = (i / 7) * Math.PI * 2;
                return [center[0] + Math.cos(a) * 34, center[1] + Math.sin(a) * 26];
            });
            return (
                <>
                    {outer.map((p, i) => <line key={`l${i}`} x1={center[0]} y1={center[1]} x2={p[0]} y2={p[1]} stroke={soft} strokeOpacity={0.35} strokeWidth={1} />)}
                    {outer.map((p, i) => <circle key={`o${i}`} cx={p[0]} cy={p[1]} r={2.4} fill={soft} fillOpacity={0.75} />)}
                    <circle cx={center[0]} cy={center[1]} r={4.5} fill={soft} />
                </>
            );
        }
        default:
            return null;
    }
}

export default function Thumb({
    variant,
    accent,
    seed,
    size = 96,
    ariaLabel,
}: {
    variant: ThumbVariant;
    accent: string;
    seed: string;
    size?: number;
    ariaLabel?: string;
}) {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width={size}
            height={(size * H) / W}
            role="img"
            aria-label={ariaLabel || 'figure'}
            style={{ display: 'block', borderRadius: 6, background: `${accent}0f` }}
        >
            {draw(variant, accent, seed)}
        </svg>
    );
}
