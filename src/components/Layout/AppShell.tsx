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
  Badge,
  Fade,
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
  Paper, // Added for Bottom Navigation
  BottomNavigation, // Added for Bottom Navigation
  BottomNavigationAction // Added for Bottom Navigation
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu as MenuIcon,
  // CollectionsBookmark as CollectionsIcon, // No longer used
  // Settings as SettingsIcon, // No longer used
  ExpandLess,
  ExpandMore,
  // Add as AddIcon, // No longer used for Propose Type button in drawer
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  FileCopy as FileCopyIcon,
  Favorite as FavoriteIcon,
  BarChart as BarChartIcon,
  RssFeed as RssFeedIcon,
  Inventory as InventoryIcon // Added for Shelves in Bottom Navigation
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

// const collectionTypes = [ // No longer used
//   { label: 'Music', path: '/collections/music' },
//   { label: 'Movies', path: '/collections/movies' },
// ];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [myShelvesOpen, setMyShelvesOpen] = useState(false); // New state for My Shelves
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Determine if Collections is selected - No longer needed
  // const collectionsSelected = location.pathname.startsWith('/collections');

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const notifications = [
    {
      id: 1,
      title: 'New Collection Added',
      message: 'Your "Books" collection has been created',
      time: '2 minutes ago'
    },
    {
      id: 2,
      title: 'Collection Updated',
      message: '3 new items added to "Movies"',
      time: '1 hour ago'
    },
    {
      id: 3,
      title: 'Type Proposal Approved',
      message: 'Your "Games" type proposal was approved',
      time: '2 hours ago'
    }
  ];

  const drawerItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'My Shelves', path: '/shelves', icon: <LibraryBooksIcon />, expandable: true },
    { label: 'All Copies', path: '/copies', icon: <FileCopyIcon /> },
    { label: 'Wishlist', path: '/wishlist', icon: <FavoriteIcon /> },
    { label: 'Statistics', path: '/stats', icon: <BarChartIcon /> },
    { label: 'Activity Feed', path: '/activity', icon: <RssFeedIcon /> },
  ];

  ];

  const mobileNavItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Shelves', path: '/shelves', icon: <InventoryIcon /> }, // Using InventoryIcon for mobile "Shelves"
    { label: 'Copies', path: '/copies', icon: <FileCopyIcon /> },
    { label: 'Wishlist', path: '/wishlist', icon: <FavoriteIcon /> },
    { label: 'Stats', path: '/stats', icon: <BarChartIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Removed Propose Type button and old structure */}
      {/* <Divider sx={{ mb: 1 }} /> No longer needed here, AppBar has its own top border */}
      <List sx={{ px: 2, flex: 1, pt: 2 /* Added padding top */ }}>
        {drawerItems.map((item) => (
          <Box key={item.label} sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path && !item.expandable} // Only select if not expandable or specifically on the expandable item's path
              onClick={() => {
                if (item.expandable) {
                  setMyShelvesOpen(!myShelvesOpen);
                  // Optional: navigate to item.path if you want the main "My Shelves" to be a page itself
                  // navigate(item.path); 
                } else {
                  navigate(item.path);
                  if (isMobile) setDrawerOpen(false); // Close drawer on mobile after navigation
                }
              }}
              sx={{
                borderRadius: 2,
                width: '100%',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                },
                // Apply selected style also if it's the "My Shelves" parent and it's open or its sub-routes are active
                ...(item.expandable && (myShelvesOpen || location.pathname.startsWith(item.path)) && {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                }),
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: (item.expandable && (myShelvesOpen || location.pathname.startsWith(item.path))) || (location.pathname === item.path && !item.expandable) ? 'inherit' : undefined }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontWeight: location.pathname === item.path || (item.expandable && myShelvesOpen) ? 600 : 500 }}
              />
              {item.expandable ? (myShelvesOpen ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {item.expandable && (
              <Collapse in={myShelvesOpen} timeout="auto" unmountOnExit sx={{ width: '100%', pl: 2 /* Indent sub-items */ }}>
                <List component="div" disablePadding>
                  {/* Placeholder for user shelves */}
                  <ListItem sx={{ pl: 4 /* Further indent */, py:1 }}>
                    <ListItemText 
                      secondary="[all user shelves, searchable]" 
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.8 } }}
                    />
                  </ListItem>
                  {/* Example of how dynamic shelves might look (commented out) */}
                  {/* {userShelves.map(shelf => (
                    <ListItemButton key={shelf.id} component={Link} to={`/shelves/${shelf.id}`} sx={{ pl: 4, borderRadius: 2 }}>
                      <ListItemText primary={shelf.name} />
                    </ListItemButton>
                  ))} */}
                </List>
              </Collapse>
            )}
          </Box>
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
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                display: { xs: 'none', sm: 'block' },
                mr: 2 // Add some margin to the right of the logo
              }}
            >
              Shelfify
            </Typography>
          </Box>

          {/* Top Navigation Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              Home
            </Button>
            <Button component={Link} to="/shelves" color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              My Shelves
            </Button>
            <Button component={Link} to="/copies" color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              All Copies
            </Button>
            <Button component={Link} to="/wishlist" color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              Wishlist
            </Button>
            <Button component={Link} to="/statistics" color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              Statistics
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search">
              <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationsOpen}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton 
                color="inherit" 
                onClick={handleProfileOpen}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  textTransform: 'none'
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem'
                  }}
                >
                  S
                </Avatar>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 500
                  }}
                >
                  Sean
                </Typography>
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Search Dialog */}
      <Dialog 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            mt: 8
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Search</Typography>
            <IconButton onClick={() => setSearchOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search your copies or explore releases..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Popular searches:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Books', 'Movies', 'Games', 'Music'].map((term) => (
              <Button
                key={term}
                variant="outlined"
                size="small"
                onClick={() => setSearchOpen(false)}
                sx={{ borderRadius: 2 }}
              >
                {term}
              </Button>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 400,
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            onClick={handleNotificationsClose}
            sx={{ 
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.08)'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <Box>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ p: 1 }}>
          <Button 
            fullWidth 
            variant="text" 
            onClick={handleNotificationsClose}
            sx={{ justifyContent: 'center' }}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 240,
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Sean Hoerl</Typography>
          <Typography variant="body2" color="text.secondary">sean@example.com</Typography>
        </Box>
        <Divider />
        <MenuItem 
          component={Link} 
          to="/proposals"
          onClick={handleProfileClose}
          sx={{ py: 1.5 }}
        >
          {/* Consider adding an icon for "Your Proposals" if available or appropriate */}
          {/* <ListItemIcon><SomeIcon fontSize="small" /></ListItemIcon> */}
          <ListItemText>Your Proposals</ListItemText>
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/profile-settings"
          onClick={handleProfileClose}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" /> 
          </ListItemIcon>
          <ListItemText>Profile & Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={handleProfileClose} // Actual logout logic is out of scope
          sx={{ py: 1.5, color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      
      <Box
        component="nav"
        sx={{ 
          width: { sm: DRAWER_WIDTH }, 
          flexShrink: { sm: 0 } 
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: DRAWER_WIDTH 
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: DRAWER_WIDTH 
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px', // For AppBar
          pb: { xs: '56px', sm: 0 }, // For BottomNavigation on mobile
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)' // Ensure content can fill height above potential bottom nav
        }}
      >
        <Fade in timeout={500}>
          <Box>
            {children}
          </Box>
        </Fade>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: { xs: 'block', sm: 'none' },
          zIndex: (theme) => theme.zIndex.appBar // Ensure it's above content
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={location.pathname}
          // onChange might be needed if we want to trigger actions beyond navigation,
          // but for simple Link navigation, component={Link} on Action is enough.
          // onChange={(event, newValue) => {
          //   navigate(newValue); // If not using Link component on actions
          // }}
        >
          {mobileNavItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              value={item.path}
              icon={item.icon}
              component={Link}
              to={item.path}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
