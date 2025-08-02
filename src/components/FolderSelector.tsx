import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export interface FolderSelectorProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FolderSelector({ options, value, onChange }: FolderSelectorProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="folder-select-label">Folder</InputLabel>
      <Select
        labelId="folder-select-label"
        label="Folder"
        value={value}
        onChange={e => onChange(e.target.value as string)}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
