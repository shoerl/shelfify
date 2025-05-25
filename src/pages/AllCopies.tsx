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
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';

interface CollectionItem {
  id: number;
  category: 'Music' | 'Movies';
  title: string;
  condition: string;
  pricePaid: number;
  format: string;
  year: number;
}

// Mock data - replace with actual data fetching
const mockData: CollectionItem[] = [
  {
    id: 1,
    category: 'Music',
    title: 'The Wall',
    condition: 'Near Mint',
    pricePaid: 25,
    format: 'Vinyl',
    year: 1979,
  },
  {
    id: 2,
    category: 'Movies',
    title: 'Inception',
    condition: 'Sealed',
    pricePaid: 30,
    format: 'Blu-ray',
    year: 2010,
  },
  {
    id: 3,
    category: 'Music',
    title: 'Dark Side of the Moon',
    condition: 'Very Good Plus',
    pricePaid: 15,
    format: 'CD',
    year: 1973,
  },
  {
    id: 4,
    category: 'Movies',
    title: 'Parasite',
    condition: 'Like New',
    pricePaid: 20,
    format: 'DVD',
    year: 2019,
  },
];

const conditions = [
  'Sealed',
  'Near Mint',
  'Very Good Plus',
  'Very Good',
  'Good Plus',
  'Good',
  'Fair',
  'Poor',
];

export function AllCopies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCondition, setFilterCondition] = useState<string>('all');

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesCondition = filterCondition === 'all' || item.condition === filterCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'year':
        return b.year - a.year;
      case 'price':
        return b.pricePaid - a.pricePaid;
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>All Copies</Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all copies you own across all your shelves
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search collection..."
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
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            label="Category"
            onChange={e => setFilterCategory(e.target.value)}
            startAdornment={(
              <InputAdornment position="start">
                <FilterIcon color="action" />
              </InputAdornment>
            )}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Movies">Movies</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Condition</InputLabel>
          <Select
            value={filterCondition}
            label="Condition"
            onChange={e => setFilterCondition(e.target.value)}
          >
            <MenuItem value="all">All Conditions</MenuItem>
            {conditions.map(condition => (
              <MenuItem key={condition} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
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
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {sortedData.length > 0
        ? (
            isDesktop
              ? (
                  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Shelf</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Variant</TableCell>
                          <TableCell>Condition</TableCell>
                          <TableCell align="right">Price Paid</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedData.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Chip
                                label={item.category}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.format}</TableCell>
                            <TableCell>
                              <Chip
                                label={item.condition}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="right">
                              $
                              {item.pricePaid.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
              : (
                  <Grid container spacing={2}>
                    {sortedData.map(item => (
                      <Grid item xs={12} key={item.id}>
                        <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px #0001' }}>
                          <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                              {item.title}
                            </Typography>
                            <Stack spacing={1} direction="column">
                              <Typography variant="body2" color="text.secondary">
                                Shelf:
                                {item.category}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Variant:
                                {item.format}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Condition:
                                {item.condition}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Price Paid: $
                                {item.pricePaid.toFixed(2)}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )
          )
        : (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h6" color="text.secondary">No items found matching your filters</Typography>
            </Box>
          )}
    </Box>
  );
}
