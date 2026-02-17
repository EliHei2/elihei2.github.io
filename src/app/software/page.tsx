'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

const projects = [
    {
        title: 'segger',
        description: 'Large-scale GNN-based cell segmentation for spatial transcriptomics. Scaling to 10M+ nodes/30M transcripts with 1000x speedup via multi-GPU distributed training.',
        github: 'https://github.com/EliHei2/segger_dev',
        logo: '/segger_logo.png',
        tags: ['Python', 'PyTorch Geometric', 'Distributed GNN']
    },
    {
        title: 'SageNet',
        description: 'Supervised graph-attention framework for mapping single-cell gene expression to spatial locations. Outperforms Tangram/NovoSpaRc.',
        github: 'https://github.com/MarioniLab/sagenet',
        logo: '/sagenet_logo.png', // Original logo
        tags: ['Python', 'PyTorch', 'Transformers']
    },
    {
        title: 'scGCN',
        description: 'Geometric deep learning framework on single-cell gene regulatory networks for cell annotation and discovery.',
        github: 'https://github.com/EliHei2/scPotter',
        logo: '/scgcn_logo.svg', // Generated
        tags: ['Python', 'TensorFlow', 'GCN']
    },
    {
        title: 'MUVis',
        description: 'Structured dependency modeling and visualization for mixed-type multivariate data using probabilistic graphical models.',
        github: 'https://baio-lab.github.io/muvis/',
        logo: '/muvis_logo.svg', // Generated
        tags: ['R', 'Visualization', 'PGM']
    }
];

export default function Software() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Box sx={{ mb: 8, mt: 4 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>Software</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px' }}>
                    Open-source tools and frameworks developed for high-dimensional biological signal processing and scalable machine learning.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                {projects.map((project, i) => (
                    <Box
                        key={project.title}
                        sx={{
                            py: 6,
                            borderTop: '1px solid rgba(116, 132, 84, 0.2)',
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' },
                            gap: 4,
                            transition: '0.3s',
                            '&:hover': {
                                bgcolor: 'rgba(116, 132, 84, 0.03)',
                            }
                        }}
                    >
                        {/* Static Logo/Icon Slot */}
                        <Box sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'rgba(255,255,255,0.02)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            p: 1
                        }}>
                            <img
                                src={project.logo}
                                alt={project.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'grayscale(1) contrast(1.2) brightness(0.8)'
                                }}
                            />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
                                <Typography variant="h4" sx={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1.5rem',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {project.title.toUpperCase()}
                                </Typography>
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    style={{
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        fontSize: '0.75rem',
                                        color: '#748454',
                                        textDecoration: 'none',
                                        borderBottom: '1px solid rgba(116, 132, 84, 0.3)'
                                    }}
                                >
                                    SOURCE [GITHUB]
                                </Link>
                            </Box>

                            <Typography variant="body1" sx={{
                                color: 'rgba(244, 244, 228, 0.8)',
                                mb: 3,
                                fontSize: '1.1rem',
                                lineHeight: 1.6
                            }}>
                                {project.description}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <Typography
                                        key={tag}
                                        variant="caption"
                                        sx={{
                                            color: '#748454',
                                            fontFamily: 'monospace',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        #{tag.replace(/\s+/g, '_')}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ))}
                {/* Final Border */}
                <Box sx={{ borderTop: '1px solid rgba(116, 132, 84, 0.2)' }} />
            </Box>
        </Container>
    );
}
