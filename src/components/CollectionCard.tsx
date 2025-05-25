import { Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { CollectionType } from '../types/collection'

export function CollectionCard({ type }: { type: CollectionType }) {
  return (
    <Card
      component={Link}
      to={`/types/${type.id}`}
      sx={{
        'textDecoration': 'none',
        'height': '100%',
        'display': 'flex',
        'flexDirection': 'column',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {type.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {type.fieldDefs.length}
          {' '}
          fields
        </Typography>
      </CardContent>
    </Card>
  )
}
