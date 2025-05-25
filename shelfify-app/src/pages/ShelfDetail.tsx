import React, { useState, MouseEvent } from 'react'; // Added MouseEvent for ToggleButtonGroup
import { 
  Typography, Button, Container, Box, Tabs, Tab, Chip, Stack,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, // For Table View
  Grid, Card, CardContent, CardActions, // Added CardActions for Grid view button
  ToggleButtonGroup, ToggleButton,
  TextField // Added for Filter Placeholders
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList'; 
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For Add button
import { useParams, Link as RouterLink } from 'react-router-dom';

const mockShelfDetails: { [key: string]: { name: string; copies: number; releases: number; description: string } } = {
  music: { name: "Music Shelf", copies: 2, releases: 120, description: "My collection of vinyl records and CDs." }, // Updated count
  movies: { name: "Movies Shelf", copies: 1, releases: 350, description: "DVDs, Blu-rays, and some VHS tapes." },
  pokemon: { name: "Pokémon Shelf", copies: 0, releases: 1020, description: "Gotta catch 'em all!" } // No copies for this shelf
};

const mockCopiesData: { 
  [key: string]: Array<{ id: string; title: string; variant: string; condition: string; pricePaid: number; dateAcquired: string }> 
} = {
  music: [
    { id: "copy1", title: "The Dark Side of the Moon", variant: "Vinyl, 1973 UK Pressing", condition: "Near Mint", pricePaid: 75, dateAcquired: "2023-01-15" },
    { id: "copy2", title: "Abbey Road", variant: "CD, 1987 Remaster", condition: "Very Good+", pricePaid: 12, dateAcquired: "2022-05-20" },
  ],
  movies: [
    { id: "copy3", title: "Inception", variant: "Blu-ray, Steelbook", condition: "Like New", pricePaid: 20, dateAcquired: "2021-11-01" }
  ],
  // pokemon shelf has no copies intentionally
};

const mockReleasesData = [ // Added mock data for Browse Releases
  { id: "release1", title: "Example Release 1", format: "Vinyl", year: "2023" },
  { id: "release2", title: "Example Release 2", format: "Blu-ray", year: "2022" },
  { id: "release3", title: "Another CD Release", format: "CD", year: "2021" },
  { id: "release4", title: "Yet Another Vinyl", format: "Vinyl", year: "2024" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`shelf-tabpanel-${index}`}
      aria-labelledby={`shelf-tab-${index}`}
      {...other}
    >
      {value === index && (
        // Removed default Typography and p:3 from here, will be applied in content
        <Box>{children}</Box> 
      )}
    </div>
  );
}

const ShelfDetail: React.FC = () => {
  const { shelfId } = useParams<{ shelfId: string }>();
  const currentShelf = shelfId ? mockShelfDetails[shelfId] : undefined;
  const currentCopies = (shelfId ? mockCopiesData[shelfId] : []) || [];

  const [selectedTab, setSelectedTab] = useState(0);
  const [copiesViewType, setCopiesViewType] = useState<'table' | 'cards'>('table'); // Renamed for clarity
  const [releasesViewType, setReleasesViewType] = useState<'grid' | 'table'>('grid'); // New state for releases view

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleCopiesViewTypeChange = ( // Renamed for clarity
    event: MouseEvent<HTMLElement>,
    newViewType: 'table' | 'cards' | null, 
  ) => {
    if (newViewType !== null) { 
      setCopiesViewType(newViewType);
    }
  };

  const handleReleasesViewTypeChange = ( // New handler for releases view
    event: MouseEvent<HTMLElement>,
    newViewType: 'grid' | 'table' | null,
  ) => {
    if (newViewType !== null) {
      setReleasesViewType(newViewType);
    }
  };

  if (!currentShelf) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">Shelf not found.</Typography>
        <Button component={RouterLink} to="/shelves" sx={{ mt: 2 }}>
          Back to My Shelves
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: {xs: 'flex-start', sm: 'center'}, mb: { xs: 2, sm: 3, md: 4 } }}>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' } 
            }}
          >
            {currentShelf.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={`${currentShelf.copies} Copies`} size="small" />
            <Chip label={`${currentShelf.releases} Releases`} size="small" />
          </Stack>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          // onClick={() => console.log("Add New Copy to this shelf clicked")} // Placeholder action
          sx={{ mt: { xs: 2, sm: 0 }, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          Add Copy to Shelf
        </Button>
      </Box>

      {/* Tabs Implementation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="shelf detail tabs">
          <Tab label="Your Copies" id="shelf-tab-0" aria-controls="shelf-tabpanel-0" />
          <Tab label="Browse Releases" id="shelf-tab-1" aria-controls="shelf-tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Box sx={{ py: 3 }}> 
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup
              value={copiesViewType} // Changed to copiesViewType
              exclusive
              onChange={handleCopiesViewTypeChange} // Changed to handleCopiesViewTypeChange
              aria-label="view type"
              size="small"
            >
              <ToggleButton value="table" aria-label="table view">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="cards" aria-label="cards view">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {currentCopies.length === 0 ? (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              No copies found in this shelf.
            </Typography>
          ) : copiesViewType === 'table' ? ( // Changed to copiesViewType
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table stickyHeader aria-label="copies table">
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
                    {currentCopies.map((copy) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={copy.id}>
                        <TableCell component="th" scope="row">
                          {copy.title}
                        </TableCell>
                        <TableCell>{copy.variant}</TableCell>
                        <TableCell>{copy.condition}</TableCell>
                        <TableCell align="right">{`$${copy.pricePaid.toFixed(2)}`}</TableCell>
                        <TableCell>{copy.dateAcquired}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : ( // viewType === 'cards'
            <Grid container spacing={3}>
              {currentCopies.map((copy) => (
                <Grid item xs={12} sm={6} md={4} key={copy.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {copy.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Variant: {copy.variant}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Condition: {copy.condition}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Price Paid: {`$${copy.pricePaid.toFixed(2)}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Acquired: {copy.dateAcquired}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Box sx={{ py: 3 }}> {/* Consistent padding with other tab */}
          {/* Filter Placeholders */}
          <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="Year" variant="outlined" size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="Format" variant="outlined" size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="Region" variant="outlined" size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField label="Edition" variant="outlined" size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </Paper>

          {/* View Type Toggle for Releases */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup
              value={releasesViewType}
              exclusive
              onChange={handleReleasesViewTypeChange}
              aria-label="releases view type"
              size="small"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Content Area for Releases */}
          {mockReleasesData.length === 0 ? (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              No releases found.
            </Typography>
          ) : releasesViewType === 'table' ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table stickyHeader aria-label="releases table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell align="center">Add</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockReleasesData.map((release) => (
                      <TableRow hover key={release.id}>
                        <TableCell component="th" scope="row">
                          {release.title}
                        </TableCell>
                        <TableCell>{release.format}</TableCell>
                        <TableCell>{release.year}</TableCell>
                        <TableCell align="center">
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => console.log(`Add ${release.title} to copies`)} // Placeholder action
                          >
                            Add to My Copies
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : ( // releasesViewType === 'grid'
            <Grid container spacing={3}>
              {mockReleasesData.map((release) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={release.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: '1.1rem' }}>
                        {release.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Format: {release.format}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year: {release.year}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => console.log(`Add ${release.title} to copies`)} // Placeholder action
                      >
                        Add to My Copies
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </TabPanel>
    </Container>
  );
};

export default ShelfDetail;
