export interface CatalogData {
  title: string;
  artist?: string;
  director?: string;
  year: number;
  // plus any dynamic keys in JSONB
  [key: string]: any;
}

export interface CatalogItem {
  id: string;
  typeId: string;
  data: CatalogData;
}
