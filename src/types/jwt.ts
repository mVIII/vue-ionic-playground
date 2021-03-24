import { UserRole } from './UserRoles';

export type JWT = {
  exp: string;
  iat: string;
  id: string;
  role: UserRole;
};
