import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TagSelector from '../components/TagSelector';
import FolderSelector from '../components/FolderSelector';
import ImageUploader from '../components/ImageUploader';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}));

const tagOptions = ['Rock', 'Jazz', 'Pop'];
const folderOptions = ['Default', 'Wishlist'];

export default function AddItem() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [folder, setFolder] = useState('');

  return (
    <Box p={2} pb={8}>
      <Stepper activeStep={step} sx={{ mb: 2 }}>
        <Step>
          <StepLabel>Scan or Search</StepLabel>
        </Step>
        <Step>
          <StepLabel>Metadata</StepLabel>
        </Step>
      </Stepper>

      {step === 0 && (
        <Box>
          <TextField fullWidth label="Search or Scan" sx={{ mb: 2 }} />
          <Button variant="contained" onClick={() => setStep(1)}>
            Next
          </Button>
        </Box>
      )}

      {step === 1 && (
        <FormContainer>
          <TextField label="Title" fullWidth />
          <TextField label="Artist" fullWidth />
          <TextField label="Release Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="Condition" select fullWidth>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </TextField>
          <TagSelector options={tagOptions} value={tags} onChange={setTags} />
          <FolderSelector options={folderOptions} value={folder} onChange={setFolder} />
          <ImageUploader onChange={() => {}} />
        </FormContainer>
      )}

      {step === 1 && (
        <Box
          sx={{
            position: { xs: 'fixed', md: 'static' },
            bottom: { xs: 0, md: 'auto' },
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'background.paper',
            borderTop: { xs: '1px solid', md: 'none' },
            borderColor: 'divider',
          }}
        >
          <Button variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
}
