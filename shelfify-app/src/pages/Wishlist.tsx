import React from 'react'; // Removed useState as it's not used in this static mock version
import { 
  Typography, Container, Grid, Card, CardContent, CardActions, Button, Box 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For Add Copy button

const mockWishlistData = [
  { id: "wish1", title: "Led Zeppelin IV", variant: "Vinyl, First Pressing", shelfName: "Music Shelf", notes: "Looking for a clean copy, RL pressing if possible." },
  { id: "wish2", title: "Blade Runner 2049", variant: "4K UHD Steelbook", shelfName: "Movies Shelf", notes: "Want the one with the Mondo artwork." },
  { id: "wish3", title: "Vintage Kenner Millennium Falcon", variant: "Original Trilogy Collection", shelfName: "Toys Shelf", notes: "Complete with all parts." }
];

const Wishlist: React.FC = () => {
  const handleAddCopy = (wishlistItemTitle: string) => {
    console.log(`"Add Copy" clicked for: ${wishlistItemTitle}`);
    // In a real app, this would likely open a modal or navigate to an "add copy" form
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          textAlign: 'center',
          mb: { xs: 2, sm: 3, md: 4 },
          fontSize: { xs: '2.2rem', sm: '2.5rem', md: '2.8rem' } 
        }}
      >
        My Wishlist
      </Typography>

      {mockWishlistData.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {mockWishlistData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 3, // Subtle shadow increase on hover
                  }
                }}
                elevation={1} // Start with a lower elevation for a cleaner look
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{fontSize: '1.2rem', fontWeight: 'medium'}}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Variant:</strong> {item.variant}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Shelf Category:</strong> {item.shelfName}
                  </Typography>
                  {item.notes && (
                    <Box mt={1} p={1.5} sx={{ backgroundColor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      <Typography variant="caption" color="text.secondary" component="p" sx={{ whiteSpace: 'pre-wrap' }}>
                        <strong>Notes:</strong> {item.notes}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => handleAddCopy(item.title)}
                  >
                    Add Copy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;
