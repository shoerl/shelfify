import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import type { ConditionHistory } from '../../types/owned';

interface ConditionTrackingProps {
  currentCondition: string;
  conditionHistory: ConditionHistory[];
  onAddCondition: (condition: string, notes?: string, photos?: string[]) => void;
}

const CONDITION_GRADES = [
  'Mint (M)',
  'Near Mint (NM)',
  'Very Good Plus (VG+)',
  'Very Good (VG)',
  'Good Plus (G+)',
  'Good (G)',
  'Fair (F)',
  'Poor (P)',
];

export function ConditionTracking({
  currentCondition,
  conditionHistory,
  onAddCondition,
}: ConditionTrackingProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCondition, setNewCondition] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onAddCondition(newCondition, notes);
    setShowAddForm(false);
    setNewCondition('');
    setNotes('');
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">
              Condition Tracking
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : 'Update Condition'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">Current Condition:</Typography>
            <Typography variant="h5" color="primary">
              {currentCondition}
            </Typography>
          </Box>

          {showAddForm && (
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>New Condition</InputLabel>
                    <Select
                      value={newCondition}
                      label="New Condition"
                      onChange={e => setNewCondition(e.target.value)}
                    >
                      {CONDITION_GRADES.map(grade => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Add any notes about the condition change..."
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!newCondition}
                  >
                    Update Condition
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          <Timeline>
            {conditionHistory.map((entry, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary">
                  {new Date(entry.date).toLocaleDateString()}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <PhotoCameraIcon />
                  </TimelineDot>
                  {index < conditionHistory.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">
                    {entry.condition}
                  </Typography>
                  {entry.notes && (
                    <Typography variant="body2" color="text.secondary">
                      {entry.notes}
                    </Typography>
                  )}
                  {entry.photos && entry.photos.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="caption" color="text.secondary">
                        {entry.photos.length}
                        {' '}
                        photo(s)
                      </Typography>
                    </Box>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </CardContent>
    </Card>
  );
}
