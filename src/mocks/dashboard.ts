import type { OwnedItem } from '../types/owned';

export const acquisitionData = [
  { month: 'Jan', count: 2 },
  { month: 'Feb', count: 1 },
  { month: 'Mar', count: 3 },
];

export const genreFormatBreakdown = [
  { name: 'Vinyl', value: 4 },
  { name: 'Books', value: 2 },
  { name: 'Games', value: 1 },
];

export const recentItems: OwnedItem[] = [
  {
    id: 'o1',
    catalogItemId: 'v1',
    typeId: 'vinyl',
    userData: {
      condition: 'NM',
      purchaseInfo: { date: '2024-01-01', price: 20, currency: 'USD' },
      tags: ['mock item'],
      photos: [],
    },
    metadata: {
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      createdBy: 'user',
      lastModifiedBy: 'user',
      status: 'active',
      version: 1,
      isPublic: true,
    },
  },
];
