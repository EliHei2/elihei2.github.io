'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          textAlign: 'left', // Aligned left for sidebar layout
          animation: 'fadeIn 0.8s ease-in-out',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: 600, letterSpacing: '0.1em', mb: 2, textTransform: 'uppercase' }}
          >
            Portfolio
          </Typography>

          <Typography
            component="h1"
            variant="h1"
            sx={{
              maxWidth: '800px',
              mb: 4,
              fontSize: { xs: '2.5rem', md: '4rem' }, // larger on desktop
            }}
          >
            Building scalable learning systems for <span style={{ color: '#8ab4f8' }}>biomedical data</span>.
          </Typography>

          <Typography variant="body1" paragraph sx={{ maxWidth: '700px', mb: 6, fontSize: '1.2rem', color: 'text.secondary' }}>
            I am a <strong>PhD Researcher</strong> at <strong>DKFZ & EMBL Heidelberg</strong>, specializing in AI for Life Sciences.
            My work bridges the gap between scalable machine learning and complex biological systems, transforming ill-posed real-world structures into robust, high-performance implementations.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 10 }}>
            <Button variant="contained" size="large" component={Link} href="/projects">
              View Projects
            </Button>
            <Button variant="outlined" size="large" component={Link} href="/about">
              More About Me
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', borderTop: '4px solid #8ab4f8' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Research</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scalable Graph Learning, Multi-agent Systems, Spatial Omics at 10M+ scale.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', borderTop: '4px solid #c58af9' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Engineering</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Distributed multi-GPU systems, Production-grade ML pipelines, Reproducible Research.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', borderTop: '4px solid #81c995' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Open Source</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Creator of <strong>segger</strong> and <strong>SageNet</strong>. Active contributor to the scverse ecosystem.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </Box>
  );
}
