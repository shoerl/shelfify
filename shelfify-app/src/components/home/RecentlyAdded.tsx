import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image'; // Placeholder for thumbnail

const mockRecentItems = [
  {"thumbnail": true, "title": "The Wall — Vinyl, UK", "condition": "Near Mint", "price": 25, "timeAgo": "2h"},
  {"thumbnail": true, "title": "Inception — DVD, Region 1", "condition": "Sealed", "price": 30, "timeAgo": "1d"},
  {"thumbnail": false, "title": "Charizard VMAX - Pokémon Card", "condition": "Mint", "price": 150, "timeAgo": "3d"}
];

const RecentlyAdded: React.FC = () => {
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
        Recently Added
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List sx={{ width: '100%' }}>
          {mockRecentItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                {item.thumbnail && (
                  <ListItemAvatar>
                    <Avatar variant="rounded" sx={{ width: 56, height: 56, mr: 2, backgroundColor: 'grey.200' }}>
                      <ImageIcon color="action" />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Condition: {item.condition}
                      </Typography>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Price: ${item.price}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', float: 'right' }} // Align timeAgo to the right
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.timeAgo}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < mockRecentItems.length - 1 && <Divider variant={item.thumbnail ? "inset" : "fullWidth"} component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RecentlyAdded;
