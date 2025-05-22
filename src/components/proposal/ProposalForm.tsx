import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Stack
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { CollectionTypeProposal } from '../../types/collection';

const fieldSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  label: z.string().min(1, 'Field label is required'),
  type: z.enum(['string', 'number', 'select', 'date', 'boolean', 'image', 'url', 'price', 'condition']),
  options: z.array(z.string()).optional(),
  validation: z.object({
    required: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional()
  }).optional(),
  metadata: z.object({
    description: z.string().optional(),
    example: z.string().optional(),
    isPublic: z.boolean().optional(),
    isSearchable: z.boolean().optional(),
    isFilterable: z.boolean().optional()
  }).optional()
});

const proposalSchema = z.object({
  name: z.string().min(1, 'Collection type name is required'),
  description: z.string().min(1, 'Description is required'),
  fieldDefs: z.array(fieldSchema),
  metadata: z.object({
    category: z.string().min(1, 'Category is required'),
    icon: z.string().optional(),
    isPublic: z.boolean(),
    rationale: z.string().min(1, 'Rationale is required'),
    examples: z.array(z.string()).min(1, 'At least one example is required')
  })
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onSubmit: (data: Omit<CollectionTypeProposal, 'id' | 'status' | 'submittedBy' | 'submittedAt'>) => void;
}

export function ProposalForm({ onSubmit }: ProposalFormProps) {
  const [selectedType, setSelectedType] = useState<string>('string');
  
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      fieldDefs: [],
      metadata: {
        isPublic: true,
        examples: []
      }
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fieldDefs'
  });

  const { fields: exampleFields, append: appendExample, remove: removeExample } = useFieldArray({
    control,
    name: 'metadata.examples'
  });

  const onFormSubmit = (data: ProposalFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Propose New Collection Type
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Collection Type Name"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Fields
              </Typography>
              
              {fields.map((field, index) => (
                <Card key={field.id} sx={{ mb: 2, p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Field Name"
                        {...register(`fieldDefs.${index}.name`)}
                        error={!!errors.fieldDefs?.[index]?.name}
                        helperText={errors.fieldDefs?.[index]?.name?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Field Label"
                        {...register(`fieldDefs.${index}.label`)}
                        error={!!errors.fieldDefs?.[index]?.label}
                        helperText={errors.fieldDefs?.[index]?.label?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={watch(`fieldDefs.${index}.type`) || 'string'}
                          label="Type"
                          {...register(`fieldDefs.${index}.type`)}
                        >
                          <MenuItem value="string">String</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="select">Select</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="boolean">Boolean</MenuItem>
                          <MenuItem value="image">Image</MenuItem>
                          <MenuItem value="url">URL</MenuItem>
                          <MenuItem value="price">Price</MenuItem>
                          <MenuItem value="condition">Condition</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <IconButton onClick={() => remove(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))}
              
              <Button
                startIcon={<AddIcon />}
                onClick={() => append({ 
                  name: '', 
                  label: '', 
                  type: 'string' as const 
                })}
                sx={{ mt: 2 }}
              >
                Add Field
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Examples
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {exampleFields.map((field, index) => (
                  <Chip
                    key={field.id}
                    label={watch(`metadata.examples.${index}`)}
                    onDelete={() => removeExample(index)}
                  />
                ))}
              </Stack>
              
              <TextField
                fullWidth
                label="Add Example"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value) {
                      appendExample(input.value);
                      input.value = '';
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit Proposal
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
} 