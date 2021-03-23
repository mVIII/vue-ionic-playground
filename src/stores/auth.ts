import { createStore } from '@harlem/core';
import { UserRole } from '@/types';
import Cookie from 'js-cookie';
import JWTDecode from 'jwt-decode';
import { injectable, inject } from 'tsyringe';
import { AuthenticationService } from '@/services/Authentication';
import { Errors } from '@/services/dtos';

export const TOKEN_COOKIE = 'token';

interface JWT {
  exp: string;
  iat: string;
  id: string;
  role: UserRole;
}

interface State {
  token: JWT | null;
}

const STATE: State = {
  token: null,
};

const { getter, mutation } = createStore<State>('token', STATE);

@injectable()
export default class AuthStore {
  private authService: AuthenticationService;
  constructor(@inject('Authentication') authService: AuthenticationService) {
    this.authService = authService;
  }

  private token = getter('token', (state) => state.token);

  private setToken = mutation<string>('setToken', (state, tokenString) => {
    const decodedToken = JWTDecode(tokenString) as JWT;
    if (decodedToken.id == '') {
      throw new Error('Unable to decode token!');
    } else {
      state.token = decodedToken;
      Cookie.set(TOKEN_COOKIE, tokenString);
    }
  });

  private unsetToken = mutation('unsetToken', (state) => {
    state.token = null;
    Cookie.remove(TOKEN_COOKIE);
  });

  tokenIsSet(): boolean {
    return this.token.value !== null ? true : false;
  }

  cookieIsSet(): boolean {
    return Cookie.get(TOKEN_COOKIE) ? true : false;
  }

  public IsAthenticated(): boolean {
    return this.tokenIsSet() && this.cookieIsSet();
  }

  public async Login(
    username: string,
    password: string
  ): Promise<void | Errors> {
    const result = await this.authService.login(username, password);
    if (result === Errors.UsernameNotFound) {
      return Errors.UsernameNotFound;
    } else if (result === Errors.WrongPassword) {
      return Errors.WrongPassword;
    } else if (result === Errors.Unexpected) {
      return Errors.Unexpected;
    }
    this.setToken(result.token);
  }

  public async Logout(token: string): Promise<void | Errors> {
    const result = await this.authService.logout(token);
    if (result === Errors.Unexpected) {
      return Errors.Unexpected;
    }
    this.unsetToken();
  }
}
