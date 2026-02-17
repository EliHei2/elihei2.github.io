'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

const researchInterests = [
  "Scalable Graph Learning",
  "Spatial Inductive Biases",
  "Multi-Omic Foundation Models",
  "Distributed ML Infrastructure"
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
      {/* Hero / Identity Section */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 8,
        mt: 12,
        mb: 16
      }}>
        {/* Left: Introduction */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h1" sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '3rem', md: '4.5rem' },
            lineHeight: 0.9,
            mb: 4,
            color: '#F4F4E4'
          }}>
            SCALABLE<br />LEARNING<br />SYSTEMS
          </Typography>
          <Box sx={{ borderTop: '1px solid rgba(116, 132, 84, 0.3)', pt: 4 }}>
            <Typography variant="h6" sx={{ color: '#748454', mb: 2 }}>ABSTRACT</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(244, 244, 228, 0.9)', fontSize: '1.25rem', lineHeight: 1.6 }}>
              I am a <strong style={{ color: '#F4F4E4' }}>Research Engineer</strong> in AI for Science at DKFZ & EMBL Heidelberg. My work bridges the gap between expressive geometric modeling and production-scale systems, translating high-dimensional biological signals into robust infrastructure for discovery.
            </Typography>
          </Box>
        </Box>

        {/* Right: Metadata Grid */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 2
        }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            bgcolor: 'rgba(116, 132, 84, 0.2)',
            border: '1px solid rgba(116, 132, 84, 0.2)',
            p: '1px'
          }}>
            {[
              { label: 'LOCATION', value: 'HEIDELBERG, DE' },
              { label: 'INSTITUTE', value: 'DKFZ / EMBL' },
              { label: 'FOCUS', value: 'AI FOR SCIENCE' },
              { label: 'SPECIALIZATION', value: 'SCALABLE MODELS FOR BIO' }
            ].map((item, i) => (
              <Box key={i} sx={{ bgcolor: 'rgba(8, 8, 8, 0.8)', p: 3, backdropFilter: 'blur(4px)' }}>
                <Typography variant="caption" sx={{ color: '#748454', display: 'block', mb: 1 }}>{item.label}</Typography>
                <Typography variant="body2" sx={{ color: '#F4F4E4' }}>{item.value}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {[
              { icon: <GitHubIcon />, href: "https://github.com/EliHei2" },
              { icon: <EmailIcon />, href: "mailto:elyas.heidari@dkfz-heidelberg.de" },
              { icon: <SchoolIcon />, href: "https://scholar.google.com/citations?user=1tjJjf8AAAAJ" }
            ].map((social, i) => (
              <IconButton
                key={i}
                href={social.href}
                target="_blank"
                sx={{
                  borderRadius: 0,
                  border: '1px solid rgba(116, 132, 84, 0.3)',
                  color: '#748454',
                  '&:hover': { bgcolor: '#748454', color: '#080808' }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Research Dimensions */}
      <Box sx={{ mb: 16 }}>
        <Typography variant="h2" sx={{ mb: 6, borderBottom: '1px solid rgba(116, 132, 84, 0.3)', pb: 2 }}>SCIENTIFIC DIMENSIONS</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {[
            { title: 'SCALABLE AI', desc: 'Engineering foundation models and distributed training systems for high-dimensional biological data.' },
            { title: 'BIOLOGY / BIOTECH', desc: 'Deciphering the language of life through spatial omics and mechanistic learning.' },
            { title: 'OPEN SOURCE SOFTWARE', desc: 'Building robust, community-driven tools to accelerate scientific discovery.' }
          ].map((area, i) => (
            <Box key={i} sx={{
              borderTop: '1px solid rgba(116, 132, 84, 0.3)',
              pt: 2,
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-10px)' }
            }}>
              <Typography variant="h6" sx={{ color: '#748454', mb: 2 }}>0{i + 1} // {area.title}</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(244, 244, 228, 0.8)' }}>{area.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Container>
  );
}
