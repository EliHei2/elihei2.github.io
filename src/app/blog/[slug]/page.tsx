import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import rehypeRaw from 'rehype-raw';
import BlogInteractions from '@/components/BlogInteractions';
import { serifFont, interFont, ink, inkSecondary, accent, oldstyle } from '@/theme/tokens';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return { title: 'Post Not Found' };
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box className="reading-substrate" sx={{ maxWidth: 680, mx: 'auto', pt: { xs: 2, md: 4 }, pb: 10 }}>
                {/* Header */}
                <Box sx={{ mb: 6, borderBottom: '1px solid rgba(52, 52, 52, 0.10)', pb: 4 }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ fontFamily: serifFont, fontWeight: 700, mb: 3, color: ink, fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1.15 }}
                    >
                        {post.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', fontFamily: interFont, color: inkSecondary, fontSize: '0.85rem' }}>
                        <Box component="span" sx={oldstyle}>{post.date}</Box>
                        <Box component="span">{readingTime} min read</Box>
                    </Box>

                    {post.tags && post.tags.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
                            {post.tags.map((tag) => (
                                <Typography key={tag} sx={{ fontFamily: interFont, fontSize: '0.75rem', color: accent }}>
                                    {tag}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                            fontFamily: serifFont,
                            color: ink,
                            fontWeight: 600,
                            mt: 5,
                            mb: 2,
                            lineHeight: 1.25,
                        },
                        '& h1': { fontSize: '2rem' },
                        '& h2': { fontSize: '1.6rem' },
                        '& h3': { fontSize: '1.3rem' },
                        '& p': { fontFamily: serifFont, fontSize: '1.15rem', lineHeight: 1.7, mb: 3, color: ink },
                        '& ul, & ol': { fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.7, mb: 3, pl: 3, color: ink },
                        '& li': { mb: 1 },
                        '& strong': { color: ink, fontWeight: 600 },
                        '& em': { fontStyle: 'italic', color: inkSecondary },
                        '& blockquote': {
                            borderLeft: `2px solid ${accent}`,
                            pl: 3,
                            my: 4,
                            py: 0.5,
                            fontStyle: 'italic',
                            color: inkSecondary,
                        },
                        '& code': {
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            bgcolor: 'rgba(52, 52, 52, 0.05)',
                            color: ink,
                            px: 0.8,
                            py: 0.2,
                            fontSize: '0.85em',
                            borderRadius: '3px',
                        },
                        '& pre': {
                            bgcolor: '#0f1419',
                            p: 3,
                            overflowX: 'auto',
                            mb: 4,
                            borderRadius: '6px',
                        },
                        '& pre code': {
                            bgcolor: 'transparent',
                            p: 0,
                            color: '#e6e6e6',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        },
                        '& a': {
                            color: accent,
                            textDecoration: 'underline',
                            textDecorationColor: 'rgba(41, 107, 159, 0.4)',
                            textUnderlineOffset: '3px',
                            '&:hover': { textDecorationColor: accent },
                        },
                        '& table': { borderCollapse: 'collapse', width: '100%', mb: 4, fontFamily: serifFont, fontSize: '1rem' },
                        '& th, & td': { border: '1px solid rgba(52,52,52,0.15)', p: 1.5, textAlign: 'left' },
                        '& img': {
                            maxWidth: '100%',
                            height: 'auto',
                            display: 'block',
                            margin: '2rem auto',
                            borderRadius: '4px',
                        },
                    }}
                >
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
                </Box>

                <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid rgba(52, 52, 52, 0.10)' }}>
                    <BlogInteractions slug={slug} />
                </Box>
            </Box>
        </Container>
    );
}
