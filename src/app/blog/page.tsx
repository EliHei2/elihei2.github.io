

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
// Note: In a real Next.js App Router, this data fetching should be passed from a Server Component.
// Since we are doing a quick refactor, I will assume we might need to fetch this or hardcode for now if strict client.
// However, looking at previous implementation, it was client-side listing?
// Ah, `getSortedPostsData` is fs based, so must run on server. 
// Refactoring to Server Component is safer for fs access.

// Let's check if the previous file was a server or client component.
// It WAS a Server Component (default).
// I will keep it as a Server Component.

import { getAllPosts as fetchPosts } from '../../lib/blog';

export default async function Blog() {
    const allPostsData = fetchPosts();

    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Typography variant="h2" gutterBottom>Writings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {allPostsData.map(({ slug, date, title, excerpt }) => (
                    <Box key={slug}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
                            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" sx={{ color: '#383838', '&:hover': { color: '#2BBC8A', textDecoration: 'underline' } }}>
                                    {title}
                                </Typography>
                            </Link>
                            <Typography variant="caption" sx={{ color: '#999', fontFamily: 'monospace' }}>
                                {date}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666' }}>
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
