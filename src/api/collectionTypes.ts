import { api } from './client';
import type { CollectionType } from '../types/collection';
import { mockCollectionTypes } from '../mocks/mockData';

export function fetchCollectionTypes(): Promise<CollectionType[]> {
  // In a real app, this would be:
  // return api.get('/api/collection-types').then(res => res.data);
  return Promise.resolve(mockCollectionTypes);
}

export function fetchCollectionType(id: string): Promise<CollectionType> {
  // In a real app, this would be:
  // return api.get(`/api/collection-types/${id}`).then(res => res.data);
  const type = mockCollectionTypes.find(t => t.id === id);
  if (!type) {
    return Promise.reject(new Error(`Collection type ${id} not found`));
  }
  return Promise.resolve(type);
}
