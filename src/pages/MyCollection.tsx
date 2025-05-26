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
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useState } from 'react';

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

export function MyCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCondition, setFilterCondition] = useState<string>('all');

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
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>My Copies</Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all copies you own
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

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Collection Type</TableCell>
              <TableCell>Release Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell align="right">Price Paid (Copy)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      backgroundColor: item.category === 'Music' ? '#2563eb15' : '#7c3aed15',
                      color: item.category === 'Music' ? '#2563eb' : '#7c3aed',
                    }}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <Chip
                    label={item.format}
                    size="small"
                    sx={{
                      backgroundColor: item.format === 'Vinyl' || item.format === 'Blu-ray' ? '#2563eb15' : '#7c3aed15',
                      color: item.format === 'Vinyl' || item.format === 'Blu-ray' ? '#2563eb' : '#7c3aed',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.condition}
                    size="small"
                    sx={{
                      backgroundColor: item.condition === 'Sealed' || item.condition === 'Near Mint' ? '#2563eb15' : '#7c3aed15',
                      color: item.condition === 'Sealed' || item.condition === 'Near Mint' ? '#2563eb' : '#7c3aed',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  $
                  {item.pricePaid}
                </TableCell>
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No items found matching your filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
