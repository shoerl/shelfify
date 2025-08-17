import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { OwnedItem } from '../types/owned';

interface ItemGridProps {
  items: OwnedItem[];
}

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export function ItemGrid({ items }: ItemGridProps) {
  return (
    <GridContainer container spacing={2}>
      {items.map((item) => (
        <Grid item key={item.id} xs={6} sm={4} md={3}>
          <Card>
            {item.userData.photos?.[0] && (
              <CardMedia
                component="img"
                image={item.userData.photos[0]}
                alt={item.userData.tags?.[0] || 'item'}
                sx={{ height: 140 }}
              />
            )}
            <CardContent>
              <Typography variant="body1">
                {item.userData.tags?.[0] || 'Item'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </GridContainer>
  );
}
