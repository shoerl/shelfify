import React, { useState, MouseEvent } from 'react';
import { Link as RouterLink, Outlet, Routes, Route } from 'react-router-dom'; // Added Routes, Route
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  ListItemIcon,
  Drawer, // Added
  List, // Added
  ListItemText, // Added
  ListItemButton, // Added
  Collapse, // Added
  Divider, // Added
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// New Icons for Drawer
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'; // For My Shelves
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess'; // Added
import ExpandMore from '@mui/icons-material/ExpandMore'; // Added
// Placeholder for Dark Mode switch if needed
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import MobileNav from './components/navigation/MobileNav'; // Adjusted path for MobileNav

// Page Imports
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import ShelfDetail from './pages/ShelfDetail';
import AllCopies from './pages/AllCopies';
import Wishlist from './pages/Wishlist';
import Statistics from './pages/Statistics';
import ActivityFeed from './pages/ActivityFeed';
import Proposals from './pages/Proposals';
import SettingsPage from './pages/SettingsPage';
// Placeholder for Type pages if linked in AppShell (not explicitly part of this subtask to create them)
const TypeIndex = () => <Typography variant="h4">Type Index Page (Placeholder)</Typography>;
const TypeDetail = () => {
    const { typeId } = useParams<{ typeId: string }>();
    return <Typography variant="h4">Type Detail Page for Type ID: {typeId} (Placeholder)</Typography>;
};
import { useParams } from 'react-router-dom'; // For TypeDetail placeholder

const drawerWidth = 240;

// Define navigation items for the AppBar
const appBarNavItems = [ // Renamed from navItems to avoid conflict with drawer nav items if any
  { label: 'Home', path: '/' },
  { label: 'My Shelves', path: '/shelves' }, // New route, or map to /collections or /types
  { label: 'All Copies', path: '/all-items' }, // Existing route
  { label: 'Wishlist', path: '/wishlist' }, // New route
  { label: 'Statistics', path: '/stats' }, // New route
];

// Define user menu items
const userMenuItems = [
  { label: 'Your Proposals', path: '/proposals', icon: <AssignmentOutlinedIcon fontSize="small" /> },
  { label: 'Profile & Settings', path: '/settings', icon: <SettingsIcon fontSize="small" /> },
  { label: 'Logout', path: '/logout', icon: <LogoutIcon fontSize="small" /> }, // Action handled separately
];

const App: React.FC = () => { // Renamed AppShell to App
  const theme = useTheme();
  // isMobile is not used in the final version of the AppBar logic, 
  // but isDesktop is used for Drawer variant.
  // const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [mobileOpen, setMobileOpen] = useState(false); // For mobile drawer
  const [collectionsOpen, setCollectionsOpen] = useState(true); // For "My Shelves" collapse, default open

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null); // For AppBar mobile menu
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); // For User menu

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollectionsClick = () => {
    setCollectionsOpen(!collectionsOpen);
  };
  
  const handleAppBarNavMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleAppBarNavMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (itemPath?: string) => {
    setAnchorElUser(null);
    if (itemPath) {
      // Handle navigation or action, e.g., logout
      console.log(`Navigating to or actioning: ${itemPath}`);
      if (itemPath === '/logout') {
        // Perform logout logic here
        alert('Logout clicked! Implement actual logout.');
      }
    }
  };

  // Drawer Content Definition
  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={isDesktop ? undefined : handleDrawerToggle}>
      <Toolbar /> {/* Necessary for content to be below app bar */}
      <Box sx={{ p: 2 }}>
        <Button variant="contained" fullWidth component={RouterLink} to="/propose-type"> 
          Propose Type
        </Button>
      </Box>
      <Divider />
      <List sx={{ px: 2, flexGrow: 1 }} component="nav">
        {/* Home */}
        <ListItemButton component={RouterLink} to="/" sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Home" secondary="Back to dashboard" />
        </ListItemButton>

        {/* My Shelves (formerly Collections) */}
        <ListItemButton 
          component={RouterLink} 
          to="/shelves" 
          onClick={handleCollectionsClick} // Keep expand/collapse functionality
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon><CollectionsOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Shelves" />
          {collectionsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={collectionsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6, borderRadius: 1, mb: 0.5 }}> {/* Match sub-item styling */}
              <ListItemText primary="[All user shelves, searchable]" />
            </ListItemButton>
            {/* Future: map user's actual shelves here */}
          </List>
        </Collapse>

        {/* All Copies */}
        <ListItemButton component={RouterLink} to="/all-items" sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon><ViewListOutlinedIcon /></ListItemIcon>
          <ListItemText primary="All Copies" secondary="View all your items" />
        </ListItemButton>

        {/* Wishlist */}
        <ListItemButton component={RouterLink} to="/wishlist" sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon><FavoriteBorderOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Wishlist" secondary="Your desired items" />
        </ListItemButton>

        {/* Statistics */}
        <ListItemButton component={RouterLink} to="/stats" sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon><QueryStatsOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Statistics" secondary="Track your collection" />
        </ListItemButton>

        {/* Activity Feed */}
        <ListItemButton component={RouterLink} to="/activity" sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon><DynamicFeedOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Activity Feed" secondary="Recent happenings" />
        </ListItemButton>
      </List>
      
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton component={RouterLink} to="/settings" sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2">Dark Mode</Typography>
            {/* <Switch checked={darkMode} onChange={handleDarkModeToggle} /> */}
        </Box>
      </Box>
    </Box>
  );


  return (
    <Box sx={{ display: 'flex' }}> {/* Changed from <> to Box for overall layout */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { md: `calc(100% - ${drawerWidth}px)` }, // Adjust AppBar width for permanent drawer on desktop
          ml: { md: `${drawerWidth}px` }, // Push AppBar to the right of the drawer on desktop
        }}
      >
        <Container maxWidth="xl"> {/* Using Container for consistency, or remove if Toolbar should be edge-to-edge */}
          <Toolbar disableGutters>
             {/* Hamburger menu for mobile drawer - different from AppBar's own mobile nav menu */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }} 
            >
              <MenuIcon />
            </IconButton>
            {/* Desktop Logo - hidden on mobile where space is tight due to two menu icons */}
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' }, // Desktop logo text
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SHELFIFY
            </Typography>

            {/* Mobile Menu Icon & Logo (condensed) */}
            {/* Mobile: AppBar's own nav menu icon & Mobile Logo */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="appbar navigation menu"
                aria-controls="menu-appbar-nav"
                aria-haspopup="true"
                onClick={handleAppBarNavMenuOpen} 
                color="inherit"
              >
                <MenuIcon /> 
              </IconButton>
              <Menu
                id="menu-appbar-nav"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleAppBarNavMenuClose}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {appBarNavItems.map((item) => ( 
                  <MenuItem key={item.label} onClick={handleAppBarNavMenuClose} component={RouterLink} to={item.path}>
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              {/* Mobile Logo */}
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, alignSelf: 'center' }} />
              <Typography
                variant="h5" // Consistent with previous version for mobile
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' }, // Mobile logo text
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SHELFIFY 
              </Typography>
            </Box>
            
            {/* Desktop Navigation Items */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
              {appBarNavItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleAppBarNavMenuClose} 
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* User Avatar and Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                <Avatar alt="User Avatar">
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle1" component="div">
                    Sean Hoerl
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    sean@example.com
                  </Typography>
                </Box>
                <MenuItem divider sx={{ mb: 1 }} />
                {userMenuItems.map((item) => (
                  <MenuItem 
                    key={item.label} 
                    onClick={() => {
                      handleCloseUserMenu(item.path);
                    }}
                    component={item.path !== '/logout' ? RouterLink : 'div'}
                    to={item.path !== '/logout' ? item.path : undefined}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <Typography variant="body2">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Drawer Implementation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open // Permanent drawer is always open on desktop
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area, adjusted for drawer */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          // mt: { xs: '56px', sm: '64px' } // AppBar height offset for main content - already handled by Toolbar in drawerContent and main content Toolbar
        }}
      >
        <Toolbar /> {/* This Toolbar provides the necessary spacing for the fixed AppBar */}
        <Container maxWidth="lg">
            {/* <Outlet /> Replaced with Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shelves" element={<MyShelves />} />
              <Route path="/shelves/:shelfId" element={<ShelfDetail />} />
              {/* Path for AllCopies is /all-items as per AppShell nav links */}
              <Route path="/all-items" element={<AllCopies />} /> 
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/activity" element={<ActivityFeed />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Placeholder routes for /types as mentioned in subtask description */}
              <Route path="/types" element={<TypeIndex />} />
              <Route path="/types/:typeId" element={<TypeDetail />} />
               {/* Add a placeholder route for /propose-type if the button in drawer is active */}
              <Route path="/propose-type" element={<Typography variant="h4">Propose Type Page (Placeholder)</Typography>} />
            </Routes>
        </Container>
      </Box>
      {/* Render MobileNav, visible only on xs and sm screens */}
      <MobileNav sx={{ display: { xs: 'block', md: 'none' } }} />
    </Box>
  );
};

export default App; // Renamed AppShell to App
