'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArticleIcon from '@mui/icons-material/Article';

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
        title: 'An end-to-end workflow for high-throughput discovery of clinically relevant insights from large biomedical datasets',
        citation: 'Heidari, E., Sadeghi, M.A., et al. bioRxiv, 2020.',
        role: 'Lead developer: designed scalable analytics pipeline for population-scale biomedical data.'
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        citation: 'Macnair, W., ..., Heidari, E., et al. Neuron 113(3), 2025.',
        role: 'Contributor: architected large-scale sc/snRNA-seq pipelines (1M cells).'
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks reveals the need for extensibility and interoperability',
        citation: 'Sonrel, A., ..., Heidari, E., et al. Genome Biology 24:119, 2023.',
        role: 'Contributor: analysis and synthesis of benchmarking results.'
    }
];

export default function Publications() {
    return (
        <Container maxWidth="md" sx={{ mb: 12 }}>
            <Box sx={{ mb: 8, mt: 4 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>Publications</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Peer-reviewed articles, preprints, and collaborative research frameworks.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {publications.map((pub, i) => (
                    <Box key={i} sx={{
                        py: 6,
                        borderTop: '1px solid rgba(116, 132, 84, 0.2)',
                        transition: '0.3s',
                        '&:hover': {
                            bgcolor: 'rgba(116, 132, 84, 0.03)'
                        }
                    }}>
                        <Typography variant="h5" sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: '#F4F4E4',
                            lineHeight: 1.3,
                            fontFamily: 'Space Grotesk, sans-serif'
                        }}>
                            {pub.title}
                        </Typography>

                        <Typography variant="body1" sx={{
                            color: 'rgba(244, 244, 228, 0.7)',
                            fontStyle: 'italic',
                            mb: 3,
                            fontSize: '1.1rem',
                            fontFamily: 'Cormorant Garamond, serif'
                        }}>
                            {pub.citation}
                        </Typography>

                        <Box sx={{
                            borderLeft: '1px solid #748454',
                            pl: 3,
                            py: 1,
                            mt: 2
                        }}>
                            <Typography variant="caption" sx={{
                                color: '#748454',
                                fontFamily: 'monospace',
                                display: 'block',
                                mb: 1,
                                letterSpacing: '0.1em'
                            }}>
                                [CONTRIBUTION_LOG]
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: 'rgba(244, 244, 228, 0.5)',
                                fontSize: '0.9rem',
                                lineHeight: 1.6
                            }}>
                                {pub.role}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                {/* Final Border */}
                <Box sx={{ borderTop: '1px solid rgba(116, 132, 84, 0.2)' }} />
            </Box>
        </Container>
    );
}
