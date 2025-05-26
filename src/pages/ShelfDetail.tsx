import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Container,
  Stack,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../contexts/ModalContext';

// Consistent with MyShelves.tsx and AppShell.tsx
const mockShelves = [
  { id: 'music', name: 'Music Shelf' },
  { id: 'movies', name: 'Movies Shelf' },
  { id: 'pokemon', name: 'Pokémon Shelf' },
];

// Mock data for owned items, structured for easy filtering by shelfId
const mockOwnedItems = [
  {
    id: 'item1',
    shelfId: 'music',
    title: 'The Dark Side of the Moon',
    variant: 'Vinyl, 1973 UK Pressing',
    condition: 'Near Mint',
    pricePaid: 50,
    dateAcquired: '2023-01-15',
  },
  {
    id: 'item2',
    shelfId: 'music',
    title: 'Abbey Road',
    variant: 'Vinyl, Reissue',
    condition: 'Very Good Plus',
    pricePaid: 25,
    dateAcquired: '2022-05-10',
  },
  {
    id: 'item3',
    shelfId: 'movies',
    title: 'Inception',
    variant: 'Blu-ray, Special Edition',
    condition: 'Very Good',
    pricePaid: 15,
    dateAcquired: '2022-11-20',
  },
  {
    id: 'item4',
    shelfId: 'movies',
    title: 'Pulp Fiction',
    variant: 'DVD',
    condition: 'Good',
    pricePaid: 5,
    dateAcquired: '2020-03-01',
  },
  {
    id: 'item5',
    shelfId: 'pokemon',
    title: 'Charizard VMAX',
    variant: 'Rainbow Rare',
    condition: 'Mint',
    pricePaid: 120,
    dateAcquired: '2023-07-22',
  },
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
        <Box sx={{ pt: 3 }}>
          {' '}
          {/* Add padding top to tab panel content */}
          {children}
        </Box>
      )}
    </div>
  );
}

const YourCopiesTabPanel = ({ shelfId }: { shelfId: string }) => {
  const shelfCopies = mockOwnedItems.filter(copy => copy.shelfId === shelfId);

  if (shelfCopies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No copies found in this shelf yet.
        </Typography>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }}>
          Add Your First Copy
        </Button>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Variant</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price Paid</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date Acquired</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shelfCopies.map(item => (
            <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.variant}</TableCell>
              <TableCell>
                <Chip label={item.condition} size="small" />
              </TableCell>
              <TableCell align="right">
                $
                {item.pricePaid.toFixed(2)}
              </TableCell>
              <TableCell>{item.dateAcquired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BrowseReleasesTabPanel = ({ shelfName }: { shelfName: string }) => (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <Typography variant="h6" color="text.secondary">
      Browse Releases for
      {' '}
      {shelfName}
      {' '}
      - Coming Soon!
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Filters and release listings will be available here in a future update.
    </Typography>
  </Box>
);

export function ShelfDetail() {
  const { shelfId } = useParams<{ shelfId: string }>();
  const navigate = useNavigate();
  const { openAddCopyModal } = useModal(); // Get modal control
  const [currentTab, setCurrentTab] = useState(0);

  const shelf = mockShelves.find(s => s.id === shelfId);
  const shelfCopies = mockOwnedItems.filter(copy => copy.shelfId === shelfId);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // const handleAddCopyClick = () => { // Replaced by modal
  //   console.log(`Add Copy clicked for shelf: ${shelfId}`);
  //   // Placeholder: navigate('/copies/new', { state: { shelfId } });
  // };

  if (!shelf) {
    return (
      <Container sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
        <Typography variant="h4" color="error.main" gutterBottom>
          Shelf Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The shelf with ID "
          {shelfId}
          " could not be found. It might have been removed or the link is incorrect.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/shelves')}>
          Back to My Shelves
        </Button>
      </Container>
    );
  }

  // Mock number of releases for display
  const mockReleasesCount = shelfId === 'music' ? 125 : shelfId === 'movies' ? 78 : 30;

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
            {shelf.name}
          </Typography>
          <Stack direction="row" spacing={2} color="text.secondary" sx={{ mt: 1 }}>
            <Typography variant="body1">
              {shelfCopies.length}
              {' '}
              Cop
              {shelfCopies.length === 1 ? 'y' : 'ies'}
            </Typography>
            <Typography variant="body1">
              {mockReleasesCount}
              {' '}
              Release
              {mockReleasesCount === 1 ? '' : 's'}
              {' '}
              {/* Mocked */}
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openAddCopyModal({ shelfId: shelf?.id, shelfName: shelf?.name })} // Pass shelf context
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Add Copy
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChangeTab} aria-label="Shelf detail tabs">
          <Tab label="Your Copies" id="shelf-tab-0" aria-controls="shelf-tabpanel-0" />
          <Tab label="Browse Releases" id="shelf-tab-1" aria-controls="shelf-tabpanel-1" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <YourCopiesTabPanel shelfId={shelf.id} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <BrowseReleasesTabPanel shelfName={shelf.name} />
      </TabPanel>
    </Container>
  );
}
