import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getAllPosts } from '@/lib/blog';
import HeroManifold from '@/components/HeroManifold';
import Thumb, { ThumbVariant } from '@/components/Thumb';
import {
    displayFont, serifFont, interFont, ink, inkSecondary, accent, apple, oldstyle, venueItalic,
} from '@/theme/tokens';

const SCHOLAR = 'https://scholar.google.com/citations?user=1tjJjf8AAAAJ';
const GITHUB = 'https://github.com/EliHei2';
const EMAIL = 'mailto:elyas.heidari@dkfz-heidelberg.de';

const labs = {
    stegle: 'https://www.embl.org/groups/stegle/',
    gerstung: 'https://www.dkfz.de/en/AI-in-Oncology/index.php',
    marioni: 'https://www.ebi.ac.uk/research/marioni/',
    robinson: 'https://robinsonlabuzh.github.io/',
    huber: 'https://www.embl.org/groups/huber/',
};

const heroLinks = [
    { label: 'Email', href: EMAIL },
    { label: 'Scholar', href: SCHOLAR },
    { label: 'GitHub', href: GITHUB },
    { label: 'CV', href: '/CV_Elyas_Heidari.pdf' },
];

const projects = [
    {
        name: 'Segger',
        logo: '/segger_logo.png',
        accent: apple.teal,
        tagline: 'Cell segmentation as a graph problem.',
        paragraph:
            'Cell segmentation in spatial transcriptomics was slow and inaccurate, and every tool buckled on large data. Segger rebuilds it as one big heterogeneous graph, running thirty million transcripts in about ten minutes, roughly a thousand times faster than the tools before it. Under revision at Nature Methods.',
        links: [
            { label: 'Paper', href: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1' },
            { label: 'Docs', href: 'https://elihei2.github.io/segger_dev/' },
            { label: 'Code', href: 'https://github.com/EliHei2/segger_dev' },
        ],
    },
    {
        name: 'SageNet',
        logo: '/sagenet_logo.png',
        accent: apple.indigo,
        tagline: 'Putting dissociated cells back where they came from.',
        paragraph:
            'When you dissociate a tissue to sequence it, you lose where each cell sat. SageNet learns that lost position by building a graph over a gene-interaction network. We reconstructed the mouse embryo during gastrulation from seqFISH, beating Tangram and NovoSpaRc. My master’s thesis; it won the ETH Medal.',
        links: [
            { label: 'Docs', href: 'https://sagenet.readthedocs.io' },
            { label: 'Code', href: 'https://github.com/MarioniLab/sagenet' },
            { label: 'Paper', href: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1' },
        ],
    },
];

const selectedPubs: {
    title: string; titleHref: string; authors: string; venue: string; year: string;
    note?: string; variant: ThumbVariant; accent: string;
}[] = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1',
        authors: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al.', venue: 'bioRxiv', year: '2025',
        note: 'Under revision at Nature Methods.', variant: 'grid', accent: apple.teal,
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours',
        titleHref: 'https://doi.org/10.1038/s41551-025-01437-1',
        authors: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al.', venue: 'Nature Biomedical Engineering', year: '2025',
        variant: 'scatter', accent: apple.orange,
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        titleHref: 'https://doi.org/10.1038/s41592-024-02212-x',
        authors: 'Marconato, L.*, Palla, G.*, …, Heidari, E., et al.', venue: 'Nature Methods 22(1):58–62', year: '2025',
        variant: 'layers', accent: apple.purple,
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        titleHref: 'https://doi.org/10.1016/j.neuron.2024.11.016',
        authors: 'Macnair, W., Calini, D., Agirre, E., Heidari, E., et al.', venue: 'Neuron 113(3):396–410.e9', year: '2025',
        variant: 'scatter', accent: apple.indigo,
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1',
        authors: 'Heidari, E., Lohoff, T., …, Ghazanfar, S.', venue: 'bioRxiv', year: '2022',
        note: 'Outperformed Tangram and NovoSpaRc.', variant: 'graph', accent: apple.blue,
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks reveals the need for extensibility and interoperability',
        titleHref: 'https://doi.org/10.1186/s13059-023-02962-5',
        authors: 'Sonrel, A., …, Heidari, E., et al.', venue: 'Genome Biology 24(1):119', year: '2023',
        variant: 'bars', accent: apple.green,
    },
];

// Timeline; each entry lists the institutes it touched (real logo or a text chip).
const timeline = [
    {
        period: '2022 – now', place: 'DKFZ & EMBL Heidelberg', role: 'PhD, Stegle & Gerstung labs',
        insts: [{ chip: 'DKFZ' }, { img: '/logos/embl.svg', alt: 'EMBL' }],
        text: 'Structured representation learning for large-scale spatial omics. Segger came out of this, along with most of what I know about keeping a multi-GPU system honest. I contribute to scverse, mainly SpatialData.',
    },
    {
        period: '2019 – 2022', place: 'ETH Zürich · UZH · EMBL-EBI', role: 'MSc · RA (Robinson) · thesis (Marioni)',
        insts: [{ img: '/logos/eth.svg', alt: 'ETH Zürich' }, { img: '/logos/uzh.svg', alt: 'University of Zurich' }, { chip: 'EMBL-EBI' }],
        text: 'A master’s at ETH (5.76/6.0, top three), single-cell pipelines in Mark Robinson’s lab in Zurich, and a fellowship year in John Marioni’s lab in Cambridge where SageNet came out.',
    },
    {
        period: '2018', place: 'EMBL Heidelberg', role: 'Research trainee, Huber group',
        insts: [{ img: '/logos/embl.svg', alt: 'EMBL' }],
        text: 'A summer in Wolfgang Huber’s group and my first taste of graph-based representation learning for single-cell data. Enough to decide the rest.',
    },
    {
        period: '2014 – 2019', place: 'Sharif University of Technology, Tehran', role: 'BSc CE & Applied Mathematics',
        insts: [{ chip: 'Sharif' }],
        text: 'Where a lot of this started. Head TA for advanced programming and probability, founded Sharif DataDays, wrote MUVis on the side.',
    },
];

const PROSE = 700;

function ExtLink({ href, children, sx }: { href: string; children: React.ReactNode; sx?: object }) {
    const ext = href.startsWith('http') || href.startsWith('mailto');
    return (
        <Box component="a" href={href} {...(ext && href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            sx={{ color: accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, ...sx }}>
            {children}
        </Box>
    );
}

function AuthorLine({ authors }: { authors: string }) {
    const parts = authors.split('Heidari, E.');
    return (<>{parts.map((p, i) => (
        <React.Fragment key={i}>
            {i > 0 && <Box component="strong" sx={{ fontWeight: 600, color: ink }}>Heidari, E.</Box>}{p}
        </React.Fragment>
    ))}</>);
}

function InstChip({ label }: { label: string }) {
    return (
        <Box component="span" sx={{
            fontFamily: interFont, fontSize: '0.72rem', fontWeight: 600, color: inkSecondary,
            border: '1px solid rgba(36,36,36,0.16)', borderRadius: '4px', px: 0.9, py: '2px',
            lineHeight: 1.4, whiteSpace: 'nowrap',
        }}>{label}</Box>
    );
}

function InstRow({ insts }: { insts: { img?: string; alt?: string; chip?: string }[] }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
            {insts.map((it, i) => it.img ? (
                <Box key={i} component="img" src={it.img} alt={it.alt || ''} sx={{
                    height: 20, width: 'auto', filter: 'grayscale(1)', opacity: 0.6,
                    transition: 'opacity 0.2s, filter 0.2s',
                    '&:hover': { opacity: 1, filter: 'grayscale(0)' },
                }} />
            ) : <InstChip key={i} label={it.chip!} />)}
        </Box>
    );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <Box component="section" id={id} sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography variant="h2" sx={{ mb: 3 }}>{title}</Typography>
            {children}
        </Box>
    );
}

export default function Home() {
    const posts = getAllPosts().slice(0, 3);

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            {/* ---- Minimal, results-first top ---- */}
            <Box sx={{
                maxWidth: 960, mx: 'auto', pt: { xs: 2, md: 5 }, pb: { xs: 6, md: 9 },
                display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 300px' },
                gap: { xs: 4, md: 6 }, alignItems: 'start',
            }}>
                <Box>
                    <Typography variant="h1" component="h1" sx={{ mb: 1 }}>Elyas Heidari</Typography>
                    <Typography sx={{ fontFamily: interFont, fontSize: '0.9rem', color: inkSecondary, mb: 3 }}>
                        PhD researcher · DKFZ &amp; EMBL, Heidelberg · finishing 2026
                    </Typography>

                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.12rem', lineHeight: 1.6, color: ink, mb: 2 }}>
                        I build machine-learning systems for spatial biology, mostly graph models that read a whole tissue at once. My main project, <ExtLink href="#work" sx={{ color: ink, borderBottom: `1px solid ${accent}66` }}>Segger</ExtLink>, reframes cell segmentation as a graph problem and runs thirty million transcripts in about ten minutes, roughly a thousand times faster than the tools before it. It is under revision at <Box component="span" sx={venueItalic}>Nature Methods</Box>. I was also co-first author on a tumour-genomics study in <Box component="span" sx={venueItalic}>Nature Biomedical Engineering</Box>.
                    </Typography>
                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.12rem', lineHeight: 1.6, color: ink, mb: 3 }}>
                        I work between <ExtLink href={labs.stegle}>Oliver Stegle</ExtLink>’s and <ExtLink href={labs.gerstung}>Moritz Gerstung</ExtLink>’s labs. Before Heidelberg I built SageNet with <ExtLink href={labs.marioni}>John Marioni</ExtLink> and Shila Ghazanfar in Cambridge, and single-cell pipelines with <ExtLink href={labs.robinson}>Mark Robinson</ExtLink> in Zurich, after first getting hooked on graphs with <ExtLink href={labs.huber}>Wolfgang Huber</ExtLink> at EMBL. I care about a clean repository about as much as a loss curve that finally comes down, and I think single-cell benchmarking is quietly broken.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
                        {heroLinks.map((l) => (
                            <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>{l.label}</ExtLink>
                        ))}
                    </Box>
                </Box>

                {/* photo + moving manifold, top-right */}
                <Box sx={{ position: 'relative', width: { xs: 180, md: 300 }, height: { xs: 180, md: 300 }, mx: { xs: 'auto', md: 0 }, justifySelf: { md: 'end' } }}>
                    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', inset: 0 }}>
                        <HeroManifold />
                    </Box>
                    <Box component="img" src="/profile.jpg" alt="Elyas Heidari"
                        sx={{
                            position: { xs: 'static', md: 'absolute' },
                            bottom: { md: 14 }, left: { md: '50%' },
                            transform: { md: 'translateX(-50%)' },
                            width: { xs: 150, md: 152 }, height: { xs: 150, md: 152 },
                            borderRadius: '18px', objectFit: 'cover',
                            border: '3px solid #fcfdfe',
                            boxShadow: '0 6px 22px rgba(36,36,36,0.14)',
                        }} />
                </Box>
            </Box>

            {/* ---- Everything else, below the fold ---- */}
            <Box className="reading-substrate" sx={{ maxWidth: PROSE, mx: 'auto', px: { xs: 0, md: 1 } }}>
                <Section id="work" title="Selected work">
                    {projects.map((p) => (
                        <Box key={p.name} sx={{
                            display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '64px 1fr' }, gap: { xs: 1.5, sm: 3 },
                            mb: 5, alignItems: 'start',
                        }}>
                            <Box component="img" src={p.logo} alt={`${p.name} logo`} sx={{ width: 56, height: 'auto', mt: 0.5 }} />
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.accent }} />
                                    <Typography variant="h3">{p.name}</Typography>
                                    <Typography sx={{ fontFamily: serifFont, fontStyle: 'italic', fontSize: '0.95rem', color: inkSecondary }}>
                                        {p.tagline}
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '1.02rem', lineHeight: 1.55, color: ink, mb: 1 }}>
                                    {p.paragraph}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    {p.links.map((l) => (
                                        <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.85rem' }}>{l.label}</ExtLink>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', color: inkSecondary, lineHeight: 1.55 }}>
                        Earlier: <ExtLink href="https://github.com/EliHei2/scPotter">scPotter</ExtLink> (graph-convolutional cell annotation, back when GNNs for single cells were barely a thing) and <ExtLink href="https://baio-lab.github.io/muvis">MUVis</ExtLink> (an R package for dependencies in mixed-type data, from my Sharif years).
                    </Typography>
                </Section>

                <Section id="publications" title="Selected publications">
                    {selectedPubs.map((p, i) => (
                        <Box key={i} sx={{
                            display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '104px 1fr' }, gap: { xs: 1.5, sm: 3 },
                            mb: 4, alignItems: 'start',
                        }}>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Thumb variant={p.variant} accent={p.accent} seed={p.title} ariaLabel={`${p.title} figure`} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.35, mb: 0.5 }}>
                                    <ExtLink href={p.titleHref} sx={{ color: ink, '&:hover': { color: accent } }}>{p.title}</ExtLink>
                                </Typography>
                                <Typography sx={{ fontFamily: interFont, fontSize: '0.85rem', color: inkSecondary, mb: 0.25 }}>
                                    <AuthorLine authors={p.authors} />
                                </Typography>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '0.95rem', color: inkSecondary }}>
                                    <Box component="span" sx={venueItalic}>{p.venue}</Box>{' '}
                                    <Box component="span" sx={oldstyle}>{p.year}</Box>
                                    {p.note && <> · {p.note}</>}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
                        <ExtLink href="/publications" sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>All publications →</ExtLink>
                        <ExtLink href={SCHOLAR} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>Google Scholar</ExtLink>
                    </Box>
                </Section>

                <Section id="path" title="Tehran to Heidelberg">
                    {timeline.map((t, i) => (
                        <Box key={i} sx={{
                            display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '92px 1fr' }, gap: { xs: 0.5, sm: 3 },
                            mb: i === timeline.length - 1 ? 0 : 4,
                        }}>
                            <Box sx={{ ...oldstyle, fontSize: '0.9rem', color: inkSecondary, textAlign: { sm: 'right' }, pt: { sm: '2px' } }}>
                                {t.period}
                            </Box>
                            <Box sx={{ borderLeft: { sm: '1px solid rgba(36,36,36,0.12)' }, pl: { xs: 0, sm: 3 }, position: 'relative' }}>
                                <Box sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', left: '-4.5px', top: '5px', width: 8, height: 8, borderRadius: '50%', bgcolor: accent }} />
                                <InstRow insts={t.insts} />
                                <Typography sx={{ fontFamily: displayFont, fontSize: '1.05rem', fontWeight: 600, color: ink }}>{t.place}</Typography>
                                <Typography sx={{ fontFamily: interFont, fontSize: '0.85rem', color: inkSecondary, mb: 0.75 }}>{t.role}</Typography>
                                <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', lineHeight: 1.55, color: ink }}>{t.text}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Section>

                <Section id="writing" title="Writing">
                    {posts.map((post) => (
                        <Box key={post.slug} sx={{ mb: 3 }}>
                            <Typography sx={{ ...oldstyle, fontSize: '0.82rem', color: inkSecondary, mb: 0.25 }}>{post.date}</Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1.12rem', fontWeight: 600, mb: 0.25 }}>
                                <ExtLink href={`/blog/${post.slug}`} sx={{ color: ink, '&:hover': { color: accent } }}>{post.title}</ExtLink>
                            </Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '0.98rem', color: inkSecondary, lineHeight: 1.5 }}>{post.excerpt}</Typography>
                        </Box>
                    ))}
                    <ExtLink href="/blog" sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>More writing →</ExtLink>
                </Section>

                <Section id="contact" title="Contact">
                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.08rem', lineHeight: 1.6, color: ink, mb: 2 }}>
                        If you work on machine learning for biology, or you have a spatial dataset that keeps breaking the tools you throw at it, I’d like to hear about it.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <ExtLink href={EMAIL} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>elyas.heidari@dkfz-heidelberg.de</ExtLink>
                        <ExtLink href={GITHUB} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>GitHub</ExtLink>
                        <ExtLink href={SCHOLAR} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>Scholar</ExtLink>
                    </Box>
                </Section>
            </Box>
        </Container>
    );
}
