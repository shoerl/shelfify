import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export interface ItemDetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ItemDetailSection({ title, children }: ItemDetailSectionProps) {
  return (
    <Section>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Section>
  );
}
