import { Grid, TextField, Box } from '@mui/material';
import { useCollectionTypes } from '../hooks/useCollectionTypes';
import { CollectionCard } from '../components/CollectionCard';
import { useState } from 'react';

export default function TypesList() {
  const { data: types = [], isLoading } = useCollectionTypes();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTypes = types.filter(type => 
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <TextField
        fullWidth
        label="Search types"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filteredTypes.map(type => (
          <Grid item xs={12} sm={6} md={4} key={type.id}>
            <CollectionCard type={type} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
