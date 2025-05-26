import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // For "Add Copy"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; // For "Add to Wishlist" (general CTA, if needed)

// Mock data for wishlist items
interface WishlistItem {
  id: string;
  title: string;
  variant: string;
  shelfId: string; // To associate with a shelf if needed for logic
  shelfName: string; // For display
  notes?: string; // Optional notes
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wish1',
    title: 'Blade Runner 2049',
    variant: '4K Ultra HD Steelbook',
    shelfId: 'movies',
    shelfName: 'Movies Shelf',
    notes: 'Region A preferred. Look for best price.',
  },
  {
    id: 'wish2',
    title: 'Kind of Blue',
    variant: 'Mobile Fidelity Sound Lab LP',
    shelfId: 'music',
    shelfName: 'Music Shelf',
    notes: 'Must be NM condition. Check Discogs.',
  },
  {
    id: 'wish3',
    title: 'Pokémon Yellow Version',
    variant: 'Game Boy, CIB',
    shelfId: 'pokemon',
    shelfName: 'Pokémon Shelf',
    notes: 'Box and manual in good shape.',
  },
  {
    id: 'wish4',
    title: 'Dune Part Two',
    variant: 'Blu-ray, Limited Edition',
    shelfId: 'movies',
    shelfName: 'Movies Shelf',
    // No notes for this one
  },
];

// const mockShelves = [ // Not strictly needed if shelfName is directly in mockWishlistItems
//   { id: 'music', name: 'Music Shelf' },
//   { id: 'movies', name: 'Movies Shelf' },
//   { id: 'pokemon', name: 'Pokémon Shelf' },
// ];

export default function Wishlist() {
  const handleAddCopy = (wishlistItem: WishlistItem) => {
    // Placeholder action: Log to console
    console.log('Attempting to add copy for:', wishlistItem.title);
    // Future: Navigate to an "add copy" form, pre-filled with wishlist item details
    // Or open a modal to confirm and gather more details (condition, price paid, etc.)
  };

  const handleAddNewWishlistItem = () => {
    // Placeholder action for a general "Add New Wishlist Item" CTA
    console.log('Add New Wishlist Item clicked');
    // Future: Navigate to a form or open a modal to add a new item to the wishlist
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            My Wishlist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Items you'd love to add to your collection.
          </Typography>
        </Box>
        {/* Optional: General CTA to add new wishlist item. Can be enabled later. */}
        {/* <Button
          variant="contained"
          startIcon={<PlaylistAddIcon />}
          onClick={handleAddNewWishlistItem}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Add to Wishlist
        </Button> */}
      </Box>

      {mockWishlistItems.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            p: { xs: 3, md: 6 },
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Your Wishlist is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start adding items you'd love to own! You can add items to your wishlist
            from release pages or directly here (feature coming soon).
          </Typography>
          <Button
            variant="outlined"
            startIcon={<PlaylistAddIcon />}
            onClick={handleAddNewWishlistItem} // Placeholder for now
          >
            Discover Releases
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {mockWishlistItems.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Variant:</strong> {item.variant}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Target Shelf:</strong> {item.shelfName}
                    </Typography>
                    {item.notes && (
                      <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', mt: 1, bgcolor: 'action.hover', p:1, borderRadius: 1 }}>
                        Notes: {item.notes}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p:2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddCopy(item)}
                  >
                    Add to Collection
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
