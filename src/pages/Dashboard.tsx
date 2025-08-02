import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardCard from '../components/DashboardCard';
import ItemGrid, { ItemGridItem } from '../components/ItemGrid';
import FilterSidebar from '../components/FilterSidebar';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const ChartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  height: 300,
}));

const stats = [
  { title: 'Total Items', value: 128 },
  { title: 'Estimated Value', value: '$3,200' },
  { title: 'Recent Additions', value: 5 },
];

const acquisitionData = [
  { month: 'Jan', items: 2 },
  { month: 'Feb', items: 4 },
  { month: 'Mar', items: 3 },
  { month: 'Apr', items: 5 },
  { month: 'May', items: 1 },
];

const genreData = [
  { name: 'Rock', value: 40 },
  { name: 'Jazz', value: 25 },
  { name: 'Pop', value: 20 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const recentItems: ItemGridItem[] = [
  { id: '1', title: 'The Wall' },
  { id: '2', title: 'Kind of Blue' },
  { id: '3', title: 'Abbey Road' },
  { id: '4', title: 'Thriller' },
];

export default function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [quickEditOpen, setQuickEditOpen] = useState(false);
  const [selected, setSelected] = useState<ItemGridItem | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key.toLowerCase() === 'e') {
        setQuickEditOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <Box p={2}>
      <FilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} />
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth inputRef={searchRef} label="Search" />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, val) => val && setView(val)}
              size="small"
            >
              <ToggleButton value="grid">Grid</ToggleButton>
              <ToggleButton value="list">List</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" onClick={() => setFilterOpen(true)}>
              Filters
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {stats.map(stat => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <DashboardCard title={stat.title} value={stat.value} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={acquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <Tooltip />
                <Line type="monotone" dataKey="items" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genreData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {genreData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Recently Added
        </Typography>
        <ItemGrid
          items={recentItems}
          view={view}
          onSelect={(item) => {
            setSelected(item);
          }}
        />
      </Box>

      <Dialog open={quickEditOpen} onClose={() => setQuickEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Quick Edit</DialogTitle>
        <DialogContent>
          {selected ? <Typography>{selected.title}</Typography> : <Typography>No item selected</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuickEditOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
