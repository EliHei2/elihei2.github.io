'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { Provider as LyketProvider } from '@lyket/react';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <LyketProvider apiKey="pt-f6079c6ad8d6693c046e7f8e1290ed">
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </LyketProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
