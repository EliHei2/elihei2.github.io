'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const researchInterests = [
  "Scalable ML Systems",
  "Foundation Models",
  "Geometric Deep Learning",
  "Multi-Agent Automation"
];

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center', gap: 6, mb: 12 }}>

        {/* Lead Text */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800 }}>
            Scalable learning systems <br />
            for <Box component="span" sx={{ color: 'primary.main' }}>biomedical discovery</Box>.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.15rem', mb: 4, color: '#555', lineHeight: 1.8 }}>
            I am a <strong>Research Engineer in AI for Biology</strong> at <strong>DKFZ & EMBL Heidelberg</strong>.
            I bridge the gap between elegant modeling and production-grade systems, translating complex biological world-models into reliable infrastructure for clinical discovery.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
            {researchInterests.map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#f0f0f0', fontWeight: 600, color: '#333' }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="/projects" style={{ textDecoration: 'none', color: '#2BBC8A', fontWeight: 700, fontSize: '1.1rem' }}>
              &rarr; View Software
            </Link>
            <Link href="/about" style={{ textDecoration: 'none', color: '#383838', fontWeight: 700, fontSize: '1.1rem' }}>
              &rarr; Full Bio & CV
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
      <Box sx={{ mb: 12, p: 4, bgcolor: '#fafafa', borderRadius: 4, borderLeft: '4px solid #2BBC8A' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>Research Philosophy</Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.7 }}>
          I target the <strong>representational gap</strong> between biological complexity and machine learning efficiency.
          My goal is to build discovery infrastructure that transforms high-dimensional signals into robust,
          uncertainty-aware substrates for therapeutic interrogation—moving fromImpressive artifacts to reliable engines of mechanistic insight.
        </Typography>
      </Box>

      {/* Scientific Axis Highlights */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom>Scientific Highlights</Typography>
        <Box component="ul" sx={{ pl: 2, '& li': { mb: 4 } }}>
          <li>
            <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700 }}>Domain Mastery in Biology</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Deep technical expertise in <strong>single-cell and spatial omics</strong>, bridging computational
              methodology with clinical translation and mechanistic experimental design.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700 }}>Modeling & Large-Scale Compute</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Engineering distributed training pipelines for <strong>GNNs and Transformers</strong> on 10M+ node graphs,
              achieving 1000x speedups in high-throughput spatial phenotyping.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838', fontWeight: 700 }}>Open-Source Software Leadership</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Architecting and maintaining production-ready frameworks (<em>Segger</em>, <em>SageNet</em>, <em>scGCN</em>) adopted
              globally for robust biological data integration and inference.
            </Typography>
          </li>
        </Box>
      </Box>

    </Container>
  );
}
