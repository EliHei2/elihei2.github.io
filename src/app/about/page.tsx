'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DownloadIcon from '@mui/icons-material/Download';

export default function About() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h2" gutterBottom>
                About Me
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                I am a Research Engineer specializing in Computational Biology, with a keen focus on developing method applications for statistical and machine learning in biological data. My work primarily revolves around single-cell and spatial genomics, applying these advanced techniques to oncology and neuroscience.
            </Typography>

            <Box sx={{ my: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    href="/CV_Elyas_Heidari.pdf"
                    target="_blank"
                    download
                >
                    Download CV
                </Button>
            </Box>

            <Divider sx={{ my: 6 }} />

            <Typography variant="h4" gutterBottom>
                Education
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">M.Sc. in Computational Biology and Bioinformatics</Typography>
                <Typography variant="subtitle1" color="primary">ETH Zürich</Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Double Degree in Maths and Computer Engineering</Typography>
                <Typography variant="subtitle1" color="primary">Sharif University of Technology</Typography>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
                Experience
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Researcher</Typography>
                <Typography variant="subtitle1" color="primary">German Cancer Research Center (DKFZ)</Typography>
                <Typography variant="body2" color="text.secondary">
                    Working on spatial omics and developing open-source data science tools.
                </Typography>
            </Box>
        </Container>
    );
}
