import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined'; // Using this for Shelves
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'; // Using this for Copies
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

const tabs = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Shelves", path: "/shelves", icon: <CollectionsBookmarkOutlinedIcon /> },
  { label: "Copies", path: "/all-items", icon: <ViewListOutlinedIcon /> },
  { label: "Wishlist", path: "/wishlist", icon: <FavoriteBorderOutlinedIcon /> },
  { label: "Stats", path: "/stats", icon: <QueryStatsOutlinedIcon /> },
];

const MobileNav = ({ sx }) => { // Accept sx prop for visibility control from AppShell
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeTabIndex = tabs.findIndex(tab => {
      // Handle nested routes for active tab highlighting
      if (tab.path === "/") return currentPath === "/";
      return currentPath.startsWith(tab.path);
    });
    if (activeTabIndex !== -1) {
      setValue(activeTabIndex);
    } else {
      // Optional: default to 0 or a specific tab if no match, or keep last value
      setValue(0); 
    }
  }, [location.pathname]);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: (theme) => theme.zIndex.appBar + 1,
        ...sx // Spread the sx prop from AppShell for display control
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          // Navigation is handled by RouterLink, but we can still update state if needed
          // or perform other actions on change. For now, just setting the value is enough
          // as RouterLink handles the navigation.
          setValue(newValue); 
        }}
      >
        {tabs.map((tab, index) => (
          <BottomNavigationAction
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            component={RouterLink}
            to={tab.path}
            value={index} // Pass index to value to make BottomNavigation control active state
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNav;
