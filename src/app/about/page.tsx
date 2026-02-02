'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import MicIcon from '@mui/icons-material/Mic';

const experience = [
    {
        role: 'PhD Researcher (Stegle & Gerstung Labs)',
        org: 'DKFZ & EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Aug 2022 – Present',
        details: [
            'Leading end-to-end ML pipelines, scalable graph learning, and distributed multi-GPU systems for multimodal spatial omics at 10M+ scale.',
            'Current focus on multi-agent systems and automation.',
            'Delivered production-grade segmentation and spatial inference systems underpinning multiple large-scale analyses and publications.',
            'Enabled routine processing of datasets previously considered computationally intractable.'
        ]
    },
    {
        role: 'Research Trainee (MSc Thesis; Marioni Lab)',
        org: 'Cancer Research UK & EMBL-EBI',
        location: 'Cambridge, UK',
        date: 'Apr 2021 – Apr 2022',
        details: [
            'Developed a supervised representation learning framework using graph attention and transformers for spatial inference from single-cell data.'
        ]
    },
    {
        role: 'Research Assistant (Robinson Lab)',
        org: 'University of Zurich',
        location: 'Zurich, CH',
        date: 'Sep 2019 – Apr 2022',
        details: [
            'Engineered single-cell analysis pipelines (QC, integration, cell typing).',
            'Developed immune repertoire analysis tools.'
        ]
    },
    {
        role: 'Research Trainee (BSc Thesis; Huber Group)',
        org: 'EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Jul 2018 – Sep 2018',
        details: [
            'Developed an early graph-based representation learning method for single-cell data.',
            'Explored probabilistic and random-walk graphical models and their scalability limits.'
        ]
    },
    {
        role: 'Research Assistant',
        org: 'Sharif University of Technology',
        location: 'Tehran, IR',
        date: '2017 – 2018',
        details: [
            'Developed a population-scale graphical modeling toolkit for high-dimensional mixed-type multivariate data.'
        ]
    }
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
        detail: 'GPA: 5.76/6.0 (Top 3 in cohort); Thesis: Supervised spatial inference of dissociated single-cell data (ETH Medal)'
    },
    {
        degree: 'BSc, Computer Engineering & Applied Mathematics',
        school: 'Sharif University of Technology',
        date: '2014 – 2019',
        detail: 'GPA: 16.8/20; emphasis on algorithms, optimization, and mathematical modeling. Founder, Sharif DataDays.'
    }
];

const skills = [
    { category: 'Machine Learning', items: 'Graph Neural Networks (Heterogeneous, Message-Passing), Transformers, Representation Learning, Variational Inference, Generative Models' },
    { category: 'Agentic AI', items: 'LLM-assisted development workflows, Agent-based research engineering (Claude Code, Cursor)' },
    { category: 'Frameworks', items: 'PyTorch, PyTorch Geometric, PyTorch Lightning, Pyro, JAX/XLA' },
    { category: 'Distributed Computing', items: 'Multi-GPU training, Dask, RAPIDS, HPC (SLURM)' },
    { category: 'Data Infrastructure', items: 'Zarr, XArray, HDF5, Big Data (>10⁷ observations)' },
    { category: 'Languages', items: 'Python (Primary), R (Extensive), Java, C, Bash' },
];

const publications = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        authors: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al.',
        journal: 'bioRxiv, 2025 (under revision Nature Methods)',
        role: 'Lead developer: formulated cell segmentation as a large-scale heterogeneous GNN problem; designed multi-GPU pipeline achieving 1000x speedup.'
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours',
        authors: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al.',
        journal: 'Nature Biomedical Engineering, 2025',
        role: 'Co-lead developer: built end-to-end spatial phenotyping pipeline.'
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        authors: 'Marconato, L.*, ..., Heidari, E., et al.',
        journal: 'Nature Methods 22(1):58--62, 2025',
        role: 'Contributor: designed flagship multi-layer breast cancer analysis.'
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        authors: 'Macnair, W., ..., Heidari, E., et al.',
        journal: 'Neuron 113(3):396--410.e9, 2025',
        role: 'Contributor: sc/snRNA-seq pipelines for 200+ patients.'
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks',
        authors: 'Sonrel, A., ..., Heidari, E., et al.',
        journal: 'Genome Biology 24(1):119, 2023',
        role: 'Contributor: analysis and synthesis of benchmarking results.'
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        authors: 'Heidari, E., et al.',
        journal: 'bioRxiv, 2022',
        role: 'Lead developer: introduced graph-attention-based spatial inference.'
    },
    {
        title: 'An end-to-end workflow for high-throughput discovery of clinically relevant insights',
        authors: 'Heidari, E., et al.',
        journal: 'bioRxiv, 2020',
        role: 'Lead developer: scalable analytics pipeline.'
    },
    {
        title: 'Pin1 regulatory miRNAs as novel candidates for Alzheimer’s disease treatment',
        authors: 'Heidari, E., et al.',
        journal: 'bioRxiv, 2018',
        role: 'Lead analyst: statistical- and meta-analysis.'
    }
];

const talks = [
    { title: 'Segger: Fast and accurate cell segmentation', event: 'ISMB 2025 (Liverpool); ESSB 2025 (Heidelberg); scverse 2024 (Munich); MOPITAS 2024 (Copenhagen)' },
    { title: 'Supervised spatial inference with SageNet', event: 'CSHL Genome Informatics 2021 (online)' },
    { title: 'scGCN: Geometric deep learning on single-cell networks', event: 'EuroBioC 2020 (online)' },
];

const awards = [
    'ETH Medal (2023) — Outstanding Master’s thesis (<0.1%)',
    'EMBL-EBI Research Fellowship (2021--2022)',
    'EMBL Research Fellowship (2018)',
];

export default function About() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8 }}>
                <Box>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        About Me
                    </Typography>
                    <Typography variant="h5" color="secondary" sx={{ fontWeight: 400 }}>
                        Research Engineer & Computational Biologist
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    href="/CV_Elyas_Heidari.pdf"
                    target="_blank"
                    download
                    size="large"
                >
                    Download CV
                </Button>
            </Box>

            {/* Intro */}
            <Typography variant="body1" paragraph sx={{ fontSize: '1.15rem', color: 'text.secondary', mb: 8, maxWidth: '900px', lineHeight: 1.8 }}>
                I build scalable learning systems for biomedical data that transform ill-posed real-world structure into robust, high-performance implementations spanning concrete modeling, optimized systems design, and reliable deployment. I operate across disciplines and institutions, connecting efficient computation with biomedical domain insight through close collaboration with experimentalists, mathematicians, and engineers.
            </Typography>

            <Divider sx={{ mb: 8 }} />

            {/* Technical Expertise */}
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <CodeIcon color="info" /> Technical Expertise
            </Typography>
            <Grid container spacing={3} sx={{ mb: 8 }}>
                {skills.map((skill, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 2, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, height: '100%', bgcolor: 'rgba(255,255,255,0.02)' }}>
                            <Typography variant="subtitle2" color="primary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {skill.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {skill.items}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>


            {/* Experience */}
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <WorkIcon color="primary" /> Experience
            </Typography>
            <Box sx={{ mb: 8, pl: { md: 2 } }}>
                <Grid container spacing={4}>
                    {experience.map((exp, index) => (
                        <Grid key={index} size={{ xs: 12 }}>
                            <Box sx={{ borderLeft: '2px solid #5f6368', pl: 4, position: 'relative', pb: 2 }}>
                                <Box sx={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', bgcolor: 'primary.main' }} />
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>{exp.role}</Typography>
                                <Typography variant="subtitle1" color="primary" gutterBottom>{exp.org}</Typography>
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace' }}>
                                    {exp.date} • {exp.location}
                                </Typography>
                                <Box component="ul" sx={{ m: 0, pl: 2, color: 'text.secondary', typography: 'body2' }}>
                                    {exp.details.map((detail, i) => (
                                        <li key={i} style={{ marginBottom: '8px' }}>{detail}</li>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Publications */}
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <ArticleIcon color="secondary" /> Publications
            </Typography>
            <Box sx={{ mb: 8 }}>
                {publications.map((pub, index) => (
                    <Box key={index} sx={{ mb: 4, transform: 'translateZ(0)' }}>
                        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 0.5 }}>
                            {pub.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {pub.authors}
                        </Typography>
                        <Typography variant="caption" display="block" color="primary" sx={{ mb: 1, fontStyle: 'italic' }}>
                            {pub.journal}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ pl: 2, borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                            {pub.role}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Talks */}
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <MicIcon color="warning" /> Talks & Presentations
            </Typography>
            <Box sx={{ mb: 8 }}>
                {talks.map((talk, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {talk.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {talk.event}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Education & Awards */}
            <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <SchoolIcon color="info" /> Education
                    </Typography>
                    {education.map((edu, index) => (
                        <Box key={index} sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>{edu.degree}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">{edu.school}</Typography>
                            <Typography variant="caption" display="block" color="text.secondary">{edu.date}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{edu.detail}</Typography>
                        </Box>
                    ))}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <EmojiEventsIcon color="success" /> Awards
                    </Typography>
                    <Box>
                        {awards.map((award, index) => (
                            <Chip
                                key={index}
                                label={award}
                                sx={{ width: '100%', justifyContent: 'flex-start', mb: 1, p: 1 }}
                                variant="outlined"
                                icon={<EmojiEventsIcon />}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
