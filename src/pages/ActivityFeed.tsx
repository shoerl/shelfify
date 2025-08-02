import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  Album as AlbumIcon,
  Movie as MovieIcon,
  Casino as PokemonIcon,
  AddCircleOutline as AddIcon,
  MonetizationOn as SellIcon,
  Edit as EditIcon,
  Star as RateIcon,
} from '@mui/icons-material';

// Mock data for activity feed
const mockActivities = [
  {
    id: 1,
    type: 'add',
    user: 'You',
    item: 'The Wall by Pink Floyd',
    timestamp: '2 hours ago',
    shelf: 'Music',
    icon: <AlbumIcon />,
  },
  {
    id: 2,
    type: 'sell',
    user: 'You',
    item: 'Pulp Fiction (DVD)',
    timestamp: '1 day ago',
    price: 15,
    shelf: 'Movies',
    icon: <MovieIcon />,
  },
  {
    id: 3,
    type: 'add',
    user: 'You',
    item: 'Charizard Holo #4',
    timestamp: '3 days ago',
    shelf: 'Pokémon',
    icon: <PokemonIcon />,
  },
  {
    id: 4,
    type: 'edit',
    user: 'You',
    item: 'Dark Side of the Moon',
    timestamp: '1 week ago',
    details: 'Updated condition from "Very Good" to "Near Mint"',
    shelf: 'Music',
    icon: <AlbumIcon />,
  },
  {
    id: 5,
    type: 'rate',
    user: 'You',
    item: 'Inception (Blu-ray)',
    timestamp: '2 weeks ago',
    rating: 5,
    shelf: 'Movies',
    icon: <MovieIcon />,
  },
];

// Helper function to get activity icon
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'add':
      return <AddIcon />;
    case 'sell':
      return <SellIcon />;
    case 'edit':
      return <EditIcon />;
    case 'rate':
      return <RateIcon />;
    default:
      return <AddIcon />;
  }
};

interface ActivityItem {
  id: string;
  user: string;
  userAvatar: string;
  type: 'add' | 'sell' | 'edit' | 'buy' | 'remove' | 'review';
  item: string;
  shelf?: string;
  price?: number;
  timestamp: string;
  details?: string;
}

// Helper function to get activity text
const getActivityText = (activity: ActivityItem) => {
  switch (activity.type) {
    case 'add':
      return `added ${activity.item} to ${activity.shelf} shelf`;
    case 'sell':
      return `sold ${activity.item} for $${activity.price}`;
    case 'edit':
      return `updated ${activity.item} - ${activity.details}`;
    case 'rate':
      return `rated ${activity.item} ${activity.rating} stars`;
    default:
      return `interacted with ${activity.item}`;
  }
};

export default function ActivityFeed() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Activity Feed</Typography>
        <Typography variant="body1" color="text.secondary">
          Recent updates to your collection
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <List sx={{ width: '100%', p: 0 }}>
            {mockActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" variant="body1" fontWeight={500}>
                          {activity.user}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {activity.timestamp}
                        </Typography>
                      </Box>
                    )}
                    secondary={(
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body1">
                          {getActivityText(activity)}
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            {activity.icon}
                          </Avatar>
                          <Chip
                            label={activity.shelf}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    )}
                  />
                </ListItem>
                {index < mockActivities.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {mockActivities.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" color="text.secondary">No recent activity</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your activity will appear here when you make changes to your collection.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
