import { injectable, inject } from 'tsyringe';
import { AuthenticationService } from '@/services/Authentication';
import { Errors } from '@/services/dtos';
import { TOKEN_COOKIE, isAuthenticated, setToken, unsetToken } from './auth';
import Cookie from 'js-cookie';

@injectable()
export default class AuthStore {
  private authService: AuthenticationService;
  constructor(@inject('Authentication') authService: AuthenticationService) {
    this.authService = authService;
  }

  public setStateIfCookieExists() {
    const cookie = Cookie.get(TOKEN_COOKIE);
    if (cookie) {
      setToken(cookie);
    }
  }

  cookieIsSet(): boolean {
    return Cookie.get(TOKEN_COOKIE) ? true : false;
  }

  public IsAthenticated(): boolean {
    return isAuthenticated.value && this.cookieIsSet();
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
    setToken(result.token);
  }

  public async Logout(token: string): Promise<void | Errors> {
    const result = await this.authService.logout(token);
    if (result === Errors.Unexpected) {
      return Errors.Unexpected;
    }
    unsetToken();
  }
}
