import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: string[];
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    padding: theme.spacing(2),
  },
}));

export function FilterSidebar({ open, onClose, filters }: FilterSidebarProps) {
  return (
    <StyledDrawer open={open} onClose={onClose} variant="temporary">
      <List>
        {filters.map((f) => (
          <ListItem button key={f} onClick={onClose}>
            <ListItemText primary={f} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
