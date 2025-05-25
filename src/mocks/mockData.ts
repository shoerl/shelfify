import type { CollectionType, CollectionTypeProposal } from '../types/collection';
import type { CatalogItem } from '../types/catalog';
import type { OwnedItem } from '../types/owned';

export const mockCollectionTypes: CollectionType[] = [
  {
    id: 'vinyl',
    name: 'Vinyl Records',
    description: 'Your vinyl record collection',
    fieldDefs: [
      {
        name: 'title',
        label: 'Title',
        type: 'string',
        validation: { required: true },
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'artist',
        label: 'Artist',
        type: 'string',
        validation: { required: true },
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'year',
        label: 'Year',
        type: 'number',
        validation: { required: true, min: 1900, max: new Date().getFullYear() },
      },
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        options: ['LP', 'EP', 'Single', 'Box Set'],
        validation: { required: true },
      },
      {
        name: 'label',
        label: 'Record Label',
        type: 'string',
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'country',
        label: 'Country',
        type: 'string',
      },
      {
        name: 'catalogNumber',
        label: 'Catalog Number',
        type: 'string',
      },
      {
        name: 'releaseDate',
        label: 'Release Date',
        type: 'date',
      },
    ],
    metadata: {
      category: 'Music',
      icon: 'album',
      isPublic: true,
      isSeeded: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      status: 'approved',
      version: 1,
    },
  },
  {
    id: 'bluray',
    name: 'Blu-rays',
    description: 'Your Blu-ray collection',
    fieldDefs: [
      {
        name: 'title',
        label: 'Title',
        type: 'string',
        validation: { required: true },
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'director',
        label: 'Director',
        type: 'string',
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'year',
        label: 'Year',
        type: 'number',
        validation: { required: true },
      },
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        options: ['Blu-ray', '4K UHD', 'Blu-ray 3D'],
        validation: { required: true },
      },
      {
        name: 'region',
        label: 'Region',
        type: 'select',
        options: ['A', 'B', 'C', 'Free'],
        validation: { required: true },
      },
      {
        name: 'studio',
        label: 'Studio',
        type: 'string',
        metadata: { isSearchable: true, isFilterable: true },
      },
      {
        name: 'edition',
        label: 'Edition',
        type: 'string',
      },
    ],
    metadata: {
      category: 'Movies',
      icon: 'movie',
      isPublic: true,
      isSeeded: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      status: 'approved',
      version: 1,
    },
  },
];

export const mockCollectionTypeProposals: CollectionTypeProposal[] = [
  {
    id: 'prop1',
    name: 'Pokémon Cards',
    description: 'Your Pokémon card collection',
    fieldDefs: [
      {
        name: 'name',
        label: 'Card Name',
        type: 'string',
        validation: { required: true },
      },
      {
        name: 'set',
        label: 'Set',
        type: 'string',
        validation: { required: true },
      },
      {
        name: 'number',
        label: 'Card Number',
        type: 'string',
      },
      {
        name: 'rarity',
        label: 'Rarity',
        type: 'select',
        options: ['Common', 'Uncommon', 'Rare', 'Holo Rare', 'Ultra Rare'],
      },
    ],
    metadata: {
      category: 'Trading Cards',
      icon: 'style',
      isPublic: true,
      rationale: 'Pokémon cards are a popular collectible with a large community',
      examples: ['Base Set Charizard', 'Shining Mewtwo'],
    },
    status: 'submitted',
    submittedBy: 'user1',
    submittedAt: '2024-03-15T00:00:00Z',
  },
];

export const mockCatalogItems: CatalogItem[] = [
  {
    id: 'v1',
    typeId: 'vinyl',
    data: {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      format: 'LP',
      label: 'Harvest',
      country: 'UK',
      catalogNumber: 'SHVL 804',
      releaseDate: '1973-03-01',
      variants: [
        {
          id: 'v1-1',
          name: 'Original UK Pressing',
          attributes: {
            matrix: 'SHVL 804 A-1',
            cover: 'Solid Blue Triangle',
          },
          rarity: 'rare',
          estimatedValue: 500,
        },
      ],
      priceHistory: [
        {
          date: '2024-01-01',
          value: 450,
          source: 'discogs',
          condition: 'VG+',
        },
      ],
      currentValue: 500,
      lastUpdated: '2024-03-15',
      metadata: {
        barcode: '5099746644241',
        isLimited: false,
      },
    },
    metadata: {
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-03-15T00:00:00Z',
      status: 'published',
      version: 1,
      isVerified: true,
      verificationSource: 'discogs',
      verificationDate: '2024-01-01T00:00:00Z',
    },
  },
];

export const mockOwnedItems: OwnedItem[] = [
  {
    id: 'o1',
    catalogItemId: 'v1',
    typeId: 'vinyl',
    userData: {
      condition: 'VG+',
      conditionHistory: [
        {
          date: '2024-01-01',
          condition: 'VG+',
          notes: 'Original purchase condition',
        },
      ],
      purchaseInfo: {
        date: '2024-01-01',
        price: 450,
        currency: 'USD',
        seller: 'Record Store',
        platform: 'In Store',
        notes: 'Found in local record store',
      },
      location: 'Living Room Shelf',
      storageNotes: 'In protective sleeve',
      isForSale: false,
      tags: ['prog rock', 'classic'],
      notes: 'Original UK pressing',
      lastAppraised: '2024-03-15',
      appraisedValue: 500,
      insuranceValue: 600,
      metadata: {
        isLimited: false,
        previousOwners: 1,
      },
    },
    metadata: {
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-03-15T00:00:00Z',
      createdBy: 'user1',
      lastModifiedBy: 'user1',
      status: 'active',
      version: 1,
      isPublic: true,
      shareSettings: {
        showValue: true,
        showCondition: true,
        showNotes: true,
        showPhotos: true,
      },
    },
  },
];
