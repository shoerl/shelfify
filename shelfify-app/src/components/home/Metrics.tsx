import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // For navigation

const mockMetrics = [
  {"label": "Total Copies", "value": "24 items", "linkTo": "/all-items"},
  {"label": "Categories Collected", "value": "3 of 50+", "linkTo": "/shelves"},
  {"label": "Recent Spend", "value": "$1,200", "linkTo": "/stats"}
];

const Metrics: React.FC = () => {
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
        Collection Metrics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {mockMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%', // Ensure cards have same height if in a row
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6, // Increase shadow on hover
                }
              }}
            >
              <CardActionArea 
                component={RouterLink} 
                to={metric.linkTo} 
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p:2 }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {metric.label}
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click to view
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Metrics;
