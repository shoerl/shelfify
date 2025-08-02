import React from 'react';
import { Drawer, TextField, Chip, Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
}));

export interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  activeFilters: string[];
}

export function FilterSidebar({ open, onClose, activeFilters }: FilterSidebarProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <SidebarContainer>
        <TextField fullWidth placeholder="Search" size="small" sx={{ mb: 2 }} />
        <Typography variant="subtitle2" gutterBottom>
          Active Filters
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {activeFilters.map(filter => (
            <Chip key={filter} label={filter} />
          ))}
        </Stack>
      </SidebarContainer>
    </Drawer>
  );
}
