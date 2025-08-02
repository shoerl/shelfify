import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface VersionItem {
  id: string;
  title: string;
  cover?: string;
}

interface OtherVersionsCarouselProps {
  versions: VersionItem[];
  onSelect?: (item: VersionItem) => void;
}

const CarouselContainer = styled(Box)(({ theme }) => ({
  'display': 'flex',
  'overflowX': 'auto',
  'gap': theme.spacing(2),
  'padding': theme.spacing(2, 0),
  '& > *': {
    flex: '0 0 auto',
  },
}));

const VersionCard = styled(Card)(({ theme }) => ({
  width: 120,
}));

export default function OtherVersionsCarousel({ versions, onSelect }: OtherVersionsCarouselProps) {
  return (
    <CarouselContainer>
      {versions.map(version => (
        <VersionCard key={version.id} onClick={() => onSelect?.(version)}>
          {version.cover && <CardMedia component="img" height={140} image={version.cover} alt={version.title} />}
          <CardContent>
            <Typography variant="body2" noWrap>
              {version.title}
            </Typography>
          </CardContent>
        </VersionCard>
      ))}
    </CarouselContainer>
  );
}
