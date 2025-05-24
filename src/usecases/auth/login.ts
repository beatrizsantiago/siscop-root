import { AuthRepository } from '@domain/repositories/AuthRepository';
import { localStorageService } from '@infrastructure/services/localStorage';
import User from '@domain/entities/User';

type LoginParams = {
  email: string;
  password: string;
};


class LoginUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(params: LoginParams) {
    const login = new User(
      '',
      params.email,
      params.password,
      '',
    );

    const token = await this.repository.login(login);
    localStorageService.setToken(token);
    return true;
  };
};

export default LoginUseCase;
