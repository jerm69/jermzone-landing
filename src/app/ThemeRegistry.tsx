'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const colors = {
  navy: '#152a42',
  ink: '#0e1d2e',
  charcoal: '#26282c',
  slate: '#4c6672',
  gray: '#a9abae',
  bone: '#e8e6e1',
  steel: '#5089ad',
  sky: '#8fbbd6',
  red: '#9c3230',
  rose: '#d68f8d',
  orange: '#c1652f',
  mustard: '#c99a3e',
  gold: '#e0bd6f',
};

export const mono = '"Space Mono", "Courier New", monospace';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.sky },
    secondary: { main: colors.gold },
    background: { default: colors.navy, paper: colors.charcoal },
    text: { primary: colors.bone, secondary: colors.gray },
    divider: colors.slate,
  },
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: mono, fontWeight: 700 },
    h2: { fontFamily: mono, fontWeight: 700 },
    h3: { fontFamily: mono, fontWeight: 700 },
    h4: { fontFamily: mono, fontWeight: 700 },
    h5: { fontFamily: mono, fontWeight: 700 },
    h6: { fontFamily: mono, fontWeight: 700 },
    overline: { fontFamily: mono, letterSpacing: '0.14em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html': { scrollBehavior: 'smooth' },
        'body': { backgroundColor: colors.navy },
        'a:focus-visible, button:focus-visible': { outline: `2px solid ${colors.gold}`, outlineOffset: 3 },
        '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 700, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
