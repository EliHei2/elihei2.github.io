'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// Icons using Material UI for consistency/minimalism
import TerminalIcon from '@mui/icons-material/Terminal';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MicIcon from '@mui/icons-material/Mic';
import ArticleIcon from '@mui/icons-material/Article';

// Detailed CV Data extracted from CV_optimized.tex

const experience = [
    {
        role: 'PhD Researcher',
        org: 'DKFZ & EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Aug 2022 – Present',
        details: [
            'Led end-to-end ML pipelines, scalable graph learning, and distributed multi-GPU systems for multimodal spatial omics at 10M+ scale.',
            'Focus on multi-agent systems and automation.',
            'Delivered production-grade segmentation and spatial inference systems underpinning multiple large-scale analyses and publications.',
            'Enabled routine processing of datasets previously considered computationally intractable.'
        ]
    },
    {
        role: 'Research Trainee',
        org: 'Cancer Research UK & EMBL-EBI',
        location: 'Cambridge, UK',
        date: 'Apr 2021 – Apr 2022',
        details: [
            'Developed SageNet: supervised representation learning framework using graph attention and transformers for spatial inference from single-cell data.',
            'Marioni Lab.'
        ]
    },
    {
        role: 'Research Assistant',
        org: 'University of Zurich',
        location: 'Zurich, CH',
        date: 'Sep 2019 – Apr 2022',
        details: [
            'Engineered single-cell analysis pipelines (QC, integration, cell typing).',
            'Developed immune repertoire analysis tools (Robinson Lab).'
        ]
    },
    {
        role: 'Research Trainee',
        org: 'EMBL Heidelberg',
        location: 'Heidelberg, DE',
        date: 'Jul 2018 – Sep 2018',
        details: [
            'Developed graphical representation learning methods for single-cell data (Huber Group).'
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

const awards = [
    { title: 'ETH Medal', date: '2023', detail: 'Outstanding Master’s thesis, ETH Zurich (top <0.1%)' },
    { title: 'EMBL-EBI Research Fellowship', date: '2021 – 2022', detail: 'Competitive 12-month traineeship' },
    { title: 'EMBL Research Fellowship', date: '2018', detail: 'Undergraduate research traineeship' }
];

const talks = [
    { title: 'Segger: Fast and accurate cell segmentation in spatial transcriptomics', events: ['ISMB 2025 (Liverpool)', 'ESSB 2025 (Heidelberg)', 'scverse 2024 (Munich)', 'MOPITAS 2024 (Copenhagen)'] },
    { title: 'Supervised spatial inference... with SageNet', events: ['CSHL Genome Informatics 2021 (online)'] },
    { title: 'scGCN: A geometric deep learning framework...', events: ['EuroBioC 2020 (online)'] }
];

const posters = [
    { title: 'Segger', events: ['Single-Cell Genomics 2025 (Stockholm)', 'ESSB 2024 (Berlin)'] },
    { title: 'SageNet', events: ['Single Cell Genomics 2023 (Bern)'] },
    { title: 'scGCN', events: ['ISMB/ECCB 2019 (Basel)'] }
];

const publications = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        citation: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al. bioRxiv, 2025 (under revision Nature Methods).',
        role: 'Lead developer: formulated cell segmentation as a large-scale heterogeneous GNN problem; designed multi-GPU pipeline (10–100M nodes) achieving 1000× speedup.'
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours',
        citation: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al. Nature Biomedical Engineering, 2025.',
        role: 'Co-lead developer: built end-to-end spatial phenotyping pipeline linking genetic perturbations to tumor microenvironments.'
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        citation: 'Marconato, L.*, ..., Heidari, E., et al. Nature Methods 22:58–62, 2025.',
        role: 'Contributor: designed multi-layer breast cancer analysis demonstrating universal grammar for multimodal spatial omics.'
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        citation: 'Heidari, E., Lohoff, T., et al. bioRxiv, 2022.',
        role: 'Lead developer: introduced graph-attention-based spatial inference; outperformed Tangram and NovoSpaRc.'
    },
    {
        title: 'An end-to-end workflow for high-throughput discovery... from large biomedical datasets',
        citation: 'Heidari, E., Sadeghi, M.A., et al. bioRxiv, 2020.',
        role: 'Lead developer: designed scalable analytics pipeline for population-scale biomedical data.'
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        citation: 'Macnair, W., ..., Heidari, E., et al. Neuron 113(3), 2025.',
        role: 'Contributor: architected large-scale sc/snRNA-seq pipelines (1M cells).'
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks...',
        citation: 'Sonrel, A., ..., Heidari, E., et al. Genome Biology 24:119, 2023.',
        role: 'Contributor: analysis and synthesis of benchmarking results.'
    }
];

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, mt: 8 }}>
        <Box sx={{ color: 'primary.main', display: 'flex' }}>{icon}</Box>
        <Typography variant="h2" sx={{ mb: 0, fontSize: '1.75rem' }}>{title}</Typography>
    </Box>
);

export default function About() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>

            {/* Introduction */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h1" sx={{ mb: 3 }}>About</Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    I build scalable learning systems for biomedical data that transform ill-posed real-world structure into robust, high-performance implementations.
                    I operate across disciplines and institutions, connecting efficient computation with biomedical domain insight through close collaboration with experimentalists.
                </Typography>
                <Typography variant="body1">
                    <Link href="/CV_Elyas_Heidari.pdf" target="_blank" style={{ textDecoration: 'none', borderBottom: '2px solid #2BBC8A', color: '#383838', fontWeight: 600 }}>
                        Download Full Curriculum Vitae (PDF)
                    </Link>
                </Typography>
            </Box>

            {/* Experience Timeline */}
            <SectionHeader icon={<TerminalIcon fontSize="large" />} title="Research Experience" />
            <Box sx={{ position: 'relative', pl: 3 }}>
                <Box sx={{ position: 'absolute', left: 7, top: 10, bottom: 20, width: 2, bgcolor: '#f0f0f0' }} />
                {experience.map((exp, i) => (
                    <Box key={i} sx={{ mb: 6, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: -29, top: 6, width: 14, height: 14, borderRadius: '50%', bgcolor: '#fff', border: '3px solid #2BBC8A', zIndex: 1 }} />
                        <Box sx={{ mb: 1.5 }}>
                            <Typography variant="h5" sx={{ color: '#383838', fontWeight: 700 }}>{exp.role}</Typography>
                            <Typography variant="subtitle2" sx={{ color: '#666', fontFamily: 'monospace', mt: 0.5 }}>
                                <strong style={{ color: '#2BBC8A' }}>{exp.org}</strong> • {exp.location} • {exp.date}
                            </Typography>
                        </Box>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: 0, color: '#555', listStyleType: 'disc' }}>
                            {exp.details.map((d, j) => <li key={j} style={{ marginBottom: '0.4rem', lineHeight: 1.6 }}>{d}</li>)}
                        </ul>
                    </Box>
                ))}
            </Box>

            {/* Publications */}
            <SectionHeader icon={<ArticleIcon fontSize="large" />} title="Publications" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {publications.map((pub, i) => (
                    <Box key={i} sx={{ p: 2, borderLeft: '2px solid transparent', '&:hover': { borderLeft: '2px solid #2BBC8A', bgcolor: '#fafafa' }, transition: '0.2s' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5, color: '#383838' }}>
                            {pub.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', mb: 1 }}>
                            {pub.citation}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555', fontSize: '0.9rem' }}>
                            <Box component="span" sx={{ color: '#2BBC8A', fontWeight: 600 }}>Role:</Box> {pub.role}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Talks & Community */}
            <SectionHeader icon={<MicIcon fontSize="large" />} title="Talks & Posters" />
            <Box sx={{ display: 'grid', gap: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>Invited Talks</Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        {talks.map((talk, i) => (
                            <li key={i} style={{ marginBottom: '1rem' }}>
                                <Typography variant="body1"><strong>{talk.title}</strong></Typography>
                                <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {talk.events.map((ev, j) => <Chip key={j} label={ev} size="small" variant="outlined" sx={{ borderRadius: 1 }} />)}
                                </Box>
                            </li>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>Posters</Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        {posters.map((poster, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>
                                <Typography variant="body1">
                                    <strong>{poster.title}</strong>: {poster.events.join(', ')}
                                </Typography>
                            </li>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Awards */}
            <SectionHeader icon={<EmojiEventsIcon fontSize="large" />} title="Awards" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                {awards.map((award, i) => (
                    <Box key={i} sx={{ border: '1px solid #eee', p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ color: '#2BBC8A', mb: 1 }}>{award.title}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{award.date}</Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>{award.detail}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Education */}
            <SectionHeader icon={<SchoolIcon fontSize="large" />} title="Education" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Typography variant="h6">Heidelberg University</Typography>
                    <Typography variant="body2">PhD, Faculty of Biosciences (2022 – 2026)</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">ETH Zurich</Typography>
                    <Typography variant="body2">MSc, Computational Biology (Top 3 in cohort) (2019 – 2022)</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Sharif University of Technology</Typography>
                    <Typography variant="body2">BSc, Computer Engineering (2014 – 2019)</Typography>
                </Box>
            </Box>

        </Container>
    );
}
