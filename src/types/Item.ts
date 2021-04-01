export enum FieldTypes {
  String,
  Number,
  Enum,
  Boolean,
}

export type ItemField = {
  name: string;
  type: FieldTypes;
  required: boolean;
  value: string | number | boolean | string[];
};

export type Item = {
  id: string;
  catalogue: string;
  name: string;
  description?: string;
  image?: string;
  fields: ItemField[];
};
