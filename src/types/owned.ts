export interface OwnedData {
  condition: string;
  pricePaid: number;
  notes?: string;
}

export interface OwnedItem {
  id: string;
  catalogItemId: string;
  typeId: string;
  userData: OwnedData;
}
