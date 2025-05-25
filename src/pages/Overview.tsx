import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  MusicNote as MusicIcon,
  Movie as MovieIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const categories = [
  {
    id: 'music',
    title: 'Music',
    subtitle: 'Records & CDs',
    icon: <MusicIcon sx={{ fontSize: 40 }} />,
    color: '#2563eb',
    count: 2,
  },
  {
    id: 'movies',
    title: 'Movies',
    subtitle: 'DVDs, Blu-rays & VHS',
    icon: <MovieIcon sx={{ fontSize: 40 }} />,
    color: '#7c3aed',
    count: 2,
  },
];

export function Overview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Welcome to Shelfify</Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your music and movie collections
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search collections..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={e => setSortBy(e.target.value)}
            startAdornment={(
              <InputAdornment position="start">
                <SortIcon color="action" />
              </InputAdornment>
            )}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="count">Item Count</MenuItem>
            <MenuItem value="recent">Recently Added</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item xs={12} sm={6} key={category.id}>
            <Fade in timeout={500}>
              <Card
                component={Link}
                to={`/types/${category.id}`}
                sx={{
                  'height': '100%',
                  'textDecoration': 'none',
                  'color': 'inherit',
                  'transition': 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" component="div">
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {category.count}
                      {' '}
                      items in collection
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        'color': category.color,
                        '&:hover': {
                          backgroundColor: `${category.color}15`,
                        },
                      }}
                    >
                      <SortIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
