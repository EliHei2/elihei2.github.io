'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { serifFont, interFont, inkSecondary, accent } from '@/theme/theme';

const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Work', href: '/#work' },
    { name: 'Publications', href: '/#publications' },
    { name: 'Writing', href: '/blog' },
    { name: 'CV', href: '/CV_Elyas_Heidari.pdf', external: true },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <Box
            component="header"
            sx={{
                py: 2,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                background: 'linear-gradient(to bottom, rgba(252,253,254,0.9) 0%, rgba(252,253,254,0) 100%)',
                backdropFilter: 'blur(6px)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5,
                    }}
                >
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            fontFamily: serifFont,
                            fontWeight: 600,
                            fontSize: '1.15rem',
                            color: '#2f2f2f',
                            textDecoration: 'none',
                            '&:hover': { color: accent },
                        }}
                    >
                        Elyas Heidari
                    </Box>

                    <Box component="nav" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {navItems.map((item) => {
                            const isActive = !item.external && pathname === item.href;
                            const common = {
                                fontFamily: interFont,
                                fontWeight: 500,
                                fontSize: '0.8125rem',
                                color: isActive ? accent : inkSecondary,
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                borderBottom: isActive ? `1px solid ${accent}` : '1px solid transparent',
                                paddingBottom: '1px',
                            } as const;
                            if (item.external) {
                                return (
                                    <Box
                                        key={item.name}
                                        component="a"
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ ...common, '&:hover': { color: accent } }}
                                    >
                                        {item.name}
                                    </Box>
                                );
                            }
                            return (
                                <Box
                                    key={item.name}
                                    component={Link}
                                    href={item.href}
                                    sx={{ ...common, '&:hover': { color: accent } }}
                                >
                                    {item.name}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
