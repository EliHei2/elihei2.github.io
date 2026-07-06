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
    iran: 'https://www.youtube.com/watch?v=rWj9UdYknlI',
    sharif: 'https://en.wikipedia.org/wiki/Sharif_University_of_Technology',
    sagenet: 'https://github.com/MarioniLab/sagenet',
    danapeer: 'https://www.mskcc.org/research/ski/labs/dana-pe-er',
    sharifiZarchi: 'https://scholar.google.com/citations?user=GbJMZLIAAAAJ',
    scpotter: 'https://f1000research.com/slides/9-1469',
    eth: 'https://ethz.ch/en/',
    embl: 'https://www.embl.org/',
};

const heroLinks = [
    { label: 'Email', href: EMAIL },
    { label: 'Scholar', href: SCHOLAR },
    { label: 'GitHub', href: GITHUB },
    { label: 'CV', href: '/CV_Elyas_Heidari.pdf' },
];

const justify = { textAlign: 'justify' as const, hyphens: 'auto' as const, WebkitHyphens: 'auto' as const };

const skills = [
    { label: 'Machine learning', items: ['Graph neural nets', 'Transformers', 'Self-supervision', 'Generative models'] },
    { label: 'Frameworks', items: ['PyTorch', 'PyG', 'Lightning', 'JAX', 'Pyro'] },
    { label: 'Scale', items: ['Multi-GPU', 'Dask', 'RAPIDS', 'SLURM', 'Zarr'] },
    { label: 'MLOps', items: ['Docker', 'Nextflow', 'Snakemake', 'W&B', 'CI/CD'] },
    { label: 'Code', items: ['Python', 'R', 'C', 'Bash'] },
    { label: 'Spoken', items: ['English', 'German · C1', 'Persian'] },
];

const projects = [
    {
        name: 'Segger',
        logo: '/segger_logo.png',
        accent: apple.teal,
        tagline: 'Cell segmentation as a graph problem — the tokenizer for spatial foundation models.',
        paragraph:
            'Cell segmentation is the rate-limiting step in spatial transcriptomics: which transcript belongs to which cell. Segger reframes it as link prediction on one big heterogeneous graph and runs 30 million transcripts in about 10 minutes, roughly 1,000× faster than the tools before it. Those cells become the tokens the foundation models above them are built on. Under revision at Nature Methods.',
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
    note?: string; img?: string; variant?: ThumbVariant; accent?: string;
}[] = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1',
        authors: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al.', venue: 'bioRxiv', year: '2025',
        note: 'Under revision at Nature Methods.', img: '/pubfigs/segger.jpg',
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        titleHref: 'https://doi.org/10.1038/s41592-024-02212-x',
        authors: 'Marconato, L.*, Palla, G.*, …, Heidari, E., et al.', venue: 'Nature Methods 22(1):58–62', year: '2025',
        img: '/pubfigs/spatialdata.png',
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours',
        titleHref: 'https://doi.org/10.1038/s41551-025-01437-1',
        authors: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al.', venue: 'Nature Biomedical Engineering', year: '2025',
        img: '/pubfigs/natbme.png',
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1',
        authors: 'Heidari, E., Lohoff, T., …, Ghazanfar, S.', venue: 'bioRxiv', year: '2022',
        img: '/pubfigs/sagenet.gif',
    },
    {
        title: 'scPotter: geometric deep learning on single-cell gene networks',
        titleHref: 'https://f1000research.com/slides/9-1469',
        authors: 'Heidari, E., et al.', venue: 'F1000Research', year: '2020',
        img: '/pubfigs/scpotter.jpg',
    },
    {
        title: 'MUVis: learning dependency structure in mixed-type data',
        titleHref: 'https://baio-lab.github.io/muvis',
        authors: 'Heidari, E., et al.', venue: 'R package · bioRxiv', year: '2018',
        img: '/pubfigs/muvis.png',
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
            {/* Header */}
            <Box sx={{ pt: { xs: 2, md: 4 }, mb: { xs: 4, md: 5 } }}>
                <Typography variant="h1" component="h1" sx={{ mb: 1 }}>Elyas Heidari</Typography>
                <Typography sx={{ fontFamily: interFont, fontSize: '0.9rem', color: inkSecondary }}>
                    PhD researcher · DKFZ &amp; EMBL, Heidelberg · finishing Sept. 2026
                </Typography>
            </Box>

            <Box sx={{
                display: 'grid', gridTemplateColumns: { xs: '1fr', md: '236px 1fr' },
                gap: { xs: 5, md: 6 }, alignItems: 'start',
            }}>
                {/* ---- Left sidebar: photo → manifold → skills (sticky) ---- */}
                <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
                    <Box component="img" src="/portrait.jpg" alt="Elyas Heidari"
                        sx={{ width: '100%', maxWidth: { xs: 220, md: '100%' }, borderRadius: '12px', objectFit: 'cover', border: '3px solid #fcfdfe', boxShadow: '0 6px 22px rgba(36,36,36,0.14)', display: 'block' }} />
                    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', height: 190, borderRadius: '12px', overflow: 'hidden', mt: 2 }}>
                        <HeroManifold />
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {skills.map((g) => (
                            <Box key={g.label}>
                                <Typography sx={{ fontFamily: interFont, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8a8a8a', mb: 0.75 }}>{g.label}</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                    {g.items.map((it) => (
                                        <Box key={it} component="span" sx={{ fontFamily: interFont, fontSize: '0.72rem', color: inkSecondary, border: '1px solid rgba(36,36,36,0.14)', borderRadius: '4px', px: 0.85, py: '2px', lineHeight: 1.5, whiteSpace: 'nowrap' }}>{it}</Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}>
                        <Typography sx={{ fontFamily: serifFont, fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.5, color: inkSecondary }}>
                            “The important thing is not to stop questioning.”
                        </Typography>
                        <Typography sx={{ fontFamily: interFont, fontSize: '0.75rem', color: '#8a8a8a', mt: 0.5 }}>— Albert Einstein</Typography>
                    </Box>
                </Box>

                {/* ---- Main content ---- */}
                <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ mb: { xs: 6, md: 7 } }}>
                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.62, color: ink, mb: 2, ...justify }}>
                            I’m a PhD researcher in <ExtLink href={labs.stegle}>Oliver Stegle</ExtLink>’s and <ExtLink href={labs.gerstung}>Moritz Gerstung</ExtLink>’s labs, working on AI for spatial data. I’m interested in graphs, scalable and academic-budget AI, and <ExtLink href="https://en.wikipedia.org/wiki/Realist_Evaluation">realist evaluation</ExtLink>: whether a method survives contact with real biological data, which most AI doesn’t, out of the box. That gap is the fun part.
                        </Typography>
                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.62, color: ink, mb: 2, ...justify }}>
                            My main project, <ExtLink href="#work">Segger</ExtLink>, turns cell segmentation into link prediction on a graph and runs 30 million transcripts in about 10 minutes, roughly 1,000× faster than the tools before it; it’s the tokenizer the spatial foundation models above it are built on. I’m now building one of those, <Box component="span" sx={{ fontWeight: 600 }}>Laminar</Box>: a self-supervised model that turns a tumour into a cross-scale embedding field, an <ExtLink href={labs.alphaearth}>AlphaEarth</ExtLink> for tissues rather than the planet, trained on 50 billion transcripts and 500 million cells at the <ExtLink href={labs.dkfz}>German Cancer Research Center</ExtLink>.
                        </Typography>
                        <Typography sx={{ fontFamily: serifFont, fontSize: '1.1rem', lineHeight: 1.62, color: ink, mb: 3, ...justify }}>
                            Before Heidelberg, I did a double bachelor’s in computer engineering and mathematics at <ExtLink href={labs.sharif}>Sharif University of Technology</ExtLink> in Tehran, where I worked with <ExtLink href={labs.sharifiZarchi}>Ali Sharifi-Zarchi</ExtLink> and built <ExtLink href={labs.muvis}>MUVis</ExtLink>. I then did a master’s in computational biology at <ExtLink href={labs.eth}>ETH Zürich</ExtLink>, where my thesis won the <ExtLink href={labs.ethMedal}>ETH Medal</ExtLink>. Along the way: a summer at <ExtLink href={labs.embl}>EMBL</ExtLink> with <ExtLink href={labs.huber}>Wolfgang Huber</ExtLink>, where I built <ExtLink href={labs.scpotter}>scPotter</ExtLink>; single-cell pipelines with <ExtLink href={labs.robinson}>Mark Robinson</ExtLink> in Zurich; and <ExtLink href={labs.sagenet}>SageNet</ExtLink> with <ExtLink href={labs.marioni}>John Marioni</ExtLink> and <ExtLink href={labs.ghazanfar}>Shila Ghazanfar</ExtLink> in Cambridge.
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
                                        {p.name === 'Segger' && (
                                            <Typography sx={{ fontFamily: interFont, fontSize: '0.82rem', color: inkSecondary, mt: 1.25 }}>
                                                A collaboration with Andrew Moorman and <ExtLink href={labs.danapeer} sx={{ fontSize: '0.82rem' }}>Dana Pe’er’s lab</ExtLink> at MSK.
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Section>

                        <Section id="publications" title="Selected publications">
                            {selectedPubs.map((p, i) => (
                                <Box key={i} sx={{
                                    display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '128px 1fr' }, gap: { xs: 1.5, sm: 2.5 },
                                    mb: 4, alignItems: 'start',
                                }}>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        {p.img ? (
                                            <Box component="img" src={p.img} alt={`${p.title} figure`} loading="lazy"
                                                sx={{ width: '100%', height: 'auto', maxHeight: 128, objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(36,36,36,0.08)', bgcolor: '#fff', display: 'block' }} />
                                        ) : (
                                            <Thumb variant={p.variant!} accent={p.accent!} seed={p.title} size={100} ariaLabel={`${p.title} figure`} />
                                        )}
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
                            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'baseline' }}>
                                <Box component="span" sx={{ fontFamily: interFont, fontSize: '0.9rem', color: ink }}>elyas.heidari [at] dkfz-heidelberg.de</Box>
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
                                I grew up in <ExtLink href={labs.mashhad}>Mashhad</ExtLink>, in northeastern Iran, the city of saffron, and my family comes from the small village of <ExtLink href={labs.dastjerd}>Dastjerd</ExtLink>. <ExtLink href={labs.iran}>Iran</ExtLink> is always in my heart, and I think it shows: in how much I care about science and education, and in my weakness for a colorful figure.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
