import { FieldTypes } from './Item';

export type FieldView = {
  name: string;
  color: string;
  type: FieldTypes;
  value: string | boolean | number | string[];
  enum?: string[];
};
