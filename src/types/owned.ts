export interface ConditionHistory {
  date: string;
  condition: string;
  notes?: string;
  photos?: string[];
}

export interface PurchaseInfo {
  date: string;
  price: number;
  currency: string;
  seller?: string;
  platform?: string;
  transactionId?: string;
  notes?: string;
}

export interface OwnedData {
  condition: string;
  conditionHistory?: ConditionHistory[];
  purchaseInfo: PurchaseInfo;
  location?: string;
  storageNotes?: string;
  isForSale?: boolean;
  askingPrice?: number;
  isWishlist?: boolean;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  notes?: string;
  photos?: string[];
  lastAppraised?: string;
  appraisedValue?: number;
  insuranceValue?: number;
  metadata?: {
    acquisitionSource?: string;
    giftFrom?: string;
    previousOwners?: number;
    isLimited?: boolean;
    isNumbered?: boolean;
    number?: string;
    isSigned?: boolean;
    signatureDetails?: string;
  };
}

export interface OwnedItem {
  id: string;
  catalogItemId: string;
  typeId: string;
  userData: OwnedData;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    lastModifiedBy: string;
    status: 'active' | 'sold' | 'traded' | 'lost' | 'damaged';
    version: number;
    isPublic: boolean;
    shareSettings?: {
      showValue: boolean;
      showCondition: boolean;
      showNotes: boolean;
      showPhotos: boolean;
    };
  };
}
