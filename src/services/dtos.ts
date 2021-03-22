import { UserRole } from '@/types';

export enum Errors {
  UsernameNotFound,
  WrongPassword,
  UserExists,
  CatalogueNotFound,
  Unexpected,
}

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
