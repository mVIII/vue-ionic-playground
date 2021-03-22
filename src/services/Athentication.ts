import { LoginResult, Errors } from './dtos';

export interface AuthenticationService {
  login(
    username: string,
    password: string
  ): Promise<
    | LoginResult
    | Errors.UsernameNotFound
    | Errors.WrongPassword
    | Errors.Unexpected
  >;
  logout(token: string): Promise<void | Errors.Unexpected>;
}
