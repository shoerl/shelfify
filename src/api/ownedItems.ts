import type { OwnedItem } from '../types/owned';
import { mockOwnedItems } from '../mocks/mockData';

export function fetchOwnedItems(): Promise<OwnedItem[]> {
  // In a real app, this would be:
  // return api.get('/api/owned-items').then(res => res.data);
  return Promise.resolve(mockOwnedItems);
}

export function fetchOwnedItem(id: string): Promise<OwnedItem> {
  // In a real app, this would be:
  // return api.get(`/api/owned-items/${id}`).then(res => res.data);
  
  const item = mockOwnedItems.find(i => i.id === id);
  if (!item) {
    return Promise.reject(new Error(`Owned item ${id} not found`));
  }
  return Promise.resolve(item);
}

export function createOwnedItem(data: Omit<OwnedItem, 'id'>): Promise<OwnedItem> {
  // In a real app, this would be:
  // return api.post('/api/owned-items', data).then(res => res.data);
  
  const newItem: OwnedItem = {
    ...data,
    id: String(mockOwnedItems.length + 1)
  };
  mockOwnedItems.push(newItem);
  return Promise.resolve(newItem);
}

export function updateOwnedItem(id: string, data: Partial<OwnedItem>): Promise<OwnedItem> {
  // In a real app, this would be:
  // return api.patch(`/api/owned-items/${id}`, data).then(res => res.data);
  
  const index = mockOwnedItems.findIndex(i => i.id === id);
  if (index === -1) {
    return Promise.reject(new Error(`Owned item ${id} not found`));
  }
  
  const updatedItem = { ...mockOwnedItems[index], ...data };
  mockOwnedItems[index] = updatedItem;
  return Promise.resolve(updatedItem);
}
