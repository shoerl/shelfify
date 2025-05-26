import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useModal } from '../contexts/ModalContext'; // Assuming ModalContext is in src/contexts

// Mock data for conditions - can be expanded or fetched later
const conditions = [
  'Mint', 'Near Mint', 'Very Good Plus', 'Very Good',
  'Good Plus', 'Good', 'Fair', 'Poor', 'Sealed',
];

// Placeholder for toast/snackbar functionality
const showToast = (message: string) => {
  console.log(`Toast: ${message}`);
  // In a real app, this would trigger a Snackbar or similar notification
};

export const AddCopyForm = () => {
  const { addCopyOpen, closeAddCopyModal } = useModal();
  const [condition, setCondition] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [dateAcquired, setDateAcquired] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const formData = {
      condition,
      pricePaid: parseFloat(pricePaid) || 0, // Ensure it's a number
      dateAcquired,
      notes,
    };
    console.log('Saving Copy:', formData);
    showToast('Copy added successfully! (Placeholder)');
    handleCloseAndReset();
  };

  const handleCloseAndReset = () => {
    closeAddCopyModal();
    // Reset form fields
    setCondition('');
    setPricePaid('');
    setDateAcquired('');
    setNotes('');
  };

  // Prevent Dialog from rendering if not open, to ensure form state resets visually
  // Or, more robustly, pass initialData to the modal and set state upon opening.
  // For now, simple conditional rendering or relying on AppShell re-rendering should be okay.
  if (!addCopyOpen) {
    return null;
  }

  return (
    <Dialog open={addCopyOpen} onClose={handleCloseAndReset} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Copy to Your Collection</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="condition-label">Condition</InputLabel>
            <Select
              labelId="condition-label"
              id="condition"
              value={condition}
              label="Condition"
              onChange={(e) => setCondition(e.target.value)}
            >
              {conditions.map((cond) => (
                <MenuItem key={cond} value={cond}>
                  {cond}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="pricePaid"
            label="Price Paid"
            type="number"
            fullWidth
            variant="outlined"
            value={pricePaid}
            onChange={(e) => setPricePaid(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
            }}
          />

          <TextField
            margin="dense"
            id="dateAcquired"
            label="Date Acquired"
            type="date"
            fullWidth
            variant="outlined"
            value={dateAcquired}
            onChange={(e) => setDateAcquired(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            margin="dense"
            id="notes"
            label="Notes (Optional)"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleCloseAndReset} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save Copy
        </Button>
      </DialogActions>
    </Dialog>
  );
};
