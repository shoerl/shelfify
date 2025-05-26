import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Stack,
  Container,
  SelectChangeEvent,
} from '@mui/material';
import { Sort as SortIcon, FilterList as FilterIcon } from '@mui/icons-material';

// Data structure for a single copy
interface OwnedCopy {
  id: string;
  shelfId: string;
  shelfName: string;
  title: string;
  variant: string;
  condition: string;
  pricePaid: number;
  dateAcquired: string; // ISO date string for sorting
}

// Mock Shelves Data
const mockShelves = [
  { id: 'all', name: 'All Shelves' },
  { id: 'music', name: 'Music Shelf' },
  { id: 'movies', name: 'Movies Shelf' },
  { id: 'pokemon', name: 'Pokémon Shelf' },
];

// Comprehensive Mock Data for All Copies
const allMockCopies: OwnedCopy[] = [
  { id: 'item1', shelfId: 'music', shelfName: 'Music Shelf', title: 'The Dark Side of the Moon', variant: 'Vinyl, 1973 UK Pressing', condition: 'Near Mint', pricePaid: 50, dateAcquired: '2023-01-15T10:00:00Z' },
  { id: 'item2', shelfId: 'movies', shelfName: 'Movies Shelf', title: 'Inception', variant: 'Blu-ray, Special Edition', condition: 'Very Good', pricePaid: 15, dateAcquired: '2022-11-20T14:30:00Z' },
  { id: 'item3', shelfId: 'music', shelfName: 'Music Shelf', title: 'Abbey Road', variant: 'Vinyl, Reissue', condition: 'Good', pricePaid: 20, dateAcquired: '2023-05-10T12:00:00Z' },
  { id: 'item4', shelfId: 'pokemon', shelfName: 'Pokémon Shelf', title: 'Charizard VMAX', variant: 'Rainbow Rare', condition: 'Mint', pricePaid: 120, dateAcquired: '2023-07-22T09:00:00Z' },
  { id: 'item5', shelfId: 'movies', shelfName: 'Movies Shelf', title: 'Pulp Fiction', variant: 'DVD, Collectors Edition', condition: 'Like New', pricePaid: 10, dateAcquired: '2021-03-01T18:00:00Z' },
  { id: 'item6', shelfId: 'music', shelfName: 'Music Shelf', title: 'Thriller', variant: 'CD, Album', condition: 'Very Good Plus', pricePaid: 5, dateAcquired: '2020-06-25T11:00:00Z' },
  { id: 'item7', shelfId: 'pokemon', shelfName: 'Pokémon Shelf', title: 'Blastoise Base Set', variant: 'Holo', condition: 'Played', pricePaid: 40, dateAcquired: '2022-08-15T16:45:00Z' },
];

// Predefined order for conditions (Best to Worst)
const conditionOrder: Record<string, number> = {
  'Mint': 1,
  'Near Mint': 2,
  'Like New': 3, // Added for completeness
  'Very Good Plus': 4,
  'Very Good': 5,
  'Good Plus': 6, // Added for completeness
  'Good': 7,
  'Fair': 8,
  'Played': 9, // Added for completeness
  'Poor': 10,
  'Sealed': 0, // Often considered highest
};


export function AllCopies() {
  const [selectedShelfId, setSelectedShelfId] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('dateAcquired_desc'); // field_direction

  const isDesktop = useMediaQuery(useTheme().breakpoints.up('md')); // Use 'md' for a more common breakpoint for tables

  const handleShelfChange = (event: SelectChangeEvent<string>) => {
    setSelectedShelfId(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const filteredAndSortedCopies = useMemo(() => {
    let copies = [...allMockCopies];

    // Filter by shelf
    if (selectedShelfId !== 'all') {
      copies = copies.filter(copy => copy.shelfId === selectedShelfId);
    }

    // Sort copies
    const [field, direction] = sortOption.split('_');
    copies.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case 'dateAcquired':
          comparison = new Date(a.dateAcquired).getTime() - new Date(b.dateAcquired).getTime();
          break;
        case 'pricePaid':
          comparison = a.pricePaid - b.pricePaid;
          break;
        case 'condition':
          comparison = (conditionOrder[a.condition] ?? 99) - (conditionOrder[b.condition] ?? 99);
          break;
        case 'title': // Added title sort for completeness, though not in UI yet
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          return 0;
      }
      return direction === 'asc' ? comparison : -comparison;
    });

    return copies;
  }, [selectedShelfId, sortOption]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
          All Copies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and manage all your collected items.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel id="shelf-filter-label">Shelf</InputLabel>
          <Select
            labelId="shelf-filter-label"
            value={selectedShelfId}
            label="Shelf"
            onChange={handleShelfChange}
            startAdornment={<FilterIcon sx={{ mr: 1, color: 'action.active' }} />}
          >
            {mockShelves.map(shelf => (
              <MenuItem key={shelf.id} value={shelf.id}>
                {shelf.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: 240 } }}>
          <InputLabel id="sort-options-label">Sort By</InputLabel>
          <Select
            labelId="sort-options-label"
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
            startAdornment={<SortIcon sx={{ mr: 1, color: 'action.active' }} />}
          >
            <MenuItem value="dateAcquired_desc">Date Acquired (Newest First)</MenuItem>
            <MenuItem value="dateAcquired_asc">Date Acquired (Oldest First)</MenuItem>
            <MenuItem value="pricePaid_desc">Price Paid (High to Low)</MenuItem>
            <MenuItem value="pricePaid_asc">Price Paid (Low to High)</MenuItem>
            <MenuItem value="condition_asc">Condition (Best First)</MenuItem> {/* asc for condition means lower number = better */}
            <MenuItem value="condition_desc">Condition (Worst First)</MenuItem>{/* desc for condition means higher number = worse */}
            <MenuItem value="title_asc">Title (A-Z)</MenuItem>
            <MenuItem value="title_desc">Title (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredAndSortedCopies.length > 0 ? (
        isDesktop ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow:3 }}>
            <Table stickyHeader aria-label="all copies table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Shelf</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Variant</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price Paid</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date Acquired</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedCopies.map(copy => (
                  <TableRow key={copy.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Chip label={copy.shelfName} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{copy.title}</TableCell>
                    <TableCell>{copy.variant}</TableCell>
                    <TableCell>
                      <Chip label={copy.condition} size="small" />
                    </TableCell>
                    <TableCell align="right">${copy.pricePaid.toFixed(2)}</TableCell>
                    <TableCell>{new Date(copy.dateAcquired).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={2}>
            {filteredAndSortedCopies.map(copy => (
              <Grid item xs={12} sm={6} key={copy.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                      {copy.title}
                    </Typography>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Shelf:</strong> {copy.shelfName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Variant:</strong> {copy.variant}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Condition:</strong> <Chip label={copy.condition} size="small" sx={{ml:0.5}}/>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Price Paid:</strong> ${copy.pricePaid.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Date Acquired:</strong> {new Date(copy.dateAcquired).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No Copies Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {selectedShelfId === 'all'
              ? "You haven't added any copies to your collection yet."
              : `There are no copies in "${mockShelves.find(s => s.id === selectedShelfId)?.name}".`}
          </Typography>
          {/* Optional: Add a CTA button here if desired */}
        </Box>
      )}
    </Container>
  );
}
