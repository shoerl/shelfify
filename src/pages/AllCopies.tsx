import React from 'react';
import { Typography, Box } from '@mui/material';

export default function AllCopies() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Copies
      </Typography>
      {/* Placeholder content can be added here if desired, e.g.,
      <Typography variant="body1">
        Content for All Copies will go here. This page will list all items owned by the user.
      </Typography>
      */}
    </Box>
  );
}
