import { useQuery } from '@tanstack/react-query';
import { fetchCollectionTypes } from '../api/collectionTypes';

export function useCollectionTypes() {
  return useQuery({
    queryKey: ['collection-types'],
    queryFn: fetchCollectionTypes,
  });
}
