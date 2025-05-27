import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useModal } from '../context/ModalContext';
import AddCopyForm from '../components/AddCopyForm';

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: 1,
    title: 'Abbey Road',
    artist: 'The Beatles',
    releaseYear: 1969,
    format: 'Vinyl, 180g Remastered',
    image: '/static/images/placeholders/album.svg',
    shelfId: 'music',
    estimatedValue: 35
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    format: 'Blu-ray, 4K UHD',
    image: '/static/images/placeholders/movie.svg',
    shelfId: 'movies',
    estimatedValue: 25
  },
  {
    id: 3,
    title: 'Charizard Holo',
    set: 'Base Set',
    number: '4/102',
    condition: 'Near Mint',
    image: '/static/images/placeholders/book.svg',
    shelfId: 'pokemon',
    estimatedValue: 500
  },
];

interface WishlistItem {
  id: number;
  title: string;
  artist?: string;
  director?: string;
  set?: string;
  releaseYear?: number;
  format?: string;
  condition?: string;
  number?: string;
  image: string;
  estimatedValue: number;
  shelfId: string;
}

export default function Wishlist() {
  const { openModal } = useModal();

  const handleAddToCollection = (item: WishlistItem) => {
    openModal(
      <AddCopyForm
        selectedShelfId={item.shelfId}
        // Pre-fill with some item data
      />,
      `Add ${item.title} to Your Collection`,
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Wishlist</Typography>
        <Typography variant="body1" color="text.secondary">
          Items you&apos;d like to add to your collection
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {mockWishlistItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 2px 8px #0001',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  {'artist' in item && (
                    <Typography variant="body2" color="text.secondary">
                      Artist:
                      {item.artist}
                    </Typography>
                  )}
                  {'director' in item && (
                    <Typography variant="body2" color="text.secondary">
                      Director:
                      {item.director}
                    </Typography>
                  )}
                  {'set' in item && (
                    <Typography variant="body2" color="text.secondary">
                      Set:
                      {item.set}
                    </Typography>
                  )}
                  {'releaseYear' in item && (
                    <Typography variant="body2" color="text.secondary">
                      Year:
                      {item.releaseYear}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Format:
                    {item.format}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Estimated Value:</Typography>
                  <Chip label={`$${item.estimatedValue}`} color="primary" size="small" />
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleAddToCollection(item)}
                >
                  Add to Collection
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {mockWishlistItems.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" color="text.secondary">Your wishlist is empty.</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Add items you&apos;re looking for to your wishlist.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
