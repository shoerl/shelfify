import { createTheme, PaletteMode } from '@mui/material';
import { createContext } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const common = {
  spacing: 8,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

const lightPalette = {
  mode: 'light' as const,
  primary: { main: '#1976d2' },
  secondary: { main: '#9c27b0' },
  background: { default: '#fafafa', paper: '#ffffff' },
};

const darkPalette = {
  mode: 'dark' as const,
  primary: { main: '#90caf9' },
  secondary: { main: '#ce93d8' },
  background: { default: '#121212', paper: '#1e1e1e' },
};

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    ...common,
    palette: mode === 'light' ? lightPalette : darkPalette,
  });
