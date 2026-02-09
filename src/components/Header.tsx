'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
            py: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            bgcolor: 'rgba(23, 23, 23, 0.8)',
            backdropFilter: 'blur(8px)',
            position: 'sticky',
            top: 0,
            zIndex: 1100
        }}>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    {/* Logo / Name with Status Indicator */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#E0F58F',
                                boxShadow: '0 0 10px #E0F58F',
                                animation: 'pulse 2s infinite'
                            }}
                        />
                        <Typography variant="h6" component={Link} href="/" sx={{
                            color: '#E0F58F',
                            textDecoration: 'none',
                            fontWeight: 700,
                            letterSpacing: '-0.02em'
                        }}>
                            elyas_heidari.sys
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box component="nav" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        color: isActive ? '#E0F58F' : 'rgba(255, 255, 255, 0.5)',
                                        fontWeight: isActive ? 700 : 400,
                                        fontSize: '0.85rem',
                                        transition: '0.2s',
                                        borderBottom: isActive ? '1px solid #E0F58F' : '1px solid transparent'
                                    }}
                                >
                                    {isActive ? `> ${item.name.toLowerCase()}` : item.name.toLowerCase()}
                                </Link>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
            `}</style>
        </Box>
    );
}
