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
        description: 'Graph-neural-network-based tool for cell segmentation in single-molecule spatial omics data. 10M+ transcripts.',
        github: 'https://github.com/EliHei2/segger_dev',
        logo: '/segger_logo.png',
        tags: ['Python', 'PyTorch Geometric', 'GNN']
    },
    {
        title: 'SageNet',
        description: 'Computational framework for mapping single-cell gene expression to spatial locations using GNNs and transformers.',
        github: 'https://github.com/MarioniLab/sagenet',
        logo: '/sagenet_logo.png', // Original logo
        tags: ['Python', 'PyTorch', 'Transformers']
    },
    {
        title: 'scGCN',
        description: 'Graph Convolutional Networks for single-cell annotation.',
        github: 'https://github.com/EliHei2/scPotter',
        logo: '/scgcn_logo.png', // Generated
        tags: ['Python', 'TensorFlow', 'GCN']
    },
    {
        title: 'MUVis',
        description: 'Structured dependency modeling and visualization for mixed-type multivariate data.',
        github: 'https://baio-lab.github.io/muvis/',
        logo: '/muvis_logo.png', // Generated
        tags: ['R', 'Visualization']
    }
];

export default function Projects() {
    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>Selected Software</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {projects.map((project) => (
                    <Card key={project.title} sx={{ display: 'flex', p: 3, alignItems: 'start', transition: '0.2s', '&:hover': { bgcolor: '#fafafa' } }}>
                        {/* Logo */}
                        <Box sx={{ mr: 3, flexShrink: 0, width: 64, height: 64, display: { xs: 'none', sm: 'block' } }}>
                            <img src={project.logo} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <Link href={project.github} target="_blank" style={{ textDecoration: 'none' }}>
                                    <Typography variant="h5" sx={{ color: '#383838', '&:hover': { color: '#2BBC8A', textDecoration: 'underline' } }}>
                                        {project.title}
                                    </Typography>
                                </Link>
                            </Box>
                            <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                                {project.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <Typography key={tag} variant="caption" sx={{ color: '#999', fontFamily: 'monospace', bgcolor: '#f5f5f5', px: 1, py: 0.5, borderRadius: 1 }}>
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
