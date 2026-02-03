import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Divider from '@mui/material/Divider';
import rehypeRaw from 'rehype-raw';

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

    const readingTime = post.readingTime;

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                {post.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" color="text.secondary">
                    {post.date}
                </Typography>
                <Chip
                    label={`${readingTime} min read`}
                    size="small"
                    sx={{ bgcolor: '#2BBC8A', color: '#fff', fontWeight: 600 }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
                {post.tags?.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ bgcolor: '#f0f0f0', fontWeight: 600, color: '#333' }}
                    />
                ))}
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{
                '& h1': { typography: 'h3', mt: 5, mb: 2, fontWeight: 800, color: '#2BBC8A' },
                '& h2': { typography: 'h4', mt: 4, mb: 2, fontWeight: 700, color: '#383838', borderBottom: '2px solid #2BBC8A', pb: 1 },
                '& h3': { typography: 'h5', mt: 3, mb: 1, fontWeight: 700, color: '#555' },
                '& p': { typography: 'body1', mb: 2, lineHeight: 1.8, color: '#444' },
                '& li': { typography: 'body1', mb: 1, lineHeight: 1.7 },
                '& strong': { color: '#2BBC8A', fontWeight: 700 },
                '& em': { color: '#666', fontStyle: 'italic' },
                '& code': { bgcolor: '#f5f5f5', color: '#d63384', p: 0.5, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9em' },
                '& pre': { bgcolor: '#1a1a1a', color: '#f8f8f2', p: 3, borderRadius: 2, overflowX: 'auto', mb: 3 },
                '& pre code': { bgcolor: 'transparent', p: 0, color: 'inherit' },
                '& blockquote': { borderLeft: '4px solid #2BBC8A', bgcolor: '#fafafa', pl: 3, pr: 2, py: 2, fontStyle: 'italic', my: 3, borderRadius: '0 8px 8px 0' },
                '& blockquote p': { mb: 0, color: '#555' },
                '& a': { color: '#2BBC8A', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } },
                '& table': { width: '100%', borderCollapse: 'collapse', my: 3 },
                '& th': { bgcolor: '#2BBC8A', color: '#fff', p: 1.5, textAlign: 'left', fontWeight: 700 },
                '& td': { p: 1.5, borderBottom: '1px solid #eee' },
                '& tr:hover td': { bgcolor: '#fafafa' },
                '& hr': { border: 'none', borderTop: '2px solid #eee', my: 4 },
                '& ol': { pl: 3 },
                '& ul': { pl: 3 },
                // Center images and captions
                '& img': {
                    display: 'block',
                    mx: 'auto',
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    my: 4
                },
                '& p:has(img)': {
                    textAlign: 'center',
                    mb: 1
                },
                '& p:has(img) + p > em, & p:has(img) + em, & img + em': {
                    display: 'block',
                    textAlign: 'center',
                    color: '#888',
                    fontSize: '0.9rem',
                    mt: -1,
                    mb: 4,
                    fontStyle: 'italic'
                },
            }}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
            </Box>
        </Container>
    );
}
