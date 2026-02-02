'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

// Dummy list for visual verification, assuming reading.json will be connected or parsed
// For now, retaining structure but simplifying UI
import readingList from '@/data/reading.json';

export default function Reading() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Typography variant="h2" gutterBottom>Reading List</Typography>
            <Typography variant="body1" paragraph sx={{ mb: 6, color: '#666' }}>
                Books and papers that have shaped my thinking.
            </Typography>

            <Box component="ul" sx={{ pl: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {readingList.map((item: any, i: number) => (
                    <Box component="li" key={i} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
                        <Typography variant="body1" sx={{ color: '#383838', fontWeight: 600, minWidth: '200px' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic' }}>
                            by {item.author}
                        </Typography>
                        {item.comment && (
                            <Typography variant="body2" sx={{ color: '#999', ml: 'auto', maxWidth: '400px', display: { xs: 'none', sm: 'block' } }}>
                                "{item.comment}"
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
