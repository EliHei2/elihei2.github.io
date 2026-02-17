'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import readingData from '@/data/reading.json';

export default function Reading() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Box sx={{ mb: 8, mt: 4 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>Reading List</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    A curated collection of literature, manuscripts, and philosophical foundations.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {readingData.map((category: any, i: number) => (
                    <Box key={i}>
                        <Typography variant="h6" sx={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: '#748454',
                            mb: 4,
                            borderBottom: '1px solid rgba(116, 132, 84, 0.2)',
                            pb: 1,
                            display: 'inline-block'
                        }}>
                            {category.category}
                        </Typography>

                        <Box component="ul" sx={{ pl: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
                            {category.items.map((item: any, j: number) => (
                                <Box
                                    component="li"
                                    key={j}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                        pb: 2,
                                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                                        '&:hover': {
                                            '& a': { color: '#E0F58F' },
                                            borderColor: 'rgba(116, 132, 84, 0.2)'
                                        },
                                        transition: '0.2s'
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontFamily: 'Cormorant Garamond, serif' }}>
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#F4F4E4',
                                                    fontWeight: 500,
                                                    transition: '0.2s'
                                                }}
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <span style={{ color: '#F4F4E4', fontWeight: 500 }}>{item.title}</span>
                                        )}
                                    </Typography>

                                    <Typography variant="caption" sx={{
                                        color: 'rgba(244, 244, 228, 0.4)',
                                        fontFamily: 'monospace',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {item.author} {item.year && ` / ${item.year}`}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
