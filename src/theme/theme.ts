'use client';
import { createTheme } from '@mui/material/styles';
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const robotoMono = Roboto_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Google Purple (more prominent)
            light: '#e2d3fe',
            dark: '#8858c8',
            contrastText: '#000000',
        },
        secondary: {
            main: '#8ab4f8', // Google Blue (moved to secondary for balance)
        },
        error: {
            main: '#f28b82', // Google Red
        },
        warning: {
            main: '#fdd663', // Google Yellow
        },
        success: {
            main: '#81c995', // Google Green
        },
        background: {
            default: '#202124', // Google Dark Gray
            paper: '#292a2d', // Lighter Dark Gray for cards/sidebar
        },
        text: {
            primary: '#e8eaed',
            secondary: '#9aa0a6',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontFamily: robotoMono.style.fontFamily,
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#e8eaed',
        },
        h2: {
            fontFamily: robotoMono.style.fontFamily,
            fontSize: '2.25rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: robotoMono.style.fontFamily,
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontFamily: robotoMono.style.fontFamily,
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
        },
        body1: {
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#d0d0d0',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // Pill shaped
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                        backgroundColor: '#cfbcff', // Lighter purple
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#292a2d',
                    backgroundImage: 'none',
                    border: '1px solid #3c4043',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        borderColor: '#bb86fc', // Purple border hover
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(187, 134, 252, 0.1)', // Faint purple background
                    border: '1px solid rgba(187, 134, 252, 0.3)',
                    color: '#bb86fc',
                    fontWeight: 500,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(187, 134, 252, 0.12) !important', // Purple selection
                        color: '#bb86fc',
                        '& .MuiListItemIcon-root': {
                            color: '#bb86fc',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
