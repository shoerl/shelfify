import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { TagSelector } from '../components/TagSelector';
import { FolderSelector } from '../components/FolderSelector';
import { ImageUploader } from '../components/ImageUploader';

export default function AddItem() {
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [folder, setFolder] = useState('');
  const [image, setImage] = useState<File | null>(null);

  return (
    <Box sx={{ p: 2 }}>
      {step === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Search or Scan" fullWidth />
          <Button variant="contained" onClick={() => setStep(2)}>
            Next
          </Button>
        </Box>
      )}
      {step === 2 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Title" fullWidth />
          <TextField label="Artist" fullWidth />
          <TextField
            label="Release Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField select label="Condition" defaultValue="New" fullWidth>
            {['New', 'Used', 'Refurbished'].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TagSelector value={tags} onChange={setTags} options={['tag1', 'tag2']} />
          <FolderSelector value={folder} onChange={setFolder} options={['Default']} />
          <ImageUploader onChange={setImage} />
          <Button
            variant="contained"
            sx={{
              position: { xs: 'fixed', md: 'static' },
              bottom: { xs: 16, md: 'auto' },
              right: { xs: 16, md: 'auto' },
              width: { xs: 'calc(100% - 32px)', md: 'auto' },
            }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
}
