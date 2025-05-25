import { useOwnedItems } from '../hooks/useOwnedItems';
import { ItemTable } from '../components/ItemTable';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function AllItems() {
  const { data: items = [], isLoading } = useOwnedItems();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('title');

  const columns = [
    { field: 'typeName', headerName: 'Collection Type', flex: 1 },
    { field: 'title', headerName: 'Release Title', flex: 1 },
    { field: 'condition', headerName: 'Condition', flex: 1 },
    { field: 'pricePaid', headerName: 'Price Paid (Copy)', flex: 1, type: 'number' },
  ];

  // Merge catalog data with user data
  const rows = items.map(item => ({
    id: item.id,
    typeName: item.typeName,
    title: item.catalogTitle,
    ...item.userData,
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Copies
      </Typography>
      <ItemTable
        columns={columns}
        rows={rows}
        loading={isLoading}
        onPageChange={setPage}
        onSortChange={(field, direction) => setSort(`${field}:${direction}`)}
      />
    </Box>
  );
}
