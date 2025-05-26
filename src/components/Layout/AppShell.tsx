import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemAvatar,
  Button,
  Collapse,
  InputBase,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  CollectionsBookmark as ShelvesIcon,
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  AllInbox as CopiesIcon,
  Favorite as WishlistIcon,
  BarChart as StatsIcon,
  DynamicFeed as ActivityIcon,
  LibraryMusic as MusicIcon,
  Movie as MovieIcon,
  Casino as PokemonIcon,
} from '@mui/icons-material';

// Import the new MobileBottomNavigation component
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { AddCopyForm } from '../AddCopyForm'; // Import AddCopyForm
import { useModal } from '../../contexts/ModalContext'; // Import useModal

const DRAWER_WIDTH = 220;

// Mock data for navigation and shelves
const sidebarNavItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'My Shelves', path: '/shelves', icon: <ShelvesIcon />, expandable: true },
  { label: 'All Copies', path: '/copies', icon: <CopiesIcon /> },
  { label: 'Wishlist', path: '/wishlist', icon: <WishlistIcon /> },
  { label: 'Statistics', path: '/stats', icon: <StatsIcon /> },
  { label: 'Activity Feed', path: '/activity', icon: <ActivityIcon /> },
];

const topNavItems = [
  { label: 'Home', path: '/' },
  { label: 'My Shelves', path: '/shelves' },
  { label: 'All Copies', path: '/copies' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'Statistics', path: '/stats' },
];

const mockShelves = [
  { id: 'music', name: 'Music Shelf', count: 3, icon: <MusicIcon /> },
  { id: 'movies', name: 'Movies Shelf', count: 1, icon: <MovieIcon /> },
  { id: 'pokemon', name: 'Pokémon Shelf', count: 0, icon: <PokemonIcon /> },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const { addCopyOpen } = useModal(); // Get modal state from context
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const [shelvesOpen, setShelvesOpen] = useState(location.pathname.startsWith('/shelves'));

  const handleShelvesClick = () => {
    setShelvesOpen(!shelvesOpen);
  };

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ px: 2, flex: 1 }}>
        {sidebarNavItems.map(item => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path || (item.expandable && location.pathname.startsWith(item.path))}
                onClick={item.expandable ? handleShelvesClick : undefined}
                sx={{
                  'borderRadius': 2,
                  'width': '100%',
                  '&.Mui-selected': {
                    'backgroundColor': 'primary.main',
                    'color': 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.expandable && (shelvesOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.expandable && (
              <Collapse in={shelvesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {mockShelves.map(shelf => (
                    <ListItemButton
                      key={shelf.id}
                      component={Link}
                      to={`/shelves/${shelf.id}`}
                      selected={location.pathname === `/shelves/${shelf.id}`}
                      sx={{
                        'pl': 6,
                        'borderRadius': 2,
                        'mb': 0.5,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar sx={{ bgcolor: '#fff', color: 'primary.main', width: 24, height: 24 }}>
                          {shelf.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={shelf.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List sx={{ px: 2 }}>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch edge="end" checked={themeMode === 'dark'} onChange={toggleTheme} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isDesktop && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              onClick={() => navigate('/')}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                mr: 2,
              }}
            >
              Shelfify
            </Typography>

            {isDesktop && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {topNavItems.map(item => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ mr: 1, fontWeight: 600 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isDesktop && (
              <Box sx={{ position: 'relative', borderRadius: theme.shape.borderRadius, bgcolor: 'action.hover', ml: 2, width: 'auto' }}>
                <Box sx={{ p: theme.spacing(0, 1), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search your copies or explore releases..."
                  sx={{ 'color': 'inherit', '& .MuiInputBase-input': { p: theme.spacing(1, 1, 1, 0), pl: `calc(1em + ${theme.spacing(3)})`, transition: theme.transitions.create('width'), width: '20ch' } }}
                />
              </Box>
            )}

            {!isDesktop && (
              <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            )}

            <Tooltip title="Account settings">
              <IconButton onClick={handleProfileOpen} sx={{ ml: 2 }}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleProfileClose}>Your Proposals</MenuItem>
              <MenuItem onClick={handleProfileClose}>Profile & Settings</MenuItem>
              <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {isDesktop && (
        <Drawer
          sx={{
            'width': DRAWER_WIDTH,
            'flexShrink': 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              marginTop: '64px',
              height: 'calc(100% - 64px)',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            },
          }}
          variant="permanent"
          anchor="left"
          open
        >
          {drawer}
        </Drawer>
      )}

      {!isDesktop && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          width: isDesktop ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          ml: isDesktop ? `${DRAWER_WIDTH}px` : 0,
        }}
      >
        <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            Search
            <IconButton
              aria-label="close"
              onClick={() => setSearchOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              label="Search your copies or explore releases..."
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
        </Dialog>

        {children}

        {!isDesktop && (
          <Box sx={{ pb: '56px' }}></Box>
        )}
      </Box>

      {!isDesktop && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: theme => theme.zIndex.drawer + 1 }}>
          <MobileBottomNavigation />
        </Box>
      )}
      {/* Render AddCopyForm Dialog if addCopyOpen is true */}
      {addCopyOpen && <AddCopyForm />}
    </Box>
  );
}
