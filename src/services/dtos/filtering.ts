import { schemaField } from '@/types';

export enum AggregationType {
  eq,
  bigger,
  smaller,
  biggerEq,
  smallerEq,
}

export enum SortingType {
  sortNewstFirst,
  sortOldestFirst,
  sortAlphabetically,
  none,
}

export type SortingFilter = {
  name: string;
  type: SortingType;
  color?: string;
};

export type Aggregation = {
  query: string[] | boolean | number | string;
  type: AggregationType;
  field: schemaField;
};

export type Filter = {
  aggregations: Aggregation[];
};
