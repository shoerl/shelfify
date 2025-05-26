import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  Chip,
  Container
} from '@mui/material';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../context/ModalContext';
import AddCopyForm from '../components/AddCopyForm';

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
  const { openModal } = useModal();

  // Filter mock data for the current shelf
  const shelfCopies = mockCopies.filter(copy => copy.shelfId === shelfId);

  const handleAddCopyClick = () => {
    openModal(
      <AddCopyForm selectedShelfId={shelfId} />,
      "Add Copy to Your Collection"
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddCopyClick}
        >
          Add Copy
        </Button>
      </Box>

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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" color="text.secondary">No copies found in this shelf.</Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleAddCopyClick}
            sx={{ mt: 2 }}
          >
            Add Your First Copy
          </Button>
        </Box>
      )}
    </Box>
  );
};

const BrowseReleasesTabPanel = ({ shelfId }: { shelfId: string }) => {
  const { openModal } = useModal();
  
  // Mock data for browsing releases
  const mockReleases = [
    { id: 101, title: 'Dark Side of the Moon', artist: 'Pink Floyd', year: 1973, format: 'Vinyl, UK Pressing' },
    { id: 102, title: 'OK Computer', artist: 'Radiohead', year: 1997, format: 'CD, Special Edition' },
  ];

  const handleAddToCollection = (release: any) => {
    openModal(
      <AddCopyForm 
        selectedShelfId={shelfId} 
        // Pre-fill some data based on the selected release
      />,
      `Add ${release.title} to Your Collection`
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Browse Available Releases</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Find items to add to your {shelfId} shelf
      </Typography>
      
      <Grid container spacing={2}>
        {mockReleases.map(release => (
          <Grid item xs={12} sm={6} key={release.id}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px #0001' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {release.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {release.artist} • {release.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {release.format}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCollection(release)}
                >
                  Add to My Collection
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export function ShelfDetail() {
  const { shelfId } = useParams<{ shelfId: string }>();
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openModal } = useModal();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAddCopyClick = () => {
    openModal(
      <AddCopyForm selectedShelfId={shelfId} />,
      "Add Copy to Your Collection"
    );
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
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h4" sx={{ mb: 1 }}>{shelf.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {mockCopies.filter(copy => copy.shelfId === shelfId).length} copies in this shelf
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCopyClick}
        >
          Add Copy
        </Button>
      </Box>

      {/* Tabs for Your Copies and Browse Releases */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleChangeTab}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="Your Copies" />
          <Tab label="Browse Releases" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && <YourCopiesTabPanel shelfId={shelfId} />}
        {currentTab === 1 && <BrowseReleasesTabPanel shelfId={shelfId} />}
      </Box>
    </Box>
  );
} 