import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { serifFont, interFont, ink, inkSecondary, accent, apple, oldstyle, venueItalic } from '@/theme/tokens';
import Thumb, { ThumbVariant } from '@/components/Thumb';

const publications: {
    title: string; titleHref: string; authors: string; venue: string; year: string; role: string;
    variant: ThumbVariant; accent: string;
}[] = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1',
        authors: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al.',
        venue: 'bioRxiv',
        year: '2025',
        role: 'Lead developer. I reframed cell segmentation as heterogeneous-graph link prediction between transcript and cell nodes and built the multi-GPU pipeline (10–100M nodes), about a thousand times faster than the tools before it. Under revision at Nature Methods.',
        variant: 'grid', accent: apple.teal,
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours to decode genotype-to-phenotype relationships',
        titleHref: 'https://doi.org/10.1038/s41551-025-01437-1',
        authors: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al.',
        venue: 'Nature Biomedical Engineering',
        year: '2025',
        role: 'Co-lead developer. Built the spatial phenotyping pipeline linking genetic perturbations to tumour microenvironments.',
        variant: 'scatter', accent: apple.orange,
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        titleHref: 'https://doi.org/10.1038/s41592-024-02212-x',
        authors: 'Marconato, L.*, Palla, G.*, Yamauchi, K. A.*, Virshup, I.*, Heidari, E., et al.',
        venue: 'Nature Methods 22(1):58–62',
        year: '2025',
        role: 'Contributor. Designed and built the flagship multi-layer breast-cancer analysis.',
        variant: 'layers', accent: apple.purple,
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        titleHref: 'https://doi.org/10.1016/j.neuron.2024.11.016',
        authors: 'Macnair, W., Calini, D., Agirre, E., Heidari, E., et al.',
        venue: 'Neuron 113(3):396–410.e9',
        year: '2025',
        role: 'Contributor. Built the large-scale sc/snRNA-seq pipelines behind the analysis, across more than two hundred patients and about a million cells: integration, cell-type annotation, and the downstream statistics.',
        variant: 'scatter', accent: apple.indigo,
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks reveals the need for extensibility and interoperability',
        titleHref: 'https://doi.org/10.1186/s13059-023-02962-5',
        authors: 'Sonrel, A., Luetge, A., Soneson, C., Mallona, I., Germain, P. L., Heidari, E., et al.',
        venue: 'Genome Biology 24(1):119',
        year: '2023',
        role: 'Contributor. Analysis and synthesis of the benchmarking results, and the software-design argument that came out of them.',
        variant: 'bars', accent: apple.green,
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1',
        authors: 'Heidari, E., Lohoff, T., Tyser, R. C. V., Marioni, J. C., Robinson, M. D., Ghazanfar, S.',
        venue: 'bioRxiv',
        year: '2022',
        role: 'Lead developer. Graph-attention spatial inference over a learned gene-interaction network. My master’s thesis; it won the ETH Medal.',
        variant: 'graph', accent: apple.blue,
    },
    {
        title: 'An end-to-end workflow for high-throughput discovery of clinically relevant insights from large biomedical datasets',
        titleHref: '',
        authors: 'Heidari, E., Sadeghi, M. A., Meresht, V. B., et al.',
        venue: 'bioRxiv',
        year: '2020',
        role: 'Lead developer. A modular analytics pipeline for population-scale biomedical data, built for reproducibility and automation.',
        variant: 'network', accent: apple.pink,
    },
    {
        title: "Pin1 regulatory miRNAs as novel candidates for Alzheimer's disease treatment",
        titleHref: '',
        authors: 'Heidari, E., Siavashani, E. S., Rasooli, M., et al.',
        venue: 'bioRxiv',
        year: '2018',
        role: 'Lead analyst. Statistical and meta-analysis identifying candidate regulatory miRNAs.',
        variant: 'network', accent: apple.teal,
    },
];

const talks = [
    { title: 'Segger', events: 'ISMB 2025 (Liverpool) · ESSB 2025 (Heidelberg) · scverse 2024 (Munich) · MOPITAS 2024 (Copenhagen)' },
    { title: 'SageNet', events: 'CSHL Genome Informatics 2021 (online)' },
    { title: 'scGCN', events: 'EuroBioC 2020 (online)' },
];

const posters = [
    { title: 'Segger', events: 'Single-Cell Genomics 2025 (Stockholm) · ESSB 2024 (Berlin)' },
    { title: 'SageNet', events: 'Single Cell Genomics 2023 (Bern)' },
    { title: 'scGCN', events: 'ISMB/ECCB 2019 (Basel)' },
];

const community = [
    { title: 'scverse × Owkin Hackathon', events: '2025, Paris (project lead)' },
    { title: 'SpaceHack Germany', events: '2024, Berlin (project lead)' },
    { title: 'SpaceHack Germany', events: '2022, Lutherstadt-Wittenberg (project lead)' },
    { title: 'CSAMA', events: '2019, Brixen' },
];

function AuthorLine({ authors }: { authors: string }) {
    const parts = authors.split('Heidari, E.');
    return (
        <>
            {parts.map((p, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <Box component="strong" sx={{ fontWeight: 600, color: ink }}>Heidari, E.</Box>}
                    {p}
                </React.Fragment>
            ))}
        </>
    );
}

function ListSection({ heading, rows }: { heading: string; rows: { title: string; events: string }[] }) {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: '1.3rem', mb: 2.5 }}>{heading}</Typography>
            {rows.map((r, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', color: ink }}>
                        <Box component="span" sx={{ fontWeight: 600 }}>{r.title}</Box>
                        <Box component="span" sx={{ color: inkSecondary }}> — {r.events}</Box>
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default function Publications() {
    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box className="reading-substrate" sx={{ maxWidth: 720, mx: 'auto', pt: { xs: 2, md: 4 }, pb: 8 }}>
                <Typography variant="h1" component="h1" sx={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', mb: 2 }}>
                    Publications
                </Typography>
                <Typography variant="body1" sx={{ color: inkSecondary, fontSize: '1rem', mb: 6, maxWidth: 640 }}>
                    Journal papers and preprints, newest first. My name is in bold and an asterisk marks equal contribution. The bioRxiv entries are preprints and have not been peer-reviewed. Everything is also on{' '}
                    <Box component="a" href="https://scholar.google.com/citations?user=1tjJjf8AAAAJ" target="_blank" rel="noopener noreferrer" sx={{ color: accent }}>Google Scholar</Box>.
                </Typography>

                <Box sx={{ mb: 8 }}>
                    {publications.map((p, i) => (
                        <Box key={i} sx={{
                            display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '104px 1fr' }, gap: { xs: 1.5, sm: 3 },
                            mb: 5, alignItems: 'start',
                        }}>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Thumb variant={p.variant} accent={p.accent} seed={p.title} ariaLabel={`${p.title} figure`} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.35, mb: 0.5 }}>
                                    {p.titleHref ? (
                                        <Box component="a" href={p.titleHref} target="_blank" rel="noopener noreferrer" sx={{ color: ink, textDecoration: 'none', '&:hover': { color: accent } }}>
                                            {p.title}
                                        </Box>
                                    ) : (
                                        <Box component="span" sx={{ color: ink }}>{p.title}</Box>
                                    )}
                                </Typography>
                                <Typography sx={{ fontFamily: interFont, fontSize: '0.875rem', color: inkSecondary, mb: 0.25 }}>
                                    <AuthorLine authors={p.authors} />
                                </Typography>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '0.95rem', color: inkSecondary, mb: 0.75 }}>
                                    <Box component="span" sx={venueItalic}>{p.venue}</Box>{' '}
                                    <Box component="span" sx={oldstyle}>{p.year}</Box>
                                </Typography>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '0.98rem', color: ink, lineHeight: 1.55 }}>
                                    {p.role}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <ListSection heading="Talks" rows={talks} />
                <ListSection heading="Posters" rows={posters} />
                <ListSection heading="Community" rows={community} />
            </Box>
        </Container>
    );
}
