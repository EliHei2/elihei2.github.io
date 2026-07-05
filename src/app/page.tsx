import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getAllPosts } from '@/lib/blog';
import { serifFont, interFont, ink, inkSecondary, accent, oldstyle, venueItalic } from '@/theme/tokens';

const GENOME_BIOLOGY = 'https://doi.org/10.1186/s13059-023-02962-5';
const SCHOLAR = 'https://scholar.google.com/citations?user=1tjJjf8AAAAJ';
const GITHUB = 'https://github.com/EliHei2';
const EMAIL = 'mailto:elyas.heidari@dkfz-heidelberg.de';

const heroLinks = [
    { label: 'Email', href: EMAIL },
    { label: 'Google Scholar', href: SCHOLAR },
    { label: 'GitHub', href: GITHUB },
    { label: 'CV', href: '/CV_Elyas_Heidari.pdf' },
];

const bioParagraphs = [
    "I'm from Iran. I studied computer engineering and applied mathematics at Sharif, in Tehran, and spent the years since moving across European labs — EMBL, ETH Zurich, the University of Zurich, and Cambridge — before ending up where I am now, a PhD between DKFZ and EMBL in Heidelberg.",
    "Most of my work lives on graphs. Tissue has structure everywhere you look, and a graph is an honest way to write that structure down, so I reach for graph neural networks for almost everything. The last few years have gone into taking analyses that were slow or thought impossible and getting them to run in minutes, cell segmentation being the latest.",
    "I have a confession that won't surprise anyone who does this work: the most scientific parts of my papers were usually the fastest to write, and the rest of the time I was keeping broken code alive. I've stopped treating that as the boring part, because the engineering is what turns a nice idea into something a biologist can actually use on a Monday morning, and I care about a clean repository about as much as I care about the loss curve coming down. The work I like best happens when a wet-lab biologist and a couple of people who think in code get properly stuck on the same problem. I'm finishing the PhD in 2026 and looking for where to do this next, somewhere that takes both the biology and the systems seriously. I work in English, German, and Persian.",
];

const approachBody = [
    "Where a cell sits, and which cells it sits next to, can matter as much as what type it is, and much of that spatial context is thrown away the moment you grind a tissue up to sequence it. A lot of what I do is try to read it back: to recover the structure of a whole tissue and connect it to what the tissue is doing, in a tumour or a demyelinating lesion.",
    "That pushes me toward models that keep the structure rather than flatten it into a table of numbers. In practice they are graph neural networks for the bulk of it, with transformers and generative pieces where they fit, written in PyTorch and increasingly JAX, plus a lot of unglamorous work to make them run across many GPUs once a dataset stops fitting in memory. I don't consider a method finished until someone I've never met can run it on their own data without emailing me.",
];

const projects = [
    {
        name: 'Segger',
        tagline: 'Cell segmentation as a graph problem. Thirty million transcripts in about ten minutes.',
        paragraph:
            "Segger started as a complaint. Cell segmentation in imaging-based spatial transcriptomics was slow, inaccurate, or both, and every tool I tried buckled once a dataset got genuinely large. So I rebuilt it as one big heterogeneous graph: transcripts and cells are the nodes, deciding which cell a transcript belongs to becomes a link-prediction problem, and the cell outlines from nuclear staining supply the labels; it can also fold in a matched single-cell reference to sharpen the calls. It runs across many GPUs and segments thirty million transcripts in about ten minutes, roughly a thousand times faster than the tools before it, without giving up accuracy. It's under revision at Nature Methods, and it's the work I'm proudest of, because people now run it on datasets they'd written off.",
        links: [
            { label: 'Paper', href: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1' },
            { label: 'Docs', href: 'https://elihei2.github.io/segger_dev/' },
            { label: 'Code', href: 'https://github.com/EliHei2/segger_dev' },
        ],
    },
    {
        name: 'SageNet',
        tagline: 'Putting dissociated cells back where they came from.',
        paragraph:
            "SageNet learns to put dissociated cells back where they came from. When you dissociate a tissue for single-cell sequencing, the first thing you lose is where each cell used to sit. SageNet trains on a spatial reference and predicts that lost position, and its trick is to build the graph over a gene-interaction network estimated from the reference, so it is genes, not just cells, that carry the spatial signal. We showed it by reconstructing the spatial layout of the mouse embryo during gastrulation from seqFISH data, where it beat the standard tools of the time, Tangram and NovoSpaRc. It was my master's thesis, done in John Marioni's lab at EMBL-EBI in Cambridge while I was enrolled at ETH Zurich, and it later won the ETH Medal, ETH Zurich's award for an outstanding thesis.",
        links: [
            { label: 'Docs', href: 'https://sagenet.readthedocs.io' },
            { label: 'Code', href: 'https://github.com/MarioniLab/sagenet' },
            { label: 'Paper', href: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1' },
        ],
    },
];

const earlierWorkLinks = [
    { label: 'scPotter', href: 'https://github.com/EliHei2/scPotter' },
    { label: 'MUVis', href: 'https://baio-lab.github.io/muvis' },
];

const timeline = [
    {
        period: '2022 – 2026',
        place: 'DKFZ & EMBL Heidelberg',
        role: 'PhD researcher, Stegle and Gerstung labs',
        paragraph:
            "Shared between Oliver Stegle's and Moritz Gerstung's groups, on structured representation learning for large-scale spatial omics. Segger came out of this, along with most of what I now know about keeping a distributed, multi-GPU system honest once a single dataset stops fitting in memory. I contribute to the scverse ecosystem, mainly through SpatialData, and I led projects at the scverse × Owkin and SpaceHack hackathons.",
    },
    {
        period: '2019 – 2022',
        place: 'ETH Zurich · UZH · EMBL-EBI Cambridge',
        role: 'MSc Computational Biology · RA, Robinson lab · thesis in the Marioni lab',
        paragraph:
            "Three overlapping things that make one story. A master's in computational biology at ETH Zurich (5.76/6.0, top three in the cohort); alongside it, a research assistant post in Mark Robinson's lab in Zurich building single-cell pipelines for quality control, integration, and cell typing, which is where I learned to write software other people depend on; and a final year on a competitive fellowship in John Marioni's lab at EMBL-EBI in Cambridge, where SageNet came out.",
    },
    {
        period: 'Summer 2018',
        place: 'EMBL Heidelberg',
        role: 'Research trainee, Huber group (BSc thesis)',
        paragraph:
            "A summer fellowship in Wolfgang Huber's group, and my first real taste of graph-based representation learning for single-cell data. I spent it on random-walk and probabilistic graphical models, and on finding where they stop scaling. It was enough to decide the rest of this for me.",
    },
    {
        period: '2014 – 2019',
        place: 'Sharif University of Technology, Tehran',
        role: 'BSc Computer Engineering & Applied Mathematics',
        paragraph:
            "My undergrad years, and where a lot of this started. I was head TA for advanced programming and for probability, founded Sharif DataDays, and wrote MUVis on the side. Iranian olympiad culture taught me to treat hard problems as the normal state of things, for better and for worse.",
    },
];

const selectedPublications = [
    {
        title: 'Segger: Fast and accurate cell segmentation of imaging-based spatial transcriptomics data',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2025.03.14.643160v1',
        authors: 'Heidari, E.*, Moorman, A.*, Unyi, D., et al.',
        venue: 'bioRxiv',
        year: '2025',
        note: 'Under revision at Nature Methods.',
        links: [
            { label: 'docs', href: 'https://elihei2.github.io/segger_dev/' },
            { label: 'code', href: 'https://github.com/EliHei2/segger_dev' },
        ],
    },
    {
        title: 'Integrated in vivo combinatorial functional genomics and spatial transcriptomics of tumours to decode genotype-to-phenotype relationships',
        titleHref: 'https://doi.org/10.1038/s41551-025-01437-1',
        authors: 'Breinig, M.*, Lomakin, A.*, Heidari, E.*, et al.',
        venue: 'Nature Biomedical Engineering',
        year: '2025',
        note: '',
        links: [],
    },
    {
        title: 'SpatialData: an open and universal data framework for spatial omics',
        titleHref: 'https://doi.org/10.1038/s41592-024-02212-x',
        authors: 'Marconato, L.*, Palla, G.*, Yamauchi, K. A.*, Virshup, I.*, Heidari, E., et al.',
        venue: 'Nature Methods 22(1):58–62',
        year: '2025',
        note: '',
        links: [],
    },
    {
        title: 'snRNA-seq stratifies multiple sclerosis patients into distinct white matter glial responses',
        titleHref: 'https://doi.org/10.1016/j.neuron.2024.11.016',
        authors: 'Macnair, W., Calini, D., Agirre, E., Heidari, E., et al.',
        venue: 'Neuron 113(3):396–410.e9',
        year: '2025',
        note: '',
        links: [],
    },
    {
        title: 'Supervised spatial inference of dissociated single-cell data with SageNet',
        titleHref: 'https://www.biorxiv.org/content/10.1101/2022.04.14.488419v1',
        authors: 'Heidari, E., Lohoff, T., Tyser, R. C. V., Marioni, J. C., Robinson, M. D., Ghazanfar, S.',
        venue: 'bioRxiv',
        year: '2022',
        note: 'Master’s thesis; outperformed Tangram and NovoSpaRc.',
        links: [],
    },
    {
        title: 'Meta-analysis of single-cell method benchmarks reveals the need for extensibility and interoperability',
        titleHref: GENOME_BIOLOGY,
        authors: 'Sonrel, A., Luetge, A., Soneson, C., Mallona, I., Germain, P. L., Heidari, E., et al.',
        venue: 'Genome Biology 24(1):119',
        year: '2023',
        note: '',
        links: [],
    },
];

const PROSE_WIDTH = 660;

function ExtLink({ href, children, sx }: { href: string; children: React.ReactNode; sx?: object }) {
    const external = href.startsWith('http');
    return (
        <Box
            component="a"
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            sx={{ color: accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, ...sx }}
        >
            {children}
        </Box>
    );
}

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

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <Box component="section" id={id} sx={{ mb: { xs: 10, md: 12 } }}>
            <Typography variant="h2" sx={{ mb: 3.5 }}>{title}</Typography>
            {children}
        </Box>
    );
}

export default function Home() {
    const posts = getAllPosts().slice(0, 3);

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            {/* Hero */}
            <Box
                component="section"
                id="top"
                className="hero-glow"
                sx={{
                    maxWidth: 780,
                    mx: 'auto',
                    pt: { xs: 4, md: 8 },
                    pb: { xs: 8, md: 12 },
                    px: { xs: 0, md: 2 },
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ fontOpticalSizing: 'auto', mb: 3 }}
                >
                    Elyas Heidari
                </Typography>
                <Typography sx={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: 1.6, color: '#3f3f3f', mb: 2.5, maxWidth: 640 }}>
                    I build machine-learning systems for spatial biology, mostly graph models that read a whole tissue at once, at the scale of tens of millions of transcripts.
                </Typography>
                <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', lineHeight: 1.6, color: '#3f3f3f', mb: 2.5, maxWidth: 640 }}>
                    My main project, Segger, takes cell segmentation that used to be too slow to attempt on large spatial datasets and runs it in about ten minutes. I was also co-first author on a tumour-genomics study in <Box component="span" sx={venueItalic}>Nature Biomedical Engineering</Box>.
                </Typography>
                <Typography sx={{ fontFamily: interFont, fontSize: '0.875rem', color: inkSecondary, mb: 2.5 }}>
                    PhD researcher, Stegle and Gerstung labs · DKFZ and EMBL, Heidelberg · finishing 2026
                </Typography>
                <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
                    {heroLinks.map((l) => (
                        <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.875rem' }}>
                            {l.label}
                        </ExtLink>
                    ))}
                </Box>
            </Box>

            {/* Prose column */}
            <Box className="reading-substrate" sx={{ maxWidth: PROSE_WIDTH, mx: 'auto', mt: { xs: 2, md: 4 } }}>
                <Section id="about" title="About">
                    {bioParagraphs.map((p, i) => (
                        <Typography key={i} variant="body1" sx={{ mb: 2.5 }}>{p}</Typography>
                    ))}
                </Section>

                <Section id="approach" title="How I work">
                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: 1.5, color: '#3f3f3f', mb: 3 }}>
                        Most of biology happens in place.
                    </Typography>
                    {approachBody.map((p, i) => (
                        <Typography key={i} variant="body1" sx={{ mb: 2.5 }}>{p}</Typography>
                    ))}
                    <Typography variant="body1" sx={{ mb: 0 }}>
                        I also think single-cell benchmarking is quietly broken. Most benchmarks are built once and never extended, so the moment a new method or dataset arrives they stop measuring anything useful, and the field goes on citing them anyway.{' '}
                        <ExtLink href={GENOME_BIOLOGY}>I co-authored a paper making that case.</ExtLink>
                    </Typography>
                </Section>

                <Section id="work" title="Selected work">
                    <Typography variant="body1" sx={{ mb: 5, color: inkSecondary }}>
                        A few things I&apos;ve built. Segger and SageNet have taken most of my recent attention; the last two are older but seeded much of it.
                    </Typography>
                    {projects.map((proj) => (
                        <Box key={proj.name} sx={{ mb: 6 }}>
                            <Typography variant="h3" sx={{ mb: 0.75 }}>{proj.name}</Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '0.95rem', color: inkSecondary, mb: 1.75 }}>
                                {proj.tagline}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1.5 }}>{proj.paragraph}</Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                {proj.links.map((l) => (
                                    <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.85rem' }}>
                                        {l.label}
                                    </ExtLink>
                                ))}
                            </Box>
                        </Box>
                    ))}
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                        Before those two: scPotter (formerly scGCN), an early attempt at graph-convolutional learning over gene regulatory networks for cell annotation, from back when GNNs for single cells were barely a thing; and MUVis, an R package from my Sharif years for modelling dependencies in population-scale, mixed-type data. Both are older than my current taste, but the instinct behind them is the one I still work by.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {earlierWorkLinks.map((l) => (
                            <ExtLink key={l.label} href={l.href} sx={{ fontFamily: interFont, fontSize: '0.85rem' }}>
                                {l.label}
                            </ExtLink>
                        ))}
                    </Box>
                </Section>
            </Box>

            {/* Timeline — deliberately wider than the prose column */}
            <Box className="reading-substrate" sx={{ maxWidth: 720, mx: 'auto' }}>
                <Section id="path" title="Tehran to Heidelberg">
                    <Box>
                        {timeline.map((t, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '112px 1fr' },
                                    gap: { xs: 0.75, sm: 3 },
                                    mb: i === timeline.length - 1 ? 0 : 5,
                                }}
                            >
                                <Box sx={{ ...oldstyle, fontSize: '0.95rem', color: inkSecondary, textAlign: { sm: 'right' }, pt: { sm: '2px' } }}>
                                    {t.period}
                                </Box>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        borderLeft: { sm: '1px solid rgba(52,52,52,0.12)' },
                                        pl: { xs: 0, sm: 3.5 },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: { xs: 'none', sm: 'block' },
                                            position: 'absolute',
                                            left: '-4.5px',
                                            top: '6px',
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: accent,
                                        }}
                                    />
                                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.05rem', fontWeight: 600, color: ink }}>
                                        {t.place}
                                    </Typography>
                                    <Typography sx={{ fontFamily: interFont, fontSize: '0.9rem', color: inkSecondary, mb: 1 }}>
                                        {t.role}
                                    </Typography>
                                    <Typography sx={{ fontFamily: serifFont, fontSize: '1.02rem', lineHeight: 1.6, color: ink }}>
                                        {t.paragraph}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Section>
            </Box>

            {/* Publications + Writing + Contact */}
            <Box className="reading-substrate" sx={{ maxWidth: PROSE_WIDTH, mx: 'auto' }}>
                <Section id="publications" title="Selected publications">
                    <Typography variant="body1" sx={{ mb: 5, color: inkSecondary, fontSize: '1rem' }}>
                        Six I usually point to first. My name is in bold and an asterisk marks equal contribution; the full list is on Google Scholar.
                    </Typography>
                    {selectedPublications.map((p, i) => (
                        <Box key={i} sx={{ mb: 5.5 }}>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.35, mb: 0.75 }}>
                                <ExtLink href={p.titleHref} sx={{ color: ink, '&:hover': { color: accent } }}>
                                    {p.title}
                                </ExtLink>
                            </Typography>
                            <Typography sx={{ fontFamily: interFont, fontSize: '0.875rem', color: inkSecondary, mb: 0.5 }}>
                                <AuthorLine authors={p.authors} />
                            </Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '0.95rem', color: inkSecondary }}>
                                <Box component="span" sx={venueItalic}>{p.venue}</Box>{' '}
                                <Box component="span" sx={oldstyle}>{p.year}</Box>
                                {p.note && <> · {p.note}</>}
                                {p.links.map((l) => (
                                    <React.Fragment key={l.label}>
                                        {' · '}
                                        <ExtLink href={l.href} sx={{ fontFamily: interFont, fontSize: '0.85rem' }}>[{l.label}]</ExtLink>
                                    </React.Fragment>
                                ))}
                            </Typography>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
                        <ExtLink href={SCHOLAR} sx={{ fontFamily: interFont, fontSize: '0.875rem' }}>Full list on Google Scholar</ExtLink>
                        <ExtLink href="/publications" sx={{ fontFamily: interFont, fontSize: '0.875rem' }}>All publications →</ExtLink>
                    </Box>
                </Section>

                <Section id="writing" title="Writing">
                    <Typography variant="body1" sx={{ mb: 4, color: inkSecondary, fontSize: '1rem' }}>
                        Occasional notes on how the work really goes, the science and the plumbing both.
                    </Typography>
                    {posts.map((post) => (
                        <Box key={post.slug} sx={{ mb: 3.5 }}>
                            <Typography sx={{ ...oldstyle, fontSize: '0.85rem', color: inkSecondary, mb: 0.5 }}>
                                {post.date}
                            </Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1.15rem', fontWeight: 600, mb: 0.5 }}>
                                <ExtLink href={`/blog/${post.slug}`} sx={{ color: ink, '&:hover': { color: accent } }}>
                                    {post.title}
                                </ExtLink>
                            </Typography>
                            <Typography sx={{ fontFamily: serifFont, fontSize: '1rem', color: inkSecondary, lineHeight: 1.5 }}>
                                {post.excerpt}
                            </Typography>
                        </Box>
                    ))}
                    <ExtLink href="/blog" sx={{ fontFamily: interFont, fontSize: '0.875rem' }}>More writing →</ExtLink>
                </Section>

                <Section id="contact" title="Contact">
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        If you work on machine learning for biology, or you have a spatial dataset that keeps breaking the tools you throw at it, I&apos;d like to hear about it. Email is the surest way to reach me, and most of my code is on GitHub.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <ExtLink href={EMAIL} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>elyas.heidari@dkfz-heidelberg.de</ExtLink>
                        <ExtLink href={GITHUB} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>GitHub</ExtLink>
                        <ExtLink href={SCHOLAR} sx={{ fontFamily: interFont, fontSize: '0.9rem' }}>Google Scholar</ExtLink>
                    </Box>
                </Section>
            </Box>
        </Container>
    );
}
