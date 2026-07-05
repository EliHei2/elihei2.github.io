'use client';
import { createTheme } from '@mui/material/styles';
import {
    serifFont,
    interFont,
    ink,
    inkSecondary,
    accent,
    accentHover,
    hairline,
} from './tokens';

export { serifFont, interFont, ink, inkSecondary, inkFaint, accent, accentHover, hairline, oldstyle, venueItalic } from './tokens';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: accent, contrastText: '#ffffff' },
        background: { default: '#fcfdfe', paper: '#fcfdfe' },
        text: { primary: ink, secondary: inkSecondary },
        divider: hairline,
        action: { hover: 'rgba(52, 52, 52, 0.04)' },
    },
    typography: {
        fontFamily: `${serifFont}, Georgia, 'Times New Roman', serif`,
        fontWeightLight: 400,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
            fontFamily: serifFont,
            fontSize: 'clamp(2.5rem, 5vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: ink,
        },
        h2: {
            fontFamily: serifFont,
            fontSize: 'clamp(1.4rem, 2.6vw, 1.7rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.005em',
            color: ink,
        },
        h3: {
            fontFamily: serifFont,
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: ink,
        },
        h4: { fontFamily: serifFont, fontSize: '1.05rem', fontWeight: 600, color: ink },
        h5: { fontFamily: serifFont, fontSize: '1rem', fontWeight: 600, color: ink },
        h6: { fontFamily: interFont, fontSize: '0.9rem', fontWeight: 600, color: ink },
        body1: {
            fontFamily: serifFont,
            fontSize: '1.125rem',
            lineHeight: 1.65,
            fontWeight: 400,
            color: ink,
        },
        body2: {
            fontFamily: serifFont,
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400,
            color: inkSecondary,
        },
        button: {
            fontFamily: interFont,
            textTransform: 'none',
            fontWeight: 500,
            letterSpacing: 0,
        },
        caption: {
            fontFamily: interFont,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: inkSecondary,
        },
    },
    shape: { borderRadius: 4 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'none',
                    padding: '6px 16px',
                    fontFamily: interFont,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: accent,
                    transition: 'color 0.2s',
                    '&:hover': { color: accentHover },
                },
            },
        },
        MuiDivider: {
            styleOverrides: { root: { borderColor: hairline } },
        },
    },
});

export default theme;
