import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Modal, Box, Typography, TextField, Button, Stack, InputAdornment } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod schema for form validation
const schema = z.object({
  condition: z.string().min(1, "Condition is required"),
  pricePaid: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() === '') return undefined; // Allow empty string to be optional
      const num = parseFloat(String(val));
      return isNaN(num) ? val : num; // Keep as string if not a number, else convert
    },
    z.number({ invalid_type_error: "Price must be a number" })
     .positive("Price must be a positive number")
     .optional()
     .or(z.literal(0)) // Allow 0
  ).optional(),
  dateAcquired: z.string().optional(), // Using string for type="date" TextField
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface AddCopyModalProps {
  open: boolean;
  onClose: () => void;
  // onSave: (data: FormValues) => void; // Future: prop for save handler
}

// Style for the modal Box
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 450 }, // Responsive width
  bgcolor: 'background.paper',
  borderRadius: 2, // Softer corners
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
};

export default function AddCopyModal({ open, onClose }: AddCopyModalProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: '',
      pricePaid: undefined, // Use undefined for optional number
      dateAcquired: '',
      notes: ''
    }
  });

  const handleCloseModal = () => {
    reset({ // Reset form to default values on close
      condition: '',
      pricePaid: undefined,
      dateAcquired: '',
      notes: ''
    });
    onClose();
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    // onSave(data); // Future implementation
    handleCloseModal(); // Resets form and closes modal
  };

  return (
    <Modal 
      open={open} 
      onClose={handleCloseModal} // Use the custom handler to ensure form reset
      aria-labelledby="add-copy-modal-title"
      aria-describedby="add-copy-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-copy-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}> {/* Increased margin bottom */}
          Add New Copy
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}> {/* Increased spacing */}
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Condition*"
                  variant="outlined"
                  fullWidth
                  error={!!errors.condition}
                  helperText={errors.condition?.message}
                />
              )}
            />
            <Controller
              name="pricePaid"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price Paid"
                  variant="outlined"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { step: "0.01" } // Allow decimal for currency
                  }}
                  error={!!errors.pricePaid}
                  helperText={errors.pricePaid?.message}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)} // Handle empty string for optional number
                  value={field.value === undefined ? '' : field.value} // Ensure TextField displays empty for undefined
                />
              )}
            />
            <Controller
              name="dateAcquired"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date Acquired"
                  variant="outlined"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }} // Ensure label doesn't overlap with date input
                  error={!!errors.dateAcquired}
                  helperText={errors.dateAcquired?.message}
                />
              )}
            />
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                />
              )}
            />
            <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3 }}> {/* Increased spacing & top margin */}
              <Button onClick={handleCloseModal} color="inherit" variant="text"> {/* Changed to text and color inherit for less emphasis */}
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Copy
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
