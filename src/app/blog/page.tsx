import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import { getAllPosts as fetchPosts } from '../../lib/blog';

export default async function Blog() {
    const allPostsData = fetchPosts();

    return (
        <Container maxWidth="md" sx={{ mt: 16, mb: 16, position: 'relative', zIndex: 10 }}>
            <Box sx={{ borderBottom: '1px solid rgba(116, 132, 84, 0.4)', mb: 8, pb: 2 }}>
                <Typography variant="h1" sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#F4F4E4',
                    letterSpacing: '-0.02em'
                }}>
                    WRITINGS
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {allPostsData.map(({ slug, date, title, excerpt, tags, readingTime }) => (
                    <Box key={slug} sx={{
                        py: 6,
                        borderBottom: '1px solid rgba(116, 132, 84, 0.2)',
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' },
                        gap: 2,
                        transition: '0.2s',
                        '&:hover': {
                            bgcolor: 'rgba(116, 132, 84, 0.05)',
                        }
                    }}>
                        {/* Metadata Column */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" sx={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                color: '#748454',
                                fontSize: '0.8rem',
                                letterSpacing: '0.05em'
                            }}>
                                {date}
                            </Typography>
                            <Typography variant="caption" sx={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                color: 'rgba(244, 244, 228, 0.5)',
                                fontSize: '0.75rem'
                            }}>
                                {readingTime} MIN READ
                            </Typography>
                        </Box>

                        {/* Content Column */}
                        <Box>
                            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="h4" sx={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontWeight: 600,
                                    color: '#F4F4E4',
                                    mb: 2,
                                    fontSize: '2rem',
                                    lineHeight: 1.1,
                                    transition: '0.2s',
                                    '&:hover': { color: '#748454' }
                                }}>
                                    {title}
                                </Typography>
                            </Link>

                            <Typography variant="body1" sx={{
                                fontFamily: 'Cormorant Garamond, serif',
                                color: 'rgba(244, 244, 228, 0.8)',
                                lineHeight: 1.6,
                                mb: 3,
                                maxWidth: '90%'
                            }}>
                                {excerpt}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {tags?.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            borderRadius: 0,
                                            bgcolor: 'transparent',
                                            border: '1px solid rgba(116, 132, 84, 0.3)',
                                            color: '#748454',
                                            fontFamily: 'Space Grotesk, sans-serif',
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ))}

                {allPostsData.length === 0 && (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic' }}>
                            No entries found.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
}
