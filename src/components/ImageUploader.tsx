import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
}

const Preview = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export function ImageUploader({ onChange }: ImageUploaderProps) {
  const [src, setSrc] = useState<string>();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSrc(URL.createObjectURL(file));
    }
    onChange(file);
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload Image
        <input hidden type="file" accept="image/*" onChange={handleFile} />
      </Button>
      {src && <Preview src={src} alt="preview" />}
    </Box>
  );
}
