export interface FieldValidation {
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  custom?: string // For custom validation rules
}

export interface FieldRelationship {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
  targetType: string
  targetField: string
}

export interface FieldDef {
  name: string
  label: string
  type: 'string' | 'number' | 'select' | 'date' | 'boolean' | 'image' | 'url' | 'price' | 'condition'
  options?: string[]
  validation?: FieldValidation
  relationship?: FieldRelationship
  metadata?: {
    description?: string
    example?: string
    isPublic?: boolean
    isSearchable?: boolean
    isFilterable?: boolean
  }
}

export interface CollectionType {
  id: string
  name: string
  description: string
  fieldDefs: FieldDef[]
  metadata: {
    category: string
    icon?: string
    isPublic: boolean
    isSeeded: boolean
    createdAt: string
    updatedAt: string
    createdBy?: string
    status: 'draft' | 'proposed' | 'approved' | 'rejected'
    version: number
  }
}

export interface CollectionTypeProposal {
  id: string
  typeId?: string // If updating existing type
  name: string
  description: string
  fieldDefs: FieldDef[]
  metadata: {
    category: string
    icon?: string
    isPublic: boolean
    rationale: string
    examples: string[]
  }
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedBy: string
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  reviewNotes?: string
}
