import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Shelfify
          </Typography>
          <IconButton component={Link} to="/all-items" edge="end" sx={{ ml: 'auto' }}>
            📦
          </IconButton>
          <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
            Types
          </ListItem>
          <ListItem button component={Link} to="/all-items" onClick={() => setDrawerOpen(false)}>
            My Items
          </ListItem>
        </List>
      </Drawer>
      <main style={{ padding: '24px' }}>{children}</main>
    </>
  );
}
