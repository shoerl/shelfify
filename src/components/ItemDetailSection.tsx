import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ItemDetailSectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function ItemDetailSection({ title, children }: ItemDetailSectionProps) {
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
