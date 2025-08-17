import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export function TagSelector({ value, onChange, options }: TagSelectorProps) {
  return (
    <StyledAutocomplete
      multiple
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  );
}
