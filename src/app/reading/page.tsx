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
            <Typography variant="h2" gutterBottom>Reading List</Typography>
            <Typography variant="body1" paragraph sx={{ mb: 6, color: '#666' }}>
                Books and papers that have shaped my thinking.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {readingData.map((category: any, i: number) => (
                    <Box key={i}>
                        <Typography variant="h4" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 3 }}>
                            {category.category}
                        </Typography>
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none', display: 'grid', gap: 2 }}>
                            {category.items.map((item: any, j: number) => (
                                <Box component="li" key={j} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2 }, alignItems: { sm: 'baseline' } }}>
                                    <Typography variant="body1" sx={{ minWidth: '350px' }}>
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#2BBC8A',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid transparent'
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.borderBottom = '1px solid #2BBC8A')}
                                                onMouseOut={(e) => (e.currentTarget.style.borderBottom = '1px solid transparent')}
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <span style={{ color: '#383838', fontWeight: 600 }}>{item.title}</span>
                                        )}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic', fontFamily: 'monospace' }}>
                                        {item.author} {item.year && `(${item.year})`}
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
