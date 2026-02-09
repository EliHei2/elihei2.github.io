'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const researchInterests = [
  "Scalable Graph Learning",
  "Spatial Inductive Biases",
  "Multi-Omic Foundation Models",
  "Distributed ML Infrastructure"
];

export default function Home() {
  return (
    <Container maxWidth="md">
      {/* Dashboard Top Row: Identity & Status */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' },
        gap: 0,
        mt: 4,
        mb: 8,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Identity Box */}
        <Box sx={{ p: 4, borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' }, borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 0 } }}>
          <Typography variant="h1" sx={{ color: '#E0F58F', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            scalable_learning.sys
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
            phd researcher & research engineer <br />
            [dkfz & embl heidelberg]
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {researchInterests.map(tag => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        </Box>

        {/* Status Box */}
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', display: 'block' }}>current_location</Typography>
            <Typography variant="body2">heidelberg, germany (49.4° n, 8.7° e)</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', display: 'block' }}>specialization</Typography>
            <Typography variant="body2">ai for science / geometric dl</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4, mb: 12 }}>
        {/* Philosophy & Approach */}
        <Box sx={{ p: 4, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h4" sx={{ color: '#E0F58F', mb: 3 }}>research_philosophy</Typography>
          <Typography variant="body1" paragraph>
            i build learning systems that transform messy, large-scale biological data into reliable infrastructure.
          </Typography>
          <Typography variant="body1" paragraph>
            my focus is designing gnn and transformer pipelines that scale to 10m+ nodes while preserving mechanistic interpretability.
          </Typography>
          <Link href="/about" style={{ color: '#E0F58F', fontWeight: 700 }}>
            [view_detailed_bio]
          </Link>
        </Box>

        {/* Quick Links / Metadata */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ p: 3, border: '1px solid rgba(255, 255, 255, 0.1)', bgcolor: 'rgba(224, 245, 143, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#E0F58F', mb: 2 }}>latest_updates</Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
              <li>segger_framework v1.0 released</li>
              <li>spatial_data_standardization update</li>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Scientific Dimensions Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" sx={{ mb: 4, display: 'inline-block', borderBottom: '2px solid #E0F58F', pb: 0.5 }}>scientific_dimensions</Typography>
        <Box sx={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Box sx={{ p: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h6" sx={{ color: '#E0F58F', mb: 1 }}>spatial & single-cell omics</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              end-to-end pipelines for spatial transcriptomics and multimodal integration.
            </Typography>
          </Box>
          <Box sx={{ p: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h6" sx={{ color: '#E0F58F', mb: 1 }}>scalable graph neural networks</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              multi-gpu training for heterogeneous gnns on graphs with 100m+ edges.
            </Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: '#E0F58F', mb: 1 }}>open-source tooling</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              architecting frameworks (segger, sagenet, scgcn) for biological discovery.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
