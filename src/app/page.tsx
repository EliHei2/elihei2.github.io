'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center', gap: 6, mb: 8 }}>

        {/* Lead Text */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Building scalable learning systems for <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>biomedical data</Box>.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4, color: '#555' }}>
            I am a PhD Researcher at <strong>DKFZ & EMBL Heidelberg</strong>. I work at the intersection of Machine Learning, Graph Theory, and Spatial Omics, creating robust tools for biological discovery.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/projects" style={{ textDecoration: 'underline', color: '#2BBC8A', fontWeight: 600 }}>
              &rarr; View Projects
            </Link>
            <Link href="/about" style={{ textDecoration: 'underline', color: '#383838', fontWeight: 600 }}>
              &rarr; More About Me
            </Link>
          </Box>
        </Box>

        {/* Profile Image - Circular as per inspiration */}
        <Box>
          <Avatar
            src="/profile.jpg"
            alt="Elyas Heidari"
            sx={{ width: 220, height: 220, border: '4px solid #fff', boxShadow: '0 0 0 1px #eee' }}
          />
        </Box>
      </Box>

      {/* Highlights - Simple Text list */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom>Research Highlights</Typography>
        <Box component="ul" sx={{ pl: 2, '& li': { mb: 2 } }}>
          <li>
            <Typography variant="body1">
              <strong>Spatial Graph Learning</strong>: Developing GNNs for 10M+ cell datasets.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Engineering</strong>: Distributed multi-GPU systems for production-grade ML.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Open Source</strong>: Creator of <Link href="/projects" style={{ color: '#2BBC8A' }}>segger</Link> and <Link href="/projects" style={{ color: '#2BBC8A' }}>SageNet</Link>.
            </Typography>
          </li>
        </Box>
      </Box>

    </Container>
  );
}
