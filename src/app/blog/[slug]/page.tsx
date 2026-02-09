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
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, pl: 2, borderLeft: '4px solid #E0F58F' }}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, color: '#E0F58F' }}>
                    {post.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace' }}>
                        [{post.date}]
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E0F58F', fontFamily: 'monospace', fontWeight: 600 }}>
                        {readingTime} min read
                    </Typography>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Felihei2.github.io%2Fblog%2F${slug}&count_bg=%23E0F58F&title_bg=%23171717&icon=&icon_color=%23171717&title=Readers&edge_flat=true`}
                            alt="Readers"
                            style={{ height: '20px' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {post.tags?.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                        />
                    ))}
                </Box>
            </Box>

            <Box sx={{
                '& h1': { typography: 'h3', mt: 5, mb: 2, fontWeight: 800, color: '#E0F58F' },
                '& h2': { typography: 'h4', mt: 4, mb: 2, fontWeight: 700, color: '#FFFFFF', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 1 },
                '& h3': { typography: 'h5', mt: 3, mb: 1, fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' },
                '& p': { typography: 'body1', mb: 3, lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.8)' },
                '& li': { typography: 'body1', mb: 1, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.8)' },
                '& strong': { color: '#E0F58F', fontWeight: 700 },
                '& em': { color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' },
                '& code': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#E0F58F', p: 0.5, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', fontSize: '0.9em' },
                '& pre': { bgcolor: '#000000', color: '#f8f8f2', p: 3, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.1)', overflowX: 'auto', mb: 3 },
                '& pre code': { bgcolor: 'transparent', p: 0, color: 'inherit', border: 'none' },
                '& blockquote': { borderLeft: '4px solid #E0F58F', bgcolor: 'rgba(255, 255, 255, 0.02)', pl: 3, pr: 2, py: 2, fontStyle: 'italic', my: 4, borderRadius: 0 },
                '& blockquote p': { mb: 0, color: 'rgba(255, 255, 255, 0.6)' },
                '& a': { color: '#E0F58F', textDecoration: 'none', fontWeight: 600, borderBottom: '1px dotted #E0F58F', '&:hover': { borderBottom: '1px solid #E0F58F' } },
                '& table': { width: '100%', borderCollapse: 'collapse', my: 3, border: '1px solid rgba(255, 255, 255, 0.1)' },
                '& th': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#E0F58F', p: 1.5, textAlign: 'left', fontWeight: 700, border: '1px solid rgba(255, 255, 255, 0.1)' },
                '& td': { p: 1.5, border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.8)' },
                '& tr:hover td': { bgcolor: 'rgba(255, 255, 255, 0.02)' },
                '& hr': { border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', my: 6 },
                '& ol': { pl: 3, color: 'rgba(255, 255, 255, 0.8)' },
                '& ul': { pl: 3, color: 'rgba(255, 255, 255, 0.8)' },
                // Center images and captions
                '& img': {
                    display: 'block',
                    mx: 'auto',
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 0,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    my: 4
                },
                '& p:has(img)': {
                    textAlign: 'center',
                    mb: 1
                },
                '& p:has(img) + p > em, & p:has(img) + em, & img + em': {
                    display: 'block',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    mt: -1,
                    mb: 4,
                    fontStyle: 'italic'
                },
            }}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
            </Box>

            <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <BlogInteractions slug={slug} />
            </Box>
        </Container>
    );
}
