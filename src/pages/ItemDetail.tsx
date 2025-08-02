import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Fab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemDetailSection from '../components/ItemDetailSection';
import OtherVersionsCarousel, { VersionItem } from '../components/OtherVersionsCarousel';

const CoverImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
}));

const item = {
  title: 'The Wall',
  artist: 'Pink Floyd',
  releaseDate: '1979',
  condition: 'Very Good',
  notes: 'Double album',
  cover: 'https://via.placeholder.com/300x300.png?text=Cover',
};

const otherVersions: VersionItem[] = [
  { id: 'a', title: 'The Wall - CD' },
  { id: 'b', title: 'The Wall - Deluxe' },
  { id: 'c', title: 'The Wall - Remaster' },
];

export default function ItemDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box p={2} pb={8}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <CoverImage src={item.cover} alt={item.title} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ItemDetailSection title="Metadata">
            <Typography variant="h5" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {item.artist}
            </Typography>
            <Typography variant="body2">
              Release Date:
              {' '}
              {item.releaseDate}
            </Typography>
            <Typography variant="body2">
              Condition:
              {' '}
              {item.condition}
            </Typography>
          </ItemDetailSection>
          <ItemDetailSection title="Notes">
            <Typography variant="body2">{item.notes}</Typography>
          </ItemDetailSection>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained">Edit</Button>
            <Button variant="outlined">Duplicate</Button>
            <Button variant="outlined">Mark Sold</Button>
          </Stack>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Other Versions
        </Typography>
        <OtherVersionsCarousel versions={otherVersions} />
      </Box>
      {isMobile && (
        <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} aria-label="edit">
          <EditIcon />
        </Fab>
      )}
    </Box>
  );
}
