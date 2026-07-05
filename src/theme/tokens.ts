// Server-safe design tokens: fonts, colors, and typographic helpers.
// No 'use client' here so both server components and the client theme can import.
import { Source_Serif_4, Inter } from 'next/font/google';

// Source Serif 4 is a variable font — omit the discrete weight array so the axis
// covers 400–700. Italic is a real role (venue names, thesis/book titles), so load it.
const serif = Source_Serif_4({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    display: 'swap',
});

const inter = Inter({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
});

export const serifFont = serif.style.fontFamily;
export const interFont = inter.style.fontFamily;

// Ink / paper / one blue.
export const ink = '#2f2f2f';
export const inkSecondary = '#5a5a5a';
export const inkFaint = '#6b6b6b';
export const accent = '#296b9f';
export const accentHover = '#1d517a';
export const hairline = 'rgba(52, 52, 52, 0.10)';

// Oldstyle (text) figures for the dated record only — timeline periods, publication
// years, blog dates, footer year. Set in Source Serif (onum is a serif convention).
export const oldstyle = {
    fontFamily: serifFont,
    fontFeatureSettings: '"onum" 1, "pnum" 1',
} as const;

// Italic reserved for journal/venue names, thesis titles, book titles.
export const venueItalic = {
    fontFamily: serifFont,
    fontStyle: 'italic' as const,
} as const;
