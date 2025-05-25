import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const mockShelvesData = [
  { id: "music", name: "Music Shelf", item_count: 3, releases_count: 120 },
  { id: "movies", name: "Movies Shelf", item_count: 1, releases_count: 350 },
  { id: "pokemon", name: "Pokémon Shelf", item_count: 0, releases_count: 1020 }
];

const MyShelves: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2.2rem', sm: '2.5rem', md: '2.8rem' } 
          }}
        >
          My Shelves
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          // onClick={() => console.log("Add New Copy clicked")} // Placeholder action
          // component={RouterLink} // If it should navigate, e.g., to an add item page
          // to="/add-copy" 
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          Add New Copy
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockShelvesData.map((shelf) => (
          <Grid item xs={12} sm={6} md={4} key={shelf.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6, // Enhance shadow on hover for clickability indication
                  transform: 'translateY(-4px)', // Slight lift effect
                },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Smooth transition
              }}
            >
              <CardActionArea 
                component={RouterLink} 
                to={`/shelves/${shelf.id}`}
                sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' // Center content vertically
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    {shelf.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items: {shelf.item_count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    (Releases: {shelf.releases_count})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyShelves;
