import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';

const mockShelves = [
  { "name": "Music Shelf", "count": 3 },
  { "name": "Movies Shelf", "count": 1 },
  { "name": "Pokémon Shelf", "count": 0 }
];

const ShelvesPreview: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, px: 2 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          fontWeight: 'medium',
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' } 
        }}
      >
        My Shelves
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {mockShelves.map((shelf, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                '&:hover': {
                  boxShadow: 6, // Increase shadow on hover
                }
              }}
            >
              {/* Using Paper instead of Card for a slightly different look as requested by Card OR Paper */}
              {/* CardContent could still be used inside Paper if desired for more structure */}
              <Typography variant="h6" component="h3" gutterBottom>
                {shelf.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Items: {shelf.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShelvesPreview;
