import { UserRole, Item, schemaField } from '@/types';

export enum Errors {
  UsernameNotFound,
  WrongPassword,
  UserExists,
  CatalogueNotFound,
  Unexpected,
}

type Pagination = {
  pages: number;
  next: string;
};

export interface NewUser {
  username: string;
  fullName: string;
  email: string;
  password: string;
  tel1: string;
  tel2?: string;
  dateOfBirth: Date;
  roles: UserRole[];
}

export interface LoginResult {
  token: string;
}

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

export interface ItemPage {
  items: Item[];
  pagination: Pagination;
}

export interface ItemDTO {
  id?: string;
  name: string;
  description?: string;
  image?: string;
}
