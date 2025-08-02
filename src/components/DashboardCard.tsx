import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

export default function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <StyledCard>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
