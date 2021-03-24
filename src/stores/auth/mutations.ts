import Cookie from 'js-cookie';
import JWTDecode from 'jwt-decode';
import { mutation } from './store';
import { JWT } from '@/types/jwt';

export const TOKEN_COOKIE = 'token';

export const setToken = mutation<string>('setToken', (state, tokenString) => {
  const decodedToken = JWTDecode(tokenString) as JWT;
  if (decodedToken.id == '') {
    throw new Error('Unable to decode token!');
  } else {
    state.token = decodedToken;
    Cookie.set(TOKEN_COOKIE, tokenString);
  }
});

export const unsetToken = mutation('unsetToken', (state) => {
  state.token = null;
  Cookie.remove(TOKEN_COOKIE);
});
