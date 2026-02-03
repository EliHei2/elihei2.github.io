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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center', gap: 6, mb: 12, mt: 4 }}>

        {/* Lead Text */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Scalable learning systems</Box> <br />
            for real-world biology.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.15rem', mb: 4, color: '#555', lineHeight: 1.8 }}>
            I am a <strong>PhD Researcher & Research Engineer in AI for Science</strong> at <strong>DKFZ & EMBL Heidelberg</strong>.
            I specialize in bridging the gap between expressive geometric modeling and production-scale systems,
            translating high-dimensional biological signals into robust, uncertainty-aware infrastructure for clinical and mechanistic discovery.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
            {researchInterests.map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#f0f0f0', fontWeight: 600, color: '#333', borderRadius: 1 }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="/publications" style={{ textDecoration: 'none', color: '#2BBC8A', fontWeight: 700, fontSize: '1.1rem' }}>
              &rarr; Publications & Research
            </Link>
            <Link href="/software" style={{ textDecoration: 'none', color: '#383838', fontWeight: 700, fontSize: '1.1rem' }}>
              &rarr; Software Systems
            </Link>
          </Box>
        </Box>

        {/* Profile Image */}
        <Box>
          <Avatar
            src="/profile.jpg"
            alt="Elyas Heidari"
            sx={{ width: 240, height: 240, border: '4px solid #fff', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
          />
        </Box>
      </Box>

      {/* Concrete Research Philosophy */}
      <Box sx={{ mb: 12, p: 4, bgcolor: '#fafafa', borderRadius: 2, borderLeft: '4px solid #2BBC8A' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Research Philosophy</Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.7 }}>
          I target the <strong>representational gap</strong> between cellular topology and machine learning efficiency.
          True discovery infrastructure must resist shortcut learning and out-of-distribution shifts inherent in clinical cohorts.
          My work focuses on engineering pipelines that ensure expressive models (Transformers, GNNs) maintain high-fidelity mechanistic
          utility when deployed at the scale of <strong>millions of objects and multi-modal constraints</strong>.
        </Typography>
      </Box>

      {/* Scientific Axis Highlights */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', fontWeight: 800 }}>Scientific Dimensions</Typography>
        <Box component="ul" sx={{ pl: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
          <li>
            <Box sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
              <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700, mb: 1 }}>Biological Domain Logic</Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Deep technical integration of <strong>spatial niche dynamics</strong> and molecular heterogeneity into modeling priors.
                I bridge computational topology with mechanistic experimental design to unlock therapeutic insights.
              </Typography>
            </Box>
          </li>
          <li>
            <Box sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
              <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700, mb: 1 }}>Modeling & High-Performance Compute</Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Engineering distributed training orchestration for large-scale <strong>Graph Neural Networks</strong>.
                Enabled high-throughput spatial phenotyping on 10M+ node graphs with 1000x speedups relative to established baselines.
              </Typography>
            </Box>
          </li>
          <li>
            <Box>
              <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700, mb: 1 }}>Open-Source Framework Architecture</Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Architecting global-scale toolkits (<em>Segger</em>, <em>SageNet</em>, <em>scGCN</em>) and contributing to universal data
                standards like <strong>SpatialData</strong> to ensure reproducibility and community-driven discovery.
              </Typography>
            </Box>
          </li>
        </Box>
      </Box>

    </Container>
  );
}
