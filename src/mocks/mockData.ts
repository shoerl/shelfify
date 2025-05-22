import type { CollectionType } from '../types/collection';
import type { CatalogItem } from '../types/catalog';
import type { OwnedItem } from '../types/owned';

export const mockCollectionTypes: CollectionType[] = [
  {
    id: '1',
    name: 'Books',
    description: 'Your book collection',
    fieldDefs: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'author', label: 'Author', type: 'string' },
      { name: 'year', label: 'Year', type: 'number' },
      { name: 'genre', label: 'Genre', type: 'select', options: ['Fiction', 'Non-Fiction', 'Biography', 'Science'] }
    ]
  },
  {
    id: '2',
    name: 'Movies',
    description: 'Your movie collection',
    fieldDefs: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'director', label: 'Director', type: 'string' },
      { name: 'year', label: 'Year', type: 'number' },
      { name: 'genre', label: 'Genre', type: 'select', options: ['Action', 'Comedy', 'Drama', 'Sci-Fi'] }
    ]
  }
];

export const mockCatalogItems: CatalogItem[] = [
  {
    id: '1',
    typeId: '1',
    data: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Fiction'
    }
  },
  {
    id: '2',
    typeId: '2',
    data: {
      title: 'The Matrix',
      director: 'Lana Wachowski',
      year: 1999,
      genre: 'Sci-Fi'
    }
  }
];

export const mockOwnedItems: OwnedItem[] = [
  {
    id: '1',
    catalogItemId: '1',
    typeId: '1',
    userData: {
      condition: 'Good',
      pricePaid: 15.99,
      notes: 'First edition'
    }
  },
  {
    id: '2',
    catalogItemId: '2',
    typeId: '2',
    userData: {
      condition: 'Like New',
      pricePaid: 19.99,
      notes: '4K Blu-ray'
    }
  }
];
