import { UserRole, Item } from '@/types';

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

export type ItemFilter = {
  catalogue: string;
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
