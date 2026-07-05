import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import ManifoldBackground from '@/components/ManifoldBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elyas Heidari — machine learning for spatial biology',
  description:
    "I'm Elyas Heidari, a PhD researcher at DKFZ and EMBL in Heidelberg building machine-learning systems for spatial biology.",
  icons: {
    icon: '/icon.svg',
  },
};

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/EliHei2' },
  { label: 'Scholar', href: 'https://scholar.google.com/citations?user=1tjJjf8AAAAJ' },
  { label: 'Reading', href: '/reading' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <ManifoldBackground />

            <Header />
            <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1, pt: { xs: 11, md: 12 } }}>
              {children}
            </Box>
            <Box
              component="footer"
              sx={{
                py: 6,
                px: 3,
                textAlign: 'center',
                fontFamily: 'var(--font-inter, sans-serif)',
                color: '#6b6b6b',
                fontSize: '0.8125rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box component="span">© 2026 Elyas Heidari · Heidelberg</Box>
              <Box component="span" sx={{ display: 'flex', gap: 2 }}>
                {footerLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ color: '#6b6b6b' }}
                  >
                    {l.label}
                  </a>
                ))}
              </Box>
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
