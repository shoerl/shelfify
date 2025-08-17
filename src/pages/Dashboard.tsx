import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { AcquisitionChart } from '../components/AcquisitionChart';
import { GenreFormatBreakdownChart } from '../components/GenreFormatBreakdownChart';
import { RecentlyAddedList } from '../components/RecentlyAddedList';
import { acquisitionData, genreFormatBreakdown, recentItems } from '../mocks/dashboard';

export default function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        console.log('Quick edit', recentItems[selectedIndex]);
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex((i) => Math.min(i + 1, recentItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex]);

  return (
    <Box sx={{ p: 2 }}>
      <TextField inputRef={searchRef} label="Search" fullWidth />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Items" value={recentItems.length} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AcquisitionChart data={acquisitionData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GenreFormatBreakdownChart data={genreFormatBreakdown} />
        </Grid>
        <Grid item xs={12}>
          <RecentlyAddedList items={recentItems} />
        </Grid>
      </Grid>
    </Box>
  );
}
