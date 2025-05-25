import { useParams } from 'react-router-dom';
import { useCollectionTypes } from '../hooks/useCollectionTypes';
import { useCatalog } from '../hooks/useCatalog';
import { ItemTable } from '../components/ItemTable';
import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function TypeDetail() {
  const { typeId } = useParams<{ typeId: string }>();
  const { data: types } = useCollectionTypes();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('title');

  const type = types?.find(t => t.id === typeId);
  const { data: catalogData, isLoading } = useCatalog(typeId!, page, sort);

  if (!type) {
    return <Typography>Loading...</Typography>;
  }

  const columns = type.fieldDefs.map(fd => ({
    field: fd.name,
    headerName: fd.label,
    flex: 1,
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {type.name}
        {' '}
        Releases
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {type.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
      >
        Add Copy to My Collection
      </Button>
      <ItemTable
        columns={columns.map(col => col.field === 'title' ? { ...col, headerName: 'Release Title' } : col)}
        rows={catalogData?.items.map(item => ({
          id: item.id,
          ...item.data,
        })) || []}
        loading={isLoading}
        onPageChange={setPage}
        onSortChange={(field, direction) => setSort(`${field}:${direction}`)}
      />
    </Box>
  );
}
