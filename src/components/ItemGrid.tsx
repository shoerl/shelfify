import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ItemGridItem {
  id: string;
  title: string;
  cover?: string;
}

interface ItemGridProps {
  items: ItemGridItem[];
  view: 'grid' | 'list';
  onSelect?: (item: ItemGridItem) => void;
}

const GridItemCard = styled(Card)(({ theme }) => ({
  height: '100%',
}));

export default function ItemGrid({ items, view, onSelect }: ItemGridProps) {
  if (view === 'list') {
    return (
      <List>
        {items.map(item => (
          <ListItem key={item.id} button onClick={() => onSelect?.(item)}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={6} sm={4} md={3} key={item.id}>
          <GridItemCard>
            <CardActionArea onClick={() => onSelect?.(item)}>
              {item.cover && (
                <CardMedia component="img" image={item.cover} alt={item.title} height={140} />
              )}
              <CardContent>
                <Typography variant="body2" noWrap>
                  {item.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </GridItemCard>
        </Grid>
      ))}
    </Grid>
  );
}
