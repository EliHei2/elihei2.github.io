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
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>Software</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {projects.map((project) => (
                    <Card key={project.title} sx={{ display: 'flex', p: 3, alignItems: 'start', transition: '0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                        {/* Logo */}
                        <Box sx={{ mr: 3, flexShrink: 0, width: 64, height: 64, display: { xs: 'none', sm: 'block' } }}>
                            <img src={project.logo} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <Link href={project.github} target="_blank" style={{ textDecoration: 'none' }}>
                                    <Typography variant="h5" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', textDecoration: 'underline' } }}>
                                        {project.title}
                                    </Typography>
                                </Link>
                            </Box>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                                {project.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <Typography key={tag} variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', bgcolor: 'rgba(255,255,255,0.05)', px: 1, py: 0.5, borderRadius: 1 }}>
                                        {tag}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
