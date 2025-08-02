import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import {
  Home as HomeIcon,
  CollectionsBookmark as ShelvesIcon,
  AllInbox as CopiesIcon,
  Favorite as WishlistIcon,
  BarChart as StatsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import AddCopyForm from '../../components/AddCopyForm';

export function MobileBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();

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

  const handleAddCopyClick = () => {
    openModal(
      <AddCopyForm />,
      'Add Copy to Your Collection',
    );
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Floating Action Button for Add Copy */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: -30,
          left: 0,
          right: 0,
          margin: '0 auto',
          width: 56,
          height: 56,
        }}
        onClick={handleAddCopyClick}
      >
        <AddIcon />
      </Fab>

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
