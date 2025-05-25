import React from 'react';
import { Box, Typography, List, ListItemButton, Paper, Divider, ListItemIcon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExploreIcon from '@mui/icons-material/Explore'; // Example icon for explore items

const mockExploreItems = [
  {"label": "Start your Pokémon Shelf", "action": "goToPokemonReleases", "linkTo": "/releases/pokemon"},
  {"label": "New Release: Dune Part Two - Blu-ray", "action": "viewRelease", "linkTo": "/releases/dune-part-two"}
];

const ExploreMore: React.FC = () => {
  const handleAction = (action: string, linkTo: string) => {
    console.log(`Action: ${action}, LinkTo: ${linkTo}`);
    // Navigation will be handled by RouterLink for items with linkTo
  };

  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, px: 2 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          fontWeight: 'medium',
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' } 
        }}
      >
        Explore More
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List component="nav" aria-label="explore more actions">
          {mockExploreItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton 
                component={RouterLink} 
                to={item.linkTo} 
                onClick={() => handleAction(item.action, item.linkTo)}
              >
                <ListItemIcon>
                  <ExploreIcon /> 
                </ListItemIcon>
                <Typography variant="body1">{item.label}</Typography>
              </ListItemButton>
              {index < mockExploreItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ExploreMore;
