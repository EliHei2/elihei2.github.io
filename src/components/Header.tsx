'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Software', path: '/software' },
    { name: 'Publications', path: '/publications' },
    { name: 'Reading', path: '/reading' },
    { name: 'Blog', path: '/blog' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <Box component="header" sx={{
            py: 3,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(4px)',
        }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    {/* Signature / Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            href="/"
                            sx={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontStyle: 'italic',
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                color: '#343434',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                '&:hover': { color: '#296b9f' }
                            }}
                        >
                            Elyas Heidari
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box component="nav" sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        color: isActive ? '#296b9f' : '#5a5a5a',
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        transition: '0.2s',
                                        borderBottom: isActive ? '1px solid #296b9f' : '1px solid transparent'
                                    }}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
