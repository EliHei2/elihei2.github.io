'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const projects = [
    {
        title: 'segger',
        description: 'Graph-neural-network-based tool for cell segmentation in single-molecule spatial omics data. Capable of processing 10M+ transcripts.',
        github: 'https://github.com/EliHei2/segger_dev',
        logo: '/segger_logo.png',
        tags: ['Python', 'PyTorch Geometric', 'GNN', 'Spatial Omics']
    },
    {
        title: 'SageNet',
        description: 'A robust computational framework for mapping single-cell gene expression to spatial locations using graph attention networks and transformers.',
        github: 'https://github.com/MarioniLab/sagenet',
        logo: '/sagenet_logo.png',
        tags: ['Python', 'PyTorch', 'Transformers', 'Spatial Inference']
    },
    {
        title: 'scGCN',
        description: 'Early Graph Convolutional Modeling on gene regulatory networks for single-cell annotation.',
        github: 'https://github.com/EliHei2/scPotter',
        logo: '/scgcn_logo.png',
        tags: ['Python', 'TensorFlow', 'GCN', 'scRNA-seq']
    },
    {
        title: 'MUVis',
        description: 'Structured dependency modeling and visualization for mixed-type multivariate data.',
        github: 'https://baio-lab.github.io/muvis/',
        logo: '/muvis_logo.png',
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
                    <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible', mt: 4 }}>
                            {/* Logo Badge */}
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    position: 'absolute',
                                    top: -40,
                                    left: 24,
                                    borderRadius: '50%',
                                    bgcolor: 'background.paper',
                                    border: '4px solid #202124',
                                    boxShadow: 3,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={project.logo}
                                    alt={`${project.title} logo`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>

                            <CardContent sx={{ flexGrow: 1, pt: 6 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {project.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 2 }}>
                                    {project.tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderRadius: 1, fontSize: '0.7rem' }}
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
                                    fullWidth
                                    variant="contained"
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
