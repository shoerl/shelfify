import { useQuery } from '@tanstack/react-query'
import { fetchOwnedItems } from '../api/ownedItems'

export function useOwnedItems() {
  return useQuery({
    queryKey: ['owned-items'],
    queryFn: fetchOwnedItems,
  })
}
