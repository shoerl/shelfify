import { Box, Button, Fab, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ItemDetailSection } from '../components/ItemDetailSection';
import { OtherVersionsCarousel } from '../components/OtherVersionsCarousel';
import { mockCatalogItems, mockOwnedItems } from '../mocks/mockData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ItemDetail() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const item = mockOwnedItems[0];
  const catalog = mockCatalogItems[0];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {item.userData.photos?.[0] && (
            <Box
              component="img"
              src={item.userData.photos[0]}
              alt={catalog.data.title}
              sx={{ width: '100%', borderRadius: 2 }}
            />
          )}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button variant="contained">Edit</Button>
            <Button variant="outlined">Duplicate</Button>
            <Button variant="outlined" color="warning">
              Mark Sold
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <ItemDetailSection title="Details">
            <Typography variant="body1">
              <strong>Title:</strong> {catalog.data.title}
            </Typography>
            {catalog.data.artist && (
              <Typography variant="body1">
                <strong>Artist:</strong> {catalog.data.artist}
              </Typography>
            )}
            {catalog.data.metadata?.releaseDate && (
              <Typography variant="body1">
                <strong>Release Date:</strong> {catalog.data.metadata.releaseDate}
              </Typography>
            )}
            <Typography variant="body1">
              <strong>Condition:</strong> {item.userData.condition}
            </Typography>
            {item.userData.notes && (
              <Typography variant="body1">
                <strong>Notes:</strong> {item.userData.notes}
              </Typography>
            )}
          </ItemDetailSection>
          {catalog.data.variants && (
            <OtherVersionsCarousel variants={catalog.data.variants} />
          )}
        </Grid>
      </Grid>
      {isMobile && (
        <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <EditIcon />
        </Fab>
      )}
    </Box>
  );
}
