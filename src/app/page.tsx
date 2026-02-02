'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          pt: 15,
          pb: 10,
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h1"
            color="text.primary"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #005f73 30%, #94d2bd 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 4,
            }}
          >
            Elyas Heidari
          </Typography>
          <Typography variant="h3" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400 }}>
            Research Engineer
            <br />
            Computational Biologist
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '600px', mx: 'auto', mb: 6 }}>
            Specializing in single-cell spatial genomics, graph neural networks, and statistical machine learning.
            Creator of <strong>segger</strong> and <strong>SageNet</strong>.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" size="large" component={Link} href="/projects">
              View Projects
            </Button>
            <Button variant="outlined" size="large" component={Link} href="/about">
              More About Me
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Highlights (Placeholder for now) */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Research Highlights
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  segger
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A graph-neural-network-based tool for cell segmentation in single-molecule spatial omics data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  SageNet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A robust framework for spatial gene expression reconstruction and mapping.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
