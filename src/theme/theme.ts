'use client';
import { createTheme } from '@mui/material/styles';
import {
    displayFont,
    serifFont,
    interFont,
    ink,
    inkSecondary,
    accent,
    accentHover,
    hairline,
} from './tokens';

export { displayFont, serifFont, interFont, ink, inkSecondary, inkFaint, accent, accentHover, hairline, paper, apple, oldstyle, venueItalic } from './tokens';

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
            fontFamily: displayFont,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.1rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: ink,
        },
        h2: {
            fontFamily: displayFont,
            fontSize: 'clamp(1.3rem, 2.4vw, 1.55rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.005em',
            color: ink,
        },
        h3: {
            fontFamily: displayFont,
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: ink,
        },
        h4: { fontFamily: displayFont, fontSize: '1.05rem', fontWeight: 600, color: ink },
        h5: { fontFamily: displayFont, fontSize: '1rem', fontWeight: 600, color: ink },
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
