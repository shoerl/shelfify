import React from 'react';
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Divider,
  Link as MuiLink, // For potential inline links
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // For navigation
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment'; // Example for other types
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'; // For empty state

// Mock data for activity entries
interface ActivityEntry {
  id: string;
  thumbnailType: 'add' | 'wishlist' | 'edit' | 'comment'; // Extend as needed
  itemTitle?: string; // Optional, depending on activity
  shelfName?: string; // Optional
  fieldUpdated?: string; // Optional
  actionDescription: string;
  timestamp: string; // e.g., "2 hours ago"
  linkPath?: string; // Optional path for navigation
}

const mockActivityEntries: ActivityEntry[] = [
  {
    id: 'act1',
    thumbnailType: 'add',
    itemTitle: 'The Wall - Vinyl',
    shelfName: 'Music Shelf',
    actionDescription: "You added 'The Wall - Vinyl' to Music Shelf.",
    timestamp: '2 hours ago',
    linkPath: '/shelves/music', // Example link to the shelf
  },
  {
    id: 'act2',
    thumbnailType: 'wishlist',
    itemTitle: 'Blade Runner 2049',
    actionDescription: "You added 'Blade Runner 2049' to your Wishlist.",
    timestamp: '1 day ago',
    linkPath: '/wishlist', // Example link to wishlist
  },
  {
    id: 'act3',
    thumbnailType: 'edit',
    itemTitle: 'Inception - Blu-ray',
    fieldUpdated: 'condition to Near Mint',
    actionDescription: "You updated 'Inception - Blu-ray', setting condition to Near Mint.",
    timestamp: '3 days ago',
    linkPath: '/copies', // Example link to all copies or a specific item
  },
  {
    id: 'act4',
    thumbnailType: 'comment',
    itemTitle: 'Dark Side of the Moon - CD',
    actionDescription: "User 'collector_jane' commented on your copy of 'Dark Side of the Moon - CD'.",
    timestamp: '5 days ago',
    linkPath: '#', // Placeholder for a comment link
  },
];

const getIconForType = (type: ActivityEntry['thumbnailType']) => {
  switch (type) {
    case 'add':
      return <AddCircleOutlineIcon />;
    case 'wishlist':
      return <FavoriteIcon color="error" />;
    case 'edit':
      return <EditIcon color="action" />;
    case 'comment':
      return <CommentIcon color="info" />;
    default:
      return <DynamicFeedIcon />;
  }
};

export default function ActivityFeed() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Activity Feed
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Stay updated with recent activities in your collection.
        </Typography>
      </Box>

      {mockActivityEntries.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            p: { xs: 3, md: 6 },
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <DynamicFeedIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
          <Typography variant="h5" color="text.secondary">
            No Recent Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your activity feed is currently empty. Start managing your collection
            to see updates here.
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List disablePadding>
            {mockActivityEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <ListItem
                  button={!!entry.linkPath} // Make item clickable if linkPath exists
                  component={entry.linkPath ? RouterLink : 'div'}
                  to={entry.linkPath || undefined}
                  sx={{
                    py: 2,
                    '&:hover': {
                      backgroundColor: entry.linkPath ? theme.palette.action.hover : 'transparent',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200', color: theme.palette.text.primary }}>
                      {getIconForType(entry.thumbnailType)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span">
                        {entry.actionDescription}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {entry.timestamp}
                      </Typography>
                    }
                  />
                  {/* Optional: Could add an IconButton here for more actions if needed */}
                </ListItem>
                {index < mockActivityEntries.length - 1 && <Divider component="li" variant="inset" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}
