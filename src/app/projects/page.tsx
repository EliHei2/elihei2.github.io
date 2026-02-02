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

const projects = [
    {
        title: 'segger',
        description: 'Graph-neural-network-based cell segmentation for single-molecule spatial omics data. Enables precise cell delineation in complex tissues.',
        github: 'https://github.com/elihei2/segger_dev', // Using the one found in search
        tags: ['Python', 'PyTorch', 'GNN', 'Spatial Omics']
    },
    {
        title: 'SageNet',
        description: 'A robust computational framework for mapping single-cell gene expression to spatial locations. Facilitates the reconstruction of spatial gene expression patterns.',
        github: 'https://github.com/marioni-group/SageNet', // Assuming location based on typical patterns, or generic link
        tags: ['R', 'Python', 'Bioinformatics']
    }
];

export default function Projects() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 6 }}>
                Projects
            </Typography>
            <Grid container spacing={4}>
                {projects.map((project) => (
                    <Grid key={project.title} size={{ xs: 12, md: 6 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" gutterBottom>
                                    {project.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {project.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                                    {project.tags.map(tag => (
                                        <Typography key={tag} variant="caption" sx={{ border: '1px solid #ccc', px: 1, borderRadius: 1 }}>
                                            {tag}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2 }}>
                                <Button
                                    size="small"
                                    startIcon={<GitHubIcon />}
                                    href={project.github}
                                    target="_blank"
                                >
                                    View on GitHub
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
