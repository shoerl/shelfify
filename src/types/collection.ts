export interface FieldDef {
  name: string;
  label: string;
  type: 'string' | 'number' | 'select';
  options?: string[];
}

export interface CollectionType {
  id: string;
  name: string;
  description: string;
  fieldDefs: FieldDef[];
}
