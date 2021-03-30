import { FieldTypes } from './Item';

export type schemaField = {
  name: string;
  type: FieldTypes;
  enum?: string[];
};

export type Catalogue = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  itemCount: number;
  ItemSchema: schemaField[];
};
