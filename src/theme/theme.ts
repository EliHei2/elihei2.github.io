'use client';
import { createTheme } from '@mui/material/styles';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2BBC8A', // The "Geeky" Teal Green from inspiration
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#383838', // Dark Grey for text-like elements
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#383838', // Dark Grey
            secondary: '#666666', // Medium Grey
        },
        action: {
            hover: 'rgba(43, 188, 138, 0.08)',
        },
    },
    typography: {
        fontFamily: jetbrainsMono.style.fontFamily,
        allVariants: {
            fontFamily: jetbrainsMono.style.fontFamily,
        },
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#383838',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#2BBC8A', // Accent color for headers
            marginBottom: '1rem',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#383838',
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#383838',
        },
        h5: {
            fontSize: '1.1rem',
            fontWeight: 700,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.8,
            color: '#383838',
        },
        body2: {
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#666666',
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 8, // Slightly more square for "tech" feel
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: 'rgba(43, 188, 138, 0.1)',
                    },
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #eeeeee',
                    boxShadow: 'none',
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontWeight: 600,
                    backgroundColor: '#f5f5f5',
                    color: '#383838',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#2BBC8A',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }
            }
        }
    },
});

export default theme;
