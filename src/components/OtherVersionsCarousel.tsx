import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReleaseVariant } from '../types/catalog';

interface OtherVersionsCarouselProps {
  variants: ReleaseVariant[];
}

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
}));

export function OtherVersionsCarousel({ variants }: OtherVersionsCarouselProps) {
  return (
    <Container>
      {variants.map((v) => (
        <Card key={v.id} sx={{ minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2">{v.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
