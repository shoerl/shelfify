import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper, // Added for Recently Added section
  List, // Added for Recently Added section
  ListItem, // Added for Recently Added section
  ListItemAvatar, // Added for Recently Added section
  Avatar, // Added for Recently Added section
  ListItemText, // Added for Recently Added section
  Divider, // Added for Recently Added section
  CardActions, // Added for Explore More section
  Link as MuiLink, // Added for Footer Links
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image'; // For placeholder thumbnails
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // To make items clickable & for Footer MuiLinks

// Mock data for Shelves Preview
const mockShelves = [
  { name: "Music Shelf", count: 3, path: "/shelves/music" }, // Added path for potential navigation
  { name: "Movies Shelf", count: 1, path: "/shelves/movies" },
  { name: "Pokémon Shelf", count: 0, path: "/shelves/pokemon" },
];

const metricsData = [
  { label: "Total Copies", value: "24 items", link: "/copies" },
  { label: "Categories Collected", value: "3 of 50+", link: "/shelves" },
  { label: "Recent Spend", value: "$1,200", link: "/stats" },
];

const recentlyAddedData = [
  { id: "1", thumbnail: true, title: "The Wall — Vinyl, UK", condition: "Near Mint", price: 25, timeAgo: "2h", link: "/item/1" }, // Example item link
  { id: "2", thumbnail: true, title: "Inception — DVD, Region 1", condition: "Sealed", price: 30, timeAgo: "1d", link: "/item/2" },
];

const exploreMoreData = [
  { id: "explore-1", label: "Start your Pokémon Shelf", action: "goToPokémonReleases", link: "/explore/pokemon" },
  { id: "explore-2", label: "New Release: 'The Dark Side of the Moon' Reissue", action: "viewRelease", link: "/explore/new-release" }
];

const footerLinksData = [
  { id: "footer-1", label: "All Copies", link: "/copies" },
  { id: "footer-2", label: "Browse All Releases", link: "/releases" },
  { id: "footer-3", label: "Activity Feed", link: "/activity" }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', py: 4, px: 2 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left'} }}> {/* Centering text on xs screens */}
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
          Welcome back, Sean!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Your physical media, perfectly organized.
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} // Column on xs, row on sm+
          spacing={2} 
          justifyContent={{ xs: 'center', sm: 'flex-start'}} // Center items on xs
          alignItems={{ xs: 'stretch', sm: 'center' }} // Stretch buttons on xs
        >
          <Button 
            variant="contained" 
            startIcon={<QrCodeScannerIcon />}
            size="large" // Made buttons larger for prominence
            fullWidth={{ xs: true, sm: false }} // Full width on xs
          >
            Scan Barcode
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<AddCircleOutlineIcon />}
            size="large" // Made buttons larger
            fullWidth={{ xs: true, sm: false }} // Full width on xs
          >
            Add Manually
          </Button>
        </Stack>
      </Box>

      {/* Shelves Preview Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
          My Shelves
        </Typography>
        <Grid container spacing={3}>
          {mockShelves.map((shelf) => (
            <Grid item xs={12} sm={6} md={4} key={shelf.name}>
              <Card 
                sx={{ 
                  minHeight: 120,
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3, // Subtle shadow on hover
                  }
                }}
                onClick={() => navigate(shelf.path)} // Make card clickable
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {shelf.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shelf.count} {shelf.count === 1 ? 'item' : 'items'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Metrics Section */}
      <Box sx={{ mt: 6 }}>
        {/* Title for Metrics could be added if desired, e.g., <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>Key Metrics</Typography> */}
        <Grid container spacing={3}>
          {metricsData.map((metric) => (
            <Grid item xs={12} sm={4} key={metric.label}>
              <Card 
                sx={{ 
                  minHeight: 100, // Adjusted min height for metrics
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center', // Center content vertically
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3, // Subtle shadow on hover
                  }
                }}
                onClick={() => navigate(metric.link)}
              >
                <CardContent sx={{ textAlign: 'center' }}> {/* Center text content */}
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {metric.label}
                  </Typography>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {metric.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recently Added Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
          Recently Added
        </Typography>
        <Paper variant="outlined"> {/* Wrap List in Paper for a bordered look */}
          <List disablePadding> {/* disablePadding if Paper provides padding */}
            {recentlyAddedData.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem 
                  button 
                  onClick={() => navigate(item.link)}
                  // sx={{ py: 1.5 }} // Adjust padding if needed
                >
                  {item.thumbnail && (
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: 'grey.200', mr:1 }}>
                        <ImageIcon sx={{ color: 'grey.500' }} />
                      </Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={item.title}
                    secondary={`${item.condition} • $${item.price.toFixed(2)} • ${item.timeAgo} ago`}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                  {/* Could add a MoreVertIcon IconButton here for actions */}
                </ListItem>
                {index < recentlyAddedData.length - 1 && <Divider component="li" variant="inset" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Explore More Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
          Explore More
        </Typography>
        <Grid container spacing={3}>
          {exploreMoreData.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.label}
                  </Typography>
                  {/* Additional descriptive text could go here if needed */}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', pl: 2, pb: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => navigate(item.link)}
                  >
                    Learn More 
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Links Section */}
      <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
          {footerLinksData.map((item) => (
            <MuiLink
              key={item.id}
              component={RouterLink}
              to={item.link}
              variant="body1"
              underline="hover"
              color="text.primary" // Ensure good contrast
            >
              {item.label}
            </MuiLink>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Shelfify &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
