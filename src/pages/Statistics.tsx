import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  CardHeader,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Category as CategoryIcon,
  Payments as PaymentsIcon,
  TrendingUp as TrendingUpIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';

export default function Statistics() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Statistics</Typography>
        <Typography variant="body1" color="text.secondary">
          Insights and analytics about your collection
        </Typography>
      </Box>

      <Paper sx={{ mb: 3, borderRadius: 1 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="statistics tabs"
        >
          <Tab icon={<PaymentsIcon />} label="SPEND" />
          <Tab icon={<CategoryIcon />} label="COLLECTION" />
          <Tab icon={<TimelineIcon />} label="ACTIVITY" />
          <Tab icon={<TrendingUpIcon />} label="VALUE" />
        </Tabs>
      </Paper>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardHeader title="Spend Over Time" />
              <CardContent>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShowChartIcon sx={{ fontSize: 100, opacity: 0.2 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, mb: 3 }}>
              <CardHeader title="Total Spend" />
              <CardContent>
                <Typography variant="h3" color="primary" sx={{ textAlign: 'center', mb: 2 }}>$1,245</Typography>
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={30} />
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Spend by Category" />
              <CardContent>
                <Skeleton variant="rectangular" height={150} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Monthly Budget" />
              <CardContent>
                <Skeleton variant="rectangular" height={200} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Spend Breakdown" />
              <CardContent>
                <Skeleton variant="rectangular" height={200} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Completion Progress" />
              <CardContent>
                <Skeleton variant="rectangular" height={200} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Collection Growth" />
              <CardContent>
                <Skeleton variant="rectangular" height={200} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        <Card sx={{ borderRadius: 2 }}>
          <CardHeader title="Recent Activity" />
          <CardContent>
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" height={50} />
          </CardContent>
        </Card>
      )}

      {currentTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title="Value Over Time" />
              <CardContent>
                <Skeleton variant="rectangular" height={300} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
