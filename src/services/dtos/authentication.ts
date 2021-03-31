import { UserRole } from '@/types';

export interface LoginResult {
  token: string;
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
