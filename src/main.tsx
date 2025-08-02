import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { getTheme, ColorModeContext } from './theme';

const queryClient = new QueryClient();

// Get the base path from the Vite config
const basePath = import.meta.env.BASE_URL || '/';

function Main() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({ toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')) }),
    [],
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HelmetProvider>
            <BrowserRouter basename={basePath}>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
