import { FieldTypes } from './Item';

export type schemaField = {
  id: string;
  name: string;
  type: FieldTypes;
  enum?: string[];
  required: boolean;
};

export type Catalogue = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  itemCount: number;
  ItemSchema: schemaField[];
};
