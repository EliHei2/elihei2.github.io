'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import readingData from '@/data/reading.json';
import { serifFont, interFont, ink, inkSecondary, accent } from '@/theme/theme';

interface ReadingItem {
    title: string;
    author: string;
    year?: string | number;
    url?: string;
}
interface ReadingCategory {
    category: string;
    items: ReadingItem[];
}

export default function Reading() {
    const data = readingData as ReadingCategory[];
    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box className="reading-substrate" sx={{ maxWidth: 660, mx: 'auto', pt: { xs: 2, md: 4 }, pb: 8 }}>
                <Typography variant="h1" component="h1" sx={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', mb: 2 }}>
                    Reading
                </Typography>
                <Typography variant="body1" sx={{ color: inkSecondary, fontSize: '1rem', mb: 6 }}>
                    Books and pieces I keep coming back to. Loosely grouped, not ranked.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {data.map((category, i) => (
                        <Box key={i}>
                            <Typography sx={{ fontFamily: interFont, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em', color: inkSecondary, mb: 2.5 }}>
                                {category.category}
                            </Typography>
                            <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none', display: 'grid', gap: 2.5 }}>
                                {category.items.map((item, j) => (
                                    <Box component="li" key={j} sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                        <Typography sx={{ ...({ fontFamily: serifFont, fontStyle: 'italic' }), fontSize: '1.1rem', lineHeight: 1.4 }}>
                                            {item.url ? (
                                                <Box component="a" href={item.url} target="_blank" rel="noopener noreferrer" sx={{ color: ink, textDecoration: 'none', '&:hover': { color: accent } }}>
                                                    {item.title}
                                                </Box>
                                            ) : (
                                                <Box component="span" sx={{ color: ink }}>{item.title}</Box>
                                            )}
                                        </Typography>
                                        <Typography sx={{ fontFamily: interFont, fontSize: '0.8125rem', color: inkSecondary }}>
                                            {item.author}{item.year ? ` · ${item.year}` : ''}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
