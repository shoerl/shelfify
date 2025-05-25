import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 4, sm: 6, md: 8 }, // Responsive padding
        px: 2,
        // Potentially add a background color or image here
        // backgroundColor: 'grey.100', 
        // borderRadius: 2,
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' } // Responsive font size
        }}
      >
        Welcome back, Sean!
      </Typography>
      <Typography 
        variant="h5" 
        component="p" 
        color="text.secondary" 
        sx={{ 
          mb: 4,
          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } // Responsive font size
        }}
      >
        Your physical media, perfectly organized.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} // Responsive font size for button
        >
          Scan Barcode
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          size="large"
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} // Responsive font size for button
        >
          Add Manually
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
