'use client';
import { createTheme } from '@mui/material/styles';
import { Space_Grotesk, Cormorant_Garamond } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#748454', // Olive Green
            contrastText: '#F4F4E4',
        },
        secondary: {
            main: '#F4F4E4', // Cream
        },
        background: {
            default: '#080808', // Deep Black
            paper: '#080808',
        },
        text: {
            primary: '#F4F4E4', // Cream
            secondary: 'rgba(244, 244, 228, 0.7)',
        },
        divider: 'rgba(116, 132, 84, 0.2)', // Low opacity olive
        action: {
            hover: 'rgba(116, 132, 84, 0.1)',
        },
    },
    typography: {
        fontFamily: cormorantGaramond.style.fontFamily,
        allVariants: {
            color: '#F4F4E4',
        },
        h1: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F4F4E4',
        },
        h2: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
            color: '#F4F4E4',
        },
        h3: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#748454', // Olive accent
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
            color: '#748454',
        },
        body1: {
            fontFamily: cormorantGaramond.style.fontFamily,
            fontSize: '1.25rem', // Larger academic text
            lineHeight: 1.8,
        },
        body2: {
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: '0.9rem',
            lineHeight: 1.6,
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
        }
    },
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: '8px 24px',
                    border: '1px solid rgba(116, 132, 84, 0.3)',
                    color: '#F4F4E4',
                    '&:hover': {
                        backgroundColor: 'rgba(116, 132, 84, 0.1)',
                        borderColor: '#748454',
                    },
                },
                contained: {
                    backgroundColor: '#748454',
                    color: '#080808',
                    '&:hover': {
                        backgroundColor: '#8da166',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontFamily: spaceGrotesk.style.fontFamily,
                    backgroundColor: 'rgba(116, 132, 84, 0.1)',
                    border: '1px solid rgba(116, 132, 84, 0.2)',
                    color: '#F4F4E4',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#748454',
                    transition: '0.2s',
                    '&:hover': {
                        color: '#F4F4E4',
                    },
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(116, 132, 84, 0.2)',
                }
            }
        }
    },
});

export default theme;
