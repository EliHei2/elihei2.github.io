// Server-safe design tokens: fonts, colors, accents, typographic helpers.
// No 'use client' so both server components and the client theme can import.
import { Fraunces, Newsreader, Inter } from 'next/font/google';

// Fraunces — a high-contrast "old-style" display serif (variable, optical sizing).
// The signature: name + headings.
const display = Fraunces({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    display: 'swap',
});

// Newsreader — a warm editorial serif for reading. Body prose.
const serif = Newsreader({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    display: 'swap',
});

// Inter — small UI / metadata only.
const inter = Inter({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
});

export const displayFont = display.style.fontFamily;
export const serifFont = serif.style.fontFamily;
export const interFont = inter.style.fontFamily;

// Ink / paper / one blue.
export const ink = '#242424';
export const inkSecondary = '#585858';
export const inkFaint = '#6b6b6b';
export const accent = '#296b9f';       // scholarly blue — links
export const accentHover = '#1d517a';
export const hairline = 'rgba(36, 36, 36, 0.10)';
export const paper = '#fcfdfe';

// A restrained set of Apple-derived accents — used minimally, for figure
// motifs and small category dots only. Never for body text.
export const apple = {
    blue: '#0071e3',
    teal: '#22a1b3',
    indigo: '#5e5ce6',
    orange: '#e8871e',
    green: '#2fa34b',
    purple: '#9a4fce',
    pink: '#e0457b',
} as const;

// Oldstyle (text) figures for the dated record only.
export const oldstyle = {
    fontFamily: serifFont,
    fontFeatureSettings: '"onum" 1, "pnum" 1',
} as const;

// Italic reserved for journal/venue names, thesis titles, book titles.
export const venueItalic = {
    fontFamily: serifFont,
    fontStyle: 'italic' as const,
} as const;
