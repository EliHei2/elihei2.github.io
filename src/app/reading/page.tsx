'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
                                    <Typography variant="body1" sx={{ color: '#383838', fontWeight: 600, minWidth: '350px' }}>
                                        {item.title}
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
