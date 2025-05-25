import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOwnedItem } from '../api/ownedItems';
import type { OwnedItem } from '../types/owned';

export function useCreateOwnedItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<OwnedItem, 'id'>) => createOwnedItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owned-items'] });
    },
  });
}
