import { Box, Typography, Grid, Card, CardContent, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../../contexts/ModalContext'; // Import useModal
import {
  LibraryMusic as MusicIcon,
  Movie as MovieIcon,
  Casino as PokemonIcon,
} from '@mui/icons-material';

// Mock data for shelves (consistent with AppShell.tsx)
const mockShelves = [
  { id: 'music', name: 'Music Shelf', count: 3, icon: <MusicIcon />, color: '#F7C873' },
  { id: 'movies', name: 'Movies Shelf', count: 1, icon: <MovieIcon />, color: '#7EC4CF' },
  { id: 'pokemon', name: 'Pokémon Shelf', count: 0, icon: <PokemonIcon />, color: '#8A8A8A' }, // Added a grey color for consistency
];

export default function MyShelves() {
  const navigate = useNavigate();
  const { openAddCopyModal } = useModal(); // Get modal control

  // const handleAddCopyClick = () => { // Replaced by modal
  //   console.log('Add New Copy clicked');
  //   // TODO: Implement the add copy flow (modal/new page)
  //   // Example: navigate('/copies/new'); or open a modal
  // };

  return (
    <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            My Shelves
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Organize and manage your collections.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openAddCopyModal()} // Open modal
        >
          Add New Copy
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockShelves.map(shelf => (
          <Grid item xs={12} sm={6} md={4} key={shelf.id}>
            <Card
              sx={{
                'borderRadius': 3,
                'boxShadow': '0 2px 8px rgba(0,0,0,0.05)',
                'cursor': 'pointer',
                'transition': 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => navigate(`/shelves/${shelf.id}`)}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: shelf.color || 'primary.main', color: 'common.white', width: 56, height: 56, mb: 2 }}>
                  {shelf.icon}
                </Avatar>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {shelf.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shelf.count} item{shelf.count !== 1 ? 's' : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {mockShelves.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 8, p: 3 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Your Shelves are Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create a shelf to start organizing your collection.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => console.log("Create new shelf clicked - Placeholder")} // Placeholder for create shelf functionality
          >
            Create Your First Shelf
          </Button>
        </Box>
      )}
    </Box>
  );
}

// TODO: Implement Empty state UI (Partially done with the mockShelves.length === 0 check)
