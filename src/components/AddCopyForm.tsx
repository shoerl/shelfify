import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import { useModal } from '../context/ModalContext';

// Mock shelves for dropdown
const mockShelves = [
  { id: 'music', name: 'Music Shelf' },
  { id: 'movies', name: 'Movies Shelf' },
  { id: 'pokemon', name: 'Pokémon Shelf' },
];

// Mock condition options
const conditionOptions = [
  'Mint',
  'Near Mint',
  'Very Good Plus',
  'Very Good',
  'Good Plus',
  'Good',
  'Fair',
  'Poor',
  'Sealed',
];

interface AddCopyFormProps {
  selectedShelfId?: string;
  onSuccess?: () => void;
}

export default function AddCopyForm({ selectedShelfId, onSuccess }: AddCopyFormProps) {
  const { closeModal } = useModal();
  
  const [formData, setFormData] = useState({
    title: '',
    variant: '',
    condition: '',
    pricePaid: '',
    dateAcquired: new Date().toISOString().split('T')[0], // Current date as default
    shelfId: selectedShelfId || '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error on field change
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.shelfId) newErrors.shelfId = 'Shelf is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (formData.pricePaid && isNaN(Number(formData.pricePaid))) {
      newErrors.pricePaid = 'Price must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Here we would usually submit the data to an API
      console.log('Submitting copy data:', formData);
      
      // Simulate success
      setTimeout(() => {
        if (onSuccess) onSuccess();
        closeModal();
      }, 500);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            name="variant"
            label="Variant/Edition"
            fullWidth
            value={formData.variant}
            onChange={handleChange}
            placeholder="e.g., Vinyl, UK pressing, 1st Edition"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.condition}>
            <InputLabel>Condition</InputLabel>
            <Select
              name="condition"
              value={formData.condition}
              label="Condition"
              onChange={handleChange}
            >
              {conditionOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
            {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="pricePaid"
            label="Price Paid"
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            value={formData.pricePaid}
            onChange={handleChange}
            error={!!errors.pricePaid}
            helperText={errors.pricePaid}
            placeholder="0.00"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.shelfId}>
            <InputLabel>Shelf</InputLabel>
            <Select
              name="shelfId"
              value={formData.shelfId}
              label="Shelf"
              onChange={handleChange}
              disabled={!!selectedShelfId}
            >
              {mockShelves.map(shelf => (
                <MenuItem key={shelf.id} value={shelf.id}>{shelf.name}</MenuItem>
              ))}
            </Select>
            {errors.shelfId && <FormHelperText>{errors.shelfId}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="dateAcquired"
            label="Date Acquired"
            type="date"
            fullWidth
            value={formData.dateAcquired}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            name="notes"
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional details about this item..."
          />
        </Grid>
      </Grid>
      
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}