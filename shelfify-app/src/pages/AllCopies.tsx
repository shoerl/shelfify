import React, { useState } from 'react';
import { 
  Typography, Container, Box, Paper, Grid, Card, CardContent,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Select, MenuItem, FormControl, InputLabel, useTheme, useMediaQuery, SelectChangeEvent
} from '@mui/material';
// No RouterLink needed for this page as per current requirements

const mockAllCopiesData = [
  { id: "copy1", shelfName: "Music Shelf", shelfId: "music", title: "The Dark Side of the Moon", variant: "Vinyl, 1973 UK Pressing", condition: "Near Mint", pricePaid: 75, dateAcquired: "2023-01-15" },
  { id: "copy2", shelfName: "Music Shelf", shelfId: "music", title: "Abbey Road", variant: "CD, 1987 Remaster", condition: "Very Good+", pricePaid: 12, dateAcquired: "2022-05-20" },
  { id: "copy3", shelfName: "Movies Shelf", shelfId: "movies", title: "Inception", variant: "Blu-ray, Steelbook", condition: "Like New", pricePaid: 20, dateAcquired: "2021-11-01" },
  { id: "copy4", shelfName: "Pokémon Shelf", shelfId: "pokemon", title: "Charizard VMAX", variant: "Secret Rare", condition: "Mint", pricePaid: 150, dateAcquired: "2023-03-10" }
];

const mockShelfNames = [
  { id: "all", name: "All Shelves" },
  { id: "music", name: "Music Shelf" },
  { id: "movies", name: "Movies Shelf" },
  { id: "pokemon", name: "Pokémon Shelf" }
];

const sortOptions = [
  { id: "dateAcquired", name: "Date Acquired" },
  { id: "pricePaid", name: "Price Paid" },
  { id: "condition", name: "Condition" },
];

const AllCopies: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedShelf, setSelectedShelf] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("dateAcquired");

  const handleShelfChange = (event: SelectChangeEvent<string>) => {
    setSelectedShelf(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSelectedSort(event.target.value as string);
  };
  
  // Placeholder for filtered/sorted data - for now, just use all data
  const displayedCopies = mockAllCopiesData.filter(copy => 
    selectedShelf === "all" || copy.shelfId === selectedShelf
  );
  // Actual sorting logic would go here based on selectedSort

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
        All My Copies
      </Typography>

      {/* Filter Bar */}
      <Paper sx={{ p: 2, mb: { xs: 2, sm: 3, md: 4 } }} elevation={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="shelf-filter-label">Filter by Shelf</InputLabel>
              <Select
                labelId="shelf-filter-label"
                id="shelf-filter"
                value={selectedShelf}
                label="Filter by Shelf"
                onChange={handleShelfChange}
              >
                {mockShelfNames.map((shelf) => (
                  <MenuItem key={shelf.id} value={shelf.id}>
                    {shelf.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-options-label">Sort by</InputLabel>
              <Select
                labelId="sort-options-label"
                id="sort-options"
                value={selectedSort}
                label="Sort by"
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Responsive Listing */}
      {displayedCopies.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No copies found.
        </Typography>
      ) : isMobile ? (
        // Cards View for Mobile
        <Grid container spacing={3}>
          {displayedCopies.map((copy) => (
            <Grid item xs={12} sm={6} key={copy.id}> {/* sm={6} for 2 cards on small screens if desired */}
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom sx={{fontSize: '1.1rem', fontWeight: 'medium'}}>
                    {copy.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Shelf: {copy.shelfName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Variant: {copy.variant}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Condition: {copy.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Price Paid: ${copy.pricePaid.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Acquired: {copy.dateAcquired}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Table View for Desktop
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={2}>
          <TableContainer>
            <Table stickyHeader aria-label="all copies table">
              <TableHead>
                <TableRow>
                  <TableCell>Shelf</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Variant</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell align="right">Price Paid</TableCell>
                  <TableCell>Date Acquired</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedCopies.map((copy) => (
                  <TableRow hover key={copy.id}>
                    <TableCell>{copy.shelfName}</TableCell>
                    <TableCell component="th" scope="row">{copy.title}</TableCell>
                    <TableCell>{copy.variant}</TableCell>
                    <TableCell>{copy.condition}</TableCell>
                    <TableCell align="right">${copy.pricePaid.toFixed(2)}</TableCell>
                    <TableCell>{copy.dateAcquired}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default AllCopies;
