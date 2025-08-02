import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { ColorModeContext } from '../../theme';

export function ThemeToggle() {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <IconButton color="inherit" onClick={toggleColorMode} size="large" aria-label="toggle theme">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
