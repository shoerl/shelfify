import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Tooltip,
} from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
import MovieIcon from '@mui/icons-material/Movie';
import { useNavigate } from 'react-router-dom';

// Mock data for demo
const userName = 'Sean';
const exploreData = [
  { title: 'Music', count: 12, icon: <AlbumIcon />, color: '#F7C873' },
  { title: 'Movies', count: 8, icon: <MovieIcon />, color: '#7EC4CF' },
];
const copiesData = [
  { title: 'My Music Copies', count: 3, icon: <AlbumIcon />, color: '#F7C873' },
  { title: 'My Movie Copies', count: 1, icon: <MovieIcon />, color: '#7EC4CF' },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 0 },
        position: 'relative',
      }}
    >
      {/* Welcome & Tagline */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontFamily: 'monospace',
          color: '#22223B',
          mb: 1,
          letterSpacing: '-2px',
        }}
      >
        Welcome back, {userName}!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: '#4A4E69',
          mb: 3,
          fontFamily: 'monospace',
        }}
      >
        Your hub for all releases and your personal copies.
      </Typography>

      {/* Primary Actions */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained">Explore Collections</Button>
        <Button variant="outlined">View Your Copies</Button>
      </Stack>

      {/* Explore Collections Section */}
      <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'monospace', mb: 2 }}>
        Explore Collections
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {exploreData.map((item) => {
          const path = item.title === 'Music' ? '/collections/music' : '/collections/movies';
          return (
            <Grid item xs={6} key={item.title}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: item.color,
                  color: '#22223B',
                  boxShadow: '0 2px 8px #0001',
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: '0 4px 12px #0002' },
                }}
                onClick={() => navigate(path)}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#fff', color: item.color, mr: 2 }}>{item.icon}</Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {item.count}
                      </Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        Releases
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small" onClick={e => { e.stopPropagation(); navigate(path); }}>
                    Browse
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Your Copies Section */}
      <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'monospace', mb: 2 }}>
        Your Copies
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {copiesData.map((item) => {
          const path = item.title === 'My Music Copies' ? '/my-collection?category=music' : '/my-collection?category=movies';
          return (
            <Grid item xs={6} key={item.title}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: item.color,
                  color: '#22223B',
                  boxShadow: '0 2px 8px #0001',
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: '0 4px 12px #0002' },
                }}
                onClick={() => navigate(path)}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#fff', color: item.color, mr: 2 }}>{item.icon}</Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {item.count}
                      </Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        Owned
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small" onClick={e => { e.stopPropagation(); navigate(path); }}>
                    {item.title === 'My Music Copies' ? 'View My Music' : 'View My Movies'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
