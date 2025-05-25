/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import React, { useState } from 'react';
import { Box, Typography, Button, Tabs, Tab, useTheme, useMediaQuery, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Grid, Stack, Divider, Chip, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// Mock data for shelves and items
const mockShelves = [
  {
    id: 'music',
    name: 'Music Shelf',
    items: [
      { id: 1, title: 'The Wall', artist: 'Pink Floyd', format: 'Vinyl' },
      { id: 2, title: 'Thriller', artist: 'Michael Jackson', format: 'CD' },
      { id: 5, title: 'Abbey Road', artist: 'The Beatles', format: 'Vinyl' },
      { id: 6, title: 'Rumours', artist: 'Fleetwood Mac', format: 'Cassette' },
    ]
  },
  {
    id: 'movies',
    name: 'Movies Shelf',
    items: [
      { id: 3, title: 'Inception', director: 'Christopher Nolan', format: 'Blu-ray' },
      { id: 4, title: 'Parasite', director: 'Bong Joon Ho', format: 'DVD' },
      { id: 7, title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', format: '4K UHD' },
    ]
  },
  { id: 'pokemon', name: 'Pokémon Shelf', items: [] },
];

// Mock data for copies across shelves (for demonstration)
const mockCopies = [
  {
    id: 1,
    shelfId: 'music',
    title: 'The Wall',
    variant: 'Vinyl, UK',
    condition: 'Near Mint',
    pricePaid: 25,
    dateAcquired: '2023-10-01',
  },
  {
    id: 2,
    shelfId: 'movies',
    title: 'Inception',
    variant: 'DVD, Region 1',
    condition: 'Sealed',
    pricePaid: 30,
    dateAcquired: '2023-11-15',
  },
   {
    id: 3,
    shelfId: 'music',
    title: 'Dark Side of the Moon',
    variant: 'CD, Remastered',
    condition: 'Very Good Plus',
    pricePaid: 15,
    dateAcquired: '2024-01-20',
  },
];

// Placeholder components for tab content
const YourCopiesTabPanel = ({ shelfId }: { shelfId: string }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  // Filter mock data for the current shelf
  const shelfCopies = mockCopies.filter(copy => copy.shelfId === shelfId);

  return (
    <Box sx={{ p: 0 }}>{/* Removed padding here, will be handled by main content box */}
      {shelfCopies.length > 0 ? (
        isDesktop ? (
          // Desktop Table View
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Variant</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell align="right">Price Paid</TableCell>
                  <TableCell>Date Acquired</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shelfCopies.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.variant}</TableCell>
                    <TableCell>
                      <Chip label={item.condition} size="small" />
                    </TableCell>
                    <TableCell align="right">${item.pricePaid.toFixed(2)}</TableCell>
                    <TableCell>{item.dateAcquired}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // Mobile Card View
          <Grid container spacing={2}>
            {shelfCopies.map(item => (
              <Grid item xs={12} key={item.id}> {/* Full width cards on mobile */}
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px #0001' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Stack spacing={1} direction="column">
                       <Typography variant="body2" color="text.secondary">Variant: {item.variant}</Typography>
                       <Typography variant="body2" color="text.secondary">Condition: {item.condition}</Typography>
                       <Typography variant="body2" color="text.secondary">Price Paid: ${item.pricePaid.toFixed(2)}</Typography>
                       <Typography variant="body2" color="text.secondary">Date Acquired: {item.dateAcquired}</Typography>
                     </Stack>
                     {/* Optional: Add action buttons */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        {/* Empty State */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" color="text.secondary">No copies found in this shelf.</Typography>
          {/* TODO: Add CTA to add copy */}
        </Box>
      )}

    </Box>
  );
};

const BrowseReleasesTabPanel = ({ shelfId }: { shelfId: string }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6">Browse Releases for {shelfId}</Typography>
    <Typography>Content for Browse Releases filters and items will go here.</Typography>
    {/* TODO: Implement filters, grid/table view, and inline Add Copy */}
  </Box>
);

export function ShelfDetail() {
  const { shelfId } = useParams<{ shelfId: string }>();
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Find the shelf based on the shelfId from the URL
  const shelf = mockShelves.find(s => s.id === shelfId);

  if (!shelf) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" color="error">Shelf Not Found</Typography>
        <Typography variant="body1">The shelf with ID "{shelfId}" does not exist.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>{shelf.name}</Typography>
        <Typography variant="body1" color="text.secondary">
          Items in this shelf
        </Typography>
      </Box>

      {shelf.items.length > 0 ? (
        <Grid container spacing={2}>
          {shelf.items.map(item => (
            // Adjust grid sizes for responsiveness
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>{item.title}</Typography>
                  {/* Display relevant details based on item type */}
                  {'artist' in item && (
                    <Typography variant="body2" color="text.secondary">Artist: {item.artist}</Typography>
                  )}
                  {'director' in item && (
                    <Typography variant="body2" color="text.secondary">Director: {item.director}</Typography>
                  )}
                   {'format' in item && (
                    <Typography variant="body2" color="text.secondary">Format: {item.format}</Typography>
                  )}
                  {/* Add more item details here based on item type */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" color="text.secondary">No items in this shelf yet.</Typography>
        </Box>
      )}
    </Box>
  );
} 