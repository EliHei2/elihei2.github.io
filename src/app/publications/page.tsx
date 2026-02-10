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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, mt: 4 }}>
                <ArticleIcon sx={{ color: 'primary.main', fontSize: '2.5rem' }} />
                <Typography variant="h2" sx={{ mb: 0 }}>Publications</Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 8, color: '#666' }}>
                Full list of peer-reviewed articles and preprints.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {publications.map((pub, i) => (
                    <Box key={i} sx={{
                        p: 4,
                        borderLeft: '4px solid #333',
                        '&:hover': {
                            borderLeftColor: 'primary.main',
                            bgcolor: 'rgba(255, 255, 255, 0.03)'
                        },
                        transition: '0.2s'
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary', lineHeight: 1.4 }}>
                            {pub.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
                            {pub.citation}
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: 'text.secondary',
                            fontSize: '1rem',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            p: 2,
                            borderRadius: 0
                        }}>
                            <strong style={{ color: '#E0F58F' }}>Contribution:</strong> {pub.role}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
