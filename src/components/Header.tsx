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
        <Box component="header" sx={{ py: 4, mb: 4, borderBottom: '1px solid #eeeeee' }}>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    {/* Logo / Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="img"
                                src="/icon.svg"
                                sx={{ width: 32, height: 32, transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                                alt="Logo"
                            />
                        </Link>
                        <Typography variant="h6" component={Link} href="/" sx={{ color: '#383838', textDecoration: 'none', fontWeight: 700 }}>
                            Elyas Heidari
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box component="nav" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <React.Fragment key={item.name}>
                                    {index > 0 && (
                                        <Typography component="span" sx={{ color: '#e0e0e0', userSelect: 'none' }}>
                                            |
                                        </Typography>
                                    )}
                                    <Link
                                        href={item.path}
                                        style={{
                                            textDecoration: isActive ? 'underline' : 'none',
                                            color: isActive ? '#2BBC8A' : '#666666',
                                            fontWeight: isActive ? 700 : 500,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
