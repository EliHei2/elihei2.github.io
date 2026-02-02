import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Divider from '@mui/material/Divider';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }
    return {
        title: `${post.title} | Elyas Heidari`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h4">Post not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {post.date}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                {post.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                ))}
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{
                '& h1': { typography: 'h3', mt: 4, mb: 2 },
                '& h2': { typography: 'h4', mt: 3, mb: 2 },
                '& h3': { typography: 'h5', mt: 2, mb: 1 },
                '& p': { typography: 'body1', mb: 2, lineHeight: 1.7 },
                '& li': { typography: 'body1', mb: 1 },
                '& code': { bgcolor: 'action.hover', p: 0.5, borderRadius: 1, fontFamily: 'monospace' },
                '& pre': { bgcolor: '#2d2d2d', color: '#fff', p: 2, borderRadius: 2, overflowX: 'auto', mb: 2 },
                '& pre code': { bgcolor: 'transparent', p: 0, color: 'inherit' },
                '& blockquote': { borderLeft: '4px solid #ccc', pl: 2, fontStyle: 'italic', my: 2 },
            }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </Box>
        </Container>
    );
}
