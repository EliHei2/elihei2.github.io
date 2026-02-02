import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/Header';
import Box from '@mui/material/Box';

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
      <body style={{ backgroundColor: '#ffffff' }}>
        <ThemeRegistry>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Box component="footer" sx={{ py: 4, textAlign: 'center', color: '#999' }}>
              <small>© {new Date().getFullYear()} Elyas Heidari</small>
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
