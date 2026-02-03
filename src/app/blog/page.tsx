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
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, mb: 6 }}>Writings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {allPostsData.map(({ slug, date, title, excerpt, tags, readingTime }) => (
                    <Box key={slug} sx={{ borderLeft: '2px solid transparent', pl: 0, transition: '0.3s', '&:hover': { borderLeft: '2px solid #2BBC8A', pl: 3 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 2 }}>
                            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#383838', '&:hover': { color: '#2BBC8A' } }}>
                                    {title}
                                </Typography>
                            </Link>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="caption" sx={{ color: '#999', fontFamily: 'monospace' }}>
                                    {date}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#2BBC8A', fontWeight: 600, bgcolor: '#f0fbf7', px: 1, py: 0.2, borderRadius: 1 }}>
                                    {readingTime} min
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                            {tags?.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        height: '20px',
                                        fontSize: '0.7rem',
                                        bgcolor: '#f5f5f5',
                                        color: '#666',
                                        fontWeight: 600,
                                        '& .MuiChip-label': { px: 1 }
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                            {excerpt}
                        </Typography>
                    </Box>
                ))}
                {allPostsData.length === 0 && (
                    <Typography variant="body1" sx={{ color: '#999', fontStyle: 'italic' }}>
                        No posts yet. Check back soon.
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
