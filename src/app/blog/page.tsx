import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { getAllPosts as fetchPosts } from '../../lib/blog';
import { serifFont, interFont, ink, inkSecondary, accent, oldstyle } from '@/theme/tokens';

export default async function Blog() {
    const allPostsData = fetchPosts();

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box className="reading-substrate" sx={{ maxWidth: 720, mx: 'auto', pt: { xs: 2, md: 4 }, pb: 8 }}>
                <Typography variant="h1" component="h1" sx={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', mb: 6 }}>
                    Writing
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {allPostsData.map(({ slug, date, title, excerpt, tags, readingTime }) => (
                        <Box
                            key={slug}
                            sx={{
                                py: 4.5,
                                borderTop: '1px solid rgba(52, 52, 52, 0.10)',
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: '150px 1fr' },
                                gap: { xs: 1, md: 3 },
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                <Typography sx={{ ...oldstyle, fontSize: '0.9rem', color: inkSecondary }}>{date}</Typography>
                                <Typography sx={{ fontFamily: interFont, fontSize: '0.8rem', color: '#8a8a8a' }}>
                                    {readingTime} min read
                                </Typography>
                            </Box>

                            <Box>
                                <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                                    <Typography sx={{ fontFamily: serifFont, fontWeight: 600, color: ink, mb: 1.25, fontSize: '1.5rem', lineHeight: 1.2, '&:hover': { color: accent } }}>
                                        {title}
                                    </Typography>
                                </Link>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '1.05rem', color: inkSecondary, lineHeight: 1.5, mb: 2, maxWidth: '95%' }}>
                                    {excerpt}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                    {tags?.map((tag) => (
                                        <Typography key={tag} sx={{ fontFamily: interFont, fontSize: '0.75rem', color: accent }}>
                                            {tag}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    {allPostsData.length === 0 && (
                        <Typography variant="body2" sx={{ color: inkSecondary, fontStyle: 'italic' }}>
                            No entries yet.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}
