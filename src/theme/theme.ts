'use client';
import { createTheme } from '@mui/material/styles';
import { Red_Hat_Mono, Inter } from 'next/font/google';

const redHatMono = Red_Hat_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E0F58F', // Lime Yellow from aubr.ai
            contrastText: '#171717',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            default: '#171717', // Deep Charcoal
            paper: '#171717',
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.8)',
        },
        divider: 'rgba(255, 255, 255, 0.1)',
        action: {
            hover: 'rgba(224, 245, 143, 0.08)',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily, // Default to Inter
        allVariants: {
            fontFamily: redHatMono.style.fontFamily, // Default fallback
            textTransform: 'lowercase',
        },
        h1: {
            fontFamily: redHatMono.style.fontFamily,
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 700,
        },
        h5: {
            fontSize: '1.1rem',
            fontWeight: 700,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
        },
        body1: {
            fontFamily: inter.style.fontFamily,
            fontSize: '1rem',
            lineHeight: 1.8,
            textTransform: 'none', // Keep body text normal
        },
        body2: {
            fontFamily: inter.style.fontFamily,
            fontSize: '0.9rem',
            lineHeight: 1.6,
            textTransform: 'none',
        },
        button: {
            fontFamily: redHatMono.style.fontFamily,
            textTransform: 'lowercase',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 0, // Brutalist sharp corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: '#E0F58F',
                        color: '#171717',
                        borderColor: '#E0F58F',
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
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                    borderRadius: 0,
                    backgroundColor: 'rgba(23, 23, 23, 0.6)', // Semi-transparent
                    backdropFilter: 'blur(10px)', // Glassmorphism
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                },
                outlined: {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#E0F58F',
                    '&:hover': {
                        textDecoration: 'underline',
                        textDecorationStyle: 'dotted',
                    },
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Prevent default MUI paper overlay in dark mode
                }
            }
        }
    },
});

export default theme;
