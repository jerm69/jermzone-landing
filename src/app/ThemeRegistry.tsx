'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#152a42' },
    secondary: { main: '#9c3230' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: { fontFamily: '"Space Mono", "Courier New", monospace' },
        h2: { fontFamily: '"Space Mono", "Courier New", monospace' },
        h3: { fontFamily: '"Space Mono", "Courier New", monospace' },
        h4: { fontFamily: '"Space Mono", "Courier New", monospace' },
        h5: { fontFamily: '"Space Mono", "Courier New", monospace' },
        h6: { fontFamily: '"Space Mono", "Courier New", monospace' },
        overline: { fontFamily: '"Space Mono", "Courier New", monospace' },
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
