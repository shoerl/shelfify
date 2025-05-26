import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
import MovieIcon from '@mui/icons-material/Movie';
import CasinoIcon from '@mui/icons-material/Casino';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';

// Mock data for demo
const userName = 'Sean';
// const exploreData = [
//   { title: 'Music', count: 12, icon: <AlbumIcon />, color: '#F7C873' },
//   { title: 'Movies', count: 8, icon: <MovieIcon />, color: '#7EC4CF' },
// ];
// const copiesData = [
//   { title: 'My Music Copies', count: 3, icon: <AlbumIcon />, color: '#F7C873' },
//   { title: 'My Movie Copies', count: 1, icon: <MovieIcon />, color: '#7EC4CF' },
// ];

const mockShelvesPreview = [
  { id: 'music', name: 'Music Shelf', count: 3 },
  { id: 'movies', name: 'Movies Shelf', count: 1 },
  { id: 'pokemon', name: 'Pokémon Shelf', count: 0 },
];

const mockMetrics = [
  { label: 'Total Copies', value: '24 items', link: '/copies' },
  { label: 'Categories Collected', value: '3 of 50+', link: '/shelves' },
  { label: 'Recent Spend', value: '$1,200', link: '/stats' },
];

const mockRecentlyAdded = [
  { id: '1', thumbnail: true, title: 'The Wall — Vinyl, UK', condition: 'Near Mint', price: 25, timeAgo: '2h' },
  { id: '2', thumbnail: true, title: 'Inception — DVD, Region 1', condition: 'Sealed', price: 30, timeAgo: '1d' },
  { id: '3', thumbnail: true, title: 'Charizard Holo - Pokémon Card', condition: 'PSA 9', price: 250, timeAgo: '3d' },
];

const mockExploreMore = [
  { label: 'Start your Pokémon Shelf', action: 'goToPokemonReleases', link: '/shelves/pokemon' },
  { label: 'New Release: Dune Part Two - Blu-ray', action: 'viewRelease', link: '/releases/dune-part-two-bluray' }, // Example link
];

export default function Home() {
  const navigate = useNavigate();
  const { openAddCopyModal } = useModal(); // Get modal control

  // Helper function for actions (placeholders for now)
  const handleExploreAction = (action: string) => {
    console.log(`Action clicked: ${action}`);
    // Implement actual navigation or modal opens here later
    const item = mockExploreMore.find(item => item.action === action);
    if (item && item.link) {
      navigate(item.link);
    }
    else if (action === 'viewRelease') {
      // Potentially open a modal with release details or navigate to a generic new releases page
      console.log('View Release action triggered for a generic new release.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1000, // Increased max width for better desktop view
        mx: 'auto',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 0 },
      }}
    >
      {/* Hero Section */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800, color: '#22223B' }}
        >
          Welcome back,
          {' '}
          {userName}
          !
        </Typography>
        <Typography variant="h6" sx={{ color: '#4A4E69', mb: 4 }}>
          Your physical media, perfectly organized.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => openAddCopyModal()} // Open modal
          >
            Add Manually
          </Button>
          {/* Barcode Scan CTA - Placeholder for now */}
          <Button variant="outlined" size="large" onClick={() => console.log('Scan Barcode clicked (placeholder)')}>
            Scan Barcode
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />
      {' '}
      {/* Divider */}

      {/* My Shelves Preview Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        My Shelves
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {mockShelvesPreview.map(shelf => (
          <Grid item xs={12} sm={6} md={4} key={shelf.name}>
            <Card
              sx={{
                'borderRadius': 3,
                'boxShadow': '0 2px 8px #0001',
                'minHeight': 100,
                'display': 'flex',
                'alignItems': 'center',
                'cursor': 'pointer',
                '&:hover': { boxShadow: '0 4px 12px #0002' },
              }}
              onClick={() => navigate(`/shelves/${shelf.id}`)}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {shelf.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {shelf.count}
                    {' '}
                    items
                  </Typography>
                </Box>
                {/* Optional: Add an icon for the shelf type */}
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  {shelf.name.includes('Music') ? <AlbumIcon /> : shelf.name.includes('Movies') ? <MovieIcon /> : <CasinoIcon />}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />
      {' '}
      {/* Divider */}

      {/* Metrics Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Your Insights
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {mockMetrics.map(metric => (
          <Grid item xs={12} sm={6} md={4} key={metric.label}>
            <Card
              sx={{
                'borderRadius': 3,
                'boxShadow': '0 2px 8px #0001',
                'minHeight': 100,
                'display': 'flex',
                'alignItems': 'center',
                'cursor': metric.link ? 'pointer' : 'default',
                '&:hover': { boxShadow: metric.link ? '0 4px 12px #0002' : 'none' },
              }}
              onClick={metric.link ? () => navigate(metric.link) : undefined}
            >
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {metric.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {metric.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />
      {' '}
      {/* Divider */}

      {/* Recently Added Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Recently Added
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {mockRecentlyAdded.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ 'borderRadius': 3, 'boxShadow': '0 2px 8px #0001', '&:hover': { boxShadow: '0 4px 12px #0002' } }}>
              {item.thumbnail && (
                <Box sx={{ height: 140, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Placeholder for actual image or icon */}
                  <Typography variant="caption" color="text.secondary">Thumbnail</Typography>
                </Box>
              )}
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Condition:
                  {' '}
                  {item.condition}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: $
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Added:
                  {' '}
                  {item.timeAgo}
                  {' '}
                  ago
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="outlined" size="small" onClick={() => console.log('View item:', item.id)}>View</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />
      {' '}
      {/* Divider */}

      {/* Explore More Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Explore More
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
        {mockExploreMore.map(item => (
          <Button
            key={item.label}
            variant="outlined"
            size="large"
            onClick={() => handleExploreAction(item.action)}
            sx={{ flexGrow: 1 }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />
      {' '}
      {/* Divider */}

      {/* Footer Links Section */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button component={Link} to="/copies" variant="text">All Copies</Button>
        <Button component={Link} to="/releases" variant="text">Browse All Releases</Button>
        {' '}
        {/* Assuming a /releases route */}
        <Button component={Link} to="/activity" variant="text">Activity Feed</Button>
      </Stack>

    </Box>
  );
}
