import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Fade,
  Skeleton,
} from '@mui/material'
import {
  Add as AddIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Sort as SortIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const conditions = [
  'Sealed',
  'Near Mint',
  'Very Good Plus',
  'Very Good',
  'Good Plus',
  'Good',
  'Fair',
  'Poor',
]

interface MusicItem {
  id: number
  title: string
  artist: string
  year: number
  format: string
  label: string
  country: string
}

interface MovieItem {
  id: number
  title: string
  director: string
  year: number
  format: string
  region: string
  edition: string
  studio: string
}

type CollectionItem = MusicItem | MovieItem

// Mock data - replace with actual data fetching
const mockData: Record<string, CollectionItem[]> = {
  music: [
    {
      id: 1,
      title: 'The Wall',
      artist: 'Pink Floyd',
      year: 1979,
      format: 'Vinyl',
      label: 'EMI',
      country: 'UK',
    },
    {
      id: 2,
      title: 'Abbey Road',
      artist: 'The Beatles',
      year: 1969,
      format: 'CD',
      label: 'Apple',
      country: 'UK',
    },
  ],
  movies: [
    {
      id: 1,
      title: 'Blade Runner',
      director: 'Ridley Scott',
      year: 1982,
      format: 'Blu-ray',
      region: 'Region A',
      edition: 'Final Cut',
      studio: 'Warner Bros.',
    },
    {
      id: 2,
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
      format: 'DVD',
      region: 'Region 1',
      edition: 'Standard',
      studio: 'Warner Bros.',
    },
  ],
}

export function CategoryDetail() {
  const { typeId } = useParams<{ typeId: string }>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null)
  const [formData, setFormData] = useState({
    condition: '',
    pricePaid: '',
    notes: '',
  })

  const isMusic = typeId === 'music'
  const data = mockData[typeId as keyof typeof mockData] || []

  const handleAddClick = (item: CollectionItem) => {
    setSelectedItem(item)
    setAddModalOpen(true)
  }

  const handleClose = () => {
    setAddModalOpen(false)
    setSelectedItem(null)
    setFormData({ condition: '', pricePaid: '', notes: '' })
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Adding to collection:', { ...selectedItem, ...formData })
    handleClose()
  }

  const isMusicItem = (item: CollectionItem): item is MusicItem => {
    return 'artist' in item
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {isMusic ? 'Music Releases' : 'Movie Releases'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isMusic ? 'Browse and manage all music releases' : 'Browse and manage all movie releases'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleAddClick({} as CollectionItem)}
        >
          Add New Release
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {isMusic
                ? (
                    <>
                      <TableCell>Release Title</TableCell>
                      <TableCell>Artist</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell>Label</TableCell>
                      <TableCell>Country</TableCell>
                    </>
                  )
                : (
                    <>
                      <TableCell>Release Title</TableCell>
                      <TableCell>Director</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell>Region</TableCell>
                      <TableCell>Edition</TableCell>
                      <TableCell>Studio</TableCell>
                    </>
                  )}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                {isMusicItem(item)
                  ? (
                      <>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.artist}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.format}
                            size="small"
                            sx={{
                              backgroundColor: item.format === 'Vinyl' ? '#2563eb15' : '#7c3aed15',
                              color: item.format === 'Vinyl' ? '#2563eb' : '#7c3aed',
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{item.country}</TableCell>
                      </>
                    )
                  : (
                      <>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.director}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.format}
                            size="small"
                            sx={{
                              backgroundColor: item.format === 'Blu-ray' ? '#2563eb15' : '#7c3aed15',
                              color: item.format === 'Blu-ray' ? '#2563eb' : '#7c3aed',
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.edition}</TableCell>
                        <TableCell>{item.studio}</TableCell>
                      </>
                    )}
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddClick(item)}
                  >
                    Add Copy to My Collection
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={addModalOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Add a Copy to Your Collection
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {selectedItem?.title || 'New Item'}
            </Typography>
            <TextField
              select
              fullWidth
              label="Condition"
              value={formData.condition}
              onChange={e => setFormData({ ...formData, condition: e.target.value })}
              sx={{ mb: 2 }}
            >
              {conditions.map(condition => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Price Paid (Copy)"
              type="number"
              value={formData.pricePaid}
              onChange={e => setFormData({ ...formData, pricePaid: e.target.value })}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.condition || !formData.pricePaid}
          >
            Add Copy to My Collection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
