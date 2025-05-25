import React from 'react';
import { Typography, Box } from '@mui/material';

export default function MyShelves() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Shelves
      </Typography>
      {/* Placeholder content can be added here if desired, e.g.,
      <Typography variant="body1">
        Content for My Shelves will go here.
      </Typography>
      */}
    </Box>
  );
}
