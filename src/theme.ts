import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const spacing = 8;

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700 },
  h2: { fontSize: '1.5rem', fontWeight: 700 },
  h3: { fontSize: '1.25rem', fontWeight: 600 },
  body1: { fontSize: '1rem' },
  button: { textTransform: 'none', fontWeight: 500 },
};

const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: { main: '#1976d2' },
  secondary: { main: '#9c27b0' },
  background: { default: '#fafafa', paper: '#fff' },
};

const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: { main: '#90caf9' },
  secondary: { main: '#ce93d8' },
  background: { default: '#121212', paper: '#1e1e1e' },
};

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    spacing,
    typography,
    palette: mode === 'light' ? lightPalette : darkPalette,
  });

export const theme = createAppTheme('light');
