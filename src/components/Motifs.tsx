import * as React from 'react';

// Small, cute, minimal illustrations — a little colour for the Iran note.

export function Pomegranate({ size = 44 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="pomegranate">
            {/* crown */}
            <path d="M24 7 l3 5 l-3 -1 l-3 1 z" fill="#b23a48" />
            <path d="M20 8 l2 4 M28 8 l-2 4" stroke="#b23a48" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            {/* body */}
            <circle cx="24" cy="28" r="14" fill="#d1495b" />
            <path d="M24 14 a14 14 0 0 1 8 4" fill="none" stroke="#e07a86" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            {/* seeds */}
            {[[20, 25], [27, 24], [23, 30], [29, 31], [18, 31], [25, 35]].map((s, i) => (
                <circle key={i} cx={s[0]} cy={s[1]} r="1.7" fill="#8f2233" opacity="0.85" />
            ))}
        </svg>
    );
}

export function Pistachio({ size = 44 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="pistachios">
            {/* shell */}
            <ellipse cx="19" cy="27" rx="11" ry="14" transform="rotate(-18 19 27)" fill="#e4d5b0" />
            <ellipse cx="30" cy="24" rx="10" ry="13" transform="rotate(14 30 24)" fill="#ded0a8" />
            {/* open kernel on the front nut */}
            <ellipse cx="30" cy="24" rx="5.5" ry="8.5" transform="rotate(14 30 24)" fill="#7db36b" />
            <ellipse cx="30" cy="24" rx="2.6" ry="5" transform="rotate(14 30 24)" fill="#3f9e5a" />
        </svg>
    );
}

export function Saffron({ size = 44 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="saffron crocus">
            {/* petals */}
            {[-28, 0, 28].map((a, i) => (
                <ellipse key={i} cx="24" cy="20" rx="4.5" ry="12" transform={`rotate(${a} 24 26)`} fill="#9a4fce" opacity="0.85" />
            ))}
            {/* stigmas */}
            {[-14, 0, 14].map((a, i) => (
                <path key={i} d="M24 24 q1 8 0 13" transform={`rotate(${a} 24 24)`} stroke="#e8823a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            ))}
        </svg>
    );
}
