import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// Mock data for shelves
const mockShelves = [
  { id: 'music', name: 'Music Shelf', count: 3 },
  { id: 'movies', name: 'Movies Shelf', count: 1 },
  { id: 'pokemon', name: 'Pokémon Shelf', count: 0 },
  // Add more mock shelves as needed
];

export default function MyShelves() {
  const navigate = useNavigate();

  const handleAddCopyClick = () => {
    console.log('Add New Copy clicked');
    // TODO: Implement the add copy flow (modal/new page)
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>My Shelves</Typography>
        <Typography variant="body1" color="text.secondary">
          Organize your collections into custom shelves
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddCopyClick}
        sx={{ mb: 4 }}
      >
        Add New Copy
      </Button>

      <Grid container spacing={3}>
        {mockShelves.map((shelf) => (
          <Grid item xs={12} sm={6} md={4} key={shelf.id}>
            <Card
              sx={{
                'borderRadius': 3,
                'boxShadow': '0 2px 8px #0001',
                'cursor': 'pointer',
                '&:hover': { boxShadow: '0 4px 12px #0002' },
              }}
              onClick={() => navigate(`/shelves/${shelf.id}`)} // Navigate to shelf detail
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{shelf.name}</Typography>
                <Typography variant="body2" color="text.secondary">{shelf.count} items</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TODO: Implement Empty state UI */}
      {/* {mockShelves.length === 0 && ( */}
      {/*   <Box sx={{ textAlign: 'center', mt: 6 }}> */}
      {/*     <Typography variant="h6" color="text.secondary">No shelves created yet.</Typography> */}
      {/*     <Button variant="outlined" sx={{ mt: 2 }} onClick={handleAddCopyClick}>Create Your First Shelf</Button> */}
      {/*   </Box> */}
      {/* )} */}
    </Box>
  );
} 