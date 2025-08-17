import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
      {icon}
    </StyledCard>
  );
}
