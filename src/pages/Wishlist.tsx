import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Wishlist() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Wishlist
      </Typography>
      {/* Placeholder content can be added here if desired, e.g.,
      <Typography variant="body1">
        Content for Wishlist will go here. This page will list items the user wants to acquire.
      </Typography>
      */}
    </Box>
  );
}
