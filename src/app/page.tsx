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
            Architecting <Box component="span" sx={{ color: 'primary.main' }}>scalable learning systems</Box> <br />
            for biomedical discovery.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.15rem', mb: 4, color: '#555', lineHeight: 1.8 }}>
            I am a <strong>Research Engineer in AI for Biology</strong> at <strong>DKFZ & EMBL Heidelberg</strong>.
            I bridge the gap between elegant modeling and production-grade systems, translating complex biological world-models into reliable,
            distributed infrastructure for therapeutic discovery.
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

      {/* Philosophy */}
      <Box sx={{ mb: 12, p: 4, bgcolor: '#fafafa', borderRadius: 4, borderLeft: '4px solid #2BBC8A' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>Discovery Infrastructure</Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#444' }}>
          "Moving beyond impressive but fragile artifacts toward biological representations that earn their value through downstream utility and uncertainty-aware reasoning."
        </Typography>
        <Typography variant="body1" sx={{ color: '#444' }}>
          My work operates at the intersection of <strong>representation learning</strong> and <strong>research engineering</strong>.
          I focus on evaluation realism, data contracts, and deployment ergonomics to turn high-dimensional multimodal signals into a dependable substrate for biological interrogation.
        </Typography>
      </Box>

      {/* Technical Pillar Highlights */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom>Technical Pillars</Typography>
        <Box component="ul" sx={{ pl: 2, '& li': { mb: 3 } }}>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Distributed Graph Learning</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Scaling GNNs and Transformers to <strong>10M+ molecular measurements</strong> with multi-GPU distributed pipelines (<em>Segger</em>, <em>SageNet</em>).
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Multi-Agent Research Engineering</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Designing agentic workflows for automated code generation, refactoring, and data-driven hypothesis testing in biological discovery.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Reliability & Interoperability</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Building <strong>universal data frameworks</strong> and benchmarking systems that ensure cross-site robustness and operational stability.
            </Typography>
          </li>
        </Box>
      </Box>

    </Container>
  );
}
