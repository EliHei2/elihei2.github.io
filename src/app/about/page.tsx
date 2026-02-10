'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

// Icons using Material UI for consistency/minimalism
import TerminalIcon from '@mui/icons-material/Terminal';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MicIcon from '@mui/icons-material/Mic';
import ConstructionIcon from '@mui/icons-material/Construction';

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

const skills = [
    { category: "Programming", items: ["Python (PyTorch, JAX, scikit-learn)", "R (Bioconductor)", "C++", "JavaScript (Next.js, Node.js)"] },
    { category: "AI & Machine Learning", items: ["Graph Neural Networks (GNNs)", "Transformers", "Foundation Models", "Multi-Agent Systems", "Bayesian Inference"] },
    { category: "Bioinformatics", items: ["Single-Cell Omics", "Spatial Transcriptomics", "Multi-Omics Integration", "Computational Pathology"] },
    { category: "Cloud & Infrastructure", items: ["Distributed GPU Training", "Docker", "HPC (Slurm)", "Nextflow / Snakemake"] }
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
                    I am a **Research Engineer** operating at the gap between elegant modeling and production-grade systems.
                    I build scalable, multi-scale learning architectures that turn complex biological signals into reliable discovery infrastructure.
                    My work emphasizes **evaluation realism**, stress-testing models under real-world heterogeneity—including cohort shifts and site effects—to ensure
                    biological representations earn their value through predictive utility and scientific interrogation.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    I operate fluently across deep learning systems, single-cell biology, and translational research, connecting efficient computation with
                    biomedical domain insight through close collaboration with experimentalists and mathematicians.
                </Typography>
                <Typography variant="body1">
                    <Button
                        component="a"
                        href="/CV_Elyas_Heidari.pdf"
                        target="_blank"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        sx={{ mt: 2, color: 'text.primary', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: '#E0F58F', color: '#E0F58F' } }}
                    >
                        Download Full Curriculum Vitae (PDF)
                    </Button>
                </Typography>
            </Box>

            {/* Skills Section */}
            <SectionHeader icon={<ConstructionIcon fontSize="large" />} title="Technical Skills" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                {skills.map((group, i) => (
                    <Box key={i}>
                        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 1.5 }}>{group.category}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {group.items.map((skill, j) => (
                                <Chip key={j} label={skill} variant="outlined" size="small" sx={{ borderRadius: 1, borderColor: 'divider' }} />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Experience Timeline */}
            <SectionHeader icon={<TerminalIcon fontSize="large" />} title="Research Experience" />
            <Box sx={{ position: 'relative', pl: 3 }}>
                <Box sx={{ position: 'absolute', left: 7, top: 10, bottom: 20, width: 2, bgcolor: 'divider' }} />
                {experience.map((exp, i) => (
                    <Box key={i} sx={{ mb: 6, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: -29, top: 6, width: 14, height: 14, borderRadius: '50%', bgcolor: 'background.default', border: '3px solid #E0F58F', zIndex: 1 }} />
                        <Box sx={{ mb: 1.5 }}>
                            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700 }}>{exp.role}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontFamily: 'monospace', mt: 0.5 }}>
                                <strong style={{ color: '#E0F58F' }}>{exp.org}</strong> • {exp.location} • {exp.date}
                            </Typography>
                        </Box>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: 0, color: 'rgba(255,255,255,0.7)', listStyleType: 'disc' }}>
                            {exp.details.map((d, j) => <li key={j} style={{ marginBottom: '0.4rem', lineHeight: 1.6 }}>{d}</li>)}
                        </ul>
                    </Box>
                ))}
            </Box>

            {/* Education */}
            <SectionHeader icon={<SchoolIcon fontSize="large" />} title="Education" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Heidelberg University</Typography>
                    <Typography variant="body2" color="text.secondary">PhD, Faculty of Biosciences (2022 – 2026)</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}><em>Structured Representation Learning for Large-Scale Spatial Omics Data</em></Typography>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>ETH Zurich</Typography>
                    <Typography variant="body2" color="text.secondary">MSc, Computational Biology & Bioinformatics (2019 – 2022)</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>GPA: 5.76/6.0 (Top 3 in cohort). Received <strong>ETH Medal</strong> for outstanding thesis.</Typography>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Sharif University of Technology</Typography>
                    <Typography variant="body2" color="text.secondary">BSc, Computer Engineering & Applied Mathematics (2014 – 2019)</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Founder of **Sharif DataDays**. Head Teaching Assistant for Advanced Programming and Probability & Statistics.
                    </Typography>
                </Box>
            </Box>

            {/* Awards */}
            <SectionHeader icon={<EmojiEventsIcon fontSize="large" />} title="Awards" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                {awards.map((award, i) => (
                    <Box key={i} sx={{ border: '1px solid rgba(255,255,255,0.1)', p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ color: '#E0F58F', mb: 1 }}>{award.title}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{award.date}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{award.detail}</Typography>
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

        </Container>
    );
}
