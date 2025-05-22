import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem, Button, Stack } from '@mui/material';
import type { FieldDef } from '../types/collection';
import type { z } from 'zod';

interface DynamicFormProps<T> {
  fields: FieldDef[];
  schema: z.ZodType<T>;
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
}

export function DynamicForm<T>({ fields, schema, onSubmit, defaultValues }: DynamicFormProps<T>) {
  const { control, handleSubmit } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as T
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name as keyof T}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              if (field.type === 'select') {
                return (
                  <TextField
                    select
                    label={field.label}
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }

              return (
                <TextField
                  type={field.type === 'number' ? 'number' : 'text'}
                  label={field.label}
                  value={value || ''}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                />
              );
            }}
          />
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
