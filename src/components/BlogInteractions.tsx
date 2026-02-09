'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Giscus from '@giscus/react';
import { RateButton, ClapButton, Provider as LyketProvider } from '@lyket/react';

interface BlogInteractionsProps {
    slug: string;
}

export default function BlogInteractions({ slug }: BlogInteractionsProps) {
    return (
        <Box sx={{ mt: 8 }}>
            {/* Engagement & Star Review Section */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 0,
                mb: 8,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                bgcolor: 'rgba(255, 255, 255, 0.02)'
            }}>
                <Box sx={{ p: 4, borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' }, borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 0 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#E0F58F', fontSize: '0.9rem' }}>
                        // rate_this_post
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                        qualitative metric collection
                    </Typography>
                    <LyketProvider apiKey="pt-f6079c6ad8d6693c046e7f8e1290ed">
                        <RateButton
                            id={`stars-${slug}`}
                            namespace="blog"
                            component={RateButton.templates.Star}
                        />
                    </LyketProvider>
                </Box>

                <Box sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#E0F58F', fontSize: '0.9rem' }}>
                        // show_appreciation
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                        signal peer support
                    </Typography>
                    <LyketProvider apiKey="pt-f6079c6ad8d6693c046e7f8e1290ed">
                        <ClapButton
                            id={`clap-${slug}`}
                            namespace="blog"
                            component={ClapButton.templates.Medium}
                        />
                    </LyketProvider>
                </Box>
            </Box>

            {/* Comments Section */}
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: '#E0F58F',
                    borderBottom: '2px solid #E0F58F',
                    pb: 0.5,
                    display: 'inline-block',
                    fontSize: '1.25rem'
                }}>
                    discussions.log
                </Typography>
                <Box sx={{ p: 3, border: '1px solid rgba(255, 255, 255, 0.1)', bgcolor: '#1a1a1a' }}>
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
                        theme="dark"
                        lang="en"
                        loading="lazy"
                    />
                </Box>
            </Box>
        </Box>
    );
}
