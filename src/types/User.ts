import { UserRole } from './UserRoles';

export type User = {
  id: string;
  email: string;
  fullName: string;
  username: string;
  roles: UserRole[];
  dateOfBirth: Date;
  tel1: string;
  tel2?: string;
};
