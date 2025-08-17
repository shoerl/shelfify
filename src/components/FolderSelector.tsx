import { MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FolderSelectorProps {
  value: string;
  onChange: (folder: string) => void;
  options: string[];
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export function FolderSelector({ value, onChange, options }: FolderSelectorProps) {
  return (
    <StyledTextField
      select
      label="Folder"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <MenuItem key={o} value={o}>
          {o}
        </MenuItem>
      ))}
    </StyledTextField>
  );
}
