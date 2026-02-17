import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Divider from '@mui/material/Divider';
import rehypeRaw from 'rehype-raw';
import BlogInteractions from '@/components/BlogInteractions';

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
        <Container maxWidth="md" sx={{
            mt: 16,
            mb: 16,
            position: 'relative',
            zIndex: 10
        }}>
            {/* Header Section */}
            <Box sx={{ mb: 8, borderBottom: '1px solid rgba(116, 132, 84, 0.2)', pb: 6 }}>
                <Typography variant="h1" component="h1" sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    mb: 4,
                    color: '#F4F4E4',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em'
                }}>
                    {post.title}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 4,
                    flexWrap: 'wrap',
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#748454',
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    <Box>
                        <Box component="span" sx={{ color: 'rgba(244, 244, 228, 0.4)', mr: 1 }}>PUBLISHED</Box>
                        {post.date}
                    </Box>
                    <Box>
                        <Box component="span" sx={{ color: 'rgba(244, 244, 228, 0.4)', mr: 1 }}>READING TIME</Box>
                        {readingTime} MIN
                    </Box>
                    <Box>
                        {/* Optional Badge integrated more subtly if needed, or removed for purity */}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 3 }}>
                    {post.tags?.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                borderRadius: 0,
                                bgcolor: 'rgba(116, 132, 84, 0.1)',
                                border: 'none',
                                color: '#F4F4E4',
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: '0.7rem',
                                letterSpacing: '0.05em'
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Content Section */}
            <Box sx={{
                // Typography Override for Markdown Content
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: '#F4F4E4',
                    fontWeight: 600,
                    mt: 6,
                    mb: 3
                },
                '& h1': { fontSize: '2.5rem' },
                '& h2': { fontSize: '2rem', borderBottom: '1px solid rgba(116, 132, 84, 0.2)', pb: 1 },
                '& h3': { fontSize: '1.5rem', color: '#748454' },

                '& p': {
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.25rem',
                    lineHeight: 1.8,
                    mb: 3,
                    color: 'rgba(244, 244, 228, 0.9)'
                },
                '& ul, & ol': {
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    mb: 3,
                    pl: 3,
                    color: 'rgba(244, 244, 228, 0.9)'
                },
                '& li': { mb: 1 },

                '& strong': { color: '#F4F4E4', fontWeight: 700 },
                '& em': { fontStyle: 'italic', color: 'rgba(244, 244, 228, 0.7)' },

                '& blockquote': {
                    borderLeft: '2px solid #748454',
                    pl: 4,
                    my: 4,
                    py: 1,
                    fontStyle: 'italic',
                    color: 'rgba(244, 244, 228, 0.8)'
                },

                '& code': {
                    fontFamily: 'Space Grotesk, monospace', // Or a real mono font if available
                    bgcolor: 'rgba(116, 132, 84, 0.15)',
                    color: '#F4F4E4',
                    px: 0.8,
                    py: 0.2,
                    fontSize: '0.85em',
                    borderRadius: '2px'
                },
                '& pre': {
                    bgcolor: '#050505',
                    p: 3,
                    overflowX: 'auto',
                    mb: 4,
                    border: '1px solid rgba(116, 132, 84, 0.2)'
                },
                '& pre code': {
                    bgcolor: 'transparent',
                    p: 0,
                    color: 'inherit',
                    fontFamily: 'monospace'
                },

                '& a': {
                    color: '#748454',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(116, 132, 84, 0.4)',
                    textUnderlineOffset: '4px',
                    transition: '0.2s',
                    '&:hover': {
                        color: '#F4F4E4',
                        textDecorationColor: '#748454'
                    }
                },

                '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '2rem auto',
                    border: '1px solid rgba(116, 132, 84, 0.2)'
                }
            }}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
            </Box>

            <Box sx={{ mt: 12, pt: 8, borderTop: '1px solid rgba(116, 132, 84, 0.2)' }}>
                <BlogInteractions slug={slug} />
            </Box>
        </Container>
    );
}
