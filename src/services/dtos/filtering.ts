import { schemaField } from '@/types';

export enum AggregationType {
  eq,
  bigger,
  smaller,
  biggerEq,
  smallerEq,
}

export type Aggregation = {
  query: string[] | boolean | number | string;
  type: AggregationType;
  field: schemaField;
};

export type Filter = {
  aggregations: Aggregation[];
};
