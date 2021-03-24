import { getter } from './store';
import { ComputedRef } from 'vue';
import { JWT } from '@/types/jwt';

export const token = getter('token', (state) => state.token);

const checkAuthentication = (token: ComputedRef<JWT | null>): boolean => {
  return token.value !== null ? true : false;
};

export const isAuthenticated = getter('isAuthenticated', () =>
  checkAuthentication(token)
);
