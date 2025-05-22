import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import type { PriceHistory } from '../../types/catalog';

interface ValueTrackingProps {
  currentValue: number;
  priceHistory: PriceHistory[];
  onAddValue: (value: number, source: string, condition?: string) => void;
}

export function ValueTracking({ currentValue, priceHistory, onAddValue }: ValueTrackingProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const calculateChange = () => {
    if (priceHistory.length < 2) return 0;
    const oldest = priceHistory[0].value;
    const newest = priceHistory[priceHistory.length - 1].value;
    return ((newest - oldest) / oldest) * 100;
  };

  const change = calculateChange();
  const isPositive = change > 0;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">
                Value Tracking
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add Value'}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h4">
                ${currentValue.toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                {isPositive ? (
                  <TrendingUpIcon color="success" />
                ) : (
                  <TrendingDownIcon color="error" />
                )}
                <Typography
                  variant="h6"
                  color={isPositive ? 'success.main' : 'error.main'}
                >
                  {change.toFixed(1)}%
                </Typography>
                <Tooltip title="Change since first recorded value">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Condition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {priceHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(entry.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${entry.value.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={entry.source}
                          size="small"
                          color={
                            entry.source === 'manual' ? 'default' :
                            entry.source === 'discogs' ? 'primary' :
                            entry.source === 'ebay' ? 'secondary' :
                            'info'
                          }
                        />
                      </TableCell>
                      <TableCell>{entry.condition || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
} 