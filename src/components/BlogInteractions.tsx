'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Giscus from '@giscus/react';
import { RateButton, ClapButton, Provider as LyketProvider } from '@lyket/react';
import { interFont, inkSecondary } from '@/theme/theme';

interface BlogInteractionsProps {
    slug: string;
}

export default function BlogInteractions({ slug }: BlogInteractionsProps) {
    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', mb: 6, alignItems: 'center' }}>
                <Box>
                    <Typography sx={{ fontFamily: interFont, fontSize: '0.8rem', color: inkSecondary, mb: 1 }}>
                        Rate this post
                    </Typography>
                    <LyketProvider apiKey="pt-f6079c6ad8d6693c046e7f8e1290ed">
                        <RateButton id={`stars-${slug}`} namespace="blog" component={RateButton.templates.Star} />
                    </LyketProvider>
                </Box>
                <Box>
                    <Typography sx={{ fontFamily: interFont, fontSize: '0.8rem', color: inkSecondary, mb: 1 }}>
                        Applause
                    </Typography>
                    <LyketProvider apiKey="pt-f6079c6ad8d6693c046e7f8e1290ed">
                        <ClapButton id={`clap-${slug}`} namespace="blog" component={ClapButton.templates.Medium} />
                    </LyketProvider>
                </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontFamily: interFont, fontSize: '0.8rem', color: inkSecondary, mb: 2 }}>
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
