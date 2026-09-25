import type { Metadata } from 'next';
import ThemeRegistry from './ThemeRegistry';
import Telemetry from '@/components/Telemetry';

export const metadata: Metadata = {
  title: 'Jeremy Terhaar | Software Engineer',
  description: 'Jeremy Terhaar — Software Engineer specializing in DevOps, CI/CD, and platform engineering.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23152a42'/><text x='50' y='62' font-family='Arial, sans-serif' font-size='46' font-weight='700' fill='%239c3230' text-anchor='middle'>JT</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeRegistry>
          <Telemetry app="jermzone" />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
