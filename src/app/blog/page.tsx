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
            <Typography variant="h2" sx={{
                mb: 6,
                display: 'inline-block',
                borderBottom: '2px solid #E0F58F',
                pb: 0.5
            }}>
                writings.log
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {allPostsData.map(({ slug, date, title, excerpt, tags, readingTime }) => (
                    <Box key={slug} sx={{
                        p: 4,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: '0.2s',
                        '&:hover': {
                            borderColor: '#E0F58F',
                            bgcolor: 'rgba(224, 245, 143, 0.02)',
                            transform: 'translateY(-2px)'
                        }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" sx={{
                                    fontWeight: 700,
                                    color: '#E0F58F',
                                    fontSize: '1.25rem'
                                }}>
                                    {title.toLowerCase()}
                                </Typography>
                            </Link>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>
                                    [{date}]
                                </Typography>
                                <Typography variant="caption" sx={{
                                    color: '#E0F58F',
                                    fontWeight: 600,
                                    fontFamily: 'monospace',
                                    bgcolor: 'rgba(224, 245, 143, 0.1)',
                                    px: 1,
                                    py: 0.2
                                }}>
                                    {readingTime}min
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, mb: 3 }}>
                            {excerpt}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {tags?.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                ))}

                {allPostsData.length === 0 && (
                    <Box sx={{ p: 4, border: '1px dashed rgba(255, 255, 255, 0.2)', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic' }}>
                            // no_posts_found
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
}
