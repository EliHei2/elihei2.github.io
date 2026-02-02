'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

const experience = [
    {
        role: 'PhD Researcher',
        org: 'DKFZ & EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: '2022 – Present',
        details: [
            'Leading end-to-end ML pipelines, scalable graph learning, and distributed multi-GPU systems for multimodal spatial omics at 10M+ scale.',
            'Current focus on multi-agent systems and automation.',
            'Delivered production-grade segmentation and spatial inference systems.'
        ]
    },
    {
        role: 'Research Trainee',
        org: 'Cancer Research UK & EMBL-EBI',
        location: 'Cambridge, UK',
        date: '2021 – 2022',
        details: [
            'Developed SageNet: supervised representation learning framework using graph attention/transformers for spatial inference.'
        ]
    },
    {
        role: 'Research Assistant',
        org: 'University of Zurich',
        location: 'Zurich, CH',
        date: '2019 – 2022',
        details: [
            'Engineered single-cell analysis pipelines (QC, integration, cell typing).',
            'Developed immune repertoire analysis tools.'
        ]
    },
];

const education = [
    {
        degree: 'PhD, Faculty of Biosciences',
        school: 'Heidelberg University',
        date: '2022 – 2026',
        detail: 'Thesis: Structured Representation Learning for Large-Scale Spatial Omics Data'
    },
    {
        degree: 'MSc, Computational Biology',
        school: 'ETH Zurich',
        date: '2019 – 2022',
        detail: 'GPA: 5.76/6.0 (Top 3). ETH Medal for Outstanding Master’s Thesis.'
    },
    {
        degree: 'BSc, Computer Engineering',
        school: 'Sharif University of Technology',
        date: '2014 – 2019',
        detail: 'GPA: 16.8/20. Founder of Sharif DataDays.'
    }
];

const publications = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        citation: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al. bioRxiv, 2025 (under revision Nature Methods)',
        link: 'https://doi.org/10.1101/2023.11.14.566970' // Added dummy link structure for visual completeness if real link exists
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours',
        citation: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al. Nature Biomedical Engineering, 2025',
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        citation: 'Marconato, L.*, ..., Heidari, E., et al. Nature Methods 22, 2025',
    },
];

export default function About() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>

            {/* Bio */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h2">About</Typography>
                <Typography variant="body1" paragraph>
                    I build scalable learning systems for biomedical data. I operate across disciplines, connecting efficient computation with biomedical domain insight through close collaboration with experimentalists.
                </Typography>
                <Typography variant="body1">
                    <Link href="/CV_Elyas_Heidari.pdf" target="_blank" style={{ textDecoration: 'underline', color: '#2BBC8A' }}>
                        Download Full Curriculum Vitae (PDF)
                    </Link>
                </Typography>
            </Box>

            {/* Experience */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h2">Experience</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {experience.map((exp, i) => (
                        <Box key={i}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'baseline' }}>
                                <Typography variant="h5" sx={{ color: '#383838' }}>{exp.role}</Typography>
                                <Typography variant="caption" sx={{ color: '#999', fontFamily: 'monospace' }}>{exp.date}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#2BBC8A', mb: 1, fontWeight: 600 }}>{exp.org}</Typography>
                            <ul style={{ paddingLeft: '1.2rem', marginTop: 0, color: '#555' }}>
                                {exp.details.map((d, j) => <li key={j} style={{ marginBottom: '0.5rem' }}>{d}</li>)}
                            </ul>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Publications */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h2">Selected Publications</Typography>
                <Box component="ul" sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {publications.map((pub, i) => (
                        <li key={i}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {pub.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#777' }}>
                                {pub.citation}
                            </Typography>
                        </li>
                    ))}
                </Box>
            </Box>

            {/* Education */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h2">Education</Typography>
                <Grid container spacing={4}>
                    {education.map((edu, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <Typography variant="h6" sx={{ color: '#383838' }}>{edu.degree}</Typography>
                            <Typography variant="body2" sx={{ color: '#2BBC8A', mb: 0.5 }}>{edu.school}</Typography>
                            <Typography variant="caption" display="block" sx={{ color: '#999', fontStyle: 'italic' }}>{edu.detail}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    );
}
