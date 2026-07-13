import type { Metadata } from 'next';
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: 'JERMZONE',
  description: 'Software projects by Jerm — league management, games, and more.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💀</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
