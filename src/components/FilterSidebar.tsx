import React from 'react';
import { Drawer, Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
}

const SidebarContent = styled(Box)(({ theme }) => ({
  width: 260,
  padding: theme.spacing(3),
}));

export default function FilterSidebar({ open, onClose }: FilterSidebarProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose} variant="temporary">
      <SidebarContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Placeholder" />
        </FormGroup>
      </SidebarContent>
    </Drawer>
  );
}
