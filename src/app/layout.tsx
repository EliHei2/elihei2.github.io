import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import ManifoldBackground from '@/components/ManifoldBackground';

export const metadata: Metadata = {
  title: 'Elyas Heidari | Research Engineer in AI for Biology',
  description: 'Research Engineer in AI for Biology focusing on scalable learning systems for biomedical discovery.',
  icons: {
    icon: '/icon.svg',
  },
};

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
            {/* Dynamic Background */}
            <ManifoldBackground />

            <Header />
            <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1, pt: { xs: 12, md: 14 } }}>
              {children}
            </Box>
            <Box component="footer" sx={{ py: 8, textAlign: 'center', color: 'rgba(244, 244, 228, 0.4)', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              <small>© {new Date().getFullYear()} Elyas Heidari</small>
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
