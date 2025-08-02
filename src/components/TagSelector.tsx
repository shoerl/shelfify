import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export interface TagSelectorProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function TagSelector({ options, value, onChange }: TagSelectorProps) {
  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={params => <TextField {...params} label="Tags" placeholder="Select tags" />}
    />
  );
}
