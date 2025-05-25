import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home as HomeIcon,
  CollectionsBookmark as ShelvesIcon,
  AllInbox as CopiesIcon,
  Favorite as WishlistIcon,
  BarChart as StatsIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export function MobileBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the current active tab based on the route
  const value = [
    '/',
    '/shelves',
    '/copies',
    '/wishlist',
    '/stats',
  ].indexOf(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const paths = ['/', '/shelves', '/copies', '/wishlist', '/stats'];
    navigate(paths[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Shelves" icon={<ShelvesIcon />} />
        <BottomNavigationAction label="Copies" icon={<CopiesIcon />} />
        <BottomNavigationAction label="Wishlist" icon={<WishlistIcon />} />
        <BottomNavigationAction label="Stats" icon={<StatsIcon />} />
      </BottomNavigation>
    </Box>
  );
} 