'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

// Extracted from motivation letters
const researchInterests = [
  "Geometric Deep Learning",
  "Agentic Systems",
  "Spatial Omics",
  "Foundation Models"
];

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center', gap: 6, mb: 12 }}>

        {/* Lead Text */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800 }}>
            Building robust <br />
            <Box component="span" sx={{ color: 'primary.main' }}>discovery infrastructure</Box> <br />
            for biology.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.15rem', mb: 4, color: '#555', lineHeight: 1.8 }}>
            I am a PhD Researcher at <strong>DKFZ & EMBL Heidelberg</strong>. My work targets the gap between elegant modeling ideas and scalable, reproducible learning systems.
            I build <strong>foundation models</strong> and <strong>agentic workflows</strong> that turn massive multimodal data into reliable substrates for therapeutic discovery.
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

      {/* Vision / Gist from Motivation Letters */}
      <Box sx={{ mb: 12, p: 4, bgcolor: '#fafafa', borderRadius: 4, borderLeft: '4px solid #2BBC8A' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>Research Philosophy</Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#444' }}>
          "The most important work sits between representation learning and adoption: defining operational meaning, building evaluations that resist shortcut learning, and engineering interfaces that allow safe fine-tuning."
        </Typography>
        <Typography variant="body1" sx={{ color: '#444' }}>
          My goal is to ensure that biological foundation models become <strong>reliable infrastructure</strong> rather than just impressive artifacts. I focus on evaluation realism, data contracts, and deployment ergonomics to shorten the path from mechanistic understanding to actionable therapeutic hypotheses.
        </Typography>
      </Box>

      {/* Highlights */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom>Selected Highlights</Typography>
        <Box component="ul" sx={{ pl: 2, '& li': { mb: 3 } }}>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Scale & Performance</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Engineered distributed GNN training pipelines for spatial transcriptomics handling <strong>10M+ nodes</strong> with 1000x speedups (<em>Segger</em>).
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Methodological Innovation</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Pioneered supervised spatial inference using <strong>Graph Attention Networks</strong> and Transformers (<em>SageNet</em>).
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ color: '#383838' }}>Open Source Leadership</Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Maintainer of <Link href="/projects" style={{ color: '#2BBC8A' }}>multiple production-grade tools</Link> with extensive documentation and community adoption.
            </Typography>
          </li>
        </Box>
      </Box>

    </Container>
  );
}
