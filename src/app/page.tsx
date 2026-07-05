import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getAllPosts } from '@/lib/blog';
import HeroManifold from '@/components/HeroManifold';
import Thumb, { ThumbVariant } from '@/components/Thumb';
import { Pomegranate, Pistachio, Saffron } from '@/components/Motifs';
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
    ghazanfar: 'https://shazanfar.github.io/',
    robinson: 'https://robinsonlabuzh.github.io/',
    huber: 'https://www.embl.org/groups/huber/',
    ethMedal: 'https://ethz.ch/en/the-eth-zurich/education/awards/eth-medal.html',
    alphaearth: 'https://deepmind.google/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/',
    dkfz: 'https://www.dkfz.de/en/index.html',
    muvis: 'https://baio-lab.github.io/muvis',
    mashhad: 'https://www.google.com/maps/search/?api=1&query=Mashhad%2C+Iran',
    dastjerd: 'https://www.google.com/maps/search/?api=1&query=Dastjerd%2C+Iran',
};

const heroLinks = [
    { label: 'Email', href: EMAIL },
    { label: 'Scholar', href: SCHOLAR },
    { label: 'GitHub', href: GITHUB },
    { label: 'CV', href: '/CV_Elyas_Heidari.pdf' },
];

const justify = { textAlign: 'justify' as const, hyphens: 'auto' as const, WebkitHyphens: 'auto' as const };

const projects = [
    {
        name: 'Segger',
        logo: '/segger_logo.png',
        accent: apple.teal,
        tagline: 'Cell segmentation as a graph problem.',
        paragraph:
            'Cell segmentation in spatial transcriptomics was slow and inaccurate, and every tool buckled on large data. Segger rebuilds it as one big heterogeneous graph, running 30 million transcripts in about 10 minutes, roughly 1,000× faster than the tools before it. Under revision at Nature Methods.',
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
            'When you dissociate a tissue to sequence it, you lose where each cell sat. SageNet learns that lost position by building a graph over a gene-interaction network, then reconstructing the mouse embryo during gastrulation from seqFISH. It was my master’s thesis, and it won the ETH Medal.',
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
        variant: 'graph', accent: apple.blue,
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks reveals the need for extensibility and interoperability',
        titleHref: 'https://doi.org/10.1186/s13059-023-02962-5',
        authors: 'Sonrel, A., …, Heidari, E., et al.', venue: 'Genome Biology 24(1):119', year: '2023',
        variant: 'bars', accent: apple.green,
    },
];

const timeline = [
    {
        period: '2022 – now', place: 'DKFZ & EMBL Heidelberg', role: 'PhD, Stegle & Gerstung labs',
        insts: [{ chip: 'DKFZ' }, { img: '/logos/embl.svg', alt: 'EMBL' }],
        text: 'Structured representation learning for large-scale spatial omics. Segger came out of this, and now Laminar. I contribute to scverse, mainly SpatialData.',
    },
    {
        period: '2019 – 2022', place: 'ETH Zürich · UZH · EMBL-EBI', role: 'MSc · RA (Robinson) · thesis (Marioni)',
        insts: [{ img: '/logos/eth.svg', alt: 'ETH Zürich' }, { img: '/logos/uzh.svg', alt: 'University of Zurich' }, { chip: 'EMBL-EBI' }],
        text: 'A master’s in computational biology at ETH (5.76/6.0, top three), single-cell pipelines in Mark Robinson’s lab in Zurich, and a fellowship year in John Marioni’s lab in Cambridge where SageNet came out.',
    },
    {
        period: '2018', place: 'EMBL Heidelberg', role: 'Research trainee, Huber group',
        insts: [{ img: '/logos/embl.svg', alt: 'EMBL' }],
        text: 'A summer in Wolfgang Huber’s group and my first taste of single-cell data. Enough to decide the rest.',
    },
    {
        period: '2014 – 2019', place: 'Sharif University of Technology, Tehran', role: 'BSc CE & Applied Mathematics',
        insts: [{ chip: 'Sharif' }],
        text: 'Where a lot of this started, and where I first got into graphs. Head TA for advanced programming and probability, founded Sharif DataDays, wrote MUVis on the side.',
    },
];

function ExtLink({ href, children, sx }: { href: string; children: React.ReactNode; sx?: object }) {
    const ext = href.startsWith('http');
    return (
        <Box component="a" href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
                    transition: 'opacity 0.2s, filter 0.2s', '&:hover': { opacity: 1, filter: 'grayscale(0)' },
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
            <Box sx={{
                display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' },
                gap: { xs: 4, md: 6 }, alignItems: 'start', pt: { xs: 2, md: 3 },
            }}>
                {/* ---- Content column ---- */}
                <Box sx={{ minWidth: 0 }}>
                    {/* Hero: photo, then name + title underneath */}
                    <Box sx={{ mb: { xs: 6, md: 8 } }}>
                        <Box component="img" src="/portrait.jpg" alt="Elyas Heidari giving a talk"
                            sx={{
                                width: { xs: 150, md: 176 }, height: { xs: 188, md: 220 },
                                borderRadius: '14px', objectFit: 'cover', objectPosition: 'center',
                                border: '3px solid #fcfdfe', boxShadow: '0 6px 22px rgba(36,36,36,0.16)', display: 'block',
                            }} />
                        <Typography variant="h1" component="h1" sx={{ mt: 2.5, mb: 1 }}>Elyas Heidari</Typography>
                        <Typography sx={{ fontFamily: interFont, fontSize: '0.9rem', color: inkSecondary, mb: 3 }}>
                            PhD researcher · DKFZ &amp; EMBL, Heidelberg · finishing Sept. 2026
                        </Typography>

                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.6, color: ink, mb: 2, ...justify }}>
                            I work on AI for science, specifically the machine learning of spatial data. A tissue has structure everywhere you look (where a cell sits, which cells surround it, how the whole thing is arranged), and I think that structure is signal, not noise. Most methods flatten it into a table and lose it; I build graph models that keep it. The engineering matters to me as much as the idea: I care whether a method runs on a stranger’s data on a Monday morning, not only whether it’s clever.
                        </Typography>
                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.6, color: ink, mb: 2, ...justify }}>
                            My PhD, shared between <ExtLink href={labs.stegle}>Oliver Stegle</ExtLink>’s and <ExtLink href={labs.gerstung}>Moritz Gerstung</ExtLink>’s labs, is about making these models scale. <ExtLink href="#work" sx={{ color: ink, borderBottom: `1px solid ${accent}66` }}>Segger</ExtLink>, the project I’m known for, turns cell segmentation into a graph problem and runs 30 million transcripts in about 10 minutes, roughly 1,000× faster than the tools before it. Now I’m building <Box component="span" sx={{ fontWeight: 600 }}>Laminar</Box>, a spatial foundation model for cancer at the <ExtLink href={labs.dkfz}>German Cancer Research Center</ExtLink>: an <ExtLink href={labs.alphaearth}>AlphaEarth</ExtLink> for tissues, one embedding that captures how a tumour is organised, trained on 50 billion transcripts and 500 million cells.
                        </Typography>
                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.6, color: ink, mb: 3, ...justify }}>
                            I grew into this across a string of labs. I got into graphs as an undergrad at Sharif in Tehran, building <ExtLink href={labs.muvis}>MUVis</ExtLink>; did a master’s in computational biology at ETH Zürich, where my thesis won the <ExtLink href={labs.ethMedal}>ETH Medal</ExtLink>; met single-cell data with <ExtLink href={labs.huber}>Wolfgang Huber</ExtLink> at EMBL and <ExtLink href={labs.robinson}>Mark Robinson</ExtLink> in Zurich; and built SageNet with <ExtLink href={labs.marioni}>John Marioni</ExtLink> and <ExtLink href={labs.ghazanfar}>Shila Ghazanfar</ExtLink> in Cambridge. Somewhere along the way I decided single-cell benchmarking is quietly broken, and I haven’t changed my mind.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
                            {heroLinks.map((l) => (
                                <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>{l.label}</ExtLink>
                            ))}
                        </Box>
                    </Box>

                    {/* Below */}
                    <Box className="reading-substrate">
                        <Section id="work" title="Selected work">
                            {projects.map((p) => (
                                <Box key={p.name} sx={{
                                    display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '64px 1fr' }, gap: { xs: 1.5, sm: 3 },
                                    mb: 5, alignItems: 'start',
                                }}>
                                    <Box component="img" src={p.logo} alt={`${p.name} logo`} sx={{ width: 56, height: 'auto', mt: 0.5 }} />
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5, flexWrap: 'wrap' }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.accent }} />
                                            <Typography variant="h3">{p.name}</Typography>
                                            <Typography sx={{ fontFamily: serifFont, fontStyle: 'italic', fontSize: '0.95rem', color: inkSecondary }}>
                                                {p.tagline}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.02rem', lineHeight: 1.55, color: ink, mb: 1, ...justify }}>
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
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', color: inkSecondary, lineHeight: 1.55, ...justify }}>
                                Earlier: <ExtLink href="https://github.com/EliHei2/scPotter">scPotter</ExtLink> (graph-convolutional cell annotation, back when GNNs for single cells were barely a thing) and <ExtLink href={labs.muvis}>MUVis</ExtLink> (an R package for dependencies in mixed-type data, from my Sharif years).
                            </Typography>
                        </Section>

                        <Section id="publications" title="Selected publications">
                            {selectedPubs.map((p, i) => (
                                <Box key={i} sx={{
                                    display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '96px 1fr' }, gap: { xs: 1.5, sm: 2.5 },
                                    mb: 4, alignItems: 'start',
                                }}>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Thumb variant={p.variant} accent={p.accent} seed={p.title} size={88} ariaLabel={`${p.title} figure`} />
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
                                        <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', lineHeight: 1.55, color: ink, ...justify }}>{t.text}</Typography>
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
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1.08rem', lineHeight: 1.6, color: ink, mb: 2, ...justify }}>
                                Want to talk, think together, or code together? I’m always up for it. Email is the surest way to reach me.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                <ExtLink href={EMAIL} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>elyas.heidari [at] dkfz-heidelberg.de</ExtLink>
                                <ExtLink href={GITHUB} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>GitHub</ExtLink>
                                <ExtLink href={SCHOLAR} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>Scholar</ExtLink>
                            </Box>
                        </Section>

                        {/* From Iran */}
                        <Box component="section" sx={{ mb: { xs: 4, md: 6 }, pt: 2, borderTop: '1px solid rgba(36,36,36,0.10)' }}>
                            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, mb: 2.5 }}>
                                <Pomegranate /><Pistachio /><Saffron />
                            </Box>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1.08rem', lineHeight: 1.65, color: ink, ...justify }}>
                                I grew up in <ExtLink href={labs.mashhad}>Mashhad</ExtLink>, in northeastern Iran, the city of saffron, and my family comes from the small village of <ExtLink href={labs.dastjerd}>Dastjerd</ExtLink>. Iran is always in my heart, and I think it shows: in how much I care about science and education, and in my weakness for a colorful figure.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* ---- Sticky manifold rail (scrolls with you) + a line to sit with ---- */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
                    position: 'sticky', top: 88, height: '82vh', minWidth: 0,
                }}>
                    <Box sx={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
                        <HeroManifold />
                    </Box>
                    <Box sx={{ mt: 2.5 }}>
                        <Typography sx={{ fontFamily: serifFont, fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.5, color: inkSecondary }}>
                            “The important thing is not to stop questioning. Curiosity has its own reason for existing.”
                        </Typography>
                        <Typography sx={{ fontFamily: interFont, fontSize: '0.78rem', color: '#8a8a8a', mt: 0.75 }}>
                            — Albert Einstein
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
