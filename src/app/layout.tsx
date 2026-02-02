import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Elyas Heidari | Research Engineer',
  description: 'Portfolio of Elyas Heidari, Research Engineer in Computational Biology.',
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
          <Sidebar>
            {children}
          </Sidebar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
