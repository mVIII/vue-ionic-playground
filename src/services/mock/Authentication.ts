import { AuthenticationService } from '../Authentication';
import { LoginResult, NewUser, Errors } from '@/services/dtos';
import { UserRole } from '@/types';
import JWTEncode from 'jwt-encode';

const secret = '122345';

const userStore = new Map<string /* username */, NewUser>();

const testUser: NewUser = {
  username: 'test',
  fullName: 'test test',
  email: 'test@test.com',
  password: 'test',
  tel1: '123456789',
  dateOfBirth: new Date(Date.now()),
  roles: [UserRole.admin],
};

userStore.set(testUser.username, testUser);

export default class MockAuthenticationService
  implements AuthenticationService {
  async login(
    username: string,
    password: string
  ): Promise<LoginResult | Errors.UsernameNotFound | Errors.WrongPassword> {
    const user: NewUser | undefined = userStore.get(username);

    if (user == undefined) {
      return Errors.UsernameNotFound;
    } else if (user.password !== password) {
      return Errors.WrongPassword;
    }

    const tokenPayload = {
      id: 'test',
      role: UserRole.admin,
      iat: 'idk',
      exp: '',
    };
    const encodedToken = JWTEncode(tokenPayload, secret);
    const res: LoginResult = {
      token: encodedToken,
    };
    return res;
  }

  async logout(): Promise<void | Errors.Unexpected> {
    return;
  }
}
