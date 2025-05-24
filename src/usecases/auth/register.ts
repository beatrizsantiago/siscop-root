import { AuthRepository } from '@domain/repositories/AuthRepository';
import { localStorageService } from '@infrastructure/services/localStorage';
import User from '@domain/entities/User';

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

class RegisterUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(params: RegisterParams) {
    const newUser = new User(
      '',
      params.email,
      params.password,
      params.name,
    );

    const token = await this.repository.register(newUser);
    localStorageService.setToken(token);
    return true;
  }
};

export default RegisterUseCase;