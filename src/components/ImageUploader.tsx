import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
}

const Preview = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    else {
      setPreview(null);
    }
  };

  return (
    <Box>
      <Button variant="outlined" component="label">
        Upload Image
        <input hidden type="file" accept="image/*" onChange={handleFileChange} />
      </Button>
      {preview
        ? <Preview src={preview} alt="Preview" />
        : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No image selected
            </Typography>
          )}
    </Box>
  );
}
