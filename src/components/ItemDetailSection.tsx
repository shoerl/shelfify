import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface ItemDetailSectionProps {
  title: string;
  children: ReactNode;
}

const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export function ItemDetailSection({ title, children }: ItemDetailSectionProps) {
  return (
    <SectionCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </SectionCard>
  );
}
