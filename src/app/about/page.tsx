'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const experience = [
    {
        role: 'PhD Researcher (Stegle & Gerstung Labs)',
        org: 'DKFZ & EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Aug 2022 – Present',
        desc: 'Leading end-to-end ML pipelines and scalable graph learning for multimodal spatial omics at 10M+ scale. Delivering production-grade segmentation systems (segger) and focusing on multi-agent systems.'
    },
    {
        role: 'Research Trainee (MSc Thesis; Marioni Lab)',
        org: 'Cancer Research UK & EMBL-EBI',
        location: 'Cambridge, UK',
        date: 'Apr 2021 – Apr 2022',
        desc: 'Developed SageNet, a supervised representation learning framework using graph attention and transformers for spatial inference.'
    },
    {
        role: 'Research Assistant (Robinson Lab)',
        org: 'University of Zurich',
        location: 'Zurich, CH',
        date: 'Sep 2019 – Apr 2022',
        desc: 'Engineered single-cell analysis pipelines (QC, integration, cell typing) and developed immune repertoire analysis tools.'
    },
    {
        role: 'Research Trainee (BSc Thesis; Huber Group)',
        org: 'EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Jul 2018 – Sep 2018',
        desc: 'Explored probabilistic and random-walk graphical models for single-cell data scalability.'
    },
];

const education = [
    {
        degree: 'PhD, Faculty of Biosciences',
        school: 'Heidelberg University',
        date: '2022 – 2026 (expected)',
        detail: 'Thesis: Structured Representation Learning for Large-Scale Spatial Omics Data'
    },
    {
        degree: 'MSc, Computational Biology & Bioinformatics',
        school: 'ETH Zurich',
        date: '2019 – 2022',
        detail: 'GPA: 5.76/6.0 (Top 3). ETH Medal for Outstanding Master’s Thesis.'
    },
    {
        degree: 'BSc, Computer Engineering & Applied Mathematics',
        school: 'Sharif University of Technology',
        date: '2014 – 2019',
        detail: 'GPA: 16.8/20. Founder of Sharif DataDays.'
    }
];

const awards = [
    'ETH Medal (2023) — Outstanding Master’s thesis (<0.1%)',
    'EMBL-EBI Research Fellowship (2021--2022)',
    'EMBL Research Fellowship (2018)',
];

export default function About() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Typography variant="h2" component="h1">
                    About Me
                </Typography>
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

            <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: 'text.secondary', mb: 8, maxWidth: '900px' }}>
                I operate across disciplines, connecting efficient computation with biomedical domain insight.
                My expertise lies in building scalable learning systems that span from concrete mathematical modeling
                to optimized systems design and reliable deployment.
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <WorkIcon color="primary" /> Experience
            </Typography>
            <Box sx={{ mb: 8, pl: { md: 2 } }}>
                <Grid container spacing={4}>
                    {experience.map((exp, index) => (
                        <Grid key={index} size={{ xs: 12 }}>
                            <Box sx={{ borderLeft: '2px solid #3c4043', pl: 3, position: 'relative' }}>
                                <Box sx={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', bgcolor: 'primary.main' }} />
                                <Typography variant="h6" color="primary">{exp.role}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{exp.org}</Typography>
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>{exp.date} • {exp.location}</Typography>
                                <Typography variant="body2" color="text.secondary">{exp.desc}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <SchoolIcon color="secondary" /> Education
            </Typography>
            <Box sx={{ mb: 8, pl: { md: 2 } }}>
                <Grid container spacing={4}>
                    {education.map((edu, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6 }}>
                            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #3c4043' }}>
                                <Typography variant="h6" color="secondary" gutterBottom>{edu.degree}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{edu.school}</Typography>
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>{edu.date}</Typography>
                                <Typography variant="body2" color="text.secondary">{edu.detail}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <EmojiEventsIcon color="warning" /> Awards
            </Typography>
            <Box sx={{ mb: 4 }}>
                {awards.map((award, index) => (
                    <Chip
                        key={index}
                        label={award}
                        sx={{ m: 0.5, fontSize: '0.9rem', py: 2 }}
                        variant="outlined"
                    />
                ))}
            </Box>
        </Container>
    );
}
