import { List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Grid, Card, CardContent } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useState } from 'react';
import type { OwnedItem } from '../types/owned';
import { styled } from '@mui/material/styles';

interface RecentlyAddedListProps {
  items: OwnedItem[];
}

const Container = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export function RecentlyAddedList({ items }: RecentlyAddedListProps) {
  const [view, setView] = useState<'list' | 'grid'>('list');

  const Row = ({ index, style }: ListChildComponentProps) => (
    <ListItem style={style} key={items[index].id} divider>
      <ListItemText primary={items[index].userData.tags?.[0] || 'Item'} />
    </ListItem>
  );

  return (
    <Container>
      <ToggleButtonGroup
        size="small"
        value={view}
        exclusive
        onChange={(_, v) => v && setView(v)}
      >
        <ToggleButton value="list">List</ToggleButton>
        <ToggleButton value="grid">Grid</ToggleButton>
      </ToggleButtonGroup>
      {view === 'list' ? (
        items.length > 100 ? (
          <FixedSizeList height={300} width="100%" itemSize={56} itemCount={items.length}>
            {Row}
          </FixedSizeList>
        ) : (
          <List>
            {items.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText primary={item.userData.tags?.[0] || 'Item'} />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {items.map((item) => (
            <Grid item key={item.id} xs={6} sm={4} md={3}>
              <Card>
                <CardContent>
                  {item.userData.tags?.[0] || 'Item'}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
