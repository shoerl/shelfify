import type { CatalogItem } from '../types/catalog'
import { mockCatalogItems } from '../mocks/mockData'

interface CatalogQueryParams {
  page: number
  sort: string
}

export function fetchCatalog(typeId: string, params: CatalogQueryParams): Promise<{ items: CatalogItem[], total: number }> {
  // In a real app, this would be:
  // return api.get(`/api/catalog/${typeId}`, { params }).then(res => res.data);

  const items = mockCatalogItems.filter(item => item.typeId === typeId)
  return Promise.resolve({
    items,
    total: items.length,
  })
}

export function fetchCatalogItem(id: string): Promise<CatalogItem> {
  // In a real app, this would be:
  // return api.get(`/api/catalog/items/${id}`).then(res => res.data);

  const item = mockCatalogItems.find(i => i.id === id)
  if (!item) {
    return Promise.reject(new Error(`Catalog item ${id} not found`))
  }
  return Promise.resolve(item)
}
