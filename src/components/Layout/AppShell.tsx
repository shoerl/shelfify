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
} from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Menu as MenuIcon,
  CollectionsBookmark as CollectionsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material'

const DRAWER_WIDTH = 280

const collectionTypes = [
  { label: 'Music', path: '/collections/music' },
  { label: 'Movies', path: '/collections/movies' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null)
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  // Determine if Collections is selected
  const collectionsSelected = location.pathname.startsWith('/collections')

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null)
  }

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchor(null)
  }

  const notifications = [
    {
      id: 1,
      title: 'New Collection Added',
      message: 'Your "Books" collection has been created',
      time: '2 minutes ago',
    },
    {
      id: 2,
      title: 'Collection Updated',
      message: '3 new items added to "Movies"',
      time: '1 hour ago',
    },
    {
      id: 3,
      title: 'Type Proposal Approved',
      message: 'Your "Games" type proposal was approved',
      time: '2 hours ago',
    },
  ]

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Propose Type button at top */}
      <Box sx={{ p: 2, pb: 0 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          component={Link}
          to="/propose"
          sx={{ borderRadius: 2, mb: 2, fontWeight: 500 }}
        >
          Propose Type
        </Button>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ px: 2, flex: 1 }}>
        {/* Collections Main Item */}
        <ListItem disablePadding sx={{ mb: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemButton
            selected={collectionsSelected}
            onClick={() => navigate('/collections')}
            sx={{
              'borderRadius': 2,
              'width': '100%',
              'mb': 0.5,
              'backgroundColor': collectionsSelected ? 'primary.main' : undefined,
              'color': collectionsSelected ? 'primary.contrastText' : undefined,
              '&:hover': {
                backgroundColor: collectionsSelected ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Collections"
              secondary="Browse and manage your collections"
              primaryTypographyProps={{ fontWeight: 700 }}
              secondaryTypographyProps={{ sx: { fontSize: '0.75rem', opacity: 0.7 } }}
            />
            {collectionsSelected ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* Always expanded submenu if selected */}
          <Collapse in={collectionsSelected} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
            <List component="div" disablePadding>
              {collectionTypes.map(type => (
                <ListItemButton
                  key={type.path}
                  component={Link}
                  to={type.path}
                  selected={location.pathname === type.path}
                  sx={{
                    pl: 6,
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: location.pathname === type.path ? 'primary.light' : undefined,
                    color: location.pathname === type.path ? 'primary.contrastText' : undefined,
                  }}
                >
                  <ListItemText primary={type.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>
        {/* Settings Main Item */}
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            component={Link}
            to="/settings"
            selected={location.pathname === '/settings'}
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
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              secondary="Manage your preferences"
              secondaryTypographyProps={{ sx: { fontSize: '0.75rem', opacity: 0.7 } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List sx={{ px: 2 }}>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch edge="end" checked={themeMode === 'dark'} onChange={toggleTheme} />
        </ListItem>
      </List>
    </Box>
  )

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
              }}
            >
              Shelfify
            </Typography>
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
                  textTransform: 'none',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                  }}
                >
                  S
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 500,
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
            mt: 8,
          },
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
            placeholder="Search collections, items, or types..."
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
            {['Books', 'Movies', 'Games', 'Music'].map(term => (
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
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.map(notification => (
          <MenuItem
            key={notification.id}
            onClick={handleNotificationsClose}
            sx={{
              'py': 1.5,
              'px': 2,
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
              },
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
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
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
          to="/profile"
          onClick={handleProfileClose}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/settings"
          onClick={handleProfileClose}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleProfileClose}
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
          flexShrink: { sm: 0 },
        }}
      >
        {isMobile
          ? (
              <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: DRAWER_WIDTH,
                  },
                }}
              >
                {drawer}
              </Drawer>
            )
          : (
              <Drawer
                variant="permanent"
                sx={{
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: DRAWER_WIDTH,
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
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Fade in timeout={500}>
          <Box>
            {children}
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}
