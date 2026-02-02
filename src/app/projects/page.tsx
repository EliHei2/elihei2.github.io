'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const projects = [
    {
        title: 'segger',
        description: 'Graph-neural-network-based tool for cell segmentation in single-molecule spatial omics data. Models transcripts and cells as a heterogeneous graph, treating segmentation as a link prediction problem. Capable of processing 10M+ transcripts.',
        github: 'https://github.com/EliHei2/segger_dev',
        tags: ['Python', 'PyTorch Geometric', 'GNN', 'Spatial Omics', 'Multi-GPU']
    },
    {
        title: 'SageNet',
        description: 'A robust computational framework for mapping single-cell gene expression to spatial locations using graph attention networks and transformers. Enables reconstruction of spatial gene expression patterns from dissociated data.',
        github: 'https://github.com/MarioniLab/sagenet',
        tags: ['Python', 'PyTorch', 'Transformers', 'Spatial Inference']
    },
    {
        title: 'scGCN',
        description: 'Early Graph Convolutional Modeling on gene regulatory networks for single-cell annotation.',
        github: 'https://github.com/EliHei2/scPotter',
        tags: ['Python', 'TensorFlow', 'GCN', 'scRNA-seq']
    },
    {
        title: 'MUVis',
        description: 'Structured dependency modeling and visualization for mixed-type multivariate data.',
        github: 'https://baio-lab.github.io/muvis/',
        tags: ['R', 'Visualization', 'Statistics']
    }
];

export default function Projects() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 6 }}>
                Selected Software
            </Typography>
            <Grid container spacing={4}>
                {projects.map((project) => (
                    <Grid key={project.title} size={{ xs: 12, md: 6 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                                    {project.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {project.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 3 }}>
                                    {project.tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', border: 'none' }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button
                                    size="small"
                                    startIcon={<GitHubIcon />}
                                    href={project.github}
                                    target="_blank"
                                    variant="outlined"
                                    sx={{ borderRadius: 2 }}
                                >
                                    View Code
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
