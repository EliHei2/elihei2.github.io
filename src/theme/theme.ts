'use client';
import { createTheme } from '@mui/material/styles';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
});

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#296b9f', // Blue dot
            light: '#c1def0', // Blue fill
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ea9f37', // Orange nuc
            light: '#fadbb2', // Orange fill
            contrastText: '#ffffff',
        },
        success: {
            main: '#138774', // Cyan dot
            light: '#d1efe8', // Cyan fill
        },
        error: {
            main: '#d32f2f', // Err stroke
        },
        background: {
            default: '#ffffff', // Clean white
            paper: '#fafbfc', // Subtle off-white
        },
        text: {
            primary: '#343434', // Bounds color
            secondary: '#5a5a5a',
        },
        divider: 'rgba(52, 52, 52, 0.1)',
        action: {
            hover: 'rgba(52, 52, 52, 0.04)',
        },
    },
    typography: {
        fontFamily: `'DejaVu Sans Light', ${inter.style.fontFamily}, 'Helvetica Neue', Arial, sans-serif`,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        allVariants: {
            color: '#343434',
        },
        h1: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#343434',
        },
        h2: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
            color: '#343434',
        },
        h3: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#296b9f', // Blue accent
        },
        h4: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
        },
        h5: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '1.1rem',
            fontWeight: 500,
        },
        h6: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#296b9f',
        },
        body1: {
            fontSize: '1.15rem',
            lineHeight: 1.8,
            fontWeight: 300,
        },
        body2: {
            fontSize: '0.95rem',
            lineHeight: 1.6,
            fontWeight: 400,
        },
        button: {
            fontFamily: spaceGrotesk.style.fontFamily,
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '0.1em',
        },
        caption: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 8, // Soft geometric roundness to match schematic shapes
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // Pill shaped
                    padding: '8px 24px',
                    border: '1px solid rgba(52, 52, 52, 0.2)',
                    color: '#343434',
                    '&:hover': {
                        backgroundColor: 'rgba(52, 52, 52, 0.04)',
                        borderColor: '#296b9f',
                    },
                },
                contained: {
                    backgroundColor: '#296b9f',
                    color: '#ffffff',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: '#1d517a',
                        borderColor: 'transparent',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontFamily: spaceGrotesk.style.fontFamily,
                    backgroundColor: '#c1def0', // Blue light
                    color: '#296b9f', // Blue main
                    border: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#ea9f37', // Orange accent
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    '&:hover': {
                        color: '#d66a2b',
                    },
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(52, 52, 52, 0.1)',
                }
            }
        }
    },
});

export default theme;
