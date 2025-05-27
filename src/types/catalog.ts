export interface PriceHistory {
  date: string;
  value: number;
  source: 'manual' | 'discogs' | 'ebay' | 'tcgplayer' | 'other';
  condition?: string;
  notes?: string;
}

export interface ReleaseVariant {
  id: string;
  name: string;
  description?: string;
  attributes: Record<string, string | number | boolean | null>;
  rarity?: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  estimatedValue?: number;
}

export interface CatalogData {
  title: string;
  artist?: string;
  director?: string;
  year: number;
  format?: string;
  label?: string;
  studio?: string;
  country?: string;
  region?: string;
  edition?: string;
  variants?: ReleaseVariant[];
  priceHistory?: PriceHistory[];
  currentValue?: number;
  lastUpdated?: string;
  metadata?: {
    barcode?: string;
    catalogNumber?: string;
    isLimited?: boolean;
    isOutOfPrint?: boolean;
    releaseDate?: string;
    reissueDate?: string;
    notes?: string;
  };
  // plus any dynamic keys in JSONB
  [key: string]: string | number | boolean | null | undefined | ReleaseVariant[] | PriceHistory[] | {
    barcode?: string;
    catalogNumber?: string;
    isLimited?: boolean;
    isOutOfPrint?: boolean;
    releaseDate?: string;
    reissueDate?: string;
    notes?: string;
  };
}

export interface CatalogItem {
  id: string;
  typeId: string;
  data: CatalogData;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    lastModifiedBy?: string;
    status: 'draft' | 'published' | 'archived';
    version: number;
    isVerified: boolean;
    verificationSource?: string;
    verificationDate?: string;
  };
}
