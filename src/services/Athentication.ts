import { LoginResult, Errors } from './dtos';

export interface AthenticationService {
  login(
    username: string,
    password: string
  ): Promise<LoginResult | Errors.UsernameNotFound | Errors.WrongPassword>;
  logout(): Promise<void | Errors.Unexpected>;
}
