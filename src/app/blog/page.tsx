import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import PostCard from '@/components/PostCard';

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 6 }}>
                Blog
            </Typography>
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <Grid key={post.slug} size={{ xs: 12, md: 6 }}>
                        <PostCard post={post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
