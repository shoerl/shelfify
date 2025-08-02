import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: theme.spacing(12),
  padding: theme.spacing(1),
}));

export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function DashboardCard({ title, value, icon, onClick }: DashboardCardProps) {
  return (
    <StyledCard onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      {icon}
    </StyledCard>
  );
}
