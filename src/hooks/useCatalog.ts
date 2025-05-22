import { useQuery } from '@tanstack/react-query';
import { fetchCatalog } from '../api/catalog';

export function useCatalog(typeId: string, page: number, sort: string) {
  return useQuery({
    queryKey: ['catalog', { typeId, page, sort }],
    queryFn: () => fetchCatalog(typeId, { page, sort }),
    keepPreviousData: true
  });
}
