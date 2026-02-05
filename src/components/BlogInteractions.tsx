'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Giscus from '@giscus/react';
import { RateButton, ClapButton } from '@lyket/react';

interface BlogInteractionsProps {
    slug: string;
}

export default function BlogInteractions({ slug }: BlogInteractionsProps) {
    return (
        <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 6 }} />

            {/* Engagement & Star Review Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 4,
                mb: 8,
                p: 4,
                bgcolor: '#fafafa',
                borderRadius: 2,
                border: '1px solid #eee'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#383838' }}>
                        Rate this post
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        What did you think of this article?
                    </Typography>
                    <RateButton
                        id={`stars-${slug}`}
                        namespace="blog"
                        component={RateButton.templates.Star}
                    />
                </Box>

                <Box sx={{ textAlign: { sm: 'right' } }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#383838' }}>
                        Show appreciation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        If you found this helpful, let me know!
                    </Typography>
                    <ClapButton
                        id={`clap-${slug}`}
                        namespace="blog"
                        component={ClapButton.templates.Medium}
                    />
                </Box>
            </Box>

            {/* Comments Section */}
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#383838', borderBottom: '2px solid #2BBC8A', pb: 1, display: 'inline-block' }}>
                    Comments
                </Typography>
                <Giscus
                    id="comments"
                    repo="EliHei2/elihei2.github.io"
                    repoId="R_kgDOM7Z-_A"
                    category="Announcements"
                    categoryId="DIC_kwDOM7Z-_M4Cik-B"
                    mapping="pathname"
                    strict="0"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="bottom"
                    theme="light"
                    lang="en"
                    loading="lazy"
                />
            </Box>
        </Box>
    );
}
