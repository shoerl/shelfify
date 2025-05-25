import { DataGrid, type GridColDef } from '@mui/x-data-grid'

interface ItemTableProps<T> {
  columns: GridColDef[]
  rows: T[]
  loading?: boolean
  pageSize?: number
  onPageChange?: (page: number) => void
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void
}

export function ItemTable<T extends { id: string }>({
  columns,
  rows,
  loading = false,
  pageSize = 10,
  onPageChange,
  onSortChange,
}: ItemTableProps<T>) {
  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      loading={loading}
      pageSize={pageSize}
      onPageChange={page => onPageChange?.(page)}
      onSortModelChange={(model) => {
        if (model.length > 0) {
          onSortChange?.(model[0].field, model[0].sort as 'asc' | 'desc')
        }
      }}
      disableSelectionOnClick
      sx={{
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
      }}
    />
  )
}
